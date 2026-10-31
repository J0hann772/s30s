/* Решения к материалам «Слитые варианты» и «Задачи из вариантов» (РК1, матан).
   Ключ items — имя файла фото без расширения (буквы Р/P в «(Р61)» не различаются).
   Каждый элемент: [номер, id задачи из pool]. Одинаковые задачи из разных билетов указывают на один id.
   Нечёткие по фото задания сюда не включены. Решения не из лекций — оформлены как разбор, сверяй с конспектом. */
(function () {
  window.S30S = window.S30S || {};
  var P = {};

  /* ---------- пределы ---------- */
  P.sqrtDiff1 = { c: String.raw`$\lim\limits_{x\to+\infty}\sqrt{x}\,\bigl(\sqrt{x+2}-\sqrt{x-3}\bigr)$`, s: String.raw`Неопределённость $\infty\cdot 0$. Умножим и разделим на сопряжённое:
$$\sqrt{x}\cdot\frac{(x+2)-(x-3)}{\sqrt{x+2}+\sqrt{x-3}}=\frac{5\sqrt{x}}{\sqrt{x+2}+\sqrt{x-3}}=\frac{5}{\sqrt{1+\frac2x}+\sqrt{1-\frac3x}}\to\frac52.$$
**Ответ:** $\dfrac52$.` };

  P.tgArcsin = { c: String.raw`$\lim\limits_{x\to0}\dfrac{\sin x}{\operatorname{tg}6x+\arcsin(\ln(1+2x))}$`, s: String.raw`При $x\to0$: $\sin x\sim x$, $\operatorname{tg}6x\sim 6x$, $\ln(1+2x)\sim 2x\to0$, поэтому $\arcsin(\ln(1+2x))\sim\ln(1+2x)\sim 2x$.
Слагаемые в знаменателе одного знака, их эквивалентные заменяются без потери: знаменатель $\sim 6x+2x=8x$.
$$\lim\frac{x}{8x}=\frac18.$$
**Ответ:** $\dfrac18$.` };

  P.pow10 = { c: String.raw`$\lim\limits_{x\to\infty}\left(\dfrac{x+3}{x-2}\right)^{2x+1}$`, s: String.raw`Неопределённость $1^\infty$. Выделим единицу:
$$\left(1+\frac{5}{x-2}\right)^{2x+1}=\left[\left(1+\frac{5}{x-2}\right)^{\frac{x-2}{5}}\right]^{\frac{5(2x+1)}{x-2}}.$$
Внутри скобки $\to e$, показатель $\frac{5(2x+1)}{x-2}\to10$.
**Ответ:** $e^{10}$.` };

  P.pow10b = { c: String.raw`$\lim\limits_{x\to\infty}\left(\dfrac{x+5}{x-5}\right)^{x+1}$`, s: String.raw`Неопределённость $1^\infty$:
$$\left(1+\frac{10}{x-5}\right)^{x+1}=\left[\left(1+\frac{10}{x-5}\right)^{\frac{x-5}{10}}\right]^{\frac{10(x+1)}{x-5}}.$$
Внутри $\to e$, показатель $\frac{10(x+1)}{x-5}\to10$.
**Ответ:** $e^{10}$.` };

  P.ctg3 = { c: String.raw`$\lim\limits_{x\to\pi/2}(1+\operatorname{ctg}x)^{3\operatorname{tg}x}$`, s: String.raw`Пусть $t=\operatorname{ctg}x\to0$, тогда $\operatorname{tg}x=\frac1t$:
$$(1+t)^{3/t}=\bigl[(1+t)^{1/t}\bigr]^3\to e^3.$$
**Ответ:** $e^{3}$.` };

  P.sqrt3 = { c: String.raw`$\lim\limits_{x\to+\infty}\bigl(\sqrt{x^2+x+1}-\sqrt{x^2-4x+1}\bigr)$`, s: String.raw`Неопределённость $\infty-\infty$. Сопряжённое:
$$\frac{(x^2+x+1)-(x^2-4x+1)}{\sqrt{x^2+x+1}+\sqrt{x^2-4x+1}}=\frac{5x}{x\Bigl(\sqrt{1+\frac1x+\frac1{x^2}}+\sqrt{1-\frac4x+\frac1{x^2}}\Bigr)}\to\frac52.$$
**Ответ:** $\dfrac52$.` };

  P.sinPiHalf = { c: String.raw`$\lim\limits_{x\to-\pi/2}\dfrac{1+\sin x}{x+\pi/2}$`, s: String.raw`Замена $t=x+\frac\pi2\to0$. Тогда $\sin x=\sin\bigl(t-\frac\pi2\bigr)=-\cos t$:
$$\frac{1-\cos t}{t}\sim\frac{t^2/2}{t}=\frac t2\to0.$$
**Ответ:** $0$.` };

  P.cosPow = { c: String.raw`$\lim\limits_{x\to0}\left(\dfrac{\sin x}{\operatorname{tg}x}\right)^{1/x^2}$`, s: String.raw`$\dfrac{\sin x}{\operatorname{tg}x}=\cos x$, неопределённость $1^\infty$. Берём логарифм:
$$\frac{\ln\cos x}{x^2},\qquad \ln\cos x=\ln\bigl(1-(1-\cos x)\bigr)\sim-(1-\cos x)\sim-\frac{x^2}{2}.$$
Показатель $\to-\frac12$.
**Ответ:** $e^{-1/2}$.` };

  P.root4 = { c: String.raw`$\lim\limits_{x\to+\infty}\dfrac{4x^2-\sqrt[4]{x^3}}{\sqrt[3]{x^6+x^3+1}-5x}$`, s: String.raw`Делим числитель и знаменатель на $x^2$ (старшая степень):
$$\frac{4-x^{-5/4}}{\sqrt[3]{1+x^{-3}+x^{-6}}-\frac5x}\to\frac{4}{1}=4.$$
**Ответ:** $4$.` };

  P.sqrt10 = { c: String.raw`$\lim\limits_{x\to10}\dfrac{\sqrt{x-1}-3}{x-10}$`, s: String.raw`Неопределённость $\frac00$. Сопряжённое: $(\sqrt{x-1}-3)(\sqrt{x-1}+3)=x-10$:
$$\frac{x-10}{(x-10)(\sqrt{x-1}+3)}=\frac{1}{\sqrt{x-1}+3}\to\frac16.$$
**Ответ:** $\dfrac16$.` };

  P.lnSqrt = { c: String.raw`$\lim\limits_{x\to0}\dfrac1x\ln\sqrt{\dfrac{1+x}{1-x}}$`, s: String.raw`$$\frac1{2x}\bigl(\ln(1+x)-\ln(1-x)\bigr)=\frac12\left(\frac{\ln(1+x)}{x}+\frac{\ln(1-x)}{-x}\right)\to\frac12(1+1)=1.$$
**Ответ:** $1$.` };

  P.xSqrtDiff = { c: String.raw`$\lim\limits_{x\to+\infty}x\bigl(\sqrt{x^2+1}-\sqrt{x^2-1}\bigr)$`, s: String.raw`$$x\cdot\frac{(x^2+1)-(x^2-1)}{\sqrt{x^2+1}+\sqrt{x^2-1}}=\frac{2x}{x\bigl(\sqrt{1+\frac1{x^2}}+\sqrt{1-\frac1{x^2}}\bigr)}\to\frac22=1.$$
**Ответ:** $1$.` };

  P.eqv14 = { c: String.raw`$\lim\limits_{x\to0}\dfrac{\operatorname{tg}2x+3\arcsin4x}{\sin5x+6\operatorname{arctg}x}$`, s: String.raw`Делим числитель и знаменатель на $x$ и используем $\operatorname{tg}2x\sim2x$, $\arcsin4x\sim4x$, $\sin5x\sim5x$, $\operatorname{arctg}x\sim x$:
$$\frac{2+3\cdot4}{5+6\cdot1}=\frac{14}{11}.$$
**Ответ:** $\dfrac{14}{11}$.` };

  P.ratio111 = { c: String.raw`$\lim\limits_{x\to\infty}\dfrac{(x+1)(x+2)(x+3)}{x^3+x^2+1}$`, s: String.raw`Степени числителя и знаменателя равны (3), предел равен отношению старших коэффициентов: $\frac11=1$.
Проверка: числитель $x^3+6x^2+11x+6$, делим всё на $x^3$ — получаем $\frac{1+6/x+\dots}{1+1/x+\dots}\to1$.
**Ответ:** $1$.` };

  P.eab = { c: String.raw`$\lim\limits_{x\to0}\dfrac{e^{ax}-e^{bx}}{x}$`, s: String.raw`$$\frac{e^{ax}-e^{bx}}{x}=\frac{e^{ax}-1}{x}-\frac{e^{bx}-1}{x}\to a-b,$$
так как $e^{ax}-1\sim ax$, $e^{bx}-1\sim bx$.
**Ответ:** $a-b$.` };

  P.pow0 = { c: String.raw`$\lim\limits_{x\to\infty}\left(\dfrac{x^2-4}{x^2}\right)^{x^4}$`, s: String.raw`Здесь $1^\infty$, но показатель растёт быстрее, чем гасится основание:
$$\left(1-\frac4{x^2}\right)^{x^4}=\left[\left(1-\frac4{x^2}\right)^{-\frac{x^2}{4}}\right]^{-4x^2}.$$
Внутри $\to e$, показатель $-4x^2\to-\infty$. Значит предел $e^{-\infty}=0$.
**Ответ:** $0$.` };

  P.sqrtCub = { c: String.raw`$\lim\limits_{x\to\infty}\dfrac{(3-x)^3}{(x+1)^2-(x+1)^3}$`, s: String.raw`В знаменателе вынесем $(x+1)^2$: $(x+1)^2\bigl(1-(x+1)\bigr)=-x(x+1)^2$. Числитель $(3-x)^3=-(x-3)^3$:
$$\frac{-(x-3)^3}{-x(x+1)^2}=\frac{(x-3)^3}{x(x+1)^2}\to1.$$
**Ответ:** $1$.` };

  P.arcsinPow = { c: String.raw`$\lim\limits_{x\to0}\bigl(1+\arcsin^2x\bigr)^{\frac1{\ln(1+x^2)}}$`, s: String.raw`Неопределённость $1^\infty$. Логарифм:
$$\frac{\ln(1+\arcsin^2x)}{\ln(1+x^2)}\sim\frac{\arcsin^2x}{x^2}\sim\frac{x^2}{x^2}=1.$$
**Ответ:** $e$.` };

  P.sqrt32 = { c: String.raw`$\lim\limits_{x\to+\infty}\bigl(\sqrt{x^2-3x+2}-x\bigr)$`, s: String.raw`$$\frac{(x^2-3x+2)-x^2}{\sqrt{x^2-3x+2}+x}=\frac{-3x+2}{x\Bigl(\sqrt{1-\frac3x+\frac2{x^2}}+1\Bigr)}=\frac{-3+\frac2x}{\sqrt{1-\frac3x+\frac2{x^2}}+1}\to\frac{-3}{2}.$$
**Ответ:** $-\dfrac32$.` };

  P.cubicDiff = { c: String.raw`$\lim\limits_{x\to\infty}\dfrac{(3-4x)^2}{(x-3)^3-(x+3)^3}$`, s: String.raw`$(x-3)^3-(x+3)^3=(x^3-9x^2+27x-27)-(x^3+9x^2+27x+27)=-18x^2-54$, а $(3-4x)^2=16x^2-24x+9$.
Делим на $x^2$:
$$\frac{16-\frac{24}x+\frac9{x^2}}{-18-\frac{54}{x^2}}\to-\frac{16}{18}=-\frac89.$$
**Ответ:** $-\dfrac89$.` };

  P.sinLog = { c: String.raw`$\lim\limits_{x\to1/2}\dfrac{1-\sin\pi x}{\ln(\sin\pi x)}$`, s: String.raw`Замена $t=x-\frac12\to0$: $\sin\pi x=\sin\bigl(\frac\pi2+\pi t\bigr)=\cos\pi t$.
$1-\cos\pi t\sim\frac{(\pi t)^2}2$, $\ln\cos\pi t=\ln\bigl(1-(1-\cos\pi t)\bigr)\sim-(1-\cos\pi t)\sim-\frac{(\pi t)^2}2$.
$$\frac{(\pi t)^2/2}{-(\pi t)^2/2}=-1.$$
**Ответ:** $-1$.` };

  P.cosCtg = { c: String.raw`$\lim\limits_{x\to0}(\cos6x)^{\operatorname{ctg}^2x}$`, s: String.raw`Неопределённость $1^\infty$. Показатель после логарифма:
$$\operatorname{ctg}^2x\cdot\ln\cos6x\sim\frac1{x^2}\cdot\bigl(-(1-\cos6x)\bigr)\sim\frac1{x^2}\cdot\left(-\frac{36x^2}{2}\right)=-18.$$
**Ответ:** $e^{-18}$.` };

  P.cubeRoot = { c: String.raw`$\lim\limits_{x\to\infty}\dfrac{(x+1)^2-(x-1)^2-(x+2)^3}{(4-x)^3}$`, s: String.raw`Числитель: $(x+1)^2-(x-1)^2=4x$, значит $4x-(x^3+6x^2+12x+8)=-x^3-6x^2-8x-8$.
Знаменатель: $(4-x)^3=-x^3+12x^2-48x+64$.
Старшие коэффициенты: $\dfrac{-1}{-1}=1$.
**Ответ:** $1$.` };

  P.cubeRoot2 = { c: String.raw`$\lim\limits_{x\to0}\dfrac{\sqrt[3]{x+1}-1}{x}$`, s: String.raw`Пусть $a=\sqrt[3]{x+1}\to1$, тогда $x=a^3-1$:
$$\frac{a-1}{a^3-1}=\frac{1}{a^2+a+1}\to\frac13.$$
**Ответ:** $\dfrac13$.` };

  P.xLn = { c: String.raw`$\lim\limits_{x\to+\infty}x\bigl(\ln(x+2)-\ln x\bigr)$`, s: String.raw`$$x\ln\frac{x+2}{x}=x\ln\Bigl(1+\frac2x\Bigr)\sim x\cdot\frac2x=2.$$
**Ответ:** $2$.` };

  /* ---------- бесконечно малые / большие ---------- */
  P.b12_4 = { c: String.raw`$f(x)=x^5\sin\dfrac1x+x^3$ и $g(x)=\dfrac{x^3}{x+3}$ при $x\to\infty$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а, б)** $f(x)=x^4\cdot\dfrac{\sin(1/x)}{1/x}+x^3$, и $\dfrac{\sin(1/x)}{1/x}\to1$, поэтому $\dfrac{f(x)}{x^4}=\dfrac{\sin(1/x)}{1/x}+\dfrac1x\to1$. Значит $f\sim x^4$ — бесконечно большая, **порядок роста 4**.
$g(x)=\dfrac{x^3}{x+3}=x^2\cdot\dfrac{1}{1+3/x}\sim x^2$ — бесконечно большая, **порядок роста 2**.

**в)** $\dfrac{f}{g}\sim\dfrac{x^4}{x^2}=x^2\to\infty$. Функции сравнимы: $f$ растёт быстрее, $g=o(f)$.` };

  P.b20_4 = { c: String.raw`$f(x)=\dfrac{\ln(1-x)}{x^3}$ и $g(x)=\dfrac1{\sin x}$ при $x\to0$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а, б)** $\ln(1-x)\sim-x$, поэтому $f\sim\dfrac{-x}{x^3}=-\dfrac1{x^2}$ — бесконечно большая, **порядок роста 2**, главная часть $-x^{-2}$.
$\sin x\sim x$, поэтому $g\sim\dfrac1x$ — бесконечно большая, **порядок роста 1**, главная часть $x^{-1}$.

**в)** $\dfrac fg\sim\dfrac{-1/x^2}{1/x}=-\dfrac1x\to\infty$. Сравнимы: $f$ растёт быстрее, $g=o(f)$.` };

  P.expMinus2 = { c: String.raw`$f(x)=e^x-2^x$ и $g(x)=x\operatorname{tg}x$ при $x\to0$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а)** $f(0)=1-1=0$ и $g(0)=0$, обе функции непрерывны, значит обе бесконечно малые.

**б)** $e^x-2^x=(e^x-1)-(2^x-1)=x-x\ln2+o(x)=(1-\ln2)\,x+o(x)$. Коэффициент $1-\ln2\approx0{,}31\ne0$ (т.к. $\ln2\approx0{,}69$), поэтому $f\sim(1-\ln2)x$, **порядок малости 1**.
$g=x\operatorname{tg}x\sim x\cdot x=x^2$, **порядок малости 2**.

**в)** $\dfrac gf\sim\dfrac{x^2}{(1-\ln2)x}\to0$. Сравнимы: $g=o(f)$, у $g$ порядок малости выше.` };

  P.b25a4 = { c: String.raw`$f(x)=\dfrac{\sqrt{x^3}}{x-1}$ и $g(x)=x^2\arcsin\dfrac1x$ при $x\to+\infty$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а, б)** $f=\dfrac{x^{3/2}}{x-1}\sim\dfrac{x^{3/2}}{x}=x^{1/2}$ — бесконечно большая, **порядок роста $\frac12$**.
$\arcsin\dfrac1x\sim\dfrac1x$, поэтому $g\sim x^2\cdot\dfrac1x=x$ — бесконечно большая, **порядок роста 1**.

**в)** $\dfrac fg\sim\dfrac{x^{1/2}}{x}=x^{-1/2}\to0$. Сравнимы: $f=o(g)$, то есть $g$ растёт быстрее.` };

  P.b26_4 = { c: String.raw`$f(x)=\dfrac1{\sin x}$ и $g(x)=\dfrac1{x^2-\pi^2}$ при $x\to-\pi$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`Замена $t=x+\pi\to0$.
**а, б)** $\sin x=\sin(t-\pi)=-\sin t\sim-t$, поэтому $f\sim-\dfrac1t=-\dfrac{1}{x+\pi}$ — бесконечно большая, **порядок роста 1** (относительно $\frac1{x+\pi}$).
$x^2-\pi^2=(x-\pi)(x+\pi)=(t-2\pi)\,t\sim-2\pi t$, поэтому $g\sim-\dfrac{1}{2\pi t}$ — бесконечно большая, **порядок роста 1**.

**в)** $\dfrac fg\to\dfrac{-1/t}{-1/(2\pi t)}=2\pi\ne0$. Функции одного порядка, $f\sim2\pi\,g$.` };

  P.b27_4 = { c: String.raw`$f(x)=x\operatorname{arctg}x$ и $g(x)=2^x-1$ при $x\to0$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а)** Обе функции непрерывны и равны нулю при $x=0$ — бесконечно малые.

