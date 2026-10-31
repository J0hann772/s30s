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
var ZOOMS = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6, 1.8, 2];
function applyZoom() { var z = +lsGet("s30s:zoom"); if (ZOOMS.indexOf(z) < 0) z = 1; document.getElementById("view").style.zoom = z; }
function stepZoom(d) { var z = +lsGet("s30s:zoom") || 1, i = ZOOMS.indexOf(z); if (i < 0) i = ZOOMS.indexOf(1); i = Math.max(0, Math.min(ZOOMS.length - 1, i + d)); lsSet("s30s:zoom", String(ZOOMS[i])); applyZoom(); }
document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".zoom"); if (b) { e.stopPropagation(); stepZoom(+b.getAttribute("data-z")); } }, true);

/* ===== Кнопки управления: масштаб и тема ===== */
function isDark() { var cur = lsGet("s30s:theme"); return cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
function ctrlsHtml() {
  return '<span class="seg" role="group" aria-label="Размер текста"><button class="cbtn zoom" data-z="-1" aria-label="Уменьшить текст">А−</button>' +
    '<button class="cbtn zoom" data-z="1" aria-label="Увеличить текст">А+</button></span>' +
    themeBtnHtml();
}
var ICO_MOON = '<svg class="ico" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 11.8A6.8 6.8 0 0 1 8.2 3.5a6.8 6.8 0 1 0 8.3 8.3z"/></svg>';
var ICO_BULB = '<svg class="ico" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.2 14.2c0-1.3-1.7-2.2-1.7-4.4a4.5 4.5 0 0 1 9 0c0 2.2-1.7 3.1-1.7 4.4z"/><path d="M7.8 16.5h4.4M8.6 18.3h2.8"/></svg>';
function themeBtnHtml() {
  // тёмная тема: лампа (включить свет), светлая: месяц (включить тёмную)
  return '<button class="cbtn ibtn theme-btn" title="' + (isDark() ? "Светлая тема" : "Тёмная тема") + '" aria-label="Переключить светлую и тёмную тему" aria-pressed="' + isDark() + '">' + (isDark() ? ICO_BULB : ICO_MOON) + "</button>";
}
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest(".theme-btn"); if (!b) return;
  lsSet("s30s:theme", isDark() ? "light" : "dark"); applyTheme();
  [].forEach.call(document.querySelectorAll(".theme-btn"), function (x) { x.setAttribute("aria-pressed", String(isDark())); x.title = isDark() ? "Светлая тема" : "Тёмная тема"; x.innerHTML = isDark() ? ICO_BULB : ICO_MOON; });
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
/* ширина левой колонки (ПК) */
var SW_MIN = 220, SW_MAX = 640;
function setSideWidth(w, save) { w = Math.max(SW_MIN, Math.min(Math.min(SW_MAX, innerWidth - 320), Math.round(w))); document.documentElement.style.setProperty("--sw", w + "px"); if (save) lsSet("s30s:sw", String(w)); }
(function () { var w = +lsGet("s30s:sw"); if (w) setSideWidth(w); })();
document.addEventListener("pointerdown", function (e) {
  var r = e.target.closest && e.target.closest("#resizer"); if (!r) return;
  e.preventDefault(); r.setPointerCapture(e.pointerId); document.body.classList.add("resizing");
  var mv = function (ev) { setSideWidth(ev.clientX, false); };
  var up = function (ev) { r.removeEventListener("pointermove", mv); r.removeEventListener("pointerup", up); r.removeEventListener("pointercancel", up); document.body.classList.remove("resizing"); setSideWidth(ev.clientX, true); };
  r.addEventListener("pointermove", mv); r.addEventListener("pointerup", up); r.addEventListener("pointercancel", up);
});
document.addEventListener("dblclick", function (e) { if (e.target.closest && e.target.closest("#resizer")) { document.documentElement.style.removeProperty("--sw"); lsSet("s30s:sw", null); } });
var $q = document.getElementById("q");
$q.onkeydown = function (e) { if (e.key === "Enter") location.hash = "#/search/" + encodeURIComponent($q.value.trim()); };
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
  if (EXAM_META && EXAM_META.when) return EXAM_META.when;
  if (!EXAM_META || !EXAM_META.date) return "";
  var d = Math.ceil((new Date(EXAM_META.date + "T09:00:00") - new Date()) / 864e5);
  return d > 0 ? "через " + d + " дн." : d === 0 ? "сегодня" : "";
}
function setTitle(t, label) {
  var box = document.getElementById("topTitle"), ex = EXAM_META ? String(EXAM_META.title).split(":")[0] : "";
  box.textContent = "";
  if (ex) { var a = document.createElement("a"); a.href = "#/rk"; a.textContent = ex; box.appendChild(a); var s = document.createElement("span"); s.className = "sep"; s.textContent = "\u203A"; box.appendChild(s); }
  var c = document.createElement("span"); c.className = "cur"; c.textContent = label || t; box.appendChild(c);
  document.title = t + " \u2014 s30s";
}

function goHome(replace) { history[replace ? "replaceState" : "pushState"](null, "", location.pathname + location.search); route(); }
document.addEventListener("click", function (e) { var l = e.target.closest && e.target.closest("a.logo"); if (l && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) { e.preventDefault(); goHome(false); } });
function logoHtml(big) {
  return '<a class="logo' + (big ? " big" : "") + '" href="#/" aria-label="s30s, все контрольные" title="s30s: study of the \'30 students"><span class="logo-mark" aria-hidden="true">30</span><span class="logo-word"><b>s<i>30</i>s</b><small>ИУ7 МГТУ · выпуск 2030</small></span></a>';
}

