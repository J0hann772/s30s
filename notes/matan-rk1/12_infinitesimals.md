# Тема 12. Бесконечно малые и бесконечно большие функции (л. 5, сл. 2–25)

## Определения

**Определение 1.** Функция $y=f(x)$ называется **бесконечно малой** (б.м.ф.), или бесконечно малой величиной, при $x\to x_0$, если
$$\lim_{x\to x_0}f(x)=0.$$

**Определение 2.** Функция $y=f(x)$ называется **бесконечно большой** (б.б.ф.), или бесконечно большой величиной, при $x\to x_0$, если
$$\lim_{x\to x_0}f(x)=\infty.$$

Обозначения: $\alpha(x),\ \beta(x),\ \chi(x),\dots$

В качестве предельной точки можно рассматривать не только конечное число, но и бесконечность.

В кванторах (по определениям лекций 3–4 и 6):
$$\alpha(x)\ \text{— б.м.ф. при}\ x\to x_0\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|\alpha(x)|<\varepsilon,$$
$$f(x)\ \text{— б.б.ф. при}\ x\to x_0\iff\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)|>M.$$

> **Расхождение со слайдами.** В лекции 5 (сл. 14, 22, 24, 30, 36, 45, 51) определения расписаны с **непроколотой** окрестностью $\forall x\in S_\delta(x_0)$. По определению предела (л. 3–4) окрестность проколотая. На РК писать $\overset{\circ}{S}_\delta(x_0)$. См. «Расхождения со слайдами».

**Примеры (сл. 3–5):**
1. $y=x-2$ — б.м.ф. при $x\to2$: $\lim\limits_{x\to2}(x-2)=2-2=0$.
2. $y=\sin x$ — б.м.ф. при $x\to0$: $\lim\limits_{x\to0}\sin x=\sin0=0$.
3. $y=\sin\frac1x$ — б.м.ф. при $x\to\infty$: $\lim\limits_{x\to\infty}\sin\frac1x=\sin\frac1\infty=\sin0=0$.
4. $y=x$ — б.м.ф. при $x\to0$.
5. $y=\operatorname{tg}x$ — б.м.ф. при $x\to0$: $\operatorname{tg}0=0$.
6. $y=x$ — б.б.ф. при $x\to\infty$.
7. $y=e^x$ — б.б.ф. при $x\to+\infty$: $e^{+\infty}=+\infty$.
8. $y=e^x$ — б.м.ф. при $x\to-\infty$: $e^{-\infty}=\frac1{e^{+\infty}}=\frac1{+\infty}=0$.

Одна и та же функция может быть б.м., б.б. или ни той ни другой — в зависимости от того, куда стремится $x$ (примеры 4, 6; 7, 8).

**Б.б.ф. и неограниченность** [не из лекций]: б.б.ф. при $x\to x_0$ не является локально ограниченной, но не всякая неограниченная функция — б.б. Пример: $x\sin x$ при $x\to\infty$ не ограничена, но не б.б. (в точках $x=\pi n$ она равна $0$).

## Теоремы (свойства б.м.ф.)

**Теорема 1 (о сумме конечного числа б.м.ф.).** Сумма конечного числа бесконечно малых функций при $x\to x_0$ есть бесконечно малая функция.

**Теорема 2 (о произведении б.м.ф. на локально ограниченную).** Произведение бесконечно малой функции на локально ограниченную есть величина бесконечно малая.

**Следствие 1.** Так как любая б.м.ф. при $x\to x_0$ является локально ограниченной (теорема 2 л. 3–4: функция с конечным пределом локально ограничена), то произведение двух б.м.ф. при $x\to x_0$ есть б.м.ф. (по теореме 2).

**Следствие 2.** Произведение б.м.ф. при $x\to x_0$ на число (константу) есть б.м.ф. при $x\to x_0$.

**Теорема 3 (связь функции, её предела и б.м.ф.).** Функция имеет конечный предел при $x\to x_0$ тогда и только тогда, когда её можно представить в виде суммы этого конечного предела и некоторой б.м.ф. при $x\to x_0$:
$$\lim_{x\to x_0}f(x)=a\iff f(x)=a+\alpha(x),\quad\alpha(x)\ \text{— б.м.ф. при}\ x\to x_0.$$

**Свойства б.б.ф.** [не из лекций, без доказательства; нужны для практики]:
- б.б.ф. + ограниченная функция — б.б.ф.;
- сумма б.б.ф. одного знака ($+\infty$ и $+\infty$) — б.б.ф. того же знака;
- б.б.ф. × функция, отделённая от нуля ($|g(x)|\ge c>0$ около $x_0$), — б.б.ф.; в частности, б.б. × б.б. — б.б.;
- связь б.м. и б.б. ($\frac1\alpha$ — б.б.) — тема 18 (л. 6), там с доказательством.

## Доказательства

<details><summary>Теорема 1 (сл. 6–10, кадры 7–8 — анимация)</summary>

