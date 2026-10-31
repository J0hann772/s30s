/* s30s: интерактивные виджеты в конспектах.
   Подключается после app.js. Любой элемент <div data-widget="имя"> в #view превращается в виджет,
   когда появляется на странице (MutationObserver), поэтому app.js про виджеты ничего не знает.
   Только локальный код: без CDN и инлайн-скриптов (политика CSP: script-src 'self'). */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var REG = {};

  /* ---------- утилиты ---------- */
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }
  function sv(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    return e;
  }
  function fmt(x, d) { return x.toFixed(d == null ? 2 : d).replace(".", ","); }
  function tex(s) {
    if (!window.katex) return s;
    try { return katex.renderToString(s, { throwOnError: false, strict: false }); } catch (e) { return s; }
  }
  /* строка с формулами $...$ -> html */
  function rich(s) {
    return s.split("$").map(function (part, i) {
      return i % 2 ? tex(part) : part.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    }).join("");
  }

  /* ---------- виджет: фундаментальная последовательность ---------- */
  var NMAX = 90;    // сколько членов рисуем
  var NLIM = 40;    // максимум N на ползунке: при N ≤ 40 пара n = N+1, m = 2n ≤ 82 помещается в окно

  var SEQS = [
    {
      name: "xₙ = 1/n",
      f: function (n) { return 1 / n; },
      fund: true,
      note: "Фундаментальная. При $n,m>N$ имеем $|x_n-x_m|<\\max(\\frac1n,\\frac1m)<\\frac1N$, значит, подходит любое $N\\ge\\frac1\\varepsilon$."
    },
    {
      name: "xₙ = 1 + (−1)ⁿ / n",
      f: function (n) { return 1 + (n % 2 ? -1 : 1) / n; },
      fund: true,
      note: "Фундаментальная (и сходится к $1$). $|x_n-x_m|\\le\\frac1n+\\frac1m<\\frac2N$, значит, подходит любое $N\\ge\\frac2\\varepsilon$."
    },
    {
      name: "xₙ = (−1)ⁿ",
      f: function (n) { return n % 2 ? -1 : 1; },
      fund: false,
      note: "Не фундаментальная: $|x_{N+1}-x_{N+2}|=2\\ge\\varepsilon_0=1$ при любом $N$. Хвост всегда делится на два уровня, ни одно $N$ не помогает."
    },
    {
      name: "xₙ = 1 + 1/2 + … + 1/n",
      f: (function () {
        var H = [0];
        for (var k = 1; k <= NMAX; k++) H.push(H[k - 1] + 1 / k);
        return function (n) { return H[n]; };
      })(),
      fund: false,
      note: "Не фундаментальная, хотя соседние члены сближаются ($x_{n+1}-x_n=\\frac1{n+1}\\to0$). Нужны далёкие номера: $x_{2n}-x_n\\ge n\\cdot\\frac1{2n}=\\frac12$, то есть $\\varepsilon_0=\\frac12$, $m=2n$."
    }
  ];

  function cauchy(root) {
    var seqSel = el("select", { "aria-label": "Последовательность" });
    SEQS.forEach(function (s, i) { seqSel.appendChild(el("option", { value: i, text: s.name })); });

    var eps = el("input", { type: "range", min: "0.05", max: "0.5", step: "0.05", value: "0.3", "aria-label": "Эпсилон" });
    var epsOut = el("output", { "class": "cv-out" });
    var nn = el("input", { type: "range", min: "0", max: String(NLIM), step: "1", value: "8", "aria-label": "Номер N" });
    var nnOut = el("output", { "class": "cv-out" });

    var ctrl = el("div", { "class": "cv-ctrl" }, [
      el("label", {}, [el("span", { text: "Последовательность" }), seqSel]),
      el("label", {}, [el("span", { text: "ε" }), eps, epsOut]),
      el("label", {}, [el("span", { text: "N" }), nn, nnOut])
    ]);

    var W = 680, H = 270, L = 40, R = 14, T = 14, B = 26;
    var svg = sv("svg", { "class": "cv-svg", viewBox: "0 0 " + W + " " + H, role: "img" });

    var sSpread = el("div", { "class": "cv-v" });
    var sMin = el("div", { "class": "cv-v" });
    var sVerdict = el("div", { "class": "cv-v cv-verdict", "aria-live": "polite" });
    var stats = el("div", { "class": "cv-stats" }, [
      el("div", {}, [el("div", { "class": "cv-k", text: "Размах хвоста" }), sSpread]),
      el("div", {}, [el("div", { "class": "cv-k", text: "Наименьшее N для этого ε" }), sMin]),
      el("div", {}, [el("div", { "class": "cv-k", text: "Для выбранного N" }), sVerdict])
    ]);
    var note = el("p", { "class": "cv-note" });
    var legend = el("p", { "class": "cv-legend" });
    legend.innerHTML = rich("Точки правее линии $n=N$ образуют хвост. Условие определения: все $|x_n-x_m|<\\varepsilon$ при $n,m>N$, то есть размах хвоста (максимум минус минимум) меньше $\\varepsilon$. Показаны первые " + NMAX + " членов, поэтому для расходящихся последовательностей это иллюстрация, а не доказательство.");

    root.className = "cv";
    root.appendChild(ctrl);
    root.appendChild(svg);
    root.appendChild(stats);
    root.appendChild(note);
    root.appendChild(legend);

    function tail(vals, N) {
      var lo = Infinity, hi = -Infinity, nlo = 0, nhi = 0;
      for (var n = N + 1; n <= NMAX; n++) {
        var v = vals[n - 1];
        if (v < lo) { lo = v; nlo = n; }
        if (v > hi) { hi = v; nhi = n; }
      }
      return { lo: lo, hi: hi, nlo: nlo, nhi: nhi, d: hi - lo };
    }

    function draw() {
      var s = SEQS[+seqSel.value];
      var e = +eps.value, N = +nn.value;
      epsOut.textContent = fmt(e);
      nnOut.textContent = String(N);

      var vals = [], lo = Infinity, hi = -Infinity, n;
      for (n = 1; n <= NMAX; n++) { var v = s.f(n); vals.push(v); if (v < lo) lo = v; if (v > hi) hi = v; }
      var pad = (hi - lo) * 0.08; lo -= pad; hi += pad;
      function X(k) { return L + (k - 0.5) / NMAX * (W - L - R); }
      function Y(y) { return T + (hi - y) / (hi - lo) * (H - T - B); }

      var t = tail(vals, N);
      var ok = t.d < e;
      var cls = ok ? "ok" : "bad";

      svg.setAttribute("aria-label", "График первых " + NMAX + " членов последовательности " + s.name + ". Размах хвоста после N = " + N + ": " + fmt(t.d) + (ok ? ", меньше " : ", не меньше ") + "ε = " + fmt(e) + ".");
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var i, ty;
      for (i = 0; i <= 5; i++) {
        ty = lo + (hi - lo) * i / 5;
        svg.appendChild(sv("line", { "class": "cv-grid", x1: L, x2: W - R, y1: Y(ty), y2: Y(ty) }));
        svg.appendChild(sv("text", { "class": "cv-tick", x: L - 6, y: Y(ty) + 4, "text-anchor": "end", text: fmt(ty, 1) }));
      }
      for (i = 10; i <= NMAX; i += 10) {
        svg.appendChild(sv("text", { "class": "cv-tick", x: X(i), y: H - 8, "text-anchor": "middle", text: String(i) }));
      }

      var xs = X(N + 0.5);
      svg.appendChild(sv("rect", { "class": "cv-band", x: xs, y: Y(t.lo + e), width: W - R - xs, height: Math.max(0, Y(t.lo) - Y(t.lo + e)) }));
      svg.appendChild(sv("line", { "class": "cv-edge " + cls, x1: xs, x2: W - R, y1: Y(t.lo), y2: Y(t.lo) }));
      svg.appendChild(sv("line", { "class": "cv-edge " + cls, x1: xs, x2: W - R, y1: Y(t.hi), y2: Y(t.hi) }));
      svg.appendChild(sv("line", { "class": "cv-cut", x1: xs, x2: xs, y1: T, y2: H - B }));
      svg.appendChild(sv("text", { "class": "cv-lbl", x: xs + 5, y: T + 10, text: "n = N" }));

      for (n = 1; n <= NMAX; n++) {
        var inTail = n > N;
        svg.appendChild(sv("circle", { "class": inTail ? "cv-pt " + cls : "cv-pt head", cx: X(n), cy: Y(vals[n - 1]), r: inTail ? 3.3 : 2.6 }));
      }

      if (!ok) {
        /* пара, на которой нарушено |xₙ − xₘ| < ε */
        var a = Math.min(t.nlo, t.nhi), b = Math.max(t.nlo, t.nhi);
        var xm = X(b) + 9;
        svg.appendChild(sv("line", { "class": "cv-pair", x1: xm, x2: xm, y1: Y(t.lo), y2: Y(t.hi) }));
        [t.nlo, t.nhi].forEach(function (k) {
          svg.appendChild(sv("circle", { "class": "cv-ring", cx: X(k), cy: Y(vals[k - 1]), r: 6.5 }));
          svg.appendChild(sv("line", { "class": "cv-pair thin", x1: X(k) + 6.5, x2: xm, y1: Y(vals[k - 1]), y2: Y(vals[k - 1]) }));
        });
        var lblX = Math.min(xm - 8, W - R - 4);
        svg.appendChild(sv("text", { "class": "cv-lbl bad", x: lblX, y: (Y(t.lo) + Y(t.hi)) / 2 + 4, "text-anchor": "end", text: "|xₙ − xₘ| = " + fmt(t.d) + " ≥ ε   (n = " + a + ", m = " + b + ")" }));
      }

      sSpread.textContent = fmt(t.d);
      var nmin = null, q;
      for (q = 0; q <= NLIM; q++) { if (tail(vals, q).d < e) { nmin = q; break; } }
      sMin.textContent = nmin === null ? "нет (при N ≤ " + NLIM + ")" : String(nmin);
      sVerdict.className = "cv-v cv-verdict " + cls;
      sVerdict.textContent = ok ? "размах < ε: N = " + N + " подходит" : "размах ≥ ε: N = " + N + " не подходит";
      note.innerHTML = rich(s.note);
    }

    seqSel.addEventListener("change", draw);
    eps.addEventListener("input", draw);
    nn.addEventListener("input", draw);
    draw();
  }

  REG.cauchy = cauchy;

  /* ---------- монтирование ---------- */
  function mount(scope) {
    [].forEach.call((scope || document).querySelectorAll("[data-widget]"), function (n) {
      if (n.getAttribute("data-mounted")) return;
      var f = REG[n.getAttribute("data-widget")];
      if (!f) return;
      n.setAttribute("data-mounted", "1");
      try { f(n); } catch (err) { n.textContent = "Не удалось построить иллюстрацию."; }
    });
  }

  var host = document.getElementById("view") || document.body;
  new MutationObserver(function () { mount(host); }).observe(host, { childList: true, subtree: true });
  mount(host);
  window.S30S_WIDGETS = { mount: mount, register: function (k, f) { REG[k] = f; mount(host); } };
})();
