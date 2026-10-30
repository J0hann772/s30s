# Тема 13. Арифметические операции над функциями, имеющими конечный предел (л. 5, сл. 26–51)

## Теоремы

Везде: $\lim\limits_{x\to x_0}f(x)=a$, $\ \lim\limits_{x\to x_0}g(x)=b$ — конечные.

**Теорема 1 (предел суммы/разности).** Существуют конечные пределы функций $f(x)\pm g(x)$ и
$$\lim_{x\to x_0}\bigl(f(x)\pm g(x)\bigr)=\lim_{x\to x_0}f(x)\pm\lim_{x\to x_0}g(x)=a\pm b.$$

**Теорема 2 (константу можно выносить за знак предела).** Существуют конечные пределы $k\cdot f(x)$, $k\cdot g(x)$ и
$$\lim_{x\to x_0}\bigl(k\cdot f(x)\bigr)=k\cdot\lim_{x\to x_0}f(x)=k\cdot a,\quad k\in R.$$

**Теорема 3 (предел произведения).** Существует конечный предел $f(x)\cdot g(x)$ и
$$\lim_{x\to x_0}f(x)\cdot g(x)=\lim_{x\to x_0}f(x)\cdot\lim_{x\to x_0}g(x)=a\cdot b.$$

**Теорема 4 (предел отношения).** Если дополнительно $b\ne0$, то существует конечный предел $\dfrac{f(x)}{g(x)}$ и
$$\lim_{x\to x_0}\frac{f(x)}{g(x)}=\frac{\lim\limits_{x\to x_0}f(x)}{\lim\limits_{x\to x_0}g(x)}=\frac ab.$$

**Условие применимости:** оба предела **существуют и конечны** (и $b\ne0$ для частного). Если это не так — теоремы молчат, это не значит, что предела нет.

### Схема всех четырёх доказательств (как у лектора)
1. По теореме 3 темы 12 (связь функции, предела и б.м.ф.): $f(x)=a+\alpha(x)$, $g(x)=b+\beta(x)$, $\alpha,\beta$ — б.м.ф.
2. Рассмотреть разность «выражение минус ожидаемый предел» и подставить.
3. Показать, что разность — б.м.ф., по свойствам б.м.ф. (тема 12).
4. По теореме 3 темы 12 (достаточность) — получаем предел.

> **Расхождение со слайдами.** **Ссылки в слайдах сбиты** (сл. 29, 30, 35, 44, 50): «по следствию 1 из теоремы 3» (про сумму б.м.), «по следствию 2 из теоремы 3» (про $k\cdot\beta$), «по теореме 1 получаем» (в конце). Правильная привязка — к свойствам темы 12: сумма б.м. — **теорема 1**; $k\cdot\beta$ — **следствие 2 из теоремы 2**; $\alpha\cdot\beta$ — **следствие 1 из теоремы 2**; финальный переход «разность — б.м. $\Rightarrow$ предел» — **теорема 3** (связь функции, предела и б.м.ф.). **На РК называть свойство словами** («как сумма двух б.м.ф.»), а не номером.

## Доказательства

<details><summary>Теорема 1 (сл. 26–31)</summary>

По теореме о связи функции, её предела и б.м.ф.: $f(x)=a+\alpha(x)$, $g(x)=b+\beta(x)$, $\alpha(x),\beta(x)$ — б.м.ф. при $x\to x_0$.

Рассмотрим выражения $(f(x)+g(x))-(a+b)$ и $(f(x)-g(x))-(a-b)$. Подставляем:
$$(f(x)+g(x))-(a+b)=\bigl((a+\alpha(x))+(b+\beta(x))\bigr)-(a+b)=\alpha(x)+\beta(x),$$
$$(f(x)-g(x))-(a-b)=\bigl((a+\alpha(x))-(b+\beta(x))\bigr)-(a-b)=\alpha(x)-\beta(x).$$
$\alpha(x)\pm\beta(x)$ — б.м.ф. при $x\to x_0$ как сумма конечного числа б.м.ф. (для разности: $-\beta=(-1)\cdot\beta$ — б.м. по следствию 2). Значит, $(f\pm g)-(a\pm b)$ — б.м.ф.:
$$\lim_{x\to x_0}\bigl(f(x)\pm g(x)-(a\pm b)\bigr)=0\overset{def}{\iff}\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|(f(x)\pm g(x))-(a\pm b)|<\varepsilon.$$
С другой стороны, это означает $\lim\limits_{x\to x_0}(f(x)\pm g(x))=a\pm b=\lim\limits_{x\to x_0}f(x)\pm\lim\limits_{x\to x_0}g(x)$. **Теорема доказана.**
</details>

