# Темы 14–16. Односторонние пределы, пределы на бесконечности, бесконечные пределы (л. 6, сл. 2–27)

## Общий принцип

Все определения предела устроены одинаково:
$$\lim_{x\to A}f(x)=B\iff\forall\ \text{окрестности }U(B)\ \ \exists\ \text{окрестность }V(A):\ \ \forall x\in V(A)\cap D_f\ \Rightarrow\ f(x)\in U(B).$$
Меняется только **вид окрестностей**:

| Куда стремится $x$ ($A$) | $V(A)$ — условие на $x$ | Параметр |
|---|---|---|
| $x_0$ (двусторонний) | $0<\lvert x-x_0\rvert<\delta$ | $\delta$ |
| $x_0+0$ (справа) | $0<x-x_0<\delta$ | $\delta$ |
| $x_0-0$ (слева) | $0<x_0-x<\delta$ | $\delta$ |
| $\infty$ | $\lvert x\rvert>N$ | $N$ |
| $+\infty$ | $x>N$ | $N$ |
| $-\infty$ | $x<-N$ | $N$ |

| Чему равен предел ($B$) | $U(B)$ — неравенство для $f$ | Параметр |
|---|---|---|
| число $a$ | $\lvert f(x)-a\rvert<\varepsilon$ | $\varepsilon$ |
| $\infty$ | $\lvert f(x)\rvert>M$ | $M$ |
| $+\infty$ | $f(x)>M$ | $M$ |
| $-\infty$ | $f(x)<-M$ | $M$ |

Шаблон: $\ \forall\ [\varepsilon\text{ или }M]>0\ \ \exists\ [\delta\text{ или }N]>0:\ \forall x:\ [\text{условие на }x]\ \Rightarrow\ [\text{неравенство для }f].$

Все $6\times4$ случая выписаны полностью — в теме 17.

Обозначения: $x\to x_0$ справа — $x\to x_0+0$ или $x\to x_0+$; слева — $x\to x_0-0$ или $x\to x_0-$.

## Определения лектора (кратко)

**Тема 14. Односторонние пределы.**
- **Опр. 1 (справа):** $\lim\limits_{x\to x_0+0}f(x)=a_1\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow|f(x)-a_1|<\varepsilon$.
- **Опр. 2 (слева):** $\lim\limits_{x\to x_0-0}f(x)=a_2\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow|f(x)-a_2|<\varepsilon$.
- **Опр. 3:** пределы справа и слева называются **односторонними**.