**б)** $f=x\operatorname{arctg}x\sim x\cdot x=x^2$, **порядок малости 2**.
$g=2^x-1=e^{x\ln2}-1\sim x\ln2$, **порядок малости 1**, главная часть $(\ln2)\,x$.

**в)** $\dfrac fg\sim\dfrac{x^2}{x\ln2}=\dfrac{x}{\ln2}\to0$. Сравнимы: $f=o(g)$, у $f$ порядок малости выше.` };

  P.b29_4 = { c: String.raw`$f(x)=\sqrt{x^4+x}$ и $g(x)=x^2\operatorname{arctg}\dfrac1x$ при $x\to\infty$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а, б)** $f=x^2\sqrt{1+x^{-3}}\sim x^2$ — бесконечно большая, **порядок роста 2**.
$\operatorname{arctg}\dfrac1x\sim\dfrac1x$, значит $g\sim x^2\cdot\dfrac1x=x$ — бесконечно большая, **порядок роста 1**.

**в)** $\dfrac fg\sim\dfrac{x^2}{x}=x\to\infty$. Сравнимы: $f$ растёт быстрее, $g=o(f)$.` };

  P.b6_4 = { c: String.raw`$f(x)=x^3+\sqrt[5]{x}\sin x$ и $g(x)=x\operatorname{arctg}x$ при $x\to\infty$: а) малая или большая; б) главная часть и порядок; в) сравнить.`, s: String.raw`**а, б)** $\dfrac{\sqrt[5]{x}\sin x}{x^3}=x^{-14/5}\sin x\to0$ (бесконечно малая на ограниченную), поэтому $f\sim x^3$ — бесконечно большая, **порядок роста 3**.
