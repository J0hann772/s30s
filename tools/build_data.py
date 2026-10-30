"""Собирает data/matan-rk1.js из markdown-конспектов notes/matan-rk1.

Запуск: python build_data.py <notes_dir> <figs_json> <out_js>
"""
import json
import re
import sys
from pathlib import Path

NOTES, FIGS, OUT = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])

# ---------- темы ----------
TOPICS = [
    # id, файл, номер, заголовок, лекция, вид, examRefs
    ("t00", "00_reference.md", "1–3", "Справочник: логика, множества, промежутки", "л. 1–2", "ref", []),
    ("t04", "04_neighborhoods.md", "4", "Окрестности конечной и бесконечной точек", "л. 1–2", "core", ["A1", "A2", "A3", "A4", "A5"]),
    ("t05", "05_sequences.md", "5", "Последовательности: монотонность, ограниченность", "л. 1–2", "core", ["A8", "A9", "A10", "A11", "A12", "A13"]),
    ("t06", "06_sequence_limit.md", "6", "Предел последовательности, критерий Коши", "л. 1–2", "core", ["A6", "A7", "A14", "A15"]),
    ("t07", "07_convergent_properties.md", "7", "Свойства сходящихся последовательностей", "л. 3–4", "core", ["C1"]),
    ("t08a", "08a_number_e.md", "8a", "Число e", "л. 3–4", "core", []),
    ("t08b", "08b_hyperbolic.md", "8b", "Гиперболические функции", "л. 3–4", "core", []),
    ("t09", "09_function_limit.md", "9", "Предел функции по Коши и по Гейне", "л. 3–4", "core", ["A16"]),
    ("t10", "10_function_boundedness.md", "10", "Ограниченность функции", "л. 3–4", "core", []),
    ("t11", "11_limit_properties.md", "11", "Общие свойства конечных пределов", "л. 3–4", "core", []),
    ("t12", "12_infinitesimals.md", "12", "Бесконечно малые и бесконечно большие", "л. 5", "core", ["A17", "A18", "C2", "C3", "C4"]),
    ("t13", "13_limit_arithmetic.md", "13", "Арифметика пределов", "л. 5", "core", []),
    ("t14", "14_16_onesided_infinite.md", "14–16", "Односторонние, на бесконечности, бесконечные пределы", "л. 6", "core", []),
    ("t17", "17_definitions_table.md", "17", "Определения пределов в кванторах (таблицы)", "л. 6", "core", ["B1", "B2", "B3", "B4", "B5"]),
    ("t18", "18_inf_small_large.md", "18", "Связь б.м. и б.б.", "л. 6", "core", ["C5"]),
    ("t19", "19_first_remarkable.md", "19", "Первый замечательный предел", "л. 7–8", "core", []),
    ("t20", "20_second_remarkable.md", "20", "Второй замечательный предел", "л. 7–8", "core", []),
    ("t21", "21_comparison.md", "21", "Сравнение б.м., главная часть, порядки", "л. 7–8", "core", ["A19", "A20", "A21", "A22"]),
    ("t22", "22_equivalences.md", "22", "Эквивалентности: таблица и теоремы", "л. 7–8", "core", ["C6", "C7"]),
    ("t23", "23_continuity_point.md", "23", "Непрерывность в точке, приращение", "л. 9", "core", ["A23", "A24"]),
    ("t24", "24_continuity_intervals.md", "24", "Непрерывность на промежутках", "л. 9", "core", ["A25", "A26"]),
    ("t25", "25_discontinuities.md", "25", "Точки разрыва и их классификация", "л. 9", "core", ["A27", "A28", "A29", "A30"]),
    ("t26", "26_continuity_arithmetic.md", "26", "Арифметика непрерывных функций, сложная функция", "л. 9", "core", []),
    ("t27", "27_continuity_elementary.md", "27", "Непрерывность элементарных функций", "л. 9", "core", []),
    ("t28", "28_continuity_on_segment.md", "28", "Свойства функций, непрерывных на отрезке", "л. 9", "core", []),
    ("t97", "97_limit_algorithm.md", "", "Дан предел: с чего начать", "", "ref", []),
    ("t93", "93_block_b.md", "", "Блок B: определения по Коши с рисунками", "", "ref", ["B1", "B2", "B3", "B4", "B5"]),
    ("t96", "96_exam_coverage.md", "", "Покрытие РК", "", "ref", []),
    ("t99", "99_completeness.md", "", "Справочник: полнота R", "", "ref", []),
]