<details><summary>Теорема 2 (сл. 32–37)</summary>

$f(x)=a+\alpha(x)$, $g(x)=b+\beta(x)$. Рассмотрим:
$$k\cdot g(x)-k\cdot b=k\cdot(b+\beta(x))-k\cdot b=k\cdot\beta(x),\qquad k\cdot f(x)-k\cdot a=k\cdot\alpha(x).$$
$k\cdot\beta(x)$, $k\cdot\alpha(x)$ — б.м.ф. как произведение постоянной на б.м.ф. Значит,
$$\lim_{x\to x_0}(k\cdot g(x)-k\cdot b)=0\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|k\cdot g(x)-k\cdot b|<\varepsilon,$$
т. е. $\lim\limits_{x\to x_0}(k\cdot g(x))=k\cdot b=k\cdot\lim\limits_{x\to x_0}g(x)$; аналогично для $f$. **Теорема доказана.**
</details>

<details><summary>Теорема 3 (сл. 38–45)</summary>

$f(x)=a+\alpha(x)$, $g(x)=b+\beta(x)$. Рассмотрим $f(x)\cdot g(x)-a\cdot b$:
$$f(x)\cdot g(x)-a\cdot b=(a+\alpha(x))(b+\beta(x))-a\cdot b=a\cdot b+a\cdot\beta(x)+b\cdot\alpha(x)+\alpha(x)\cdot\beta(x)-a\cdot b$$
$$=a\cdot\beta(x)+b\cdot\alpha(x)+\alpha(x)\cdot\beta(x).$$
$a\cdot\beta(x)$, $b\cdot\alpha(x)$ — б.м.ф. как произведения постоянных на б.м.ф.; $\alpha(x)\cdot\beta(x)$ — б.м.ф. как произведение двух б.м.ф. Сумма трёх б.м.ф. — б.м.ф. Значит,
$$\lim_{x\to x_0}(f(x)\cdot g(x)-a\cdot b)=0\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)\cdot g(x)-a\cdot b|<\varepsilon,$$
т. е. $\lim\limits_{x\to x_0}f(x)\cdot g(x)=a\cdot b=\lim\limits_{x\to x_0}f(x)\cdot\lim\limits_{x\to x_0}g(x)$. **Теорема доказана.**
</details>

<details><summary>Теорема 4 (сл. 46–51) и пропущенный шаг</summary>

$f(x)=a+\alpha(x)$, $g(x)=b+\beta(x)$, $b\ne0$. Рассмотрим $\dfrac{f(x)}{g(x)}-\dfrac ab$:
$$\frac{f(x)}{g(x)}-\frac ab=\frac{a+\alpha(x)}{b+\beta(x)}-\frac ab=\frac{b(a+\alpha(x))-a(b+\beta(x))}{b(b+\beta(x))}=\frac{ab+b\alpha(x)-ab-a\beta(x)}{b(b+\beta(x))}$$
$$=\frac{b\cdot\alpha(x)-a\cdot\beta(x)}{b^2+b\cdot\beta(x)}=\frac1{b^2+b\cdot\beta(x)}\cdot\bigl(b\cdot\alpha(x)-a\cdot\beta(x)\bigr).$$
$b\cdot\alpha(x)$, $a\cdot\beta(x)$ — б.м.ф. как произведения постоянных на б.м.ф.; их разность — б.м.ф.