При $x\to\pm\infty$: $\operatorname{arctg}x\to\pm\frac\pi2$, поэтому $g\sim\dfrac\pi2\,|x|$ — бесконечно большая, **порядок роста 1** (при $x\to+\infty$ главная часть $\frac\pi2x$, при $x\to-\infty$ — $-\frac\pi2x$).

**в)** $\dfrac fg\sim\dfrac{x^3}{\frac\pi2|x|}\to\infty$. Сравнимы: $f$ растёт быстрее, $g=o(f)$.` };

  /* ---------- непрерывность ---------- */
  P.c12 = { c: String.raw`$f(x)=\begin{cases}\dfrac{\sin\pi x}{4x},&x<0;\\[2mm]\operatorname{arctg}\dfrac1{1-x},&x\geqslant0.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Каждая ветвь элементарна. Подозрительные точки: стык $x=0$ и $x=1$, где не определена $\frac1{1-x}$.

**$x=0$.** Слева: $\dfrac{\sin\pi x}{4x}\to\dfrac{\pi}{4}$. Справа: $\operatorname{arctg}\dfrac11=\dfrac\pi4$. Значение $f(0)=\operatorname{arctg}1=\dfrac\pi4$. Все три числа равны — $f$ **непрерывна** в 0.

**$x=1$.** $f(1)$ не существует. При $x\to1^-$: $\dfrac1{1-x}\to+\infty$, предел $\dfrac\pi2$. При $x\to1^+$: $\dfrac1{1-x}\to-\infty$, предел $-\dfrac\pi2$.
Односторонние пределы конечны и различны — **разрыв 1-го рода (скачок)**, величина скачка $-\dfrac\pi2-\dfrac\pi2=-\pi$.