Дано: конечное число б.м.ф., например две: $\alpha(x),\beta(x)$ при $x\to x_0$. Доказать: $\chi(x)=\alpha(x)+\beta(x)$ — б.м.ф. при $x\to x_0$.

Распишем определения:
$$(1):\ \lim_{x\to x_0}\alpha(x)=0\overset{def}{\iff}\forall\varepsilon_1>0\ \exists\delta_1(\varepsilon_1)>0:\ \forall x\in\overset{\circ}{S}_{\delta_1}(x_0)\Rightarrow|\alpha(x)|<\varepsilon_1,$$
$$(2):\ \lim_{x\to x_0}\beta(x)=0\overset{def}{\iff}\forall\varepsilon_2>0\ \exists\delta_2(\varepsilon_2)>0:\ \forall x\in\overset{\circ}{S}_{\delta_2}(x_0)\Rightarrow|\beta(x)|<\varepsilon_2.$$
Выберем $\delta=\min(\delta_1,\delta_2)$, $\ \varepsilon_1=\varepsilon_2=\dfrac\varepsilon2$. Тогда $\forall x\in\overset{\circ}{S}_\delta(x_0)$:
$$|\chi(x)|=|\alpha(x)+\beta(x)|\le|\alpha(x)|+|\beta(x)|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon.$$
Это означает $\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|\chi(x)|<\varepsilon\iff\lim\limits_{x\to x_0}\chi(x)=0$. **Теорема доказана.**
</details>

<details><summary>Теорема 2 (сл. 11–15, кадры 12–13 — анимация)</summary>

Дано: $\alpha(x)$ — б.м.ф. при $x\to x_0$; $\beta(x)$ — локально ограниченная в окрестности $x_0$. Доказать: $\chi(x)=\alpha(x)\cdot\beta(x)$ — б.м.ф.

$$(1):\ \lim_{x\to x_0}\alpha(x)=0\overset{def}{\iff}\forall\varepsilon_1>0\ \exists\delta_1(\varepsilon_1)>0:\ \forall x\in\overset{\circ}{S}_{\delta_1}(x_0)\Rightarrow|\alpha(x)|<\varepsilon_1,$$
$$(2):\ \beta(x)\ \text{— лок. огр.}\overset{def}{\iff}\exists M\in R,\ M>0,\ \exists\overset{\circ}{S}_{\delta_2}(x_0):\ \forall x\in\overset{\circ}{S}_{\delta_2}(x_0)\Rightarrow|\beta(x)|\le M.$$
Выберем $\delta=\min(\delta_1,\delta_2)$, $\ \varepsilon_1=\dfrac\varepsilon M$. Тогда $\forall x\in\overset{\circ}{S}_\delta(x_0)$:
$$|\chi(x)|=|\alpha(x)\cdot\beta(x)|=|\alpha(x)|\cdot|\beta(x)|<\varepsilon_1\cdot M=\frac\varepsilon M\cdot M=\varepsilon.$$
Значит, $\lim\limits_{x\to x_0}\chi(x)=0$. **Теорема доказана.**

Следствие 2 [пояснение не из лекций]: константа $k$ — ограниченная функция ($|k|\le|k|+1$), применяем теорему 2.
</details>

<details><summary>Теорема 3 (сл. 19–25, кадры 20–21 — анимация)</summary>

**Необходимость ($\Rightarrow$).** Дано: $\lim\limits_{x\to x_0}f(x)=a$. Доказать: $f(x)=a+\alpha(x)$, $\alpha(x)$ — б.м.ф.

Распишем определение предела:
$$\lim_{x\to x_0}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon.$$
Обозначим $\alpha(x)=f(x)-a$, тогда верно
$$\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|\alpha(x)|<\varepsilon.$$
Это означает (по определению предела функции в точке), что $\lim\limits_{x\to x_0}\alpha(x)=0$, т. е. (по определению б.м.ф.) $\alpha(x)$ — б.м.ф. при $x\to x_0$. Из обозначения $\alpha(x)=f(x)-a$ выражаем $f(x)=a+\alpha(x)$. Необходимость доказана.

**Достаточность ($\Leftarrow$).** Дано: $f(x)=a+\alpha(x)$, $\alpha(x)$ — б.м.ф. Доказать: $\lim\limits_{x\to x_0}f(x)=a$.