# ещё не написанные темы — показываются в навигации серыми
MISSING = []

FIG_REF = re.compile(r"рисунок `([a-z_]+)`")


def split_blocks(text):
    """markdown -> список блоков: md / table / details / warn / figure."""
    lines = text.split("\n")
    blocks, buf = [], []

    def flush():
        s = "\n".join(buf).strip()
        if s:
            blocks.append({"type": "md", "text": s})
        buf.clear()

    i = 0
    while i < len(lines):
        ln = lines[i]
        m = re.match(r"\s*<details><summary>(.*?)</summary>", ln)
        if m:
            flush()
            title = m.group(1).strip()
            inner = []
            i += 1
            while i < len(lines) and "</details>" not in lines[i]:
                inner.append(lines[i])
                i += 1
            i += 1
            low = title.lower()
            kind = "solution" if low.startswith("решени") else "proof"
            extra = "не из лекций" in low
            blocks.append({"type": "details", "kind": kind, "title": title,
                           "src": "extra" if extra else "lecture", "text": "\n".join(inner).strip()})
            continue
        if ln.startswith(">"):
            flush()
            q = []
            while i < len(lines) and lines[i].startswith(">"):
                q.append(re.sub(r"^>\s?", "", lines[i]))
                i += 1
            body = "\n".join(q).strip()
            W = "**Расхождение со слайдами.**"
            kind = "warn" if body.startswith(W) else "note"
            if kind == "warn":
                body = body[len(W):].strip()
            blocks.append({"type": kind, "text": body})
            continue
        if ln.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s\-:|]+\|\s*$", lines[i + 1]):
            flush()
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append(lines[i])
                i += 1
            head = split_row(rows[0])
            body = [split_row(r) for r in rows[2:]]
            blocks.append({"type": "table", "head": head, "rows": body})
            continue
        buf.append(ln)
        i += 1
    flush()
    return merge_examples(blocks)


def split_row(row):
    """Делит строку таблицы по |, не трогая | внутри $...$."""
    row = row.strip()
    if row.startswith("|"):
        row = row[1:]
    if row.endswith("|"):
        row = row[:-1]
    cells, cur, in_math = [], "", False
    for ch in row:
        if ch == "$":
            in_math = not in_math
        if ch == "|" and not in_math:
            cells.append(cur.strip())
            cur = ""
        else:
            cur += ch
    cells.append(cur.strip())
    return cells


def merge_examples(blocks):
    """md-блок, оканчивающийся абзацем «**Пример …**», + следующий details-решение -> example."""
    out = []
    for b in blocks:
        if b["type"] == "details" and b["kind"] == "solution" and out and out[-1]["type"] in ("md",):
            prev = out[-1]["text"]
            paras = re.split(r"\n\s*\n", prev)
            last = paras[-1].strip()
            if last.startswith("**Пример") or last.startswith("###") or last.startswith("**Задача"):
                rest = "\n\n".join(paras[:-1]).strip()
                if rest:
                    out[-1]["text"] = rest
                else:
                    out.pop()
                out.append({"type": "example", "task": last, "solution": b["text"]})
                continue
        out.append(b)
    return out


def strip_title(text):
    """Убирает первую строку '# ...' (заголовок темы — в метаданных)."""
    lines = text.split("\n")
    if lines and lines[0].startswith("# "):
        return "\n".join(lines[1:]).lstrip("\n"), lines[0][2:].strip()
    return text, ""


figs = json.loads(FIGS.read_text(encoding="utf-8"))

topics = []
for tid, fname, num, title, lec, kind, refs in TOPICS:
    raw = (NOTES / fname).read_text(encoding="utf-8")
    body, full_title = strip_title(raw)
    blocks = split_blocks(body)
    topics.append({"id": tid, "num": num, "title": title, "fullTitle": full_title, "lecture": lec,
                   "kind": kind, "examRefs": refs, "status": "done", "blocks": blocks})