**График:** слева график подходит к точке $(1;\frac\pi2)$ (она выколота), справа начинается от выколотой точки $(1;-\frac\pi2)$.
**Ответ:** единственная точка разрыва $x=1$, 1-го рода, скачок $-\pi$.` };

  P.c20 = { c: String.raw`$f(x)=\begin{cases}2^{\frac{x}{x+1}},&x\leqslant1;\\[1mm]\cos\dfrac1{x-1},&x>1.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Подозрительные точки: $x=-1$ (знаменатель) и $x=1$ (стык).

**$x=-1$.** $f(-1)$ не определена.
$x\to-1^-$: $\dfrac{x}{x+1}\to+\infty$ (числитель $-1$, знаменатель $\to0^-$), значит $2^{\frac x{x+1}}\to+\infty$.
$x\to-1^+$: знаменатель $\to0^+$, $\dfrac x{x+1}\to-\infty$, значит $f\to0$.
Левый предел бесконечен — **разрыв 2-го рода**.

**$x=1$.** Слева: $f(1)=2^{1/2}=\sqrt2$, левый предел $\sqrt2$.
Справа: $\cos\dfrac1{x-1}$ при $x\to1^+$ колеблется: для $x_n=1+\frac1{2\pi n}$ значение $1$, для $x_n=1+\frac1{\pi+2\pi n}$ значение $-1$. Предела справа нет — **разрыв 2-го рода**.

