# Блок B: определения по Коши + пример + геометрическая иллюстрация [иллюстрации и примеры — не из лекций]

Ответ на 2 балла = **определение в кванторах** + **пример с проверкой по определению** (найти $\delta(\varepsilon)$, $\delta(M)$, $N(\varepsilon)$ или $N(M)$) + **рисунок**.
Рисунки хранятся в `93_block_b_figs.json` (inline SVG, ключи ниже) и рисуются от руки за 30 секунд: оси, точка $a$, пунктиры уровней, полоса окрестности, кривая.

## Как рисовать от руки (общий шаблон)
1. Оси $x$, $y$.
2. **Куда стремится $x$:** конечная $a$ — вертикальная полоса $(a-\delta,a+\delta)$ (односторонний — только половина полосы); $\pm\infty$ — пунктир $x=N$ (или $x=-N$), заштриховать всё правее (левее); $\infty$ — оба пунктира $x=\pm N$, наружу.
3. **Чему равен предел:** число $b$ — горизонтальная полоса $(b-\varepsilon,b+\varepsilon)$; $+\infty$ — пунктир $y=M$, кривая выше; $-\infty$ — пунктир $y=-M$, кривая ниже; $\infty$ — оба $y=\pm M$, кривая снаружи.
4. Кривая: внутри полосы по $x$ её значения лежат в «полосе по $y$». Для конечной точки — выколотый кружок в $(a,b)$.

## B1. $\lim\limits_{x\to0}f(x)=b$, $b\in R$ — рисунок `lim_a_b` (с $a=0$)
$$\lim_{x\to0}f(x)=b\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x:\ 0<|x|<\delta\Rightarrow|f(x)-b|<\varepsilon.$$
**Пример:** $f(x)=2x+3$, $b=3$: $|f(x)-3|=2|x|<\varepsilon\iff|x|<\frac\varepsilon2$; $\delta(\varepsilon)=\frac\varepsilon2$.

## B2. $\lim\limits_{x\to a}f(x)=+\infty$, $a\in R$ — рисунок `lim_a_pinf`
$$\lim_{x\to a}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x:\ 0<|x-a|<\delta\Rightarrow f(x)>M.$$
**Пример:** $f(x)=\frac1{(x-a)^2}$: $f>M\iff|x-a|<\frac1{\sqrt M}$; $\delta(M)=\frac1{\sqrt M}$.

## B3. $\lim\limits_{x\to\infty}f(x)=0$ — рисунок `lim_inf_0`
$$\lim_{x\to\infty}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ |x|>N\Rightarrow|f(x)|<\varepsilon.$$
**Пример:** $f(x)=\frac1x$: $\left|\frac1x\right|<\varepsilon\iff|x|>\frac1\varepsilon$; $N(\varepsilon)=\frac1\varepsilon$.

## B4. $\lim\limits_{x\to a-0}f(x)=-\infty$, $a\in R$ — рисунок `lim_a_minus_minf`
$$\lim_{x\to a-0}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x:\ 0<a-x<\delta\Rightarrow f(x)<-M.$$
**Пример:** $f(x)=\frac1{x-a}$: при $x<a$ $\ f=-\frac1{a-x}<-M\iff a-x<\frac1M$; $\delta(M)=\frac1M$.

## B5 (вариант, Т2). $\lim\limits_{x\to a}f(x)=\infty$, $a\in R$ — рисунок `lim_a_inf`
$$\lim_{x\to a}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x:\ 0<|x-a|<\delta\Rightarrow|f(x)|>M.$$
**Пример:** $f(x)=\frac1{x-a}$: $|f|>M\iff|x-a|<\frac1M$; $\delta(M)=\frac1M$.

## «Остальные — аналогично»: готовые примеры для всех случаев

| $x\to$ \ $f\to$ | $b$ | $0$ | $\infty$ | $+\infty$ | $-\infty$ |
|---|---|---|---|---|---|
| $a$ | $b+(x-a)$, $\delta=\varepsilon$ | $x-a$, $\delta=\varepsilon$ | $\frac1{x-a}$, $\delta=\frac1M$ | $\frac1{(x-a)^2}$, $\delta=\frac1{\sqrt M}$ | $-\frac1{(x-a)^2}$, $\delta=\frac1{\sqrt M}$ |
| $a+0$ | $b+(x-a)$, $\delta=\varepsilon$ | $x-a$, $\delta=\varepsilon$ | $\frac1{x-a}$, $\delta=\frac1M$ | $\frac1{x-a}$, $\delta=\frac1M$ | $-\frac1{x-a}$, $\delta=\frac1M$ |
| $a-0$ | $b+(x-a)$, $\delta=\varepsilon$ | $x-a$, $\delta=\varepsilon$ | $\frac1{x-a}$, $\delta=\frac1M$ | $\frac1{a-x}$, $\delta=\frac1M$ | $\frac1{x-a}$, $\delta=\frac1M$ |
| $\infty$ | $b+\frac1x$, $N=\frac1\varepsilon$ | $\frac1x$, $N=\frac1\varepsilon$ | $x$, $N=M$ | $x^2$, $N=\sqrt M$ | $-x^2$, $N=\sqrt M$ |
| $+\infty$ | $b+\frac1x$, $N=\frac1\varepsilon$ | $\frac1x$, $N=\frac1\varepsilon$ | $x$, $N=M$ | $x$, $N=M$ | $-x$, $N=M$ |
| $-\infty$ | $b+\frac1x$, $N=\frac1\varepsilon$ | $\frac1x$, $N=\frac1\varepsilon$ | $x$, $N=M$ | $-x$, $N=M$ | $x$, $N=M$ |

**Какой рисунок взять:**
- $x\to a$, $f\to b$ (или $0$): `lim_a_b`; односторонний — заштриховать половину полосы.
- $x\to a$, $f\to+\infty$: `lim_a_pinf`; $-\infty$ — зеркально вниз; односторонний — одна ветвь.
- $x\to a$, $f\to\infty$: `lim_a_inf` (ветви в разные стороны) или `lim_a_pinf`.
- $x\to a-0$, $f\to-\infty$: `lim_a_minus_minf`; остальные односторонние — по аналогии.
- $x\to\infty$ / $\pm\infty$, $f\to b$: `lim_inf_0` с полосой вокруг $b$; $x\to+\infty$ — только правая часть.
- $x\to\pm\infty$, $f\to\pm\infty$: пунктир $x=N$ и уровень $y=M$, кривая в правом верхнем «углу» [рисунок в оболочке не заготовлен — рисуется по шаблону].
