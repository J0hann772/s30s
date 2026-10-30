# Тема 20. Второй замечательный предел и его следствия (л. 7–8, сл. 18–24)

## Теорема

Как известно, предел последовательности $\left(1+\frac1n\right)^n$ равен $e\approx2{,}7182818284590\dots$ (тема 8a):
$$\lim_{n\to\infty}\left(1+\frac1n\right)^n=e.$$

**Теорема.**
$$\lim_{x\to\infty}\left(1+\frac1x\right)^x=e.$$

В лекции **без доказательства** (кадр 19 пустой). В слайде 18 опечатка: «как известно **передел** последовательности».

<details><summary>Доказательство [не из лекций] и опоры</summary>

**Опоры:** предел последовательности $\left(1+\frac1n\right)^n=e$ (тема 8a; в лекции заявлен без доказательства); целая часть; теорема о промежуточной функции (тема 11); арифметика пределов (тема 13); определение Гейне для перехода «последовательность → функция» (тема 9).

**$x\to+\infty$.** Пусть $n=[x]$, тогда $n\le x<n+1$ и
$$\left(1+\frac1{n+1}\right)^n<\left(1+\frac1x\right)^x<\left(1+\frac1n\right)^{n+1}.$$
Крайние части при $n\to\infty$:
$$\left(1+\frac1n\right)^{n+1}=\left(1+\frac1n\right)^n\left(1+\frac1n\right)\to e\cdot1,\qquad\left(1+\frac1{n+1}\right)^n=\frac{\left(1+\frac1{n+1}\right)^{n+1}}{1+\frac1{n+1}}\to\frac e1.$$
Обе $\to e$; так как $n=[x]\to\infty$ при $x\to+\infty$, по теореме о промежуточной функции $\left(1+\frac1x\right)^x\to e$.

**$x\to-\infty$.** Замена $x=-t-1$, $t\to+\infty$:
$$\left(1+\frac1x\right)^x=\left(\frac{t}{t+1}\right)^{-t-1}=\left(1+\frac1t\right)^{t+1}=\left(1+\frac1t\right)^t\left(1+\frac1t\right)\to e.$$
По теореме о связи с односторонними пределами (аналог для $\infty$) — $\lim\limits_{x\to\infty}=e$.
</details>

## Следствия (сл. 20–24)

$$\textbf{1.}\ \lim_{x\to0}(1+x)^{\frac1x}=e\qquad\textbf{2.}\ \lim_{x\to0}\frac{\ln(1+x)}x=1\qquad\textbf{3.}\ \lim_{x\to0}\frac{e^x-1}x=1$$
$$\textbf{4.}\ \lim_{x\to0}\frac{\log_a(1+x)}x=\frac1{\ln a}\qquad\textbf{5.}\ \lim_{x\to0}\frac{a^x-1}x=\ln a$$
($a>0$, $a\ne1$ в 4–5.)

<details><summary>Следствие 1</summary>

Замена сводит ко второму замечательному пределу: $\frac1x=t$; $x\to0\Rightarrow t\to\infty$.
$$\lim_{x\to0}(1+x)^{\frac1x}=\lim_{t\to\infty}\left(1+\frac1t\right)^t=e.$$
Следствие доказано.
</details>

<details><summary>Следствие 2</summary>

Здесь кроме первого следствия используется теорема о пределе сложной функции:
$$\lim_{x\to0}\frac{\ln(1+x)}x=\lim_{x\to0}\frac1x\ln(1+x)=\lim_{x\to0}\ln(1+x)^{\frac1x}=\left|\begin{array}{l}\text{при }x\to0\\ y=(1+x)^{\frac1x}\to e\end{array}\right|=\lim_{y\to e}\ln y=1.$$
Следствие доказано.

> Здесь теорема о сложной функции применяется законно: $\ln$ **непрерывен** в точке $e$ ($\ln e=1$) — условие 2 из «Главное: предел сложной функции» (раздел «Расхождения»).
</details>

