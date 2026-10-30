/* ===== Ядро: регистрация данных контрольных ===== */
window.S30S = { data: {}, register: function (d) { this.data[d.id] = d; } };

(function () {
"use strict";

/* ===== Хранилище: ключи с префиксом id контрольной ===== */
var EXAM = null;            // данные текущей контрольной
var EXAM_META = null;       // запись из manifest
var PROGRESS = !(window.S30S_CONFIG && window.S30S_CONFIG.progress === false);  // false: без «прочитано/знаю/решено/карточек»
if (!PROGRESS) document.body.classList.add("no-progress");
var PKEY = /^(topic|exam|task):/;
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
function key(k) { return EXAM.id + ":" + k; }
function flag(k) { if (!PROGRESS && PKEY.test(k)) return false; return lsGet(key(k)) === "1"; }
function setFlag(k, on) { if (!PROGRESS && PKEY.test(k)) return; lsSet(key(k), on ? "1" : null); }

/* ===== Масштаб текста ===== */
var ZOOMS = [0.85, 0.92, 1, 1.1, 1.2, 1.32];
function applyZoom() { var z = +lsGet("s30s:zoom"); if (ZOOMS.indexOf(z) < 0) z = 1; document.getElementById("view").style.zoom = z; }
function stepZoom(d) { var z = +lsGet("s30s:zoom") || 1, i = ZOOMS.indexOf(z); if (i < 0) i = 2; i = Math.max(0, Math.min(ZOOMS.length - 1, i + d)); lsSet("s30s:zoom", String(ZOOMS[i])); applyZoom(); }
document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".zoom"); if (b) { e.stopPropagation(); stepZoom(+b.getAttribute("data-z")); } }, true);

/* ===== Кнопки управления: масштаб и тема ===== */
function isDark() { var cur = lsGet("s30s:theme"); return cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
function ctrlsHtml() {
  return '<span class="seg" role="group" aria-label="Размер текста"><button class="cbtn zoom" data-z="-1" aria-label="Уменьшить текст">А−</button>' +
    '<button class="cbtn zoom" data-z="1" aria-label="Увеличить текст">А+</button></span>' +
    '<button class="cbtn theme-btn" aria-label="Переключить светлую и тёмную тему" aria-pressed="' + isDark() + '">Тема</button>';
}
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest(".theme-btn"); if (!b) return;
  lsSet("s30s:theme", isDark() ? "light" : "dark"); applyTheme();
  [].forEach.call(document.querySelectorAll(".theme-btn"), function (x) { x.setAttribute("aria-pressed", String(isDark())); });
});

/* ===== Тема ===== */
function applyTheme() {
  var t = lsGet("s30s:theme");
  if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
}
applyTheme();

/* ===== Мини-рендерер markdown + KaTeX ===== */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
function dec(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
function tex(src, display) {
  if (window.katex) {
    try { return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: false }); }
    catch (e) { /* падение рендера — показать исходник */ }
  }
  return '<code>' + esc(display ? "$$" + src + "$$" : "$" + src + "$") + '</code>';
}
// Выносим формулы в заглушки до разбора markdown
function protect(src, store) {
  return src
    .replace(/\$\$([\s\S]+?)\$\$/g, function (_, t) { store.push(tex(t, true)); return "\u0000" + (store.length - 1) + "\u0000"; })
    .replace(/\$([^$\n]+?)\$/g, function (_, t) { store.push(tex(t, false)); return "\u0000" + (store.length - 1) + "\u0000"; });
}
function restore(html, store) { return html.replace(/\u0000(\d+)\u0000/g, function (_, i) { return store[+i]; }); }
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[\s(«])\*([^*\s][^*]*?)\*(?=[\s).,:;»!?]|$)/g, "$1<em>$2</em>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, t, u) {
    if (/^#/.test(u)) return '<a href="' + u + '">' + t + "</a>";
    if (/^https:\/\//i.test(u)) return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
    return m; // остальные схемы (javascript:, data: и т. п.) не превращаются в ссылки
  });
  s = s.replace(/\[не из лекций(?:[^\]]*)\]/g, function (m) { return '<span class="extra">' + m.slice(1, -1) + '</span>'; });
  return s;
}
function splitRow(r) {
  r = r.trim(); if (r[0] === "|") r = r.slice(1); if (r.slice(-1) === "|") r = r.slice(0, -1);
  return r.split("|").map(function (c) { return c.trim(); });
}
function slug(s) { return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 60); }
function md(src) {
  if (!src) return "";
  var store = [];
  return restore(mdBody(protect(src, store)), store);
}
// Разбор уже «защищённого» текста (формулы заменены заглушками) — можно вызывать рекурсивно
function mdBody(text) {
  var lines = text.split("\n"), out = [], i = 0;
  function isTable(j) { return /^\s*\|/.test(lines[j] || "") && /^\s*\|[\s\-:|]+\|\s*$/.test(lines[j + 1] || ""); }
  while (i < lines.length) {
    var ln = lines[i];
    if (!ln.trim()) { i++; continue; }
    var h = ln.match(/^(#{1,4})\s+(.*)$/);
    if (h) { var lvl = Math.min(h[1].length + 1, 4); var ht = inline(h[2]); out.push("<h" + lvl + ' id="' + slug(h[2]) + '">' + ht + "</h" + lvl + ">"); i++; continue; }
    if (/^---+\s*$/.test(ln)) { out.push("<hr>"); i++; continue; }
    if (isTable(i)) {
      var head = splitRow(lines[i]); i += 2; var rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(splitRow(lines[i])); i++; }
      out.push(tableHtml(head, rows, true)); continue;
    }
    if (/^\s*>/.test(ln)) {
      var q = []; while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      var qt = q.join("\n");
      var W = "**Расхождение со слайдами.**", isW = qt.indexOf(W) === 0;
      out.push('<div class="' + (isW ? "warn" : "note") + ' md">' + mdBody(isW ? qt.slice(W.length).trim() : qt) + "</div>"); continue;
    }
    if (/^\s*([-*]|\d+[.)])\s+/.test(ln)) { var r = listHtml(lines, i); out.push(r.html); i = r.next; continue; }
    var p = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s/.test(lines[i]) && !isTable(i) && !/^\s*>/.test(lines[i]) && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i])) { p.push(lines[i]); i++; }
    out.push("<p>" + p.map(inline).join("<br>") + "</p>");
  }
  return out.join("\n");
}
function listHtml(lines, i) {
  var base = lines[i].match(/^(\s*)/)[1].length;
  var ordered = /^\s*\d+[.)]\s/.test(lines[i]);
  var items = [];
  while (i < lines.length) {
    var ln = lines[i];
    if (!ln.trim()) { if (lines[i + 1] && /^\s*([-*]|\d+[.)])\s+/.test(lines[i + 1]) && lines[i + 1].match(/^(\s*)/)[1].length >= base) { i++; continue; } break; }
    var ind = ln.match(/^(\s*)/)[1].length;
    var m = ln.match(/^\s*([-*]|\d+[.)])\s+(.*)$/);
    if (m && ind === base) { items.push({ text: m[2], sub: [] }); i++; continue; }
    if (ind > base && items.length) { items[items.length - 1].sub.push(ln); i++; continue; }
    if (!m && items.length && ind >= base) { items[items.length - 1].text += " " + ln.trim(); i++; continue; }
    break;
  }
  var tag = ordered ? "ol" : "ul";
  var html = "<" + tag + ">" + items.map(function (it) {
    var sub = it.sub.length ? listHtml(it.sub, 0).html : "";
    return "<li>" + inline(it.text) + sub + "</li>";
  }).join("") + "</" + tag + ">";
  return { html: html, next: i };
}
function tableHtml(head, rows, protectedAlready) {
  var cell = protectedAlready ? inline : function (c) { return mdInline(c); };
  return '<div class="tbl"><table><thead><tr>' + head.map(function (c) { return "<th>" + cell(c) + "</th>"; }).join("") +
    "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + cell(c) + "</td>"; }).join("") + "</tr>"; }).join("") +
    "</tbody></table></div>";
}
function mdInline(s) { var st = []; return restore(inline(protect(s, st)), st); }

