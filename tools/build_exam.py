#!/usr/bin/env python3
"""Универсальная сборка раздела контрольной из markdown-конспектов.

  python tools/build_exam.py notes/<exam> data/<exam>.js

Что лежит в notes/<exam>/ (подробно — в README, раздел «Новый предмет»):
  exam.json            метаданные: темы, блоки вопросов, типы задач, вариант, тексты страниц
  NN_*.md              конспекты тем (список и порядок — в exam.json → topics)
  90_theory.md         вопросы РК с ответами:  ### A1. Вопрос  /  refs: g01, g02  /  ответ
  95_tasks.md          задачи:  # @тип Название  /  ### 416. Условие  /  подсказка  /  <details>Решение</details>
  94_traps.md          (необязательно) ловушки:  ## Задачи / ## Формулировки,  **Т1. Заголовок.** текст
  98_discrepancies.md  (необязательно) неточности:  ### заголовок / темы: 2, 7 / важность: major|minor|ok / текст
  figs.json            (необязательно) рисунки {ключ: "<svg…>"}; в тексте — строка {{figure:ключ}}

Разметка внутри md такая же, как у матана (tools/build_data.py): таблицы, <details> для доказательств
и решений, цитата «> **Расхождение со слайдами.** …» или «> **Неточность в конспекте.** …» — блок-предупреждение.

Сборщик проверяет ссылки (темы, вопросы, задачи, рисунки) и падает с понятной ошибкой,
если что-то не найдено, — чтобы опечатка не превратилась в пустое место на сайте.
"""
import json
import re
import sys
from pathlib import Path

if len(sys.argv) != 3:
    sys.exit(__doc__)
NOTES, OUT = Path(sys.argv[1]), Path(sys.argv[2])
cfg = json.loads((NOTES / "exam.json").read_text(encoding="utf-8"))
errors = []

WARN_MARKS = ("**Расхождение со слайдами.**", "**Неточность в конспекте.**")
EXTRA_MARKS = ("не из лекций", "не из конспекта")


# ---------- разбор markdown на блоки (совместимо с build_data.py) ----------
def split_row(row):
    row = row.strip()
    if row.startswith("|"): row = row[1:]
    if row.endswith("|"): row = row[:-1]
    cells, cur, in_math = [], "", False
    for ch in row:
        if ch == "$": in_math = not in_math
        if ch == "|" and not in_math:
            cells.append(cur.strip()); cur = ""
        else:
            cur += ch
    cells.append(cur.strip())
    return cells


def split_blocks(text):
    lines = text.split("\n")
    blocks, buf = [], []

    def flush():
        s = "\n".join(buf).strip()
        if s: blocks.append({"type": "md", "text": s})
        buf.clear()

    i = 0
    while i < len(lines):
        ln = lines[i]
        m = re.match(r"\s*\{\{(widget|figure):([\w-]+)\}\}\s*$", ln)
        if m:
            flush()
            blocks.append({"type": m.group(1), "key": m.group(2)})
            i += 1; continue
        m = re.match(r"\s*<details><summary>(.*?)</summary>", ln)
        if m:
            flush()
            title, inner = m.group(1).strip(), []
            i += 1
            while i < len(lines) and "</details>" not in lines[i]:
                inner.append(lines[i]); i += 1
            i += 1
            low = title.lower()
            blocks.append({"type": "details", "kind": "solution" if low.startswith("решени") else "proof", "title": title,
                           "src": "extra" if any(k in low for k in EXTRA_MARKS) else "lecture", "text": "\n".join(inner).strip()})
            continue
        if ln.startswith(">"):
            flush()
            q = []
            while i < len(lines) and lines[i].startswith(">"):
                q.append(re.sub(r"^>\s?", "", lines[i])); i += 1
            body = "\n".join(q).strip()
            mark = next((w for w in WARN_MARKS if body.startswith(w)), None)
            if mark:
                blocks.append({"type": "warn", "text": body[len(mark):].strip()})
            else:
                blocks.append({"type": "note", "text": body})
            continue
        if ln.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s\-:|]+\|\s*$", lines[i + 1]):
            flush()
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append(lines[i]); i += 1
            blocks.append({"type": "table", "head": split_row(rows[0]), "rows": [split_row(r) for r in rows[2:]]})
            continue
        buf.append(ln); i += 1
    flush()
    # md-абзац «**Пример…**» + следующий <details> «Решение» -> блок example
    out = []
    for b in blocks:
        if b["type"] == "details" and b["kind"] == "solution" and out and out[-1]["type"] == "md":
            paras = re.split(r"\n\s*\n", out[-1]["text"])
            last = paras[-1].strip()
            if last.startswith(("**Пример", "**Задача", "###")):
                rest = "\n\n".join(paras[:-1]).strip()
                if rest: out[-1]["text"] = rest
                else: out.pop()
                out.append({"type": "example", "task": last, "solution": b["text"]})
                continue
        out.append(b)
    return out