<details><summary>Следствие 3</summary>

Замена сводит ко второму следствию: $e^x-1=y$, $e^x=y+1$, $x=\ln(y+1)$; $x\to0\Rightarrow y\to0$.
$$\lim_{x\to0}\frac{e^x-1}x=\lim_{y\to0}\frac y{\ln(y+1)}=\lim_{y\to0}\frac1{\frac{\ln(1+y)}y}=1.$$
Следствие доказано.
</details>

<details><summary>Следствие 4</summary>

Формула перехода к новому основанию $\log_a(1+x)=\frac{\ln(1+x)}{\ln a}$ сводит ко второму следствию:
$$\lim_{x\to0}\frac{\log_a(1+x)}x=\lim_{x\to0}\frac{\ln(1+x)}{\ln a\cdot x}=\frac1{\ln a}\cdot\lim_{x\to0}\frac{\ln(1+x)}x=\frac1{\ln a}\cdot1=\frac1{\ln a}.$$
Следствие доказано.
</details>

<details><summary>Следствие 5</summary>

Замена сводит к четвёртому следствию: $a^x-1=t$, $x=\log_a(t+1)$; $x\to0\Rightarrow t\to0$.
$$\lim_{x\to0}\frac{a^x-1}x=\lim_{t\to0}\frac t{\log_a(t+1)}=\lim_{t\to0}\frac1{\frac{\log_a(t+1)}t}=\frac1{\lim\limits_{t\to0}\frac{\log_a(t+1)}t}=\frac1{\frac1{\ln a}}=\ln a.$$
Следствие доказано.

> **Расхождение со слайдами.** В слайде 24: «сводим к уже рассмотренному выше **пятому** следствию» — ссылка на само себя; по выкладке используется **четвёртое** следствие.
</details>

## Рабочие формулы

| Предел ($x\to0$) | Значение | Как эквивалентность (тема 22) |
|---|---|---|
| $(1+x)^{1/x}$ | $e$ | — |
| $\frac{\ln(1+x)}x$ | $1$ | $\ln(1+x)\sim x$ |
| $\frac{e^x-1}x$ | $1$ | $e^x-1\sim x$ |
| $\frac{\log_a(1+x)}x$ | $\frac1{\ln a}$ | $\log_a(1+x)\sim\frac x{\ln a}$ |
| $\frac{a^x-1}x$ | $\ln a$ | $a^x-1\sim x\ln a$ |

**Неопределённость $1^\infty$ — рабочая формула** [в общем виде не из лекций; лектор использует этот приём в л. 9, сл. 31]: если $u(x)\to1$, $v(x)\to\infty$ и $u(x)\ne1$ около $x_0$, то
$$\lim u^v=\lim\Bigl[\bigl(1+(u-1)\bigr)^{\frac1{u-1}}\Bigr]^{(u-1)v}=e^{\lim\,(u-1)\,v}.$$
Обоснование: внутренняя скобка $\to e$ по следствию 1 (с $t=u-1\to0$, $t\ne0$), далее — непрерывность показательной функции (л. 9).

**$0^0$, $\infty^0$** [не из лекций]: $u^v=e^{v\ln u}$, предел показателя $v\ln u$ — неопределённость $0\cdot\infty$, раскрывается эквивалентностями.

## Алгоритмы

### А. Неопределённость $1^\infty$
1. Проверить: основание $u\to1$, показатель $v\to\infty$.
2. Найти $u-1$ (привести к общему знаменателю).
3. Посчитать $L=\lim(u-1)\cdot v$ (обычно $\frac\infty\infty$ или эквивалентности).
4. Ответ: $e^L$.
5. На РК — показать «выделение» $\bigl(1+(u-1)\bigr)^{\frac1{u-1}}$, как у лектора на сл. 31 л. 9.