/* ===== Блоки контента ===== */
function renderBlock(b) {
  switch (b.type) {
    case "md": return '<div class="md">' + md(b.text) + "</div>";
    case "table": return tableHtml(b.head, b.rows, false);
    case "warn": return '<div class="warn md">' + md(b.text) + "</div>";
    case "note": return '<div class="note md">' + md(b.text) + "</div>";
    case "extra": return '<div class="note md"><span class="extra">[не из лекций]</span> ' + md(b.text) + "</div>";
    case "figure": return figure(b.key);
    case "details":
      return '<details class="' + (b.kind === "solution" ? "solution" : "proof") + (b.src === "extra" ? " src-extra" : "") + '"><summary>' + mdInline(b.title) +
        '</summary><div class="body md">' + md(b.text) + "</div></details>";
    case "example":
      return '<div class="example md">' + md(b.task) + '<details class="solution"><summary>Решение</summary><div class="body md">' + md(b.solution) + "</div></details></div>";
    default: return "";
  }
}
function figure(k) { var s = EXAM.figures && EXAM.figures[k]; return s ? '<div class="figure">' + s + "</div>" : ""; }

/* ===== Вспомогательное ===== */
var $view = document.getElementById("view"), $side = document.getElementById("side");
applyZoom();
document.getElementById("topCtrls").innerHTML = '<span class="ctrls">' + ctrlsHtml() + "</span>";
function topicById(id) { return EXAM.topics.filter(function (t) { return t.id === id; })[0]; }
function topicForNum(n) {
  n = parseInt(n, 10);
  return EXAM.topics.filter(function (t) {
    var m = String(t.num).match(/^(\d+)\D*(?:[–-](\d+))?/); if (!m) return false;
    var a = +m[1], b = m[2] ? +m[2] : a; return n >= a && n <= b && t.status === "done";
  })[0];
}
function theoryById(id) { return EXAM.exam.theory.filter(function (q) { return q.id === id; })[0]; }
function daysLeft() {
  if (!EXAM_META || !EXAM_META.date) return "";
  var d = Math.ceil((new Date(EXAM_META.date + "T09:00:00") - new Date()) / 864e5);
  return d > 0 ? "через " + d + " дн." : d === 0 ? "сегодня" : "";
}
function setTitle(t) { document.getElementById("topTitle").textContent = t; document.title = t + " — s30s"; }

function logoHtml(big) {
  return '<a class="logo' + (big ? " big" : "") + '" href="#/" aria-label="s30s, все контрольные" title="s30s: study of the \'30 students"><span class="logo-mark" aria-hidden="true">30</span><span class="logo-word"><b>s<i>30</i>s</b><small>ИУ7 МГТУ · выпуск 2030</small></span></a>';
}