**График:** около $x=-1$ слева ветвь уходит вверх к $+\infty$, справа прижимается к оси ($y\to0$); около $x=1$ слева график входит в точку $(1;\sqrt2)$, справа бесконечно часто колеблется между $-1$ и $1$.
**Ответ:** разрывы в $x=-1$ и $x=1$, оба 2-го рода.` };

  P.c25a = { c: String.raw`$f(x)=\begin{cases}\dfrac{\operatorname{tg}x}{x},&|x|<\dfrac\pi2;\\[2mm]\cos2x,&|x|\geqslant\dfrac\pi2.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Подозрительные точки: $x=0$ (в первой ветви $f$ там не определена) и стыки $x=\pm\frac\pi2$.

**$x=0$.** $\dfrac{\operatorname{tg}x}{x}\to1$, но $f(0)$ не определена. Предел конечен — **устранимый разрыв (1-го рода)**; можно доопределить $f(0)=1$.

**$x=\frac\pi2$.** При $x\to\frac\pi2^-$: $\operatorname{tg}x\to+\infty$, $\frac1x\to\frac2\pi$, значит $f\to+\infty$. Справа $\cos2x\to\cos\pi=-1$, $f(\frac\pi2)=-1$. Левый предел бесконечен — **разрыв 2-го рода**.

