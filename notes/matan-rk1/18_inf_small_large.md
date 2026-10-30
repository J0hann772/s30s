# Тема 18. Связь бесконечно малой и бесконечно большой функций (л. 6, сл. 35–38)

## Теорема

**Теорема.** Если функция $y=\alpha(x)$ — бесконечно малая функция при $x\to x_0$, где $\alpha(x)\ne0$ для $\forall x\in\overset{\circ}{S}_\delta(x_0)$, то функция $\beta(x)=\dfrac1{\alpha(x)}$ — бесконечно большая функция при $x\to x_0$.

**Обратная теорема** [не из лекций]: если $f(x)$ — б.б.ф. при $x\to x_0$, то $\dfrac1{f(x)}$ — б.м.ф. при $x\to x_0$.

<details><summary>Доказательство (сл. 35–38)</summary>

Распишем определение б.м.ф. на языке $\delta,\varepsilon$:
$$\lim_{x\to x_0}\alpha(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|\alpha(x)|<\varepsilon.$$
Рассмотрим неравенство $|\alpha(x)|<\varepsilon$, верное при $\forall x\in\overset{\circ}{S}_\delta(x_0)$. Так как $\alpha(x)\ne0$ для $\forall x\in\overset{\circ}{S}_\delta(x_0)$, можно рассматривать обратное неравенство:
$$\frac1{|\alpha(x)|}>\frac1\varepsilon,\quad\forall x\in\overset{\circ}{S}_\delta(x_0).$$
Обозначим $M=\frac1\varepsilon$, где $\varepsilon$ — достаточно малое положительное число, $M$ — довольно большое положительное число. С учётом обозначений:
$$\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow\left|\frac1{\alpha(x)}\right|>M.$$
Это означает (по определению бесконечного предела и б.б.ф.), что $\lim\limits_{x\to x_0}\beta(x)=\infty$. **Теорема доказана.**

*Уточнение формы* [не из лекций]: в определении б.б.ф. квантор стоит по $M$: «$\forall M>0\ \exists\delta(M)$». Переход: для произвольного $M>0$ взять $\varepsilon=\frac1M$ и $\delta(M)=\delta\left(\frac1M\right)$ из определения б.м.ф.

*Обратная теорема* (идея): $|f(x)|>M=\frac1\varepsilon$ в $\overset{\circ}{S}_\delta(x_0)$ $\Rightarrow$ $\left|\frac1{f(x)}\right|<\varepsilon$.
</details>

## Рабочие формулы

- $\dfrac{c}{\text{б.м.}}=\text{б.б.}$ при $c\ne0$ (если б.м. $\ne0$ около $x_0$). Символически: $\frac c0=\infty$.
- $\dfrac{c}{\text{б.б.}}=\text{б.м.}$ Символически: $\frac c\infty=0$.
- Знак: если б.м. $\alpha(x)>0$ около $x_0$, то $\frac1\alpha\to+\infty$ (символически $\frac1{0+}=+\infty$); если $\alpha<0$ — $-\infty$.
- **Условие $\alpha(x)\ne0$ существенно:** $\alpha(x)=x\sin\frac1x$ — б.м. при $x\to0$, но обращается в $0$ в точках $\frac1{\pi n}$ сколь угодно близко к $0$, и $\frac1\alpha$ там не определена.

## Примеры

**Пример 1.** $\lim\limits_{x\to1}\dfrac{x+2}{x-1}$.

<details><summary>Решение</summary>

Числитель $\to3\ne0$, знаменатель $x-1$ — б.м., $\ne0$ при $x\ne1$. По теореме $\frac1{x-1}$ — б.б., а $(x+2)\cdot\frac1{x-1}$ — б.б. (б.б. × функция, отделённая от нуля). Ответ: $\infty$. Односторонние: $x\to1+$: $+\infty$; $x\to1-$: $-\infty$.
</details>

**Пример 2.** $\lim\limits_{x\to+\infty}\dfrac{5}{e^x+x}$.

<details><summary>Решение</summary>

$e^x+x$ — б.б. при $x\to+\infty$ (сумма двух $+\infty$). По обратной теореме $\frac1{e^x+x}$ — б.м., умножение на константу $5$ — б.м. Ответ: $0$.
</details>

## Типичные ошибки
- Писать $\frac1{\text{б.м.}}=\infty$, не проверив, что б.м. не обращается в $0$ около $x_0$.
- Путать $\infty$ и $+\infty$: теорема даёт $\infty$ (по модулю); знак — отдельно, по знаку $\alpha$.
- Применять к $\frac00$: теорема только для $\frac{c}{\text{б.м.}}$ с $c\ne0$.