Распишем определение б.м.ф. на языке $\varepsilon,\delta$:
$$\lim_{x\to x_0}\alpha(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|\alpha(x)|<\varepsilon.$$
По условию $\alpha(x)=f(x)-a$, получаем
$$\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon,$$
т. е. $\lim\limits_{x\to x_0}f(x)=a$. Достаточность доказана. **Теорема полностью доказана.**
</details>

## Рабочие формулы

- б.м. + б.м. = б.м. (конечное число слагаемых).
- б.м. × локально ограниченная = б.м.; б.м. × б.м. = б.м.; б.м. × const = б.м.
- $\lim f=a\iff f=a+\alpha$, $\alpha\to0$.
- Типовые ограниченные множители: $|\sin u|\le1$, $|\cos u|\le1$, $|\operatorname{arctg}u|<\frac\pi2$, $|(-1)^n|=1$, $0\le\{x\}<1$ (дробная часть) — **для любого** аргумента $u$.
- Типовые б.м.: $\frac1{x^k}$ ($k>0$) при $x\to\infty$; $x^k$ ($k>0$) при $x\to0$; $e^x$ при $x\to-\infty$; $e^{-x}$ при $x\to+\infty$.
- **Внимание:** б.м. × неограниченная — неопределённость $0\cdot\infty$ (не обязательно $0$).

## Алгоритм: предел, в котором один множитель не имеет предела

Признак: в выражении стоят $\sin(\dots)$, $\cos(\dots)$, $\operatorname{arctg}(\dots)$, $(-1)^n$ с аргументом, который не имеет предела (например, $\sin x$ при $x\to\infty$, $\cos\frac1x$ при $x\to0$).

1. Выделить множитель $\beta(x)$, не имеющий предела, и показать его ограниченность в проколотой окрестности: $|\beta(x)|\le M$.
2. Показать, что второй множитель $\alpha(x)$ — б.м.ф. (подстановкой, арифметикой пределов).
3. По теореме 2 произведение — б.м.ф., предел равен $0$.
4. Если ограниченный множитель стоит в сумме, а не в произведении — сначала поделить/вынести так, чтобы он оказался множителем при б.м.

## Разобранные примеры

**Пример 1 (из лекции, сл. 16–18).** $\lim\limits_{x\to\infty}\dfrac{\sin x}{x}$.

<details><summary>Решение</summary>

$$\lim_{x\to\infty}\frac{\sin x}x=\lim_{x\to\infty}\frac1x\cdot\sin x.$$
$\alpha(x)=\frac1x$ — б.м.ф. при $x\to\infty$: $\lim\limits_{x\to\infty}\frac1x=\frac1\infty=0$.
$\beta(x)=\sin x$ — локально ограниченная функция в окрестности $\infty$: $\sin x\in[-1;1]$.
Тогда $\frac{\sin x}x$ — б.м.ф. при $x\to\infty$ (теорема 2): $\lim\limits_{x\to\infty}\frac{\sin x}x=0$.

(Не путать с первым замечательным пределом: там $x\to0$ и ответ $1$.)
</details>

**Пример 2.** $\lim\limits_{x\to0}x^2\cos\dfrac1x$.

<details><summary>Решение</summary>

$\cos\frac1x$ предела при $x\to0$ не имеет (по Гейне, как $\sin\frac1x$ в теме 9), но $\left|\cos\frac1x\right|\le1$ при $x\ne0$ — локально ограничена. $x^2$ — б.м.ф. при $x\to0$. По теореме 2: $\lim\limits_{x\to0}x^2\cos\frac1x=0$.
</details>

**Пример 3.** $\lim\limits_{x\to\infty}\dfrac{\operatorname{arctg}x+\cos x^2}{x^2+1}$.

<details><summary>Решение</summary>

Числитель ограничен: $|\operatorname{arctg}x+\cos x^2|\le|\operatorname{arctg}x|+|\cos x^2|<\frac\pi2+1$.
$\frac1{x^2+1}$ — б.м.ф. при $x\to\infty$.
Произведение б.м. на ограниченную — б.м.: предел равен $0$.
</details>

**Пример 4 (теорема 3).** Показать, что $\lim\limits_{x\to\infty}\dfrac{2x+3}{x}=2$, выделив б.м.ф.

<details><summary>Решение</summary>

$\dfrac{2x+3}x=2+\dfrac3x$. Функция $\alpha(x)=\frac3x$ — б.м.ф. при $x\to\infty$ (следствие 2: константа $3$ на б.м. $\frac1x$). По теореме 3 (достаточность): $\lim\limits_{x\to\infty}\frac{2x+3}x=2$.
</details>

**Пример 5 (почему нужна ограниченность).** $\lim\limits_{x\to0}x\cdot\dfrac1x$.

<details><summary>Решение</summary>

$x$ — б.м.ф., но $\frac1x$ не локально ограничена при $x\to0$ (тема 10). Теорема 2 неприменима. Действительно, $x\cdot\frac1x=1\to1\ne0$.
</details>

## Типичные ошибки

- Применять теорему 2, когда второй множитель не ограничен ($0\cdot\infty$ — неопределённость, пример 5).
- Путать $\lim\limits_{x\to\infty}\frac{\sin x}x=0$ и $\lim\limits_{x\to0}\frac{\sin x}x=1$.
- Пытаться найти $\lim\sin x$ при $x\to\infty$ и подставлять «$\sin\infty$»: такого предела нет, нужна ограниченность.
- Говорить «функция бесконечно малая» без указания, при каком стремлении $x$.
- Считать любую неограниченную функцию бесконечно большой ($x\sin x$ при $x\to\infty$).
- Переписывать со слайдов определения с непроколотой окрестностью $S_\delta(x_0)$.