def strip_title(text):
    lines = text.split("\n")
    if lines and lines[0].startswith("# "):
        return "\n".join(lines[1:]).lstrip("\n"), lines[0][2:].strip()
    return text, ""


def opt(name):
    p = NOTES / name
    return p.read_text(encoding="utf-8") if p.exists() else None


# ---------- рисунки ----------
figs = {}
if cfg.get("figures") and (NOTES / cfg["figures"]).exists():
    figs = json.loads((NOTES / cfg["figures"]).read_text(encoding="utf-8"))

# ---------- темы ----------
topics = []
for t in cfg["topics"]:
    raw = (NOTES / t["file"]).read_text(encoding="utf-8")
    body, full = strip_title(raw)
    blocks = split_blocks(body)
    for b in blocks:
        if b["type"] == "figure" and b["key"] not in figs:
            errors.append("тема %s: нет рисунка %s" % (t["id"], b["key"]))
    topics.append({"id": t["id"], "num": t.get("num", ""), "title": t["title"], "fullTitle": full,
                   "lecture": t.get("lecture", ""), "kind": t.get("kind", "core"), "examRefs": t.get("examRefs", []),
                   "status": "done", "blocks": blocks})
topic_ids = {t["id"] for t in topics}

# ---------- вопросы РК ----------
labels = {b["id"]: b.get("label", b["id"]) for b in cfg["blocks"]}
item_pts = {b["id"]: b.get("itemPoints") for b in cfg["blocks"]}
theory = []
th_raw = (NOTES / "90_theory.md").read_text(encoding="utf-8")
for sec in re.split(r"(?m)^### ", th_raw)[1:]:
    head, _, body = sec.partition("\n")
    m = re.match(r"([A-Z])(\d+)\.\s*(.*)", head.strip())
    if not m:
        errors.append("90_theory.md: не разобран заголовок «%s»" % head.strip()); continue
    blk, n, q = m.group(1), int(m.group(2)), m.group(3).strip()
    body = body.split("\n## ")[0]
    refs = []
    mr = re.match(r"\s*refs:\s*(.*)\n", body)
    if mr:
        refs = [r.strip() for r in mr.group(1).split(",") if r.strip()]
        body = body[mr.end():]
    fig = None
    def take_fig(mm):
        global fig
        if fig is None: fig = mm.group(1)
        return ""
    body = re.sub(r"(?m)^\s*\{\{figure:([\w-]+)\}\}\s*$", take_fig, body).strip()
    if fig and fig not in figs: errors.append("вопрос %s%d: нет рисунка %s" % (blk, n, fig))
    for r in refs:
        if r not in topic_ids: errors.append("вопрос %s%d: нет темы %s" % (blk, n, r))
    item = {"id": "%s%d" % (blk, n), "label": "%s%d" % (labels.get(blk, blk), n), "block": blk, "n": n,
            "points": item_pts.get(blk), "q": q, "answer": body, "refs": refs}
    if fig: item["figure"] = fig
    theory.append(item)
theory_ids = {q["id"] for q in theory}
for t in topics:
    for r in t["examRefs"]:
        if r not in theory_ids: errors.append("тема %s: нет вопроса %s" % (t["id"], r))

