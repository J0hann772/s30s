# Тема 17. Сводные определения пределов в кванторах (л. 6, сл. 29–34)

Лектор даёт 6 таблиц (по $A\in\{x_0,\ x_0+,\ x_0-,\ \infty,\ +\infty,\ -\infty\}$), в каждой 6 строк: $a,\ b,\ 0,\ \infty,\ -\infty,\ +\infty$. Строка $b$ в слайдах повторяет строку $a$ с другой буквой (любое конечное число), поэтому ниже она не дублируется. Строка $0$ — частный случай $a=0$ (б.м.ф.), оставлена.

> **Расхождение со слайдами.** **Как в слайдах 32–34:** в таблицах для $x\to\infty$, $x\to+\infty$, $x\to-\infty$ в строках $\infty,\ -\infty,\ +\infty$ написано $\exists\delta(M)>0$, а дальше условие $|x|>N$ (или $x>N$, $x<-N$) — буква $N$ нигде не введена. **Правильно:** $\exists N(M)>0$. Так и на сл. 27 той же лекции. **На РК** писать $N(M)$.

Шаблон отрицания (для всех случаев): $\forall\to\exists$, $\exists\to\forall$, условие на $x$ сохраняется, неравенство для $f$ заменяется противоположным:
$$\lim_{x\to A}f(x)\ne B\iff\exists\,[\varepsilon\text{ или }M]>0\ \ \forall\,[\delta\text{ или }N]>0\ \ \exists x:\ [\text{условие на }x]\ \wedge\ [\text{отрицание неравенства для }f].$$

| $B$ | Неравенство | Его отрицание |
|---|---|---|
| $a$ | $\lvert f(x)-a\rvert<\varepsilon$ | $\lvert f(x)-a\rvert\ge\varepsilon$ |
| $0$ | $\lvert f(x)\rvert<\varepsilon$ | $\lvert f(x)\rvert\ge\varepsilon$ |
| $\infty$ | $\lvert f(x)\rvert>M$ | $\lvert f(x)\rvert\le M$ |
| $-\infty$ | $f(x)<-M$ | $f(x)\ge-M$ |
| $+\infty$ | $f(x)>M$ | $f(x)\le M$ |

## 1. $x\to x_0$ (сл. 29)

**Определения (Коши):**
$$\lim_{x\to x_0}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to x_0}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to x_0}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)|>M$$
$$\lim_{x\to x_0}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow f(x)<-M$$
$$\lim_{x\to x_0}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow f(x)>M$$
где $x\in\overset{\circ}{S}_\delta(x_0)\iff0<|x-x_0|<\delta$.

**Отрицания** [не из лекций]:
$$\lim_{x\to x_0}f(x)\ne a\iff\exists\varepsilon>0\ \forall\delta>0\ \exists x\in\overset{\circ}{S}_\delta(x_0):\ |f(x)-a|\ge\varepsilon$$
$$\lim_{x\to x_0}f(x)\ne0\iff\exists\varepsilon>0\ \forall\delta>0\ \exists x\in\overset{\circ}{S}_\delta(x_0):\ |f(x)|\ge\varepsilon$$
$$\lim_{x\to x_0}f(x)\ne\infty\iff\exists M>0\ \forall\delta>0\ \exists x\in\overset{\circ}{S}_\delta(x_0):\ |f(x)|\le M$$
$$\lim_{x\to x_0}f(x)\ne-\infty\iff\exists M>0\ \forall\delta>0\ \exists x\in\overset{\circ}{S}_\delta(x_0):\ f(x)\ge-M$$
$$\lim_{x\to x_0}f(x)\ne+\infty\iff\exists M>0\ \forall\delta>0\ \exists x\in\overset{\circ}{S}_\delta(x_0):\ f(x)\le M$$

## 2. $x\to x_0+$ (сл. 30)

$$\lim_{x\to x_0+}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to x_0+}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to x_0+}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow|f(x)|>M$$
$$\lim_{x\to x_0+}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow f(x)<-M$$
$$\lim_{x\to x_0+}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^+_\delta(x_0)\Rightarrow f(x)>M$$
где $x\in\overset{\circ}{S}{}^+_\delta(x_0)\iff0<x-x_0<\delta$.

**Отрицания:** $\exists[\varepsilon|M]>0\ \forall\delta>0\ \exists x:\ 0<x-x_0<\delta\ \wedge$ [отрицание неравенства по таблице]. Например:
$$\lim_{x\to x_0+}f(x)\ne a\iff\exists\varepsilon>0\ \forall\delta>0\ \exists x:\ 0<x-x_0<\delta,\ |f(x)-a|\ge\varepsilon.$$