/* ===== Боковая навигация ===== */
function setSideHidden(on) { setFlag("side:hidden", on); document.body.classList.toggle("side-hidden", on); }
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest(".sec[data-sec]"); if (!b) return;
  var n = b.getAttribute("data-sec"), box = document.getElementById("sb-" + n), closed = !box.hidden;
  box.hidden = closed; lsSet(key("side:sec:" + n), closed ? "1" : "0");
  b.setAttribute("aria-expanded", String(!closed));
});
function renderSide(route) {
  var core = EXAM.topics.filter(function (t) { return t.kind !== "ref"; });
  var refs = EXAM.topics.filter(function (t) { return t.kind === "ref"; });
  var read = core.filter(function (t) { return t.status === "done" && flag("topic:" + t.id + ":read"); }).length;
  var done = core.filter(function (t) { return t.status === "done"; }).length;
  function link(href, html, cls) { return '<a href="' + href + '" class="' + (cls || "") + (route === href ? " active" : "") + '">' + html + "</a>"; }
  var oldSc = document.getElementById("sideScroll"), st = oldSc ? oldSc.scrollTop : 0;
  function secClosed(name) { var v = lsGet(key("side:sec:" + name)); return v === null ? name === "refs" : v === "1"; }
  function sec(name, title) {
    var closed = secClosed(name);
    return '<button class="sec" data-sec="' + name + '" aria-expanded="' + !closed + '"><span>' + title + "</span></button>";
  }
  function body(name, html) { return '<div class="secbody" id="sb-' + name + '"' + (secClosed(name) ? " hidden" : "") + ">" + html + "</div>"; }
  var h = '<div class="side-head"><div class="brand">' + logoHtml() + '<span class="blinks">' + themeBtnHtml() + '</span></div>' +
    '<div class="exam-title">' + esc(EXAM_META.title) + (daysLeft() ? ", " + daysLeft() : "") + "</div></div>" +
    '<div class="side-scroll" id="sideScroll"><nav>' +
    link("#/rkq", "Список вопросов РК") +
    link("#/rk", "РК: вопросы, задачи, вариант") +
    link("#/cards", "Карточки: определения и теоремы") +
    link("#/materials", "Материалы") +
    sec("notes", "Конспекты" + (PROGRESS ? ", прочитано " + read + " из " + done : "")) +
    body("notes", core.map(function (t) {
      var mark = t.status !== "done" ? '<span class="mark">не написано</span>' : flag("topic:" + t.id + ":read") ? '<span class="mark">прочитано</span>' : "";
      return link("#/t/" + t.id, '<span class="num">' + esc(t.num) + "</span>" + mdInline(t.title) + mark, t.status !== "done" ? "todo" : "");
    }).join("")) +
    sec("refs", "Справочники") +
    body("refs", link("#/disc", "Расхождения со слайдами") +
      refs.filter(function (t) { return t.id !== "t97" && t.id !== "t99"; }).map(function (t) { return link("#/t/" + t.id, mdInline(t.title)); }).join("")) +
    "</nav></div>";
  $side.innerHTML = h + '<div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="Изменить ширину колонки" title="Потяните, чтобы изменить ширину; двойной клик — сбросить"></div>';
  var sc = document.getElementById("sideScroll"), act = sc.querySelector("a.active");
  sc.scrollTop = st;
  if (act && (act.offsetTop < st || act.offsetTop + act.offsetHeight > st + sc.clientHeight)) sc.scrollTop = Math.max(0, act.offsetTop - sc.clientHeight / 2);
}