### Б. $\frac00$ с $\ln$, $e^x$, $a^x$
1. Аргумент логарифма привести к виду $1+u$, $u\to0$; показатель степени — к $u\to0$.
2. Дополнить до табличных: $\frac{\ln(1+u)}u$, $\frac{e^u-1}u$, $\frac{a^u-1}u$.
3. Если точка не $0$ — замена $t=x-x_0$.

## Разобранные примеры

**Пример 1 ($1^\infty$).** $\lim\limits_{x\to\infty}\left(\dfrac{x+3}{x-1}\right)^x$.

<details><summary>Решение</summary>

$u=\frac{x+3}{x-1}\to1$, $v=x\to\infty$ — $1^\infty$.
$u-1=\frac{4}{x-1}$; $\ (u-1)v=\frac{4x}{x-1}\to4$. Ответ: $e^4$.

Подробно: $\left(1+\frac4{x-1}\right)^x=\left[\left(1+\frac4{x-1}\right)^{\frac{x-1}4}\right]^{\frac{4x}{x-1}}\to e^4$.
</details>

**Пример 2.** $\lim\limits_{x\to0}(1+3x)^{\frac2x}$.

<details><summary>Решение</summary>

$(1+3x)^{\frac2x}=\left[(1+3x)^{\frac1{3x}}\right]^6\to e^6$ (следствие 1 с $t=3x$).
</details>

**Пример 3 ($1^\infty$, тригонометрия).** $\lim\limits_{x\to0}(\cos x)^{\frac1{x^2}}$.

<details><summary>Решение</summary>

$u=\cos x\to1$, $v=\frac1{x^2}\to\infty$. $\ (u-1)v=\frac{\cos x-1}{x^2}\to-\frac12$ (следствие 5 темы 19). Ответ: $e^{-1/2}=\frac1{\sqrt e}$.

Пример лектора (л. 9, сл. 31): $\lim\limits_{x\to0}(\cos x)^{\frac1{\sin x}}=e^{\lim\frac{\cos x-1}{\sin x}}=e^{\lim\frac{-x^2/2}{x}}=e^0=1$.
</details>

**Пример 4.** $\lim\limits_{x\to0}\dfrac{e^{2x}-1}{\ln(1+3x)}$.

<details><summary>Решение</summary>

$$\frac{e^{2x}-1}{\ln(1+3x)}=\frac{e^{2x}-1}{2x}\cdot\frac{3x}{\ln(1+3x)}\cdot\frac{2x}{3x}\to1\cdot1\cdot\frac23=\frac23.$$
</details>

**Пример 5.** $\lim\limits_{x\to0}\dfrac{2^x-3^x}{x}$.

<details><summary>Решение</summary>

$$\frac{2^x-3^x}x=\frac{2^x-1}x-\frac{3^x-1}x\to\ln2-\ln3=\ln\frac23.$$
</details>

**Пример 6 ($\infty\cdot0$ с логарифмом).** $\lim\limits_{x\to+\infty}x\bigl(\ln(x+1)-\ln x\bigr)$.

<details><summary>Решение</summary>

$x\ln\frac{x+1}x=x\ln\left(1+\frac1x\right)=\frac{\ln(1+t)}t\Big|_{t=1/x\to0}\to1$.
</details>

## Типичные ошибки
- Считать $1^\infty=1$.
- Применять формулу $e^{\lim(u-1)v}$, когда $u\not\to1$ (тогда это не неопределённость: $2^{+\infty}=+\infty$, $\left(\frac12\right)^{+\infty}=0$).
- Путать $\lim\limits_{x\to\infty}\left(1+\frac1x\right)^x=e$ и $\lim\limits_{x\to0}\left(1+\frac1x\right)^x$ (другая задача).
- Писать $\frac{a^x-1}x\to\frac1{\ln a}$ и $\frac{\log_a(1+x)}x\to\ln a$ — перепутаны.
- В $\ln(1+u)\sim u$ забывать, что аргумент — именно $1+u$ с $u\to0$: $\ln x$ при $x\to1$ — это $\ln(1+(x-1))\sim x-1$.