# ---------- задачи ----------
types = {tt["id"]: tt for tt in cfg["taskTypes"]}
tasks, cur = [], None
task_text = "\n".join((NOTES / f).read_text(encoding="utf-8") for f in cfg.get("taskFiles", ["95_tasks.md"]))
for part in re.split(r"(?m)^# @", task_text)[1:]:
    tid = part.split(None, 1)[0]
    if tid not in types:
        errors.append("95_tasks.md: неизвестный тип задач @%s" % tid); continue
    for sec in re.split(r"(?m)^### ", part)[1:]:
        head, _, body = sec.partition("\n")
        m = re.match(r"([\w.]+)\.\s*(.*)", head.strip())
        pre, _, rest = body.partition("<details><summary>")
        sol = rest.split("</summary>", 1)[1].split("</details>")[0].strip() if rest else ""
        if not sol: errors.append("задача %s: нет решения" % m.group(1))
        item = {"id": m.group(1), "type": tid, "q": m.group(2).strip(), "hint": pre.strip(),
                "solution": sol, "refs": types[tid].get("refs", [])}
        ms = re.match(r"s(\d+)_(\d+)$", m.group(1))          # задача из слитого билета: s<билет>_<номер>
        if ms: item["label"] = "%s.%s" % (ms.group(1), ms.group(2)); item["ticket"] = int(ms.group(1))
        if types[tid].get("points"): item["points"] = types[tid]["points"]
        tasks.append(item)
task_by = {t["id"]: t for t in tasks}
if len(task_by) != len(tasks): errors.append("задачи: повторяющиеся номера")

# ---------- ловушки ----------
traps = []
raw = opt("94_traps.md")
if raw:
    group = "tasks"
    for chunk in re.split(r"(?m)^(## .*)$", raw):
        if chunk.startswith("## "):
            group = "theory" if "Формулир" in chunk else "tasks"; continue
        for part in re.split(r"(?m)^\*\*(?=Т\d+\.)", chunk)[1:]:
            head, _, body = part.partition("**")
            m = re.match(r"Т(\d+)\.\s*(.*)", head.strip())
            traps.append({"id": "T" + m.group(1), "title": m.group(2).strip().rstrip("."), "group": group, "text": body.strip()})

# ---------- неточности / расхождения ----------
discrepancies = []
raw = opt("98_discrepancies.md")
if raw:
    for sec in re.split(r"(?m)^### ", raw)[1:]:
        head, _, body = sec.partition("\n")
        tops, sev = [], "minor"
        m = re.search(r"(?m)^темы:\s*(.*)$", body)
        if m:
            tops = [x.strip() for x in m.group(1).split(",") if x.strip()]
            body = body.replace(m.group(0), "", 1)
        m = re.search(r"(?m)^важность:\s*(\w+)\s*$", body)
        if m:
            sev = m.group(1); body = body.replace(m.group(0), "", 1)
        discrepancies.append({"id": "d%d" % (len(discrepancies) + 1), "title": head.strip(), "topics": tops,
                              "severity": sev, "text": body.strip()})

# ---------- список вопросов РК (по структуре блоков и задач) ----------
rq = cfg.get("rkq", {})
sections = []
for b in cfg["blocks"]:
    pt = lambda p: "" if not p else ("%d балл" % p if p == 1 else "%d балла" % p)
    items = [{"n": q["n"], "pts": pt(q["points"]), "text": q["q"], "to": "theory:" + q["id"]} for q in theory if q["block"] == b["id"]]
    if items: sections.append({"title": b.get("rkqTitle", b["title"]), "items": items})