/* ===== Страница: тема ===== */
function pageTopic(id) {
  var t = topicById(id);
  if (!t) return '<p class="empty">Тема не найдена.</p>';
  setTitle(t.title, (t.kind === "ref" ? "" : "Тема " + t.num + ". ") + plain(t.title));
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
    '<div class="meta">Текст файла «Вопросы для подготовки». Кликабельны ' + c[0] + " пунктов из " + c[1] + ". Числа в квадратных скобках — номера лекций по календарному плану (как в файле).</div>" +
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

/* ===== Карточки: блоки A и C (в духе Quizlet: переворот, свайп, круги) ===== */
var CARDS = { mode: null, queue: [], i: 0, round: 1, flipped: false, got: 0, miss: [], total: 0, resetAsk: false, busy: false, between: false };
function cardPool() { return EXAM.exam.theory.filter(function (q) { return q.block === "A" || q.block === "C"; }); }
function cardText(id) {
  var out = null;
  EXAM.exam.rkq.sections.forEach(function (s) { (s.items || []).forEach(function (it) { if (!out && it.to === "theory:" + id) out = it; }); });
  return out;
}
var LECT_RE = /\s*\[([0-9][0-9,\s]*)\]/;
function cardParts(t, q) {
  var raw = t ? t.text : q.q, m = raw.match(LECT_RE);
  return { text: raw.replace(LECT_RE, ""), lect: m ? (m[1].indexOf(",") >= 0 ? "лекции " : "лекция ") + m[1].split(",").map(function (x) { return x.trim(); }).join(", ") : "" };
}
function cardState(id) { if (!PROGRESS) return "new"; var v = lsGet(key("cards:" + id)); return v === "1" ? "ok" : v === "0" ? "bad" : "new"; }
function cardCounts() {
  var c = { ok: 0, bad: 0, new: 0 };
  cardPool().forEach(function (q) { c[cardState(q.id)]++; });
  return c;
}
function shuffled(arr) { var q = arr.slice(); for (var i = q.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = q[i]; q[i] = q[j]; q[j] = t; } return q; }
function startCards(mode) {
  var q = cardPool().filter(function (x) { var s = cardState(x.id); return mode === "all" || (mode === "ok" && s === "ok") || (mode === "new" && s !== "ok"); });
  CARDS.mode = mode; CARDS.queue = q.map(function (x) { return x.id; }); CARDS.i = 0; CARDS.round = 1; CARDS.flipped = false;
  CARDS.got = 0; CARDS.miss = []; CARDS.total = CARDS.queue.length; CARDS.between = false; CARDS.busy = false;
  renderCards();
}
function nextRound() {
  CARDS.queue = shuffled(CARDS.miss); CARDS.miss = []; CARDS.i = 0; CARDS.round++; CARDS.flipped = false; CARDS.got = 0; CARDS.between = false;
  renderCards();
}
function answerCard(known) {
  var id = CARDS.queue[CARDS.i];
  if (PROGRESS) lsSet(key("cards:" + id), known ? "1" : "0");
  if (known) CARDS.got++; else CARDS.miss.push(id);
  CARDS.i++; CARDS.flipped = false; CARDS.busy = false;
  if (CARDS.i >= CARDS.queue.length) CARDS.between = true;
  renderCards();
}
function renderCards() {
  var box = document.getElementById("cards"); if (!box) return;
  var c = cardCounts(), tot = c.ok + c.bad + c.new, h = "";
  var stats = '<p class="stats">Знаю: <b class="ok">' + c.ok + '</b>. Ещё не знаю: <b class="bad">' + (c.bad + c.new) + "</b>. Всего: " + tot + ".</p>";
  if (CARDS.mode === null) {
    h = stats + '<div class="row">' +
      '<button class="btn" data-act="start" data-m="all">Начать с нуля (' + tot + ")</button>" +
      '<button class="btn" data-act="start" data-m="new"' + (c.bad + c.new ? "" : " disabled") + ">Только непройденные (<span class=\"bad\">" + (c.bad + c.new) + "</span>)</button>" +
      '<button class="btn" data-act="start" data-m="ok"' + (c.ok ? "" : " disabled") + ">Только пройденные (<span class=\"ok\">" + c.ok + "</span>)</button></div>" +
      '<div class="row"><button class="btn" data-act="reset">' + (CARDS.resetAsk ? "Точно сбросить весь прогресс?" : "Сбросить прогресс") + "</button>" +
      (CARDS.resetAsk ? '<button class="btn" data-act="resetno">Отмена</button>' : "") + "</div>" +
      '<p class="meta">Карточку можно перевернуть нажатием или пробелом. Свайп влево (клавиша ←) — знаю, вправо (→) — не знаю. Карточки, которые вы не знали, повторяются в следующем круге в случайном порядке, пока не останется ни одной.</p>';
  } else if (CARDS.between || !CARDS.queue.length) {
    var m = CARDS.miss.length;
    h = '<div class="card done">' + (!CARDS.queue.length ? '<p class="cq">В этом режиме карточек нет.</p>' :
      '<p class="cq">' + (m ? "Круг " + CARDS.round + " закончен" : "Всё пройдено") + "</p><p>Знаю: <b class=\"ok\">" + CARDS.got + "</b>, не знаю: <b class=\"bad\">" + m + "</b>.</p>") +
      '<div class="row">' + (m ? '<button class="btn" data-act="round">Следующий круг (' + m + ")</button>" : "") +
      '<button class="btn" data-act="menu">К выбору режима</button></div></div>';
  } else {
    var q = theoryById(CARDS.queue[CARDS.i]), t = cardText(q.id), st = cardState(q.id), cp = cardParts(t, q);
    var refs = (q.refs || []).map(function (r) { var tp = topicById(r); return tp ? '<a href="#/t/' + r + '">конспект: ' + mdInline(tp.title) + "</a>" : ""; }).filter(Boolean).join(" · ");
    var pct = Math.round(CARDS.i / CARDS.queue.length * 100);
    h = '<div class="deckhead"><span>Круг ' + CARDS.round + " · " + (CARDS.i + 1) + " из " + CARDS.queue.length + " · " + esc(q.id) + ' · <b class="ok">' + CARDS.got + '</b> / <b class="bad">' + CARDS.miss.length + '</b></span><button class="lnk" data-act="menu">Закончить</button></div>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="deck"><div class="cardwrap enter" id="cardwrap"><span class="hint hl">Знаю</span><span class="hint hr">Не знаю</span>' +
      '<div class="flip" id="flip">' +
      '<div class="face front"' + (CARDS.flipped ? " hidden" : "") + '><div class="cid">' + q.points + " б." + (cp.lect ? " · " + esc(cp.lect) : "") + (st === "ok" ? " · раньше: знаю" : st === "bad" ? " · раньше: не знаю" : "") + '</div><p class="cq"><span class="cqt">' + mdInline(cp.text) + '</span></p><div class="tap">Нажмите, чтобы перевернуть</div></div>' +
      '<div class="face back"' + (CARDS.flipped ? "" : " hidden") + '><div class="cid">Ответ</div><div class="ans md">' + md(q.answer) + (q.figure ? figure(q.figure) : "") + "</div>" + (refs ? '<p class="stat">' + refs + "</p>" : "") + "</div>" +
      "</div></div></div>" +
      '<div class="row sw"><button class="btn" data-act="know">&larr; Знаю</button><button class="btn" data-act="flip">Перевернуть</button><button class="btn" data-act="dont">Не знаю &rarr;</button></div>';
  }
  box.innerHTML = h;
  fitCardMath();
}
/* широкие формулы на карточке сжимаем под ширину экрана; если и так не влезает — оставляем прокрутку пальцем только внутри формулы */
function fitCardMath() {
  var root = document.querySelector("#flip .face:not([hidden])"); if (!root) return;
  [].forEach.call(root.querySelectorAll(".katex-display"), function (d) {
    d.style.fontSize = ""; d.style.touchAction = ""; d.classList.remove("wide");
    if (d.scrollWidth - d.clientWidth <= 1) return;
    var k = d.clientWidth / d.scrollWidth;
    d.style.fontSize = Math.max(82, Math.floor(k * 98)) + "%";
    if (d.scrollWidth - d.clientWidth > 1) { d.style.touchAction = "pan-x pan-y"; d.classList.add("wide"); }
  });
}
window.addEventListener("resize", function () { if (document.getElementById("flip")) fitCardMath(); });
function flipCard() {
  var f = document.getElementById("flip"); if (!f || CARDS.busy || f.getAttribute("data-turning")) return;
  var fr = f.querySelector(".front"), bk = f.querySelector(".back");
  var swap = function () { CARDS.flipped = !CARDS.flipped; fr.hidden = CARDS.flipped; bk.hidden = !CARDS.flipped; fitCardMath(); };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { swap(); return; }
  f.setAttribute("data-turning", "1"); f.classList.add("turn");
  setTimeout(function () { swap(); f.classList.remove("turn"); setTimeout(function () { f.removeAttribute("data-turning"); }, 170); }, 150);
}
function flyCard(known) {
  var w = document.getElementById("cardwrap"); if (!w || CARDS.busy) return;
  CARDS.busy = true;
  var dir = known ? -1 : 1, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  w.classList.remove("enter"); w.classList.remove("drag-l"); w.classList.remove("drag-r"); w.classList.add(known ? "drag-l" : "drag-r"); w.style.setProperty("--k", "1");
  w.style.transition = reduce ? "opacity .15s" : "transform .26s ease-in, opacity .26s ease-in";
  w.style.transform = reduce ? "none" : "translateX(" + dir * Math.max(innerWidth, 600) + "px) rotate(" + dir * 18 + "deg)";
  w.style.opacity = "0";
  setTimeout(function () { answerCard(known); }, reduce ? 160 : 270);
}
var cardsKeysBound = false;
function bindCards() {
  CARDS.mode = null; CARDS.resetAsk = false; CARDS.busy = false; renderCards();
  var box = document.getElementById("cards"), drag = null;
  box.onclick = function (e) {
    var b = e.target.closest && e.target.closest("[data-act]"); if (!b || b.disabled) return;
    var a = b.getAttribute("data-act");
    if (a === "start") startCards(b.getAttribute("data-m"));
    else if (a === "reset") { if (CARDS.resetAsk) { cardPool().forEach(function (q) { lsSet(key("cards:" + q.id), null); }); CARDS.resetAsk = false; } else CARDS.resetAsk = true; renderCards(); }
    else if (a === "resetno") { CARDS.resetAsk = false; renderCards(); }
    else if (a === "menu") { CARDS.mode = null; CARDS.between = false; renderCards(); renderSide("#/cards"); }
    else if (a === "round") nextRound();
    else if (a === "flip") flipCard();
    else if (a === "know") flyCard(true);
    else if (a === "dont") flyCard(false);
  };
  box.onpointerdown = function (e) {
    var w = e.target.closest && e.target.closest("#cardwrap");
    if (!w || CARDS.busy || (e.pointerType === "mouse" && e.button !== 0) || (e.target.closest && e.target.closest("a"))) return;
    drag = { x: e.clientX, y: e.clientY, id: e.pointerId, on: false, dx: 0, w: w };
  };
  box.onpointermove = function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.on) { if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { drag.on = true; try { drag.w.setPointerCapture(e.pointerId); } catch (x) {} drag.w.classList.remove("enter"); drag.w.style.transition = "none"; } else return; }
    drag.dx = dx;
    drag.w.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 25) + "deg)";
    var k = Math.min(1, Math.abs(dx) / 110);
    drag.w.querySelector(".hl").style.opacity = dx < 0 ? k : 0;
    drag.w.querySelector(".hr").style.opacity = dx > 0 ? k : 0;
    drag.w.style.setProperty("--k", String(k));
    drag.w.classList.toggle("drag-l", dx < -10); drag.w.classList.toggle("drag-r", dx > 10);
  };
  var end = function (e, cancel) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag; drag = null;
    if (d.on) {
      if (!cancel && d.dx <= -90) flyCard(true);
      else if (!cancel && d.dx >= 90) flyCard(false);
      else { d.w.style.transition = "transform .2s ease-out"; d.w.style.transform = "none"; d.w.classList.remove("drag-l"); d.w.classList.remove("drag-r"); d.w.querySelectorAll(".hint").forEach(function (h) { h.style.opacity = 0; }); }
    } else if (!cancel && Math.abs(e.clientX - d.x) < 8 && Math.abs(e.clientY - d.y) < 8) flipCard();
  };
  box.onpointerup = function (e) { end(e, false); };
  box.onpointercancel = function (e) { end(e, true); };
  if (!cardsKeysBound) {
    cardsKeysBound = true;
    document.addEventListener("keydown", function (e) {
      if (location.hash !== "#/cards" || CARDS.mode === null || CARDS.between || e.ctrlKey || e.metaKey || e.altKey) return;
      var tg = e.target && e.target.tagName; if (tg === "INPUT" || tg === "TEXTAREA" || tg === "BUTTON" || tg === "A") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); flyCard(true); }
      else if (e.key === "ArrowRight") { e.preventDefault(); flyCard(false); }
    });
  }
}
function pageCards() {
  setTitle("Карточки");
  return '<div class="cards"><h1>Карточки</h1><div class="meta">Определения (блок A, 30) и формулировки теорем (блок C, 7). Прогресс хранится в браузере.</div><div id="cards"></div></div>';
}