## 3. $x\to x_0-$ (сл. 31)

$$\lim_{x\to x_0-}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to x_0-}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to x_0-}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow|f(x)|>M$$
$$\lim_{x\to x_0-}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow f(x)<-M$$
$$\lim_{x\to x_0-}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x\in\overset{\circ}{S}{}^-_\delta(x_0)\Rightarrow f(x)>M$$
где $x\in\overset{\circ}{S}{}^-_\delta(x_0)\iff0<x_0-x<\delta$.

**Отрицания:** $\exists[\varepsilon|M]>0\ \forall\delta>0\ \exists x:\ 0<x_0-x<\delta\ \wedge$ [отрицание неравенства]. Например:
$$\lim_{x\to x_0-}f(x)\ne+\infty\iff\exists M>0\ \forall\delta>0\ \exists x:\ 0<x_0-x<\delta,\ f(x)\le M.$$

## 4. $x\to\infty$ (сл. 32)

$$\lim_{x\to\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ |x|>N\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to\infty}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ |x|>N\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to\infty}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ |x|>N\Rightarrow|f(x)|>M\quad\text{(в слайде }\delta(M))$$
$$\lim_{x\to\infty}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ |x|>N\Rightarrow f(x)<-M$$
$$\lim_{x\to\infty}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ |x|>N\Rightarrow f(x)>M$$

**Отрицания:** $\exists[\varepsilon|M]>0\ \forall N>0\ \exists x:\ |x|>N\ \wedge$ [отрицание]. Например:
$$\lim_{x\to\infty}f(x)\ne a\iff\exists\varepsilon>0\ \forall N>0\ \exists x:\ |x|>N,\ |f(x)-a|\ge\varepsilon.$$

## 5. $x\to+\infty$ (сл. 33)

$$\lim_{x\to+\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ x>N\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to+\infty}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ x>N\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to+\infty}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x>N\Rightarrow|f(x)|>M$$
$$\lim_{x\to+\infty}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x>N\Rightarrow f(x)<-M$$
$$\lim_{x\to+\infty}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x>N\Rightarrow f(x)>M$$

**Отрицания:** $\exists[\varepsilon|M]>0\ \forall N>0\ \exists x:\ x>N\ \wedge$ [отрицание]. Например:
$$\lim_{x\to+\infty}f(x)\ne+\infty\iff\exists M>0\ \forall N>0\ \exists x>N:\ f(x)\le M.$$

## 6. $x\to-\infty$ (сл. 34)

$$\lim_{x\to-\infty}f(x)=a\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ x<-N\Rightarrow|f(x)-a|<\varepsilon$$
$$\lim_{x\to-\infty}f(x)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ \forall x:\ x<-N\Rightarrow|f(x)|<\varepsilon$$
$$\lim_{x\to-\infty}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x<-N\Rightarrow|f(x)|>M$$
$$\lim_{x\to-\infty}f(x)=-\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x<-N\Rightarrow f(x)<-M$$
$$\lim_{x\to-\infty}f(x)=+\infty\overset{def}{\iff}\forall M>0\ \exists N(M)>0:\ \forall x:\ x<-N\Rightarrow f(x)>M$$

**Отрицания:** $\exists[\varepsilon|M]>0\ \forall N>0\ \exists x:\ x<-N\ \wedge$ [отрицание]. Например:
$$\lim_{x\to-\infty}f(x)\ne0\iff\exists\varepsilon>0\ \forall N>0\ \exists x<-N:\ |f(x)|\ge\varepsilon.$$

## Определения по Гейне для всех случаев [не из лекций — у лектора только случай $x\to x_0$, $B=a$]

$$\lim_{x\to A}f(x)=B\iff\forall\{x_n\}\subset D_f,\ \text{удовлетворяющей условию }(A)\ \Rightarrow\ \lim_{n\to\infty}f(x_n)=B.$$

| $A$ | Условие на последовательность $(A)$ |
|---|---|
| $x_0$ | $x_n\ne x_0$, $\ x_n\to x_0$ |
| $x_0+$ | $x_n>x_0$, $\ x_n\to x_0$ |
| $x_0-$ | $x_n<x_0$, $\ x_n\to x_0$ |
| $\infty$ | $\lvert x_n\rvert\to+\infty$ |
| $+\infty$ | $x_n\to+\infty$ |
| $-\infty$ | $x_n\to-\infty$ |

$B$ — число, $\infty$, $+\infty$ или $-\infty$; «$f(x_n)\to B$» — в смысле предела последовательности (тема 6, включая бесконечные пределы).