**$x=-\frac\pi2$.** При $x\to-\frac\pi2^+$: $\operatorname{tg}x\to-\infty$, $x<0$, значит $\dfrac{\operatorname{tg}x}{x}\to+\infty$. Слева $\cos2x\to-1$. **Разрыв 2-го рода.**

**График:** около 0 — «дырка» в точке $(0;1)$; около $\pm\frac\pi2$ ветви внутри интервала уходят вверх к $+\infty$ (вертикальные асимптоты), а вне интервала график $\cos2x$ в точке $\pm\frac\pi2$ равен $-1$.
**Ответ:** $x=0$ — устранимый; $x=\pm\frac\pi2$ — 2-го рода.` };

  P.c25b = { c: String.raw`$f(x)=\begin{cases}\dfrac{\sin2\pi x}{x},&x<1;\\[2mm]\sqrt{x-1},&x\geqslant1.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Подозрительные точки: $x=0$ (первая ветвь не определена) и стык $x=1$.

**$x=0$.** $\dfrac{\sin2\pi x}{x}\to2\pi$, $f(0)$ не определена — **устранимый разрыв (1-го рода)**; можно доопределить $f(0)=2\pi$.

**$x=1$.** Слева: $\dfrac{\sin2\pi x}{x}\to\dfrac{\sin2\pi}{1}=0$. Справа: $\sqrt{x-1}\to0$. $f(1)=0$. Все равны — $f$ **непрерывна** в 1.

**График:** около 0 выколотая точка $(0;2\pi)$; в $x=1$ график непрерывно переходит в ветвь корня, которая выходит из $(1;0)$ вертикально.
**Ответ:** единственная точка разрыва $x=0$, устранимая.` };

  P.c27 = { c: String.raw`$f(x)=\begin{cases}2+\operatorname{arctg}\dfrac{\pi}{4x},&x<1;\\[2mm]3^{1/x},&x\geqslant1.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Подозрительные точки: $x=0$ (в первой ветви делим на $x$) и стык $x=1$.