**Шаг, которого нет в слайдах** [не из лекций]: множитель $\dfrac1{b^2+b\beta(x)}$ локально ограничен. Действительно, $b^2+b\beta(x)\to b^2>0$, и по теореме о сохранении знака (тема 11, с $\varepsilon=\frac{b^2}2$) в некоторой $\overset{\circ}{S}(x_0)$:
$$b^2+b\beta(x)>\frac{b^2}2>0\ \Rightarrow\ 0<\frac1{b^2+b\beta(x)}<\frac2{b^2}.$$
Заодно $g(x)=b+\beta(x)\ne0$ там же, т. е. частное $\frac fg$ определено около $x_0$.

Тогда $\frac fg-\frac ab$ — б.м.ф. как произведение б.м.ф. на локально ограниченную (теорема 2 темы 12):
$$\lim_{x\to x_0}\left(\frac{f(x)}{g(x)}-\frac ab\right)=0\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow\left|\frac{f(x)}{g(x)}-\frac ab\right|<\varepsilon,$$
т. е. $\lim\limits_{x\to x_0}\dfrac{f(x)}{g(x)}=\dfrac ab=\dfrac{\lim f(x)}{\lim g(x)}$. **Теорема доказана.**

> **Расхождение со слайдами.** В слайде 50 вместо этого шага: «$b\cdot\alpha$, $a\cdot\beta$, $b\cdot\beta$ — б.м.ф.… По теореме 1 получаем, что $\frac fg-\frac ab$ — б.м.ф.». То, что $b\beta$ — б.м., ещё не даёт ограниченности дроби $\frac1{b^2+b\beta}$. На РК — написать шаг с сохранением знака.
</details>

## Следствия для вычислений [не из лекций, прямо из теорем 1–4]

- $\lim\limits_{x\to x_0}c=c$, $\ \lim\limits_{x\to x_0}x=x_0$ (по определению: $\delta=\varepsilon$).
- Многочлен: $\lim\limits_{x\to x_0}P(x)=P(x_0)$ (теоремы 1–3 многократно).
- Рациональная функция: $\lim\limits_{x\to x_0}\dfrac{P(x)}{Q(x)}=\dfrac{P(x_0)}{Q(x_0)}$ при $Q(x_0)\ne0$ (теорема 4).
- $\lim\limits_{x\to x_0}(f(x))^n=a^n$, $n\in\mathbb N$ (теорема 3).
- **Сокращение:** если $f(x)=g(x)$ $\forall x\in\overset{\circ}{S}(x_0)$, то $\lim f=\lim g$ (прямо из определения Коши: значение в самой $x_0$ не участвует). Поэтому множитель $(x-x_0)$ можно сокращать.

## Арифметика пределов последовательностей [не из лекций]

Для последовательностей с $\lim x_n=a$, $\lim y_n=b$ (конечными) верно то же самое:
$$\lim(x_n\pm y_n)=a\pm b,\quad\lim(k\,x_n)=k\,a,\quad\lim(x_n y_n)=ab,\quad\lim\frac{x_n}{y_n}=\frac ab\ (b\ne0).$$
**Обоснование.** Те же доказательства дословно: «б.м. последовательность» ($\lim\alpha_n=0$), свойства суммы и произведения на ограниченную, связь $x_n=a+\alpha_n$; вместо $\delta$ — номер $n(\varepsilon)$, вместо $\min(\delta_1,\delta_2)$ — $\max(n_1,n_2)$. Через Гейне: последовательность — функция натурального аргумента, $n\to+\infty$ — частный случай предела на бесконечности.

Нужна в темах 7 (рекуррентный предел), 8a (число $e$), 9 (пример с $\cos 2\pi n$).

## Разобранные примеры

Сводная схема «с чего начать» — в разделе «Дан предел: с чего начать». Здесь — примеры приёмов, обоснованных теоремами 1–4.

**Пример 1 (прямая подстановка).** $\lim\limits_{x\to1}\dfrac{x^2+2x-1}{x+3}$.

<details><summary>Решение</summary>

Знаменатель: $\lim\limits_{x\to1}(x+3)=4\ne0$ — теорема 4 применима. Числитель: $1+2-1=2$. Ответ: $\frac24=\frac12$.
</details>

**Пример 2 ($\frac00$, многочлены — разложить и сократить).** $\lim\limits_{x\to2}\dfrac{x^2-4}{x^2-3x+2}$.

<details><summary>Решение</summary>