# Блок B: разрезать md по разделам ## и вставить figure после разделов с «рисунок `key`»
for t in topics:
    if t["id"] != "t93":
        continue
    nb = []
    for b in t["blocks"]:
        if b["type"] != "md":
            nb.append(b)
            continue
        for sec in re.split(r"(?m)^(?=## )", b["text"]):
            sec = sec.strip()
            if not sec:
                continue
            nb.append({"type": "md", "text": sec})
            head = sec.split("\n")[0]
            for key in FIG_REF.findall(head):
                nb.append({"type": "figure", "key": key})
    t["blocks"] = nb

for tid, num, title, lec, kind in MISSING:
    topics.append({"id": tid, "num": num, "title": title, "lecture": lec, "kind": kind,
                   "examRefs": [], "status": "todo", "blocks": []})

ORDER = ["t00", "t04", "t05", "t06", "t07", "t08a", "t08b", "t09", "t10", "t11", "t12", "t13", "t14", "t17",
         "t18", "t19", "t20", "t21", "t22", "t23", "t24", "t25", "t26", "t27", "t28", "t97", "t93", "t96", "t99"]
topics.sort(key=lambda t: ORDER.index(t["id"]))

# ---------- расхождения ----------
disc_raw = (NOTES / "98_discrepancies.md").read_text(encoding="utf-8")
discrepancies = []
MAJOR_KEYS = ["сложной функции", "Гейне", "частного", "δ(M)", "\\delta(M)", "определения разрывов", "две опечатки",
              "предельный переход", "несравнимые"]
for sec in re.split(r"(?m)^### ", disc_raw)[1:]:
    head, _, body = sec.partition("\n")
    head = head.strip()
    if head.startswith("Главное"):
        topics_of = ["11"]
    else:
        m = re.match(r"Тем[аы] ([\d–\-, a-z]+)", head)
        rng = m.group(1) if m else ""
        topics_of = []
        for part in re.split(r",\s*", rng):
            mm = re.match(r"(\d+)\w?(?:[–-](\d+))?", part.strip())
            if mm:
                a = int(mm.group(1))
                b = int(mm.group(2)) if mm.group(2) else a
                topics_of += [str(k) for k in range(a, b + 1)]
    body = body.strip()
    # блок «Уже замечено…» — не расхождение
    if body.startswith("- **Тема 24"):
        continue
    sev = "major" if (head.startswith("Главное") or any(k in head for k in MAJOR_KEYS)) else "minor"
    if "НЕ ошибка" in head:
        sev = "ok"
    discrepancies.append({"id": f"d{len(discrepancies) + 1}", "title": head.strip(),
                          "topics": topics_of, "severity": sev, "text": body.split("\n## ")[0].strip()})
# хвост «Уже замечено в следующих темах»
tail = disc_raw.split("## Уже замечено в следующих темах")[-1]
for ln in tail.strip().split("\n"):
    if ln.startswith("- **Тема"):
        m = re.match(r"- \*\*Тема (\d+)", ln)
        discrepancies.append({"id": f"d{len(discrepancies) + 1}", "title": "Будет разобрано: " + ln[2:60] + "…",
                              "topics": [m.group(1)], "severity": "minor", "text": ln[2:]})

# ---------- ловушки ----------
traps_raw = (NOTES / "94_traps.md").read_text(encoding="utf-8")
traps = []
for part in re.split(r"(?m)^\*\*(?=Т\d+\.)", traps_raw)[1:]:
    head, _, body = part.partition("**")
    m = re.match(r"Т(\d+)\.\s*(.*)", head.strip())
    group = "theory" if int(m.group(1)) >= 16 else "tasks"
    traps.append({"id": "T" + m.group(1), "title": m.group(2).strip(), "group": group,
                  "text": body.strip().split("\n## ")[0].strip()})

# ---------- задачи РК ----------
sol_raw = (NOTES / "95_exam_solutions.md").read_text(encoding="utf-8")
tasks = []
TYPE_OF = {"1": "limit", "2": "order", "3": "continuity"}
for sec in re.split(r"(?m)^### ", sol_raw)[1:]:
    head, _, body = sec.partition("\n")
    m = re.match(r"(\d)\.(\d+)\.\s*(.*)", head.strip())
    if not m:
        continue
    pre, _, rest = body.partition("<details><summary>")
    sol = rest.split("</summary>", 1)[1].split("</details>")[0].strip() if rest else ""
    hint = pre.strip()
    tasks.append({"id": f"{m.group(1)}.{m.group(2)}", "type": TYPE_OF[m.group(1)], "q": m.group(3).strip(),
                  "hint": hint, "solution": sol})