def natk(t): return [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", t["id"])]
for sec in rq.get("taskSections") or [{"title": rq.get("tasksTitle", "Задачи"), "types": list(types)}]:
    ts = sorted([t for t in tasks if t["type"] in sec["types"]], key=lambda t: (t.get("ticket", 0), natk(t)))
    if ts:
        sections.append({"title": sec["title"], "items": [{"n": t.get("label", t["id"]), "pts": ("%d балла" % t["points"] if t.get("points") in (2, 3, 4) else "%d баллов" % t["points"]) if t.get("points") else "",
                                                          "text": t["q"], "to": "task:" + t["id"]} for t in ts]})
rkq = {"header": rq.get("header", [cfg["title"], "", "", ""]), "note": rq.get("note"), "sections": sections}

# ---------- вариант ----------
variant = None
v = cfg.get("variant")
if v:
    for qid in v.get("theory", []):
        if qid not in theory_ids: errors.append("вариант: нет вопроса %s" % qid)
    vt = []
    for i, tid in enumerate(v.get("tasks", []), 1):
        if tid not in task_by:
            errors.append("вариант: нет задачи %s" % tid); continue
        vt.append({"n": i, "points": task_by[tid].get("points"), "q": task_by[tid]["q"] if v.get("plainTasks") else "**%s.** %s" % (tid, task_by[tid]["q"]),
                   "solution": task_by[tid]["solution"]})
    variant = {k: v[k] for k in ("title", "minutes", "scoring", "inTasks", "note", "passNote") if k in v}
    variant.update({"theory": v.get("theory", []), "tasks": vt})

for tt in cfg["taskTypes"]:
    for r in tt.get("refs", []):
        if r not in topic_ids: errors.append("тип задач %s: нет темы %s" % (tt["id"], r))

# ---------- решения к фото слитых вариантов (формат solutions/matan-rk1.js) ----------
sol_js = None
if cfg.get("slivy"):
    th_by = {q["id"]: q for q in theory}
    pool, items = {}, {}
    for photo, rows in cfg["slivy"].items():
        items[photo] = []
        for row in rows:
            n, ref = row[0], row[1]
            kind, _, rid = ref.partition(":")
            key = ref.replace(":", "_")
            if kind == "task" and rid in task_by:
                pool[key] = {"c": row[2] if len(row) > 2 else task_by[rid]["q"], "s": task_by[rid]["solution"]}
            elif kind == "theory" and rid in th_by:
                q = th_by[rid]
                pool[key] = {"c": (row[2] if len(row) > 2 else q["q"]) + ("" if not q.get("points") else " (%s)" % ("1 балл" if q["points"] == 1 else "%d балла" % q["points"])),
                             "s": q["answer"] + ("\n\nПодробно — «%s»." % ", ".join(t["title"] for t in topics if t["id"] in q["refs"]) if q["refs"] else "")}
            else:
                errors.append("слив «%s»: нет %s" % (photo, ref)); continue
            items[photo].append([str(n), key])
    sol_js = ("/* Сгенерировано tools/build_exam.py из %s/exam.json (slivy) — решения к фото слитых вариантов. */\n"
              "window.S30S=window.S30S||{};window.S30S.solutions=window.S30S.solutions||{};\n"
              "window.S30S.solutions[%s]=%s;\n") % (NOTES.as_posix(), json.dumps(cfg["id"]), json.dumps({"pool": pool, "items": items}, ensure_ascii=False, indent=1))

if errors:
    sys.exit("Ошибки сборки:\n  " + "\n  ".join(errors))

exam = {"theory": theory, "blocks": [{k: b[k] for k in ("id", "label", "title", "points") if k in b} for b in cfg["blocks"]],
        "taskTypes": [{"id": t["id"], "title": t["title"]} for t in cfg["taskTypes"]], "tasks": tasks, "rkq": rkq,
        "note": cfg.get("note"), "cardBlocks": cfg.get("cardBlocks"), "cardsNote": cfg.get("cardsNote")}
if variant: exam["variant"] = variant
data = {"id": cfg["id"], "subject": cfg["subject"], "title": cfg["title"], "date": cfg.get("date"),
        "topics": topics, "exam": exam, "discrepancies": discrepancies, "traps": traps, "figures": figs}
for k in ("discTitle", "discNote", "discItem", "materialsNote", "warnLabel"):
    if cfg.get(k): data[k] = cfg[k]

js = "/* Сгенерировано tools/build_exam.py из %s — правьте конспекты, затем пересоберите. */\n" % NOTES.as_posix()
js += "S30S.register(" + json.dumps(data, ensure_ascii=False, indent=1) + ");\n"
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(js, encoding="utf-8", newline="\n")
if sol_js:
    sp = OUT.parent.parent / "solutions" / (cfg["id"] + ".js")
    sp.parent.mkdir(parents=True, exist_ok=True)
    sp.write_text(sol_js, encoding="utf-8", newline="\n")
    print("решения к сливам:", sp.as_posix(), "—", len(cfg["slivy"]), "фото")
print("%s: тем %d, вопросов %d, задач %d, ловушек %d, неточностей %d, рисунков %d, %d КБ" % (
    cfg["id"], len(topics), len(theory), len(tasks), len(traps), len(discrepancies), len(figs), len(js.encode()) // 1024))