**Тема 15. Пределы на бесконечности.**
- **Опр. 4:** $\lim\limits_{x\to+\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x\in(N,+\infty)\Rightarrow|f(x)-a|<\varepsilon$.
- **Опр. 5:** $\lim\limits_{x\to-\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x\in(-\infty,-N)\Rightarrow|f(x)-a|<\varepsilon$.
- **Опр. 6:** $\lim\limits_{x\to\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x\in(-\infty,-N)\cup(N,+\infty)\Rightarrow|f(x)-a|<\varepsilon$.
- **Опр. 7:** пределы при $x\to+\infty$ и $x\to-\infty$ тоже называются **односторонними**.

**Тема 16. Бесконечные пределы.**
- **Опр. 8:** $\lim\limits_{x\to x_0}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)|>M$.
- **Опр. 9:** $\lim\limits_{x\to x_0}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow f(x)>M$.
- **Опр. 10:** $\lim\limits_{x\to x_0}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow f(x)<-M$.
- **Бесконечно большой предел на бесконечности (сл. 27):**
  $\lim\limits_{x\to\infty}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x\in(-\infty,-N)\cup(N,+\infty)\Rightarrow|f(x)|>M$; для $+\infty$, $-\infty$ — с $f(x)>M$, $f(x)<-M$.

**Что реально отличается:**
- Для $\pm\infty$ в роли $B$ ($+\infty$, $-\infty$) важен **знак**; $\infty$ — только модуль. $+\infty$ и $-\infty$ — частные случаи $\infty$, но не наоборот.
- Для $\infty$ в роли $A$: окрестность — объединение двух лучей, $|x|>N$.
- В $\delta(M)$ и $N(\varepsilon)$ параметр — функция от «точности» по $f$, как и $\delta(\varepsilon)$.

## Теорема (о связи двустороннего предела с односторонними) (сл. 10)

Двусторонний предел функции $y=f(x)$ при $x\to x_0$ существует тогда и только тогда, когда существуют оба односторонних предела и они равны. При этом двусторонний предел равен односторонним:
$$\exists\lim_{x\to x_0}f(x)=a\iff\exists\lim_{x\to x_0+0}f(x),\ \exists\lim_{x\to x_0-0}f(x),\ \lim_{x\to x_0+0}f(x)=\lim_{x\to x_0-0}f(x)=a.$$

В лекции без доказательства (кадры 11–12 пустые). **Идея** [не из лекций]: $(\Rightarrow)$ $\overset{\circ}{S}{}^\pm_\delta(x_0)\subset\overset{\circ}{S}_\delta(x_0)$, то же $\delta$ годится. $(\Leftarrow)$ взять $\delta=\min(\delta_+,\delta_-)$: тогда $\overset{\circ}{S}_\delta(x_0)=\overset{\circ}{S}{}^+_\delta\cup\overset{\circ}{S}{}^-_\delta$ и неравенство выполнено на обеих половинах.

Аналог [не из лекций]: $\lim\limits_{x\to\infty}f(x)=a\iff\lim\limits_{x\to+\infty}f(x)=\lim\limits_{x\to-\infty}f(x)=a$.

**Рабочее следствие:** если односторонние пределы различны или хотя бы один не существует — двустороннего предела нет.

## Символическая арифметика с $0^\pm$ и $\pm\infty$ (как пишет лектор)

| Запись | Значение |
|---|---|
| $\frac1{0+}$, $\ \frac1{0-}$ | $+\infty$, $\ -\infty$ |
| $\frac1{(0\pm)^2}$ | $+\infty$ |
| $\frac1{\pm\infty}$ | $0$ |
| $3^{+\infty}$, $\ 3^{-\infty}$ (основание $>1$) | $+\infty$, $\ 0$ |
| $e^{+\infty}$, $\ e^{-\infty}$ | $+\infty$, $\ 0$ |
| $\operatorname{arctg}(\pm\infty)$ | $\pm\frac\pi2$ |
| $\ln(0+)$ | $-\infty$ |
| $\sqrt{0+}$ | $0$ |

Это сокращённая запись пределов, а не арифметика чисел: «$\frac1{0+}=+\infty$» означает «если $g(x)\to0$, $g(x)>0$, то $\frac1{g(x)}\to+\infty$» (тема 18).

## Примеры лектора (сл. 6–9, 17–19, 25–26), ответы

| Функция | Точка | Справа / при $+\infty$ | Слева / при $-\infty$ |
|---|---|---|---|
| $\ln x$, $D_f=(0,+\infty)$ | $0$ | $-\infty$ | не существует (не определена) |
| $\sqrt{-x}$, $D_f=(-\infty,0]$ | $0$ | не существует | $\sqrt{0+}=0$ |
| $(3+x)^{1/x}$ | $0$ | $3^{1/(0+)}=3^{+\infty}=+\infty$ | $3^{1/(0-)}=3^{-\infty}=0$ |
| $\frac{x-5}{\lvert x-5\rvert}$ | $5$ | $1$ | $-1$ |
| $\frac1x$ | $0$ | $+\infty$ | $-\infty$ |
| $\frac1{(x-1)^2}$ | $1$ | $+\infty$ | $+\infty$ |
| $\operatorname{arctg}x$ | $\infty$ | $\frac\pi2$ | $-\frac\pi2$ |
| $e^x$ | $\infty$ | $+\infty$ | $0$ |
| $\frac1x$ | $\infty$ | $0$ | $0$ |
| $x^2$ | $\infty$ | $+\infty$ | $(-\infty)^2=+\infty$ |

Выводы: у $\frac{x-5}{|x-5|}$, $\frac1x$, $(3+x)^{1/x}$ двустороннего предела в точке нет; $\lim\limits_{x\to1}\frac1{(x-1)^2}=+\infty$; $\lim\limits_{x\to\infty}\frac1x=0$; $\lim\limits_{x\to\infty}\operatorname{arctg}x$ и $\lim\limits_{x\to\infty}e^x$ не существуют.

## Алгоритм: когда считать односторонние пределы

Признаки в выражении: $|x-x_0|$; деление на выражение, обращающееся в $0$ в $x_0$; показатель $\frac1{x-x_0}$; $\operatorname{arctg}\frac1{x-x_0}$; кусочное задание; корень чётной степени или $\ln$ на границе $D_f$; $x\to\infty$ при $\operatorname{arctg}x$, $e^x$, $\sqrt{x^2}=|x|$.

1. Посчитать предел справа: подставить $x=x_0+0$, раскрыть модуль ($|x-x_0|=x-x_0$), определить знак «нуля» ($0+$).
2. То же слева ($|x-x_0|=-(x-x_0)$, $0-$).
3. Сравнить: равны — двусторонний предел есть и равен им; различны или один не существует — двустороннего нет.

## Разобранные примеры

**Пример 1.** $\lim\limits_{x\to2}\operatorname{arctg}\dfrac1{x-2}$.

<details><summary>Решение</summary>

Справа: $x-2\to0+$, $\frac1{x-2}\to+\infty$, $\operatorname{arctg}(+\infty)=\frac\pi2$.
Слева: $x-2\to0-$, $\frac1{x-2}\to-\infty$, $\operatorname{arctg}(-\infty)=-\frac\pi2$.
$\frac\pi2\ne-\frac\pi2$ — двустороннего предела нет.
</details>

**Пример 2.** $\lim\limits_{x\to\infty}\dfrac{\sqrt{x^2+1}}{x}$.

<details><summary>Решение</summary>

$\sqrt{x^2+1}=|x|\sqrt{1+\frac1{x^2}}$, поэтому $\dfrac{\sqrt{x^2+1}}x=\dfrac{|x|}x\sqrt{1+\frac1{x^2}}$.
При $x\to+\infty$: $\frac{|x|}x=1$, предел $1$. При $x\to-\infty$: $\frac{|x|}x=-1$, предел $-1$.
Различны — $\lim\limits_{x\to\infty}$ не существует (существуют только $\lim\limits_{x\to\pm\infty}=\pm1$).
</details>

## Типичные ошибки
- Выносить $x$ из-под корня без модуля при $x\to-\infty$ или $x\to\infty$.
- Писать $\lim\limits_{x\to0}\frac1x=\infty$ и считать, что «предел есть»: как $\infty$ — да (опр. 8, $|f|>M$), но $+\infty$ или $-\infty$ — нет; на РК уточнять, о каком смысле речь.
- Считать $\lim\limits_{x\to\infty}e^x=+\infty$: при $x\to-\infty$ это $0$, двустороннего (по $\infty$) нет.
- Путать $\overset{\circ}{S}{}^+_\delta$ ($0<x-x_0<\delta$) и $S^+_\delta$ ($0\le x-x_0<\delta$).