Подстановка: $\frac{0}{0}$ — теорема 4 неприменима ($b=0$). Раскладываем:
$$\frac{x^2-4}{x^2-3x+2}=\frac{(x-2)(x+2)}{(x-2)(x-1)}=\frac{x+2}{x-1}\quad\text{при }x\ne2.$$
По «сокращению» пределы равны; знаменатель теперь $\to1\ne0$:
$$\lim_{x\to2}\frac{x+2}{x-1}=\frac41=4.$$
</details>

**Пример 3 ($\frac\infty\infty$ — делить на старшую степень).** $\lim\limits_{x\to\infty}\dfrac{3x^2-x+1}{2x^2+5}$.

<details><summary>Решение</summary>

Делим числитель и знаменатель на $x^2$:
$$\lim_{x\to\infty}\frac{3-\frac1x+\frac1{x^2}}{2+\frac5{x^2}}=\frac{3-0+0}{2+0}=\frac32.$$
Теперь все пределы конечны ($\frac1{x^k}\to0$ при $x\to\infty$), знаменатель $\to2\ne0$ — теоремы 1–4 применимы.

Для сравнения: $\lim\limits_{x\to\infty}\frac{x+1}{x^2+1}=0$ (степень числителя меньше), $\lim\limits_{x\to\infty}\frac{x^3}{x^2+1}=\infty$ (больше).
</details>

**Пример 4 ($\frac00$ с корнем — сопряжённое).** $\lim\limits_{x\to0}\dfrac{\sqrt{1+x}-1}{x}$.

<details><summary>Решение</summary>

$$\frac{\sqrt{1+x}-1}x=\frac{(\sqrt{1+x}-1)(\sqrt{1+x}+1)}{x(\sqrt{1+x}+1)}=\frac{x}{x(\sqrt{1+x}+1)}=\frac1{\sqrt{1+x}+1}.$$
$$\lim_{x\to0}\frac1{\sqrt{1+x}+1}=\frac1{1+1}=\frac12.$$
(Предел $\sqrt{1+x}\to1$ — непрерывность корня, тема 27; на практике — подстановка. Позже — эквивалентность $\sqrt{1+x}-1\sim\frac x2$, тема 22.)
</details>

**Пример 5 ($\infty-\infty$ с корнем — сопряжённое).** $\lim\limits_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)$.

<details><summary>Решение</summary>

$$\sqrt{x^2+x}-x=\frac{(x^2+x)-x^2}{\sqrt{x^2+x}+x}=\frac{x}{\sqrt{x^2+x}+x}=\frac1{\sqrt{1+\frac1x}+1}\quad(x>0).$$
$$\lim_{x\to+\infty}\frac1{\sqrt{1+\frac1x}+1}=\frac1{1+1}=\frac12.$$
</details>

**Пример 6 ($\infty-\infty$ с дробями — общий знаменатель).** $\lim\limits_{x\to1}\left(\dfrac1{1-x}-\dfrac3{1-x^3}\right)$.

<details><summary>Решение</summary>

$1-x^3=(1-x)(1+x+x^2)$:
$$\frac{1+x+x^2-3}{(1-x)(1+x+x^2)}=\frac{x^2+x-2}{(1-x)(1+x+x^2)}=\frac{(x-1)(x+2)}{(1-x)(1+x+x^2)}=-\frac{x+2}{1+x+x^2}.$$
$$\lim_{x\to1}\left(-\frac{x+2}{1+x+x^2}\right)=-\frac33=-1.$$
</details>

## Типичные ошибки

- Применять теорему 4, когда предел знаменателя равен $0$, или теорему 1 к $\infty-\infty$: теоремы работают только для **конечных** пределов.
- Писать $\lim\frac fg=\frac{\lim f}{\lim g}$ при $\frac00$ и заключать, что предела нет.
- Сокращать на $(x-x_0)$ без пояснения, что $x\ne x_0$ (точка выколота).
- В $\sqrt{x^2+x}-x$ при $x\to-\infty$ выносить $x$ из-под корня без модуля: $\sqrt{x^2}=|x|$.
- Ссылаться на свойства б.м. по номерам со слайдов (они сбиты) — называть словами.