**Отрицание по Гейне:**
$$\lim_{x\to A}f(x)\ne B\iff\exists\{x_n\}\subset D_f\ \text{с условием }(A):\ f(x_n)\not\to B.$$
**Несуществование предела:** две последовательности с условием $(A)$, на которых $f(x_n')\to B_1$, $f(x_n'')\to B_2$, $B_1\ne B_2$.

## Алгоритм: как выписать нужное определение на РК

1. Определить $A$ (куда стремится $x$) → выбрать условие на $x$ и букву $\delta$ или $N$.
2. Определить $B$ (чему равен предел) → выбрать неравенство и букву $\varepsilon$ или $M$.
3. Собрать: $\forall[\varepsilon|M]>0\ \exists[\delta|N]([\varepsilon|M])>0:\ \forall x:\ [\text{условие}]\Rightarrow[\text{неравенство}]$.
4. Для отрицания: переставить кванторы, условие оставить, неравенство заменить противоположным.
5. Проверить, что параметр в скобках совпадает с внешней буквой: $\delta(\varepsilon)$, $\delta(M)$, $N(\varepsilon)$, $N(M)$.

## Разобранные примеры (доказательство по определению)

**Пример 1 ($x\to x_0$, $B=+\infty$).** Доказать $\lim\limits_{x\to1}\dfrac1{(x-1)^2}=+\infty$.

<details><summary>Решение</summary>

Нужно: $\forall M>0\ \exists\delta(M)>0:\ 0<|x-1|<\delta\Rightarrow\frac1{(x-1)^2}>M$.
$\frac1{(x-1)^2}>M\iff(x-1)^2<\frac1M\iff|x-1|<\frac1{\sqrt M}$ (при $x\ne1$). Берём $\delta(M)=\frac1{\sqrt M}$.
</details>

**Пример 2 ($x\to+\infty$, $B=a$).** Доказать $\lim\limits_{x\to+\infty}\dfrac{2x+1}{x}=2$.

<details><summary>Решение</summary>

Нужно: $\forall\varepsilon>0\ \exists N(\varepsilon)>0:\ x>N\Rightarrow\left|\frac{2x+1}x-2\right|<\varepsilon$.
$\left|\frac{2x+1}x-2\right|=\frac1{|x|}=\frac1x<\varepsilon\iff x>\frac1\varepsilon$ (при $x>0$). Берём $N(\varepsilon)=\frac1\varepsilon$.
</details>

**Пример 3 ($x\to-\infty$, $B=-\infty$).** Доказать $\lim\limits_{x\to-\infty}x^3=-\infty$.

<details><summary>Решение</summary>

Нужно: $\forall M>0\ \exists N(M)>0:\ x<-N\Rightarrow x^3<-M$.
$x^3<-M\iff x<-\sqrt[3]M$. Берём $N(M)=\sqrt[3]M$.
</details>

**Пример 4 (отрицание: $B$ — число, $x\to x_0+$).** Доказать, что $\lim\limits_{x\to0+}\sin\dfrac1x\ne0$.

<details><summary>Решение</summary>

Отрицание: $\exists\varepsilon>0\ \forall\delta>0\ \exists x:\ 0<x<\delta,\ \left|\sin\frac1x\right|\ge\varepsilon$.
Берём $\varepsilon=\frac12$. Для любого $\delta>0$ выберем $n\in\mathbb N$ с $\frac1{\frac\pi2+2\pi n}<\delta$ и $x=\frac1{\frac\pi2+2\pi n}$: $0<x<\delta$, $\sin\frac1x=1\ge\frac12$.
</details>

**Пример 5 (отрицание: $B=\infty$, $x\to+\infty$).** Доказать, что $x\sin x$ не является б.б.ф. при $x\to+\infty$.

<details><summary>Решение</summary>

Отрицание $\lim\limits_{x\to+\infty}f=\infty$: $\exists M>0\ \forall N>0\ \exists x>N:\ |f(x)|\le M$.
Берём $M=1$. Для любого $N$ выберем $n\in\mathbb N$, $\pi n>N$, и $x=\pi n$: $|x\sin x|=|\pi n\cdot0|=0\le1$.
</details>

## Типичные ошибки
- Писать $\delta(M)$ при $x\to\infty$ (как в слайдах 32–34) — правильно $N(M)$.
- Путать роли букв: $\varepsilon,M$ — «точность» по $f$ (под $\forall$); $\delta,N$ — «окрестность» по $x$ (под $\exists$).
- В условии на $x$ для конечной точки забывать $0<$ (окрестность проколотая).
- В отрицании отрицать и условие на $x$: оно сохраняется, отрицается только неравенство для $f$.
- Для $B=\infty$ ставить $f(x)>M$ вместо $|f(x)|>M$.