**$x=0$.** $f(0)$ не определена. Слева: $\dfrac\pi{4x}\to-\infty$, предел $2-\dfrac\pi2$. Справа (при $x\to0^+$, $x<1$): $\dfrac\pi{4x}\to+\infty$, предел $2+\dfrac\pi2$.
Пределы конечны и различны — **разрыв 1-го рода (скачок)**, величина скачка $\pi$.

**$x=1$.** Слева: $2+\operatorname{arctg}\dfrac\pi4\approx2{,}67$. Справа: $3^{1/1}=3$, и $f(1)=3$.
Пределы конечны и различны — **разрыв 1-го рода (скачок)**, величина скачка $3-2-\operatorname{arctg}\dfrac\pi4=1-\operatorname{arctg}\dfrac\pi4\approx0{,}33$ ($f$ непрерывна справа).

**Ответ:** $x=0$ и $x=1$ — разрывы 1-го рода (скачки).` };

  P.c29 = { c: String.raw`$f(x)=\begin{cases}\operatorname{tg}\dfrac{\pi x}{2},&|x|\leqslant1;\\[2mm]\dfrac1{x^2-1},&|x|>1.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Каждая ветвь элементарна. В точках $x=\pm1$ формула $\operatorname{tg}\frac{\pi x}2$ не определена, то есть $f(\pm1)$ не существуют. Разбираем $x=\pm1$.

**$x=1$.** Слева: $\frac{\pi x}2\to\frac\pi2^-$, $\operatorname{tg}\to+\infty$. Справа: $x^2-1\to0^+$, $\dfrac1{x^2-1}\to+\infty$.
Оба односторонних предела бесконечны — **разрыв 2-го рода**, прямая $x=1$ — вертикальная асимптота, ветви уходят вверх с обеих сторон.

**$x=-1$.** Справа: $\frac{\pi x}2\to-\frac\pi2^+$, $\operatorname{tg}\to-\infty$. Слева: $x^2-1\to0^+$, $\dfrac1{x^2-1}\to+\infty$.
Пределы бесконечны (разных знаков) — **разрыв 2-го рода**, $x=-1$ — вертикальная асимптота.

**Ответ:** $x=\pm1$ — разрывы 2-го рода.` };

  P.c6 = { c: String.raw`$f(x)=\begin{cases}\dfrac{\sin x}{|x|},&x<\pi;\\[2mm]\sqrt{x-\pi},&x\geqslant\pi.\end{cases}$ Найти точки разрыва, их характер, построить график вблизи них.`, s: String.raw`Подозрительные точки: $x=0$ (там $|x|=0$) и стык $x=\pi$.

**$x=0$.** $f(0)$ не определена. Слева: $\dfrac{\sin x}{|x|}=\dfrac{\sin x}{-x}\to-1$. Справа: $\dfrac{\sin x}{x}\to1$.
Пределы конечны и различны — **разрыв 1-го рода (скачок)**, величина скачка $1-(-1)=2$.

**$x=\pi$.** Слева: $\dfrac{\sin\pi}{\pi}=0$. Справа: $\sqrt{x-\pi}\to0$. $f(\pi)=0$. Все равны — $f$ **непрерывна** в $\pi$.

**График:** слева от 0 график идёт к выколотой точке $(0;-1)$, справа начинается из выколотой точки $(0;1)$.
**Ответ:** единственная точка разрыва $x=0$, 1-го рода, скачок $2$.` };

  P.c13 = { c: String.raw`$f(x)=\begin{cases}\dfrac12\arccos x,&x<0;\\[2mm]\operatorname{arctg}\dfrac1{x-1},&x\geqslant0.\end{cases}$ Исследовать на непрерывность.`, s: String.raw`**Область определения.** $\arccos x$ определён при $|x|\leqslant1$, поэтому первая ветвь живёт на $[-1;0)$. Вторая ветвь не определена в $x=1$. Итого $D(f)=[-1;1)\cup(1;+\infty)$. Точка $x=-1$ — граница области, о разрыве там речь не идёт ($f(-1)=\frac\pi2$, справа непрерывна).

**$x=0$.** Слева: $\dfrac12\arccos0=\dfrac\pi4$. Справа и $f(0)$: $\operatorname{arctg}(-1)=-\dfrac\pi4$.
Пределы конечны и различны — **разрыв 1-го рода (скачок)**, величина скачка $-\dfrac\pi4-\dfrac\pi4=-\dfrac\pi2$.