# эталонный вариант
var_part = sol_raw.split("# Эталонный вариант", 1)[1]
var_tasks = []
zad = var_part.split("## Задачи", 1)[1]
for m in re.finditer(r"\*\*(\d)\. \((\d) балл\w*\)\*\*\s*(.*?)\n\s*\n<details><summary>.*?</summary>\n(.*?)</details>",
                     zad, re.S):
    var_tasks.append({"n": int(m.group(1)), "points": int(m.group(2)), "q": m.group(3).strip(),
                      "solution": m.group(4).strip()})

# ---------- теория РК ----------
def A(i, q, ans, refs):
    return {"id": f"A{i}", "block": "A", "n": i, "points": 1, "q": q, "answer": ans, "refs": refs}


SEQ = r"\lim_{n\to+\infty}x_n"
theoryA = [
    A(1, "Определение окрестности точки $x\\in R$",
      "Окрестностью точки $x_0$ на числовой прямой называется любой интервал, содержащий эту точку. Обозначение: $S(x_0)$.", ["t04"]),
    A(2, "Определение $\\varepsilon$-окрестности точки",
      "$\\varepsilon$-окрестностью точки $x_0$ называется интервал длиной $2\\varepsilon$ с центром в точке $x_0$: $S_\\varepsilon(x_0)=(x_0-\\varepsilon,\\ x_0+\\varepsilon)$, $\\varepsilon>0$.", ["t04"]),
    A(3, "Определение окрестности $+\\infty$",
      "$S(+\\infty)=(M,+\\infty)=\\{x\\in R:\\ x>M\\}$, где $M\\in R$, $M>0$.", ["t04"]),
    A(4, "Определение окрестности $-\\infty$",
      "$S(-\\infty)=(-\\infty,-M)=\\{x\\in R:\\ x<-M\\}$, где $M\\in R$, $M>0$.", ["t04"]),
    A(5, "Определение окрестности $\\infty$",
      "$S(\\infty)=\\{x\\in R:\\ |x|>M\\}=(-\\infty,-M)\\cup(M,+\\infty)$, где $M\\in R$, $M>0$ (внешность отрезка $[-M,M]$).", ["t04"]),
    A(6, "Определение предела последовательности",
      "Число $a$ называется пределом последовательности $x_n$, если для любого $\\varepsilon>0$ найдётся номер $n(\\varepsilon)\\in\\mathbb N$ такой, что при всех $n>n(\\varepsilon)$ выполнено $|x_n-a|<\\varepsilon$:\n$$" + SEQ + "=a\\iff\\forall\\varepsilon>0\\ \\exists n(\\varepsilon)\\in\\mathbb N\\ \\forall n>n(\\varepsilon)\\Rightarrow|x_n-a|<\\varepsilon.$$", ["t06"]),
    A(7, "Определение сходящейся последовательности",
      "Последовательность $x_n$ называется сходящейся, если она имеет конечный предел: $\\exists a\\in R:\\ " + SEQ + "=a$.", ["t06"]),
    A(8, "Определение ограниченной последовательности",
      "Последовательность $x_n$ ограничена, если $\\exists m,M\\in R:\\ \\forall n\\in\\mathbb N\\ \\ m\\le x_n\\le M$ (равносильно: $\\exists M>0\\ \\forall n:\\ |x_n|\\le M$).", ["t05"]),
    A(9, "Определение монотонной последовательности",
      "Монотонной называется последовательность, которая является возрастающей, убывающей, неубывающей или невозрастающей.", ["t05"]),
    A(10, "Определение возрастающей последовательности", "$x_n$ возрастающая, если $x_{n+1}>x_n$ $\\forall n\\in\\mathbb N$.", ["t05"]),
    A(11, "Определение убывающей последовательности", "$x_n$ убывающая, если $x_{n+1}<x_n$ $\\forall n\\in\\mathbb N$.", ["t05"]),
    A(12, "Определение невозрастающей последовательности", "$x_n$ невозрастающая, если $x_{n+1}\\le x_n$ $\\forall n\\in\\mathbb N$.", ["t05"]),
    A(13, "Определение неубывающей последовательности", "$x_n$ неубывающая, если $x_{n+1}\\ge x_n$ $\\forall n\\in\\mathbb N$.", ["t05"]),
    A(14, "Определение фундаментальной последовательности",
      "$x_n$ фундаментальная, если $\\forall\\varepsilon>0\\ \\exists n(\\varepsilon)\\in\\mathbb N:\\ \\forall n>n(\\varepsilon)\\ \\forall m>n(\\varepsilon)\\Rightarrow|x_n-x_m|<\\varepsilon$.", ["t06"]),
    A(15, "Критерий Коши существования предела последовательности",
      "Для того чтобы последовательность была сходящейся, необходимо и достаточно, чтобы она была фундаментальной.", ["t06"]),
    A(16, "Определение по Гейне предела функции",
      "Число $a$ — предел $f(x)$ при $x\\to x_0$, если для любой последовательности $x_n\\in D_f$, $x_n\\ne x_0$, сходящейся к $x_0$, последовательность $f(x_n)$ сходится к $a$:\n$$\\lim_{x\\to x_0}f(x)=a\\iff\\forall\\{x_n\\}:\\ x_n\\in D_f,\\ x_n\\ne x_0,\\ x_n\\to x_0\\ \\Rightarrow\\ f(x_n)\\to a.$$\n Условие $x_n\\ne x_0$ на слайде пропущено — писать обязательно.", ["t09", "t17"]),
    A(17, "Определение бесконечно малой функции",
      "$f(x)$ — бесконечно малая при $x\\to x_0$, если $\\lim\\limits_{x\\to x_0}f(x)=0$, т. е. $\\forall\\varepsilon>0\\ \\exists\\delta(\\varepsilon)>0:\\ 0<|x-x_0|<\\delta\\Rightarrow|f(x)|<\\varepsilon$.", ["t12"]),
    A(18, "Определение бесконечно большой функции",
      "$f(x)$ — бесконечно большая при $x\\to x_0$, если $\\lim\\limits_{x\\to x_0}f(x)=\\infty$, т. е. $\\forall M>0\\ \\exists\\delta(M)>0:\\ 0<|x-x_0|<\\delta\\Rightarrow|f(x)|>M$.", ["t12"]),
    A(19, "Определение б.м. одного порядка",
      "Б.м. $f(x)$ и $g(x)$ при $x\\to x_0$ — одного порядка малости, если существует конечный предел $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)}{g(x)}=a\\ne0$. Обозначение (у лектора): $f=O(g)$.", ["t21"]),
    A(20, "Определение несравнимых б.м.",
      "Б.м. $f(x)$ и $g(x)$ при $x\\to x_0$ несравнимы, если предел $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)}{g(x)}$ не существует (ни конечный, ни бесконечный).", ["t21"]),
    A(21, "Определение эквивалентных б.м.",
      "Б.м. $f(x)$ и $g(x)$ эквивалентны при $x\\to x_0$, если $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)}{g(x)}=1$. Обозначение: $f\\sim g$.", ["t21"]),
    A(22, "Определение порядка малости одной функции относительно другой",
      "Число $k>0$ — порядок малости б.м. $f(x)$ относительно б.м. $g(x)$ при $x\\to x_0$, если существует конечный предел $\\lim\\limits_{x\\to x_0}\\dfrac{f(x)}{g^k(x)}=a\\ne0$.", ["t21"]),
    A(23, "Определение приращения функции",
      "Пусть $f$ определена в окрестности точки $x_0$, $x$ из этой окрестности. $\\Delta x=x-x_0$ — приращение аргумента; $\\Delta y=f(x)-f(x_0)=f(x_0+\\Delta x)-f(x_0)$ — приращение функции в точке $x_0$.", ["t23"]),
    A(24, "Определение непрерывности функции в точке (любое)",
      "$f$ непрерывна в точке $x_0$, если она определена в окрестности $x_0$ и $\\lim\\limits_{x\\to x_0}f(x)=f(x_0)$.\nРавносильно: $\\lim\\limits_{\\Delta x\\to0}\\Delta y=0$ (бесконечно малому приращению аргумента соответствует бесконечно малое приращение функции).", ["t23"]),
    A(25, "Определение непрерывности функции на интервале",
      "Функция непрерывна на интервале $(a,b)$, если она непрерывна в каждой точке этого интервала.  На слайде опечатка «интеграла».", ["t24"]),
    A(26, "Определение непрерывности функции на отрезке",
      "Функция непрерывна на отрезке $[a,b]$, если она непрерывна в каждой точке интервала $(a,b)$, непрерывна в точке $a$ справа и в точке $b$ слева.", ["t24"]),
    A(27, "Определение точки разрыва",
      "Точка $x_0$ — точка разрыва функции $f$, если $f$ определена в некоторой проколотой окрестности $x_0$ и не является непрерывной в точке $x_0$.", ["t25"]),
    A(28, "Определение точки устранимого разрыва",
      "$x_0$ — точка устранимого разрыва, если существуют конечные равные односторонние пределы $\\lim\\limits_{x\\to x_0+}f(x)=\\lim\\limits_{x\\to x_0-}f(x)$, но $f(x_0)$ не определено или не равно им. (У лектора — только «не определено»; расширенный вариант безопаснее.)", ["t25"]),
    A(29, "Определение точки разрыва I рода",
      "$x_0$ — точка разрыва I рода, если существуют конечные односторонние пределы $\\lim\\limits_{x\\to x_0+}f(x)$ и $\\lim\\limits_{x\\to x_0-}f(x)$.", ["t25"]),
    A(30, "Определение точки разрыва II рода",
      "$x_0$ — точка разрыва II рода, если хотя бы один из односторонних пределов не существует или равен бесконечности.", ["t25"]),
]