/* ===== Боковая навигация ===== */
function setSideHidden(on) { setFlag("side:hidden", on); document.body.classList.toggle("side-hidden", on); }
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest(".sec[data-sec]"); if (!b) return;
  var n = b.getAttribute("data-sec"), box = document.getElementById("sb-" + n), closed = !box.hidden;
  box.hidden = closed; setFlag("side:sec:" + n, closed);
  b.setAttribute("aria-expanded", String(!closed));
});
function renderSide(route) {
  var core = EXAM.topics.filter(function (t) { return t.kind !== "ref"; });
  var refs = EXAM.topics.filter(function (t) { return t.kind === "ref"; });
  var read = core.filter(function (t) { return t.status === "done" && flag("topic:" + t.id + ":read"); }).length;
  var done = core.filter(function (t) { return t.status === "done"; }).length;
  function link(href, html, cls) { return '<a href="' + href + '" class="' + (cls || "") + (route === href ? " active" : "") + '">' + html + "</a>"; }
  var oldSc = document.getElementById("sideScroll"), st = oldSc ? oldSc.scrollTop : 0;
  function sec(name, title) {
    var closed = flag("side:sec:" + name);
    return '<button class="sec" data-sec="' + name + '" aria-expanded="' + !closed + '"><span>' + title + "</span></button>";
  }
  function body(name, html) { return '<div class="secbody" id="sb-' + name + '"' + (flag("side:sec:" + name) ? " hidden" : "") + ">" + html + "</div>"; }
  var h = '<div class="side-head"><div class="brand">' + logoHtml() + '<span class="blinks"><button class="cbtn ibtn" id="hideSide" title="Скрыть колонку" aria-label="Скрыть колонку">'+ '<svg class="ico" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="2.5" y="3.5" width="15" height="13" rx="3"/><path d="M8 3.5v13"/></svg>' + '</button></span></div>' +
    '<div class="ctrls">' + ctrlsHtml() + "</div>" +
    '<div class="exam-title">' + esc(EXAM_META.title) + (daysLeft() ? ", " + daysLeft() : "") + "</div>" +
    '<input class="search" id="q" type="search" placeholder="Поиск по конспектам…" style="margin:0" value="' + esc(dec((route.match(/^#\/search\/(.*)$/) || [, ""])[1])) + '"></div>' +
    '<div class="side-scroll" id="sideScroll"><nav>' +
    link("#/", "Все контрольные") +
    link("#/rk", "РК: вопросы, задачи, вариант") +
    link("#/rkq", "Список вопросов РК") +
    link("#/cards", "Карточки: определения и теоремы") +
    link("#/disc", "Расхождения со слайдами") +
    link("#/traps", "На чём валятся") +
    link("#/t/t97", "Дан предел: с чего начать") +
    sec("notes", "Конспекты" + (PROGRESS ? ", прочитано " + read + " из " + done : "")) +
    body("notes", core.map(function (t) {
      var mark = t.status !== "done" ? '<span class="mark">не написано</span>' : flag("topic:" + t.id + ":read") ? '<span class="mark">прочитано</span>' : "";
      return link("#/t/" + t.id, '<span class="num">' + esc(t.num) + "</span>" + mdInline(t.title) + mark, t.status !== "done" ? "todo" : "");
    }).join("")) +
    sec("refs", "Справочники, " + refs.filter(function (t) { return t.id !== "t97"; }).length) +
    body("refs", refs.filter(function (t) { return t.id !== "t97"; }).map(function (t) { return link("#/t/" + t.id, mdInline(t.title)); }).join("")) +
    "</nav></div>";
  $side.innerHTML = h;
  var sc = document.getElementById("sideScroll"), act = sc.querySelector("a.active");
  sc.scrollTop = st;
  if (act && (act.offsetTop < st || act.offsetTop + act.offsetHeight > st + sc.clientHeight)) sc.scrollTop = Math.max(0, act.offsetTop - sc.clientHeight / 2);
  document.getElementById("hideSide").onclick = function () { setSideHidden(true); };
  var q = document.getElementById("q");
  q.onkeydown = function (e) { if (e.key === "Enter") location.hash = "#/search/" + encodeURIComponent(q.value.trim()); };
}

/* ===== Страница: тема ===== */
function pageTopic(id) {
  var t = topicById(id);
  if (!t) return '<p class="empty">Тема не найдена.</p>';
  setTitle(t.title);
  var refs = (t.examRefs || []).map(function (r) { return '<a href="#/rk/theory/' + r + '">' + r + "</a>"; }).join(", ");
  var head = "<h1>" + (t.kind === "ref" ? "" : esc(t.num) + ". ") + mdInline(t.title) + '</h1><div class="meta">' + [t.lecture ? esc(t.lecture) : "", refs ? "вопросы РК: " + refs : ""].filter(Boolean).join(" · ") + "</div>";
  if (t.status !== "done") return head + '<p class="empty">Конспект этой темы ещё не написан. Формулировки, нужные для РК, — на странице «РК».</p>';
  var isRead = flag("topic:" + t.id + ":read");
  var btn = t.kind === "ref" ? "" : '<p><label class="chk"><input type="checkbox" id="readChk"' + (isRead ? " checked" : "") + "> Прочитано</label></p>";
  return head + btn + t.blocks.map(renderBlock).join("\n") + (t.kind === "ref" ? "" : '<hr><p><label class="chk"><input type="checkbox" id="readChk2"' + (isRead ? " checked" : "") + "> Прочитано</label></p>");
}

/* ===== Страница: Список вопросов РК (текст файла «Вопросы для подготовки») ===== */
function rkqHref(to) {
  var m = String(to || "").split(":");
  if (m[0] === "theory" && theoryById(m[1])) return "#/rk/theory/" + m[1];
  if (m[0] === "task" && EXAM.exam.tasks.filter(function (t) { return t.id === m[1]; })[0]) return "#/rk/tasks/" + m[1];
  if (m[0] === "vtask") return "#/rk/tasks/v" + m[1];
  return null;
}
function rkqCount() {
  var total = 0, link = 0;
  function add(to) { total++; if (rkqHref(to)) link++; }
  EXAM.exam.rkq.sections.forEach(function (s) {
    (s.items || []).forEach(function (it) { add(it.to); });
    (s.taskgroups || []).forEach(function (g) { g.tasks.forEach(function (id) { add("task:" + id); }); });
    (s.vartasks || []).forEach(function (n) { add("vtask:" + n); });
  });
  return [link, total];
}
function pageRkq() {
  setTitle("Список вопросов РК");
  var q = EXAM.exam.rkq, c = rkqCount();
  function li(n, pts, html, href) {
    var inner = (pts ? '<span class="pts">(' + esc(pts) + ")</span> " : "") + html;
    return "<li><span class=\"n\">" + esc(n) + ".</span><span class=\"tx\">" + (href ? '<a href="' + href + '">' + inner + "</a>" : inner) + "</span></li>";
  }
  var h = '<div class="rkq"><h1>Список вопросов РК</h1>' +
    '<div class="meta">Текст файла «Вопросы для подготовки». Кликабельны ' + c[0] + " пунктов из " + c[1] + ".</div>" +
    '<div class="title"><b>' + mdInline(q.header[0] + " " + q.header[1]) + "</b>" + esc(q.header[2]) + "<br>" + esc(q.header[3]) + "</div>";
  q.sections.forEach(function (s) {
    h += "<h2>" + mdInline(s.title) + (s.sup ? "<sup>" + s.sup + "</sup>" : "") + "</h2>";
    if (s.items) h += "<ol>" + s.items.map(function (it) { return li(it.n, it.pts, mdInline(it.text), rkqHref(it.to)); }).join("") + "</ol>";
    if (s.taskgroups) s.taskgroups.forEach(function (g) {
      h += '<div class="grp"><p><b>' + g.n + ".</b> " + mdInline(g.text) + "</p><ol>" + g.tasks.map(function (id) {
        var t = EXAM.exam.tasks.filter(function (x) { return x.id === id; })[0];
        return li(id, "", t ? mdInline(t.q) : esc(id), rkqHref("task:" + id));
      }).join("") + "</ol></div>";
    });
    if (s.vartasks) h += "<ol>" + s.vartasks.map(function (n) {
      var t = EXAM.exam.variant.tasks.filter(function (x) { return x.n === n; })[0];
      return li(n, t.points + " балла", "Вычислите предел " + mdInline(t.q), rkqHref("vtask:" + n));
    }).join("") + "</ol>";
    if (s.after) h += '<p class="after">' + esc(s.after) + "</p>";
    if (s.footnote) {
      var f = s.footnote, href = f.to ? rkqHref(f.to) : null;
      h += '<p class="fn"><sup>' + f.sup + "</sup>" + (href ? '<a href="' + href + '">' + esc(f.text) + "</a>" : esc(f.text)) + "</p>";
    }
  });
  return h + "</div>";
}

/* ===== Карточки: блоки A и C ===== */
var CARDS = { mode: null, queue: [], i: 0, shown: false, ok: 0, bad: 0, shuffle: false, resetAsk: false };
function cardPool() { return EXAM.exam.theory.filter(function (q) { return q.block === "A" || q.block === "C"; }); }
function cardText(id) {
  var out = null;
  EXAM.exam.rkq.sections.forEach(function (s) { (s.items || []).forEach(function (it) { if (!out && it.to === "theory:" + id) out = it; }); });
  return out;
}
function cardState(id) { if (!PROGRESS) return "new"; var v = lsGet(key("cards:" + id)); return v === "1" ? "ok" : v === "0" ? "bad" : "new"; }
function cardCounts() {
  var c = { ok: 0, bad: 0, new: 0 };
  cardPool().forEach(function (q) { c[cardState(q.id)]++; });
  return c;
}
function startCards(mode) {
  var pool = cardPool();
  var q = pool.filter(function (x) { return mode === "all" || (mode === "bad" && cardState(x.id) === "bad") || (mode === "new" && cardState(x.id) === "new"); });
  if (CARDS.shuffle) for (var i = q.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = q[i]; q[i] = q[j]; q[j] = t; }
  CARDS.mode = mode; CARDS.queue = q.map(function (x) { return x.id; }); CARDS.i = 0; CARDS.shown = false; CARDS.ok = 0; CARDS.bad = 0;
  renderCards();
}
function renderCards() {
  var box = document.getElementById("cards"); if (!box) return;
  var c = cardCounts(), tot = c.ok + c.bad + c.new, h = "";
  var stats = '<p class="stats">Вспомнил: ' + c.ok + ". Не вспомнил: " + c.bad + ". Не пройдено: " + c.new + ". Всего: " + tot + ".</p>";
  if (CARDS.mode === null) {
    h = stats + '<div class="row">' +
      '<button class="btn" data-act="start" data-m="all">Все карточки (' + tot + ")</button>" +
      '<button class="btn" data-act="start" data-m="bad"' + (c.bad ? "" : " disabled") + ">Только проваленные (" + c.bad + ")</button>" +
      '<button class="btn" data-act="start" data-m="new"' + (c.new ? "" : " disabled") + ">Только непройденные (" + c.new + ")</button></div>" +
      '<div class="row"><label class="chk"><input type="checkbox" data-act="shuffle"' + (CARDS.shuffle ? " checked" : "") + "> в случайном порядке</label>" +
      '<button class="btn" data-act="reset">' + (CARDS.resetAsk ? "Точно сбросить все отметки?" : "Сбросить отметки") + "</button>" +
      (CARDS.resetAsk ? '<button class="btn" data-act="resetno">Отмена</button>' : "") + "</div>";
  } else if (CARDS.i >= CARDS.queue.length) {
    h = stats + '<div class="card"><p class="cq">' + (CARDS.queue.length ? "Круг закончен." : "В этом режиме карточек нет.") + "</p>" +
      (CARDS.queue.length ? "<p>В этом круге: вспомнил " + CARDS.ok + ", не вспомнил " + CARDS.bad + ".</p>" : "") +
      '<div class="row">' + (c.bad ? '<button class="btn" data-act="start" data-m="bad">Прогнать проваленные (' + c.bad + ")</button>" : "") +
      '<button class="btn" data-act="menu">К выбору режима</button></div></div>';
  } else {
    var q = theoryById(CARDS.queue[CARDS.i]), t = cardText(q.id), st = cardState(q.id);
    var refs = (q.refs || []).map(function (r) { var tp = topicById(r); return tp ? '<a href="#/t/' + r + '">конспект: ' + mdInline(tp.title) + "</a>" : ""; }).filter(Boolean).join(" · ");
    h = stats + '<div class="card"><div class="cid">Карточка ' + (CARDS.i + 1) + " из " + CARDS.queue.length + " · " + q.id + " · " + q.points + " б." +
      (st === "bad" ? " · в прошлый раз: не вспомнил" : st === "ok" ? " · в прошлый раз: вспомнил" : "") + "</div>" +
      '<p class="cq">' + (t ? mdInline(t.text) : mdInline(q.q)) + "</p>";
    if (!CARDS.shown) h += '<div class="row"><button class="btn" data-act="show">Показать ответ</button><button class="btn" data-act="menu">Закончить</button></div>';
    else h += '<div class="ans md">' + md(q.answer) + (q.figure ? figure(q.figure) : "") + (refs ? '<p class="stat">' + refs + "</p>" : "") + "</div>" +
      '<div class="row"><button class="btn" data-act="ok">Вспомнил</button><button class="btn" data-act="bad">Не вспомнил</button><button class="btn" data-act="menu">Закончить</button></div>';
    h += "</div>";
  }
  box.innerHTML = h;
}
function bindCards() {
  CARDS.mode = null; CARDS.resetAsk = false; renderCards();
  var box = document.getElementById("cards");
  box.onclick = function (e) {
    var b = e.target.closest && e.target.closest("[data-act]"); if (!b || b.disabled) return;
    var a = b.getAttribute("data-act");
    if (a === "start") startCards(b.getAttribute("data-m"));
    else if (a === "shuffle") { CARDS.shuffle = b.checked; return; }
    else if (a === "reset") { if (CARDS.resetAsk) { cardPool().forEach(function (q) { lsSet(key("cards:" + q.id), null); }); CARDS.resetAsk = false; } else CARDS.resetAsk = true; renderCards(); }
    else if (a === "resetno") { CARDS.resetAsk = false; renderCards(); }
    else if (a === "menu") { CARDS.mode = null; renderCards(); renderSide("#/cards"); }
    else if (a === "show") { CARDS.shown = true; renderCards(); }
    else if (a === "ok" || a === "bad") {
      var id = CARDS.queue[CARDS.i]; if (PROGRESS) lsSet(key("cards:" + id), a === "ok" ? "1" : "0");
      if (a === "ok") CARDS.ok++; else CARDS.bad++;
      CARDS.i++; CARDS.shown = false; renderCards();
    }
  };
}
function pageCards() {
  setTitle("Карточки");
  return '<div class="cards"><h1>Карточки</h1><div class="meta">Определения (блок A, 30) и формулировки теорем (блок C, 7). Вспомните формулировку, затем откройте ответ и отметьте результат. Отметки хранятся в браузере.</div><div id="cards"></div></div>';
}

/* ===== Страница: РК ===== */
function theoryCard(q) {
  var refs = (q.refs || []).map(function (r) { var t = topicById(r); return t ? '<a href="#/t/' + r + '">конспект: ' + mdInline(t.title) + "</a>" : ""; }).join(" · ");
  var known = flag("exam:" + q.id + ":known");
  return '<div class="item" id="' + q.id + '"><div class="q"><span class="qid">' + q.id + '</span><div class="qtext">' + mdInline(q.q) +
    ' <span class="stat">(' + q.points + " б.)</span></div></div>" +
    '<details class="solution"><summary>ответ</summary><div class="body md">' + md(q.answer) + (q.figure ? figure(q.figure) : "") + "</div></details>" +
    '<div class="tools"><label class="chk"><input type="checkbox" data-k="exam:' + q.id + ':known"' + (known ? " checked" : "") + "> знаю</label>" + (refs ? "<span>" + refs + "</span>" : "") + "</div></div>";
}
function pageRK(tab, anchor) {
  setTitle("РК");
  tab = tab || "theory";
  var ex = EXAM.exam;
  var tabs = '<div class="tabs">' + [["theory", "Теория"], ["tasks", "Задачи"], ["variant", "Типовой вариант"]].map(function (x) {
    return '<a href="#/rk/' + x[0] + '" class="' + (tab === x[0] ? "on" : "") + '">' + x[1] + "</a>";
  }).join("") + "</div>";
  var h = "<h1>" + esc(EXAM_META.title) + '</h1><div class="meta"><span>Главный экран: строго по файлу «Вопросы для подготовки»</span></div>' + tabs;
  if (tab === "theory") {
    ex.blocks.forEach(function (b) {
      var qs = ex.theory.filter(function (q) { return q.block === b.id; });
      var k = qs.filter(function (q) { return flag("exam:" + q.id + ":known"); }).length;
      h += "<h2>" + b.id + ". " + esc(b.title) + ' <span class="stat">' + esc(b.points) + "</span></h2>" +
        '<div class="stat pg">знаю ' + k + " из " + qs.length + "</div>" +
        qs.map(theoryCard).join("");
    });
  } else if (tab === "tasks") {
    ex.taskTypes.forEach(function (tt) {
      var ts = ex.tasks.filter(function (t) { return t.type === tt.id; });
      var d = ts.filter(function (t) { return flag("task:" + t.id + ":done"); }).length;
      h += "<h2>" + esc(tt.title) + '</h2><div class="stat pg">решено ' + d + " из " + ts.length + "</div>";
      h += ts.map(function (t) {
        return '<div class="item" id="task-' + t.id + '"><div class="q"><span class="qid">' + t.id + '</span><div class="qtext">' + mdInline(t.q) + "</div></div>" +
          (t.hint ? '<details><summary>подсказка</summary><div class="body md">' + md(t.hint) + "</div></details>" : "") +
          '<details class="solution"><summary>решение</summary><div class="body md">' + md(t.solution) + "</div></details>" +
          '<div class="tools"><label class="chk"><input type="checkbox" data-k="task:' + t.id + ':done"' + (flag("task:" + t.id + ":done") ? " checked" : "") + "> решил сам</label></div></div>";
      }).join("");
    });
    var vt = ex.variant.tasks;
    h += "<h2>Типовой вариант билета по задачам</h2>" + vt.map(function (t) {
      return '<div class="item" id="task-v' + t.n + '"><div class="q"><span class="qid">' + t.n + '.</span><div class="qtext">' + mdInline(t.q) + ' <span class="stat">(' + t.points + " б.)</span></div></div>" +
        '<details class="solution"><summary>решение</summary><div class="body md">' + md(t.solution) + "</div></details></div>";
    }).join("");
  } else {
    h += pageVariant();
  }
  return h;
}

/* ===== Типовой вариант с таймером ===== */
var timerId = null;
function pageVariant() {
  var v = EXAM.exam.variant;
  var started = +lsGet(key("variant:startedAt")) || 0;
  var finished = lsGet(key("variant:finished")) === "1";
  var minutes = +lsGet(key("variant:minutes")) || v.minutes;
  var th = v.theory.map(theoryById);
  var h = '<div class="item"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">' +
    '<span class="timer" id="timer">' + fmt(minutes * 60) + "</span>" +
    (!started ? '<label class="stat">минут: <input id="mins" type="number" min="10" max="240" value="' + minutes + '" style="width:64px"></label><button class="btn" id="vStart">Начать</button>'
      : !finished ? '<button class="btn" id="vFinish">Закончить и сверить</button>' : "") +
    (started ? '<button class="btn ghost" id="vReset">Сбросить</button>' : "") +
    '</div><div class="stat" style="margin-top:6px">Решения скрыты до конца. Теория — 2–4 б., задачи — 10–16 б. Время реальной РК в файле не указано — ставь своё.</div></div>';
  if (!started) return h + '<p class="empty">Нажми «Начать» — появятся вопросы.</p>';
  h += "<h2>Теория</h2>" + th.map(function (q, i) {
    return '<div class="item"><div class="q"><span class="qid">' + (i + 1) + '.</span><div class="qtext">' + mdInline(q.q) + ' <span class="stat">(' + q.points + " б.)</span></div></div>" +
      (finished ? '<details class="solution" open><summary>Эталон</summary><div class="body md">' + md(q.answer) + (q.figure ? figure(q.figure) : "") + "</div></details>" +
        scoreBox("vt:" + i, q.points) : "") + "</div>";
  }).join("");
  h += "<h2>Задачи</h2>" + v.tasks.map(function (t, i) {
    return '<div class="item"><div class="q"><span class="qid">' + t.n + '.</span><div class="qtext">' + md(t.q) + ' <span class="stat">(' + t.points + " б.)</span></div></div>" +
      (finished ? '<details class="solution" open><summary>Эталонное решение</summary><div class="body md">' + md(t.solution) + "</div></details>" + scoreBox("vz:" + i, t.points) : "") + "</div>";
  }).join("");
  if (finished) {
    var tot = 0, max = 0;
    th.forEach(function (q, i) { max += q.points; tot += +(lsGet(key("variant:score:vt:" + i)) || 0); });
    v.tasks.forEach(function (t, i) { max += t.points; tot += +(lsGet(key("variant:score:vz:" + i)) || 0); });
    h += '<div class="item"><b>Итого: ' + tot + " из " + max + "</b> " + '<span class="stat">(теория min 2 из 4, задачи min 10 из 16)</span></div>';
  }
  return h;
}
function scoreBox(id, max) {
  var cur = lsGet(key("variant:score:" + id)) || "0", h = '<div class="tools">Мой балл: ';
  for (var s = 0; s <= max; s++) h += '<label class="chk"><input type="radio" name="sc-' + id + '" data-score="' + id + '" value="' + s + '"' + (String(s) === cur ? " checked" : "") + "> " + s + "</label>";
  return h + "</div>";
}
function fmt(sec) { sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; }
function bindVariant() {
  var v = EXAM.exam.variant;
  var b;
  if ((b = document.getElementById("vStart"))) b.onclick = function () {
    var m = +document.getElementById("mins").value || v.minutes;
    lsSet(key("variant:minutes"), String(m)); lsSet(key("variant:startedAt"), String(Date.now())); lsSet(key("variant:finished"), null); route();
  };
  if ((b = document.getElementById("vFinish"))) b.onclick = function () { lsSet(key("variant:finished"), "1"); route(); };
  if ((b = document.getElementById("vReset"))) b.onclick = function () {
    ["variant:startedAt", "variant:finished"].forEach(function (k) { lsSet(key(k), null); });
    for (var i = 0; i < 10; i++) { lsSet(key("variant:score:vt:" + i), null); lsSet(key("variant:score:vz:" + i), null); }
    route();
  };
  [].forEach.call(document.querySelectorAll("input[data-score]"), function (r) { r.onchange = function () { lsSet(key("variant:score:" + r.getAttribute("data-score")), r.value); route(); }; });
  var started = +lsGet(key("variant:startedAt")) || 0, finished = lsGet(key("variant:finished")) === "1";
  var minutes = +lsGet(key("variant:minutes")) || v.minutes, el = document.getElementById("timer");
  if (timerId) clearInterval(timerId);
  if (started && el) {
    var tick = function () {
      var left = minutes * 60 - (Date.now() - started) / 1000;
      el.textContent = finished ? "сверка" : fmt(left);
      el.className = "timer" + (!finished && left < 300 ? " low" : "");
    };
    tick(); if (!finished) timerId = setInterval(tick, 1000);
  }
}

/* ===== Расхождения ===== */
function pageDisc(filter) {
  setTitle("Расхождения со слайдами");
  var only = lsGet(key("disc:onlyMajor")) === "1";
  var nums = [];
  EXAM.discrepancies.forEach(function (d) { d.topics.forEach(function (n) { if (nums.indexOf(n) < 0) nums.push(n); }); });
  nums.sort(function (a, b) { return a - b; });
  var list = EXAM.discrepancies.filter(function (d) { return (!filter || d.topics.indexOf(filter) >= 0) && (!only || d.severity === "major"); });
  var h = "<h1>Расхождения со слайдами</h1>" +
    '<div class="meta"><span>Как в слайдах → как правильно → что писать на РК.</span></div>' +
    '<div class="tabs"><a href="#/disc" class="' + (!filter ? "on" : "") + '">все темы</a>' +
    nums.map(function (n) { return '<a href="#/disc/' + n + '" class="' + (filter === n ? "on" : "") + '">тема ' + n + "</a>"; }).join("") + "</div>" +
    '<p><label class="chk"><input type="checkbox" id="onlyMajor"' + (only ? " checked" : "") + "> только важные</label> <span class=stat>показано " + list.length + "</span></p>";
  return h + list.map(function (d) {
    var links = d.topics.map(function (n) { var t = topicForNum(n); return t ? '<a href="#/t/' + t.id + '">тема ' + n + "</a>" : ""; }).filter(Boolean).join(", ");
    return '<div class="item"><div class="' + (d.severity === "major" ? "" : "") + '"><strong>' + mdInline(d.title) + '</strong></div><div class="stat">' +
      [({ major: "<b>важно</b>", minor: "", ok: "не ошибка" })[d.severity], links].filter(Boolean).join(" · ") + '</div><div class="md">' + md(d.text) + "</div></div>";
  }).join("");
}

/* ===== Ловушки ===== */
function pageTraps() {
  setTitle("На чём валятся");
  function sec(g, t) {
    return "<h2>" + t + "</h2>" + EXAM.traps.filter(function (x) { return x.group === g; }).map(function (x) {
      return '<div class="item"><div class="q"><span class="qid">' + x.id + '</span><div class="qtext"><b>' + mdInline(x.title) + '</b><div class="md">' + md(x.text) + "</div></div></div></div>";
    }).join("");
  }
  return '<h1>На чём валятся</h1><div class="meta"><span>Ловушки задач и формулировок. Ответы проверены вычислением.</span></div>' + sec("tasks", "Задачи") + sec("theory", "Формулировки");
}

/* ===== Поиск ===== */
function plain(s) { return String(s || "").replace(/\$+/g, "").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}*_#|`>]/g, " ").replace(/\s+/g, " "); }
function blockText(b) { return [b.text, b.title, b.task, b.solution, (b.head || []).join(" "), (b.rows || []).map(function (r) { return r.join(" "); }).join(" ")].join(" "); }
function pageSearch(q) {
  setTitle("Поиск");
  q = (q || "").trim();
  if (q.length < 2) return '<h1>Поиск</h1><p class="empty">Введите хотя бы 2 символа в поле слева и нажмите Enter.</p>';
  var ql = q.toLowerCase(), res = [];
  function add(href, title, raw) {
    var p = plain(raw), i = p.toLowerCase().indexOf(ql);
    if (i < 0) return;
    var snip = esc(p.slice(Math.max(0, i - 70), i)) + "<mark>" + esc(p.substr(i, q.length)) + "</mark>" + esc(p.slice(i + q.length, i + q.length + 90));
    res.push('<div class="item"><a href="' + href + '"><b>' + title + '</b></a><div class="stat">…' + snip + "…</div></div>");
  }
  EXAM.exam.theory.forEach(function (x) { add("#/rk/theory/" + x.id, "РК " + x.id + ": " + mdInline(x.q), x.q + " " + x.answer); });
  EXAM.exam.tasks.forEach(function (x) { add("#/rk/tasks/" + x.id, "Задача " + x.id, x.q + " " + x.hint + " " + x.solution); });
  EXAM.traps.forEach(function (x) { add("#/traps", "Ловушка " + x.id + ": " + mdInline(x.title), x.title + " " + x.text); });
  EXAM.discrepancies.forEach(function (x) { add("#/disc", "Расхождение: " + mdInline(x.title), x.title + " " + x.text); });
  EXAM.topics.forEach(function (t) { add("#/t/" + t.id, "Тема " + esc(t.num) + ": " + mdInline(t.title), t.title + " " + (t.blocks || []).map(blockText).join(" ")); });
  return "<h1>Поиск: «" + esc(q) + '»</h1><div class="result">Найдено: ' + res.length + "</div>" + (res.join("") || '<p class="empty">Ничего не найдено.</p>');
}

/* ===== Главная: карточки контрольных ===== */
function fmtDate(d) { try { return new Date(d + "T12:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return d || ""; } }
function daysTo(d) { if (!d) return ""; var n = Math.ceil((new Date(d + "T09:00:00") - new Date()) / 864e5); return n > 0 ? "через " + n + " дн." : n === 0 ? "сегодня" : "прошла"; }
function pageHome() {
  setTitle("s30s");
  var h = '<div class="homehead">' + logoHtml(true) + '<div class="ctrls">' + ctrlsHtml() + "</div></div>" +
    '<h1>Контрольные</h1><p class="meta">Выберите контрольную: откроются конспекты, вопросы, задачи и тренировка именно под неё.</p>';
  (window.S30S_MANIFEST || []).forEach(function (s) {
    h += "<h2>" + esc(s.title) + '</h2><div class="xgrid">' + s.exams.map(function (e) {
      return '<a class="xcard" href="#/open/' + encodeURIComponent(e.id) + '"><b>' + esc(e.title) + '</b><span class="xd">' + esc(fmtDate(e.date)) +
        (e.date ? " · " + esc(daysTo(e.date)) : "") + "</span>" + (e.description ? '<span class="xs">' + esc(e.description) + "</span>" : "") + "</a>";
    }).join("") + "</div>";
  });
  return h;
}

/* ===== Роутер ===== */
function route() {
  var hash = location.hash || "#/";
  var m;
  if ((m = hash.match(/^#\/open\/(.+)$/))) { openExam(dec(m[1]), "#/rk"); return; }
  var isHome = hash === "#/" || hash === "#" || hash === "#/exams";
  document.body.classList.toggle("home", isHome);
  document.body.classList.remove("nav-open");
  if (isHome) {
    if (timerId) { clearInterval(timerId); timerId = null; }
    $side.innerHTML = ""; $view.innerHTML = pageHome(); window.scrollTo(0, 0); return;
  }
  if (!EXAM) {
    var last = lsGet("s30s:lastExam");
    if (allExams().some(function (e) { return e.id === last; })) openExam(last, hash); else location.hash = "#/";
    return;
  }
  document.body.classList.toggle("side-hidden", flag("side:hidden"));
  var html, sideRoute = hash, anchor = null;
  if ((m = hash.match(/^#\/t\/([\w-]+)$/))) html = pageTopic(m[1]);
  else if ((m = hash.match(/^#\/rk(?:\/(theory|tasks|variant))?(?:\/([\w.]+))?$/))) {
    html = pageRK(m[1], m[2]); sideRoute = "#/rk";
    anchor = m[2] ? (m[1] === "tasks" ? "task-" + m[2] : m[2]) : null;
  }
  else if (hash === "#/rkq") html = pageRkq();
  else if (hash === "#/cards") html = pageCards();
  else if ((m = hash.match(/^#\/disc(?:\/(\d+))?$/))) { html = pageDisc(m[1]); sideRoute = "#/disc"; }
  else if (hash === "#/traps") html = pageTraps();
  else if ((m = hash.match(/^#\/search\/(.*)$/))) html = pageSearch(dec(m[1]));
  else { location.hash = "#/rk"; return; }
  renderSide(sideRoute);
  $view.innerHTML = html;
  bindCommon();
  if (hash === "#/cards") bindCards();
  if (/^#\/rk\/variant/.test(hash)) bindVariant(); else if (timerId) { clearInterval(timerId); timerId = null; }
  if (anchor) { var el = document.getElementById(anchor); if (el) { el.scrollIntoView(); var d = el.querySelector("details"); if (d) d.open = true; } }
  else window.scrollTo(0, 0);
}
function bindCommon() {
  [].forEach.call(document.querySelectorAll("input[data-k]"), function (c) {
    c.onchange = function () { setFlag(c.getAttribute("data-k"), c.checked); var y = window.scrollY; route(); window.scrollTo(0, y); };
  });
  ["readChk", "readChk2"].forEach(function (id) {
    var c = document.getElementById(id); if (!c) return;
    c.onchange = function () { var t = location.hash.split("/")[2]; setFlag("topic:" + t + ":read", c.checked); var y = window.scrollY; route(); window.scrollTo(0, y); };
  });
  var om = document.getElementById("onlyMajor");
  if (om) om.onchange = function () { lsSet(key("disc:onlyMajor"), om.checked ? "1" : null); route(); };
}
document.getElementById("menuBtn").onclick = function () {
  if (matchMedia("(min-width:861px)").matches) setSideHidden(false); else document.body.classList.toggle("nav-open");
};
document.addEventListener("click", function (e) { if (document.body.classList.contains("nav-open") && !$side.contains(e.target) && !(e.target.closest && e.target.closest(".topbar"))) document.body.classList.remove("nav-open"); });
window.addEventListener("hashchange", route);

/* ===== Загрузка контрольной ===== */
function allExams() { var r = []; (window.S30S_MANIFEST || []).forEach(function (s) { s.exams.forEach(function (e) { r.push(e); }); }); return r; }
function loadScript(src) {
  return new Promise(function (ok, fail) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = function () { fail(new Error(src)); }; document.head.appendChild(s); });
}
function openExam(id, then) {
  var meta = allExams().filter(function (e) { return e.id === id; })[0];
  if (!meta) { location.hash = "#/"; return; }
  var ready = window.S30S.data[id] ? Promise.resolve() : loadScript(meta.data);
  ready.then(function () {
    EXAM = window.S30S.data[id]; EXAM_META = meta; lsSet("s30s:lastExam", id);
    if (then && location.hash !== then) location.hash = then; else route();
  }).catch(function (e) { $view.innerHTML = '<p class="empty">Не удалось загрузить ' + esc(e.message) + "</p>"; });
}
function ensureKatex() { return Promise.resolve(); }  // KaTeX только локальный (vendor/katex); внешних скриптов нет
(function start() {
  ensureKatex().then(function () {
    if (!allExams().length) { $view.innerHTML = '<p class="empty">manifest.js пуст.</p>'; return; }
    route();
  });
})();
})();