/* ===== Материалы: фото, PDF, Word, презентации + просмотр фото ===== */
function fmtSize(n) { return n >= 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " МБ" : Math.max(1, Math.round(n / 1024)) + " КБ"; }
function plural(n, a, b, c) { var m = n % 100, k = n % 10; return n + " " + (m > 10 && m < 20 ? c : k === 1 ? a : k > 1 && k < 5 ? b : c); }
var ICO_DL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>';
var KIND_LBL = { pdf: "PDF", doc: "Word", ppt: "Презентация", xls: "Таблица", txt: "Текст", file: "Файл" };
var MAT = null;
function pageMaterials() {
  setTitle("Материалы");
  return '<div class="mats"><h1>Материалы</h1><div class="meta">Презентации, слитые варианты и задачи. Фото открываются на сайте, всё можно скачать архивом. <span class="stat" id="offState">' + esc(offlineText()) + '</span></div><div id="mat"><p class="empty">Загрузка…</p></div></div>';
}
function bindMaterials() {
  var box = document.getElementById("mat"), id = EXAM.id;
  var ready = (window.S30S.materials && window.S30S.materials[id]) ? Promise.resolve() : loadScript("materials/" + id + "/index.js");
  // решения необязательны: нет файла — просто нет кнопки «Решение»
  var sols = (window.S30S.solutions && window.S30S.solutions[id]) ? Promise.resolve() : loadScript("solutions/" + id + ".js").catch(function () {});
  ready = ready.then(function () { return sols; });
  ready.then(function () { MAT = window.S30S.materials[id]; renderMaterials(box); }).catch(function () { box.innerHTML = '<p class="empty">Материалов пока нет.</p>'; });
}
/* решения к фото: ключ — имя файла без расширения, «Р»/«P» и «К»/«K» не различаются */
function solKey(n) { return String(n).replace(/[\u0420P]/g, "P").replace(/[\u041aK]/g, "K"); }
function solutionsFor(name) {
  var S = window.S30S.solutions && EXAM && window.S30S.solutions[EXAM.id]; if (!S) return null;
  var k = solKey(name), key = Object.keys(S.items).filter(function (x) { return solKey(x) === k; })[0];
  if (!key) return null;
  return S.items[key].map(function (r) { var p = S.pool[r[1]]; return p ? { n: r[0], c: p.c, s: p.s } : null; }).filter(Boolean);
}
function solutionsHtml(list, title) {
  return '<div class="sol-head"><b>' + esc(title) + '</b><button type="button" class="lb-btn sol-all" data-open="0">Раскрыть все</button></div>' +
    '<p class="sol-note">Разбор не из лекций: сверяй с конспектом и методами на занятиях.</p>' +
    list.map(function (t) {
      return '<section class="sol-t"><div class="sol-q"><span class="sol-n">№' + esc(t.n) + '</span><div class="sol-c">' + mdInline(t.c) + "</div></div>" +
        '<details><summary>решение</summary><div class="sol-s">' + md(t.s) + "</div></details></section>";
    }).join("");
}
function renderMaterials(box) {
  if (!MAT || !MAT.groups.length) { box.innerHTML = '<p class="empty">Материалов пока нет.</p>'; return; }
  var h = MAT.all ? '<p><a class="btn" href="' + esc(MAT.all.url) + '" download>Скачать всё одним архивом (' + plural(MAT.all.count, "файл", "файла", "файлов") + ", " + fmtSize(MAT.all.size) + ")</a></p>" : "";
  MAT.groups.forEach(function (g, gi) {
    var imgs = g.items.filter(function (x) { return x.kind === "img"; }), files = g.items.filter(function (x) { return x.kind !== "img"; });
    h += "<h2>" + esc(g.title) + '</h2><div class="mhead"><span class="stat">' + plural(g.items.length, "файл", "файла", "файлов") + " · " + fmtSize(g.zipSize) + '</span><a class="btn" href="' + esc(g.zip) + '" download>Скачать архив</a></div>';
    if (files.length) h += '<ul class="mfiles">' + files.map(function (f) {
      return "<li><span class=\"mname\">" + esc(f.name) + '</span><span class="stat">' + esc(KIND_LBL[f.kind] || "Файл") + " · " + fmtSize(f.size) + "</span>" +
        (f.kind === "pdf" ? '<a href="' + esc(f.url) + '" target="_blank" rel="noopener">Открыть</a>' : "") + '<a class="ico" href="' + esc(f.url) + '" download title="Скачать" aria-label="Скачать ' + esc(f.name) + '">' + ICO_DL + "</a></li>";
    }).join("") + "</ul>";
    if (imgs.length) h += '<div class="mgrid">' + imgs.map(function (f, i) {
      return '<button class="mthumb" data-g="' + gi + '" data-i="' + i + '" title="' + esc(f.name) + '"><img loading="lazy" src="' + esc(f.thumb) + '" alt="' + esc(f.name) + '"' + (f.w ? ' width="' + f.w + '" height="' + f.h + '"' : "") + "><span>" + esc(f.name) + "</span>" + (solutionsFor(f.name) ? '<em class="msol">есть решение</em>' : "") + "</button>";
    }).join("") + "</div>";
  });
  box.innerHTML = h;
  box.onclick = function (e) {
    var b = e.target.closest && e.target.closest(".mthumb"); if (!b) return;
    var g = MAT.groups[+b.getAttribute("data-g")];
    openLightbox(g.items.filter(function (x) { return x.kind === "img"; }), +b.getAttribute("data-i"));
  };
}
/* просмотр фото: стрелки, свайп, зум колесом/щипком/двойным кликом, перетаскивание */
var LB = null;
function openLightbox(list, idx) {
  if (!LB) {
    var el = document.createElement("div"); el.className = "lb"; el.hidden = true; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "Просмотр фото");
    el.innerHTML = '<div class="lb-top"><span class="lb-cap"></span><span class="lb-cnt"></span><button class="lb-btn" id="lbSol" type="button" hidden>Решение</button><a class="lb-btn lb-ico" id="lbDl" download title="Скачать" aria-label="Скачать">' + ICO_DL + '</a><button class="lb-btn" id="lbX" aria-label="Закрыть">Закрыть</button></div>' +
      '<div class="lb-body"><div class="lb-main"><div class="lb-stage" id="lbStage"><img class="lb-img" id="lbImg" alt="" draggable="false"></div>' +
      '<button class="lb-nav lb-prev" id="lbPrev" aria-label="Предыдущее">&#8249;</button><button class="lb-nav lb-next" id="lbNext" aria-label="Следующее">&#8250;</button></div>' +
      '<div class="lb-rs" id="lbRs" role="separator" aria-orientation="vertical" aria-label="Изменить ширину решения" title="Потяните, чтобы изменить ширину; двойной клик — сбросить"></div><div class="lb-sol" id="lbSolP" hidden role="complementary" aria-label="Решение"></div></div>';
    document.body.appendChild(el);
    LB = { el: el, img: el.querySelector("#lbImg"), stage: el.querySelector("#lbStage"), list: [], i: 0, s: 1, x: 0, y: 0, ptr: {}, pinch: 0, moved: false, startX: 0, lastTap: 0, solOpen: true, sols: null };
    var L = LB;
    var apply = function (anim) { L.img.style.transition = anim ? "transform .18s ease-out" : "none"; L.img.style.transform = "translate(" + L.x + "px," + L.y + "px) scale(" + L.s + ")"; };
    var clamp = function () {
      if (L.s <= 1) { L.x = 0; L.y = 0; return; }
      var sw = L.stage.clientWidth, sh = L.stage.clientHeight, w = L.img.clientWidth * L.s, h = L.img.clientHeight * L.s;
      var mx = Math.max(0, (w - sw) / 2), my = Math.max(0, (h - sh) / 2); L.x = Math.max(-mx, Math.min(mx, L.x)); L.y = Math.max(-my, Math.min(my, L.y));
    };
    var zoomAt = function (ns, cx, cy) {
      ns = Math.max(1, Math.min(6, ns)); var r = L.stage.getBoundingClientRect(), px = cx - (r.left + r.width / 2), py = cy - (r.top + r.height / 2), k = ns / L.s;
      L.x = px - (px - L.x) * k; L.y = py - (py - L.y) * k; L.s = ns; clamp(); apply(false);
    };
    L.show = function (i) {
      L.i = (i + L.list.length) % L.list.length; var f = L.list[L.i];
      L.s = 1; L.x = 0; L.y = 0; apply(false); L.img.src = f.url; L.img.alt = f.name;
      el.querySelector(".lb-cap").textContent = f.name; el.querySelector(".lb-cnt").textContent = (L.i + 1) + " / " + L.list.length;
      var d = el.querySelector("#lbDl"); d.href = f.url; d.setAttribute("download", f.name + ".jpg");
      L.sols = solutionsFor(f.name); L.syncSol(f.name);
      [1, -1].forEach(function (k) { var n = L.list[(L.i + k + L.list.length) % L.list.length]; if (n) { var im = new Image(); im.src = n.url; } });
    };
    L.syncSol = function (name) {
      var btn = el.querySelector("#lbSol"), pan = el.querySelector("#lbSolP"), has = !!(L.sols && L.sols.length);
      btn.hidden = !has;
      if (has) { pan.innerHTML = solutionsHtml(L.sols, name); pan.scrollTop = 0; }
      var open = has && L.solOpen; pan.hidden = !open; el.classList.toggle("sol-open", open);
      btn.classList.toggle("on", open); btn.setAttribute("aria-expanded", String(open));
    };
    L.close = function () { el.hidden = true; document.body.classList.remove("lb-open"); L.img.removeAttribute("src"); };
    el.querySelector("#lbX").onclick = L.close;
    /* ширина панели решения (ПК): перетаскивание за левый край, двойной клик — сброс */
    var setSolW = function (w, save) {
      w = Math.max(280, Math.min(Math.round(w), Math.min(900, innerWidth - 320)));
      el.style.setProperty("--solw", w + "px"); if (save) lsSet("s30s:solw", String(w));
    };
    var savedW = +lsGet("s30s:solw"); if (savedW) setSolW(savedW, false);
    var rs = el.querySelector("#lbRs");
    rs.onpointerdown = function (e) {
      e.preventDefault(); rs.setPointerCapture(e.pointerId); document.body.classList.add("resizing");
      var mv = function (ev) { setSolW(innerWidth - ev.clientX, false); };
      var up = function (ev) { rs.removeEventListener("pointermove", mv); rs.removeEventListener("pointerup", up); rs.removeEventListener("pointercancel", up); document.body.classList.remove("resizing"); setSolW(innerWidth - ev.clientX, true); };
      rs.addEventListener("pointermove", mv); rs.addEventListener("pointerup", up); rs.addEventListener("pointercancel", up);
    };
    rs.ondblclick = function () { el.style.removeProperty("--solw"); lsSet("s30s:solw", null); };
    el.querySelector("#lbSol").onclick = function () {
      L.solOpen = !L.solOpen; L.s = 1; L.x = 0; L.y = 0; apply(false); L.syncSol(L.list[L.i].name);
    };
    el.querySelector("#lbSolP").onclick = function (e) {
      var b = e.target.closest && e.target.closest(".sol-all"); if (!b) return;
      var open = b.getAttribute("data-open") !== "1";
      [].forEach.call(el.querySelectorAll("#lbSolP details"), function (x) { x.open = open; });
      b.setAttribute("data-open", open ? "1" : "0"); b.textContent = open ? "Свернуть все" : "Раскрыть все";
    };
    el.querySelector("#lbPrev").onclick = function () { L.show(L.i - 1); };
    el.querySelector("#lbNext").onclick = function () { L.show(L.i + 1); };
    L.stage.addEventListener("wheel", function (e) { e.preventDefault(); zoomAt(L.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY); }, { passive: false });
    L.stage.onpointerdown = function (e) {
      L.stage.setPointerCapture(e.pointerId); L.ptr[e.pointerId] = { x: e.clientX, y: e.clientY }; L.moved = false; L.startX = e.clientX; L.startY = e.clientY;
      if (Object.keys(L.ptr).length === 2) { var p = Object.keys(L.ptr).map(function (k) { return L.ptr[k]; }); L.pinch = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); }
    };
    L.stage.onpointermove = function (e) {
      var p = L.ptr[e.pointerId]; if (!p) return;
      var keys = Object.keys(L.ptr);
      if (keys.length === 2) {
        L.ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
        var a = L.ptr[keys[0]], b = L.ptr[keys[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (L.pinch) zoomAt(L.s * d / L.pinch, (a.x + b.x) / 2, (a.y + b.y) / 2); L.pinch = d; L.moved = true; return;
      }
      var dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
      if (Math.abs(e.clientX - L.startX) > 6 || Math.abs(e.clientY - L.startY) > 6) L.moved = true;
      if (L.s > 1) { L.x += dx; L.y += dy; clamp(); apply(false); }
    };
    var up = function (e) {
      if (!L.ptr[e.pointerId]) return; var n = Object.keys(L.ptr).length; delete L.ptr[e.pointerId]; L.pinch = 0;
      if (n > 1) return;
      var dx = e.clientX - L.startX, dy = e.clientY - L.startY;
      if (L.s <= 1.02 && e.type === "pointerup" && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) { L.show(L.i + (dx < 0 ? 1 : -1)); return; }
      if (!L.moved && e.type === "pointerup") {
        var now = Date.now();
        if (now - L.lastTap < 320) { L.lastTap = 0; if (L.s > 1) { L.s = 1; L.x = 0; L.y = 0; apply(true); } else zoomAt(2.5, e.clientX, e.clientY); }
        else L.lastTap = now;
      }
    };
    L.stage.onpointerup = up; L.stage.onpointercancel = up;
    document.addEventListener("keydown", function (e) {
      if (L.el.hidden) return;
      if (e.key === "Escape") L.close();
      else if (e.target && e.target.closest && e.target.closest("#lbSolP") && /^Arrow/.test(e.key)) return;
      else if (e.key === "ArrowLeft") L.show(L.i - 1);
      else if (e.key === "ArrowRight") L.show(L.i + 1);
      else if (e.key === "+" || e.key === "=") zoomAt(L.s * 1.3, innerWidth / 2, innerHeight / 2);
      else if (e.key === "-") zoomAt(L.s / 1.3, innerWidth / 2, innerHeight / 2);
      else if (e.key === "0") { L.s = 1; L.x = 0; L.y = 0; apply(true); }
    });
  }
  LB.list = list; LB.el.hidden = false; document.body.classList.add("lb-open"); LB.show(idx);
  LB.el.querySelector("#lbX").focus();
}
window.addEventListener("hashchange", function () { if (LB && !LB.el.hidden) LB.close(); });

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
  if (q.length < 2) return '<h1>Поиск</h1><p class="empty">Введите хотя бы 2 символа в поле поиска вверху и нажмите Enter.</p>';
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
  var h = '<div class="homehead">' + logoHtml(true) + "</div>" +
    '<h1>Контрольные</h1><p class="meta">Выберите контрольную: откроются конспекты, вопросы, задачи и тренировка именно под неё.</p>';
  (window.S30S_MANIFEST || []).forEach(function (s) {
    h += "<h2>" + esc(s.title) + '</h2><div class="xgrid">' + s.exams.map(function (e) {
      return '<a class="xcard" href="#/open/' + encodeURIComponent(e.id) + '"><b>' + esc(e.title) + '</b><span class="xd">' + esc(e.when ? e.when : fmtDate(e.date)) +
        (!e.when && e.date ? " · " + esc(daysTo(e.date)) : "") + "</span>" + (e.description ? '<span class="xs">' + esc(e.description) + "</span>" : "") + "</a>";
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
    if (allExams().some(function (e) { return e.id === last; })) openExam(last, hash); else goHome(true);
    return;
  }
  document.body.classList.toggle("side-hidden", flag("side:hidden"));
  var sm = hash.match(/^#\/search\/(.*)$/); if (sm) $q.value = dec(sm[1]); else if (document.activeElement !== $q) $q.value = "";
  var html, sideRoute = hash, anchor = null;
  if ((m = hash.match(/^#\/t\/([\w-]+)$/))) html = pageTopic(m[1]);
  else if ((m = hash.match(/^#\/rk(?:\/(theory|tasks|variant))?(?:\/([\w.]+))?$/))) {
    html = pageRK(m[1], m[2]); sideRoute = "#/rk";
    anchor = m[2] ? (m[1] === "tasks" ? "task-" + m[2] : m[2]) : null;
  }
  else if (hash === "#/rkq") html = pageRkq();
  else if (hash === "#/cards") html = pageCards();
  else if (hash === "#/materials") html = pageMaterials();
  else if ((m = hash.match(/^#\/disc(?:\/(\d+))?$/))) { html = pageDisc(m[1]); sideRoute = "#/disc"; }
  else if (hash === "#/traps") html = pageTraps();
  else if ((m = hash.match(/^#\/search\/(.*)$/))) html = pageSearch(dec(m[1]));
  else { location.hash = "#/rk"; return; }
  renderSide(sideRoute);
  $view.innerHTML = html;
  bindCommon();
  if (hash === "#/cards") bindCards();
  if (hash === "#/materials") bindMaterials();
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
  if (matchMedia("(min-width:861px)").matches) setSideHidden(!document.body.classList.contains("side-hidden")); else document.body.classList.toggle("nav-open");
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
  if (!meta) { goHome(true); return; }
  var ready = window.S30S.data[id] ? Promise.resolve() : loadScript(meta.data);
  ready.then(function () {
    EXAM = window.S30S.data[id]; EXAM_META = meta; lsSet("s30s:lastExam", id);
    if (then && location.hash !== then) history.replaceState(null, "", location.pathname + location.search + then);
    route();
  }).catch(function (e) { $view.innerHTML = '<p class="empty">Не удалось загрузить ' + esc(e.message) + "</p>"; });
}
function ensureKatex() { return Promise.resolve(); }  // KaTeX только локальный (vendor/katex); внешних скриптов нет
/* ===== Офлайн: service worker (sw.js) + предзагрузка материалов в кэш браузера ===== */
var SW_CACHE = "s30s-v1";   // совпадает с sw.js
var OFFLINE_KEY = "s30s:offline";
function offlineText() { return lsGet(OFFLINE_KEY) ? "Сайт и материалы сохранены в браузере: работают без интернета (кроме скачивания архивов)." : ""; }
function setupOffline() {
  if (!("serviceWorker" in navigator) || !window.caches) return;
  var host = location.hostname;
  if (location.protocol !== "https:" && host !== "localhost" && host !== "127.0.0.1") return;
  navigator.serviceWorker.register("sw.js").catch(function () {});
  var go = function () { navigator.serviceWorker.ready.then(function () { setTimeout(warmOffline, 1500); }); };
  if (document.readyState === "complete") go(); else window.addEventListener("load", go);
}
function warmOffline() {
  if (navigator.onLine === false) return;
  var conn = navigator.connection; if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;   // экономим трафик
  var seen = {}, media = {};
  var add = function (u, isMedia) { var a = new URL(u, location.href).href; seen[a] = 1; if (isMedia) media[a] = 1; };
  ["index.html", "style.css", "app.js", "manifest.js", "vendor/katex/katex.min.css", "vendor/katex/katex.min.js"].forEach(function (u) { add(u); });
  var cssUrl = new URL("vendor/katex/katex.min.css", location.href).href;
  var jobs = [fetch(cssUrl).then(function (r) { return r.text(); }).then(function (t) {
    (t.match(/url\([^)]*\.woff2[^)]*\)/g) || []).forEach(function (m) { add(new URL(m.replace(/^url\(["']?|["']?\)$/g, ""), cssUrl).href, true); });
  }).catch(function () {})];
  allExams().forEach(function (e) {
    add(e.data);
    var id = e.id;
    jobs.push(Promise.all([
      (window.S30S.materials && window.S30S.materials[id]) ? 0 : loadScript("materials/" + id + "/index.js").catch(function () {}),
      (window.S30S.solutions && window.S30S.solutions[id]) ? 0 : loadScript("solutions/" + id + ".js").catch(function () {})
    ]).then(function () {
      var M = window.S30S.materials && window.S30S.materials[id];
      if (!M) return;
      add("materials/" + id + "/index.js");
      if (window.S30S.solutions && window.S30S.solutions[id]) add("solutions/" + id + ".js");
      M.groups.forEach(function (g) { g.items.forEach(function (i) { add(i.url, true); if (i.thumb) add(i.thumb, true); }); });
    }));
  });
  Promise.all(jobs).then(function () { return caches.open(SW_CACHE); }).then(function (c) {
    var list = Object.keys(seen), i = 0, failed = 0, coreFailed = 0;
    var next = function () {
      if (i >= list.length) return Promise.resolve();
      var u = list[i++];
      return c.match(u).then(function (hit) { if (hit && media[u]) return; return c.add(u).catch(function () { failed++; if (!media[u]) coreFailed++; }); }).then(next);
    };
    return Promise.all([next(), next(), next()]).then(function () {
      if (!coreFailed && failed <= list.length * 0.1) { lsSet(OFFLINE_KEY, String(Date.now())); var el = document.getElementById("offState"); if (el) el.textContent = offlineText(); }
    });
  }).catch(function () {});
}
(function start() {
  ensureKatex().then(function () {
    if (!allExams().length) { $view.innerHTML = '<p class="empty">manifest.js пуст.</p>'; return; }
    route();
    setupOffline();
  });
})();
})();