def B(i, q, ans, fig, refs):
    return {"id": f"B{i}", "block": "B", "n": i, "points": 2, "q": q, "answer": ans, "figure": fig, "refs": refs}


theoryB = [
    B(1, "По Коши $\\lim\\limits_{x\\to0}f(x)=b$, $b\\in R$ + пример + рисунок",
      "$$\\lim_{x\\to0}f(x)=b\\iff\\forall\\varepsilon>0\\ \\exists\\delta(\\varepsilon)>0:\\ \\forall x:\\ 0<|x|<\\delta\\Rightarrow|f(x)-b|<\\varepsilon.$$\n**Пример:** $f=2x+3$, $b=3$: $|2x|<\\varepsilon\\iff|x|<\\frac\\varepsilon2$, $\\delta=\\frac\\varepsilon2$.", "lim_a_b", ["t93", "t17"]),
    B(2, "По Коши $\\lim\\limits_{x\\to a}f(x)=+\\infty$, $a\\in R$ + пример + рисунок",
      "$$\\lim_{x\\to a}f(x)=+\\infty\\iff\\forall M>0\\ \\exists\\delta(M)>0:\\ \\forall x:\\ 0<|x-a|<\\delta\\Rightarrow f(x)>M.$$\n**Пример:** $f=\\frac1{(x-a)^2}$, $\\delta=\\frac1{\\sqrt M}$.", "lim_a_pinf", ["t93", "t17"]),
    B(3, "По Коши $\\lim\\limits_{x\\to\\infty}f(x)=0$ + пример + рисунок",
      "$$\\lim_{x\\to\\infty}f(x)=0\\iff\\forall\\varepsilon>0\\ \\exists N(\\varepsilon)>0:\\ \\forall x:\\ |x|>N\\Rightarrow|f(x)|<\\varepsilon.$$\n**Пример:** $f=\\frac1x$, $N=\\frac1\\varepsilon$.", "lim_inf_0", ["t93", "t17"]),
    B(4, "По Коши $\\lim\\limits_{x\\to a-0}f(x)=-\\infty$, $a\\in R$ + пример + рисунок",
      "$$\\lim_{x\\to a-0}f(x)=-\\infty\\iff\\forall M>0\\ \\exists\\delta(M)>0:\\ \\forall x:\\ 0<a-x<\\delta\\Rightarrow f(x)<-M.$$\n**Пример:** $f=\\frac1{x-a}$, $\\delta=\\frac1M$.", "lim_a_minus_minf", ["t93", "t17"]),
    B(5, "По Коши $\\lim\\limits_{x\\to a}f(x)=\\infty$, $a\\in R$ + пример + рисунок (из типового варианта)",
      "$$\\lim_{x\\to a}f(x)=\\infty\\iff\\forall M>0\\ \\exists\\delta(M)>0:\\ \\forall x:\\ 0<|x-a|<\\delta\\Rightarrow|f(x)|>M.$$\n**Пример:** $f=\\frac1{x-a}$, $\\delta=\\frac1M$.", "lim_a_inf", ["t93", "t17"]),
]