**$x=1$.** $f(1)$ не существует. При $x\to1^-$: $\frac1{x-1}\to-\infty$, предел $-\dfrac\pi2$. При $x\to1^+$: $\frac1{x-1}\to+\infty$, предел $\dfrac\pi2$.
**Разрыв 1-го рода (скачок)**, величина скачка $\pi$.

**Ответ:** $x=0$ (скачок $-\frac\pi2$) и $x=1$ (скачок $\pi$), оба 1-го рода.` };

  /* ---------- теория (К61) ---------- */
  P.t13_1 = { c: String.raw`Сформулируйте критерий Коши существования предела последовательности. (1 балл)`, s: String.raw`Последовательность $\{x_n\}$ имеет конечный предел тогда и только тогда, когда она фундаментальна:
$$\forall\varepsilon>0\ \ \exists N\ \ \forall n,m>N:\ |x_n-x_m|<\varepsilon.$$` };

  P.t13_2 = { c: String.raw`Сформулируйте определение по Коши $\lim\limits_{x\to\infty}f(x)=b$, где $b\in\mathbb R$. Приведите соответствующий пример (с геометрической иллюстрацией). (2 балла)`, s: String.raw`**Определение.** $\lim\limits_{x\to\infty}f(x)=b\iff\forall\varepsilon>0\ \exists M>0\ \forall x:\ |x|>M\Rightarrow|f(x)-b|<\varepsilon.$

**Геометрически:** какую бы узкую горизонтальную полосу $b-\varepsilon<y<b+\varepsilon$ ни взять, найдётся $M$ такое, что при $|x|>M$ весь график лежит внутри этой полосы.

**Пример.** $\lim\limits_{x\to\infty}\dfrac1x=0$. Для $\varepsilon>0$ берём $M=\dfrac1\varepsilon$: при $|x|>M$ получаем $\left|\dfrac1x-0\right|=\dfrac1{|x|}<\varepsilon$. График гиперболы $y=\frac1x$ при $|x|>\frac1\varepsilon$ лежит в полосе $|y|<\varepsilon$.` };

  P.t13_3 = { c: String.raw`Сформулируйте теорему о связи функции, её предела и бесконечно малой. (1 балл)`, s: String.raw`Пусть $b\in\mathbb R$. Тогда $\lim\limits_{x\to a}f(x)=b$ тогда и только тогда, когда $f(x)=b+\alpha(x)$, где $\alpha(x)$ — бесконечно малая при $x\to a$ (то есть $\lim\limits_{x\to a}\alpha(x)=0$).` };

  /* ---------- привязка к фото ---------- */
  var items = {
    "Билет 12 (P61)": [["1", "sqrtDiff1"], ["2", "tgArcsin"], ["3", "pow10"], ["4", "b12_4"], ["5", "c12"]],
    "Билет 13 теория (К61)": [["1", "t13_1"], ["2", "t13_2"], ["3", "t13_3"]],
    "Билет 20 (P61)": [["3", "ctg3"], ["4", "b20_4"], ["5", "c20"]],
    "Билет 23 (P61)": [["1", "sqrt3"], ["2", "sinPiHalf"], ["3", "cosPow"], ["4", "expMinus2"]],
    "Билет 25 (P61)": [["1", "root4"], ["2", "sqrt10"], ["3", "lnSqrt"], ["4", "b25a4"], ["5", "c25a"]],
    "Билет 25 (P62)": [["1", "xSqrtDiff"], ["2", "eqv14"], ["3", "pow10b"], ["4", "expMinus2"], ["5", "c25b"]],
    "Билет 26 (P61)": [["1", "ratio111"], ["2", "eab"], ["3", "pow0"], ["4", "b26_4"], ["5", "c20"]],
    "Билет 27 (P62)": [["1", "sqrtCub"], ["2", "sinPiHalf"], ["3", "pow0"], ["4", "b27_4"], ["5", "c27"]],
    "Билет 29 (P62)": [["1", "sqrt32"], ["2", "eab"], ["3", "arcsinPow"], ["4", "b29_4"], ["5", "c29"]],
    "Билет 6 (P62)": [["1", "cubicDiff"], ["2", "sinLog"], ["3", "cosCtg"], ["4", "b6_4"], ["5", "c6"]],
    "Задание 1 (рукописное, кусочная функция arccos и arctg)": [["1", "c13"]],
    "Задания 2 (рукописные, несколько задач)": [["1", "cubeRoot"], ["2", "cubeRoot2"], ["3", "xLn"], ["4", "c6"]]
  };

  window.S30S.solutions = window.S30S.solutions || {};
  window.S30S.solutions["matan-rk1"] = { pool: P, items: items };
})();