def C(i, q, ans, refs):
    return {"id": f"C{i}", "block": "C", "n": i, "points": 1, "q": q, "answer": ans, "refs": refs}


theoryC = [
    C(1, "Теорема об ограниченности сходящейся последовательности", "Любая сходящаяся последовательность ограничена.", ["t07"]),
    C(2, "Теорема о связи функции, её предела и б.м.",
      "Функция имеет конечный предел при $x\\to x_0$ тогда и только тогда, когда её можно представить в виде суммы этого предела и б.м. при $x\\to x_0$:\n$$\\lim_{x\\to x_0}f(x)=a\\iff f(x)=a+\\alpha(x),\\ \\alpha(x)\\ \\text{— б.м. при } x\\to x_0.$$", ["t12"]),
    C(3, "Теорема о сумме конечного числа б.м.", "Сумма конечного числа бесконечно малых функций при $x\\to x_0$ есть бесконечно малая функция при $x\\to x_0$.", ["t12"]),
    C(4, "Теорема о произведении б.м. на ограниченную",
      "Произведение бесконечно малой при $x\\to x_0$ функции на (локально) ограниченную в окрестности $x_0$ функцию есть бесконечно малая функция.", ["t12"]),
    C(5, "Теорема о связи б.м. и б.б.",
      "Если $\\alpha(x)$ — б.м. при $x\\to x_0$ и $\\alpha(x)\\ne0$ в проколотой окрестности $x_0$, то $\\frac1{\\alpha(x)}$ — б.б. при $x\\to x_0$. (И обратно: если $f$ — б.б., то $\\frac1f$ — б.м.)", ["t18"]),
    C(6, "Теорема о необходимом и достаточном условии эквивалентности б.м.",
      "Б.м. $f(x)$ и $g(x)$ эквивалентны при $x\\to x_0$ тогда и только тогда, когда их разность имеет более высокий порядок малости по сравнению с каждой из них:\n$$f\\sim g\\iff f-g=o(f),\\ f-g=o(g).$$", ["t22"]),
    C(7, "Теорема о сумме б.м. разных порядков",
      "Сумма конечного числа б.м. функций разного порядка малости эквивалентна слагаемому низшего порядка малости: если $\\beta=o(\\alpha)$, то $\\alpha+\\beta\\sim\\alpha$.", ["t22"]),
]

TASK_REFS = {"limit": ["t97", "t13", "t19", "t20", "t22"], "order": ["t21", "t22"], "continuity": ["t25"]}
for t in tasks:
    t["refs"] = TASK_REFS[t["type"]]

data = {
    "id": "matan-rk1",
    "subject": "matan",
    "title": "Математический анализ — РК1: пределы и непрерывность",
    "date": "2026-11-05",
    "topics": topics,
    "exam": {
        "theory": theoryA + theoryB + theoryC,
        "blocks": [
            {"id": "A", "title": "Определения", "points": "по 1 баллу"},
            {"id": "B", "title": "Определение по Коши + пример + рисунок", "points": "по 2 балла"},
            {"id": "C", "title": "Формулировки теорем", "points": "по 1 баллу"},
        ],
        "taskTypes": [
            {"id": "limit", "title": "1. Вычислите предел"},
            {"id": "order", "title": "2. Б.м./б.б., главная часть, порядки, сравнение"},
            {"id": "continuity", "title": "3. Исследуйте на непрерывность, график у разрывов"},
        ],
        "tasks": tasks,
        "rkq": json.loads((NOTES / "96_rkq.json").read_text(encoding="utf-8")),
        "variant": {
            "minutes": 90,
            "theory": ["A7", "B5", "C3"],
            "tasks": var_tasks,
        },
    },
    "discrepancies": discrepancies,
    "traps": traps,
    "figures": figs,
}

js = "/* Сгенерировано build_data.py из notes/matan-rk1 — правьте конспекты, затем пересоберите. */\n"
js += "S30S.register(" + json.dumps(data, ensure_ascii=False, indent=1) + ");\n"
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(js, encoding="utf-8")
print("topics", len(topics), "theory", len(data["exam"]["theory"]), "tasks", len(tasks),
      "variant", len(var_tasks), "disc", len(discrepancies), "traps", len(traps), "bytes", len(js.encode()))
