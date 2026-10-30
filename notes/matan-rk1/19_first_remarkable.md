# Тема 19. Первый замечательный предел и его следствия (л. 7–8, сл. 2–17)

## Теорема
$$\lim_{x\to0}\frac{\sin x}{x}=1.$$

## Доказательство (сл. 2–11, кадры 3–4 и 12 — анимация)

Рассмотрим односторонние пределы $\lim\limits_{x\to0+}\dfrac{\sin x}x$ и $\lim\limits_{x\to0-}\dfrac{\sin x}x$. Докажем, что каждый из них равен единице.

**Предел справа.** Пусть $x\to0$ справа ($x\to0+$). Тогда $x\in\left(0,\frac\pi2\right)$.

Построение (чертёж на сл. 6):
- $R=1$ — радиус окружности, $O(0,0)$ — начало координат, $A(1,0)$;
- $K$ — точка пересечения второй стороны угла с единичной окружностью;
- $L$ — точка пересечения второй стороны угла с касательной к этой окружности в точке $A(1,0)$;
- $H$ — проекция точки $K$ на ось абсцисс;
- $x$ — радианная мера угла;
- $OK=OA=R=1$, $\ \angle LOA=\angle KOH=x$.

$$\triangle OKH:\ \sin x=\frac{KH}{OK}=\frac{KH}1=KH,\qquad\triangle OLA:\ \operatorname{tg}x=\frac{LA}{OA}=\frac{LA}1=LA.$$

Сравним площади: $\triangle OKA$ содержится в секторе $OKA$, сектор содержится в $\triangle OLA$:
$$S_{\triangle OKA}<S_{\text{сек }OKA}<S_{\triangle OLA}.$$
Вычислим площади:
$$S_{\triangle OKA}=\frac12\cdot OA\cdot KH=\frac12\cdot1\cdot\sin x=\frac12\sin x,$$
$$S_{\text{сек }OKA}=\frac12\cdot OK\cdot OA\cdot\overset{\frown}{KA}=\frac12\cdot1\cdot1\cdot x=\frac12x,$$
$$S_{\triangle OLA}=\frac12\cdot OA\cdot LA=\frac12\cdot1\cdot\operatorname{tg}x=\frac12\operatorname{tg}x.$$
> **Расхождение со слайдами.** В слайде 7: $S_{\text{сек }OKA}=\frac12\cdot OK\cdot OA\cdot KA$. Здесь $KA$ — длина **дуги** $\overset{\frown}{KA}=R\cdot x=x$, а на чертеже (сл. 6) $KA$ проведена как хорда. Площадь сектора $=\frac12R^2x$.

Подставим найденные площади в неравенство:
$$\frac12\sin x<\frac12x<\frac12\operatorname{tg}x\quad\text{или}\quad\sin x<x<\operatorname{tg}x.$$
Так как $x\in\left(0,\frac\pi2\right)$, то $x>0$, $\sin x>0$, $\operatorname{tg}x>0$; делим на $\sin x$:
$$1<\frac x{\sin x}<\frac1{\cos x}.$$
Обратное неравенство:
$$\cos x<\frac{\sin x}x<1.$$
По теореме о пределе промежуточной функции (тема 11, теорема 5): $\lim\limits_{x\to0+}\cos x=1$, $\lim\limits_{x\to0+}1=1$, значит
$$\lim_{x\to0+}\frac{\sin x}x=1.$$

> **Расхождение со слайдами.** В слайде 9 перед этим стоит шаг «по теореме о **предельном переходе в неравенстве**: $\lim\cos x\le\lim\frac{\sin x}x\le\lim1$, $\ 1\le\lim\frac{\sin x}x\le1$». Теорема 4 (тема 11) требует, чтобы пределы **уже существовали** — а существование $\lim\frac{\sin x}x$ как раз и доказывается. Шаг лишний: теорема о промежуточной функции сама даёт и существование, и значение.
>
> **Расхождение со слайдами.** $\lim\limits_{x\to0}\cos x=1$ на слайдах не обоснован (непрерывность $\cos$ — л. 9, позже). Обоснование без круга [не из лекций]: $0\le1-\cos x=2\sin^2\frac x2\le2\cdot\left(\frac x2\right)^2=\frac{x^2}2$ (из $|\sin t|\le|t|$, которое следует из того же чертежа), и по теореме о промежуточной функции $1-\cos x\to0$.

**Предел слева.** Замена $u=-x$, $x=-u$; $x\to0-\Rightarrow u\to0+$:
$$\lim_{x\to0-}\frac{\sin x}x=\lim_{u\to0+}\frac{\sin(-u)}{-u}=\lim_{u\to0+}\frac{-\sin u}{-u}=\lim_{u\to0+}\frac{\sin u}u=1.$$

По теореме о связи двустороннего и односторонних пределов:
$$\lim_{x\to0}\frac{\sin x}x=\lim_{x\to0+}\frac{\sin x}x=\lim_{x\to0-}\frac{\sin x}x=1.$$
**Теорема доказана.**

## Следствия (сл. 13–17)

$$\textbf{1.}\ \lim_{x\to0}\frac{\sin(a\cdot x)}x=a\qquad\textbf{2.}\ \lim_{x\to0}\frac{\operatorname{tg}x}x=1\qquad\textbf{3.}\ \lim_{x\to0}\frac{\arcsin x}x=1$$
$$\textbf{4.}\ \lim_{x\to0}\frac{\operatorname{arctg}x}x=1\qquad\textbf{5.}\ \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$$

<details><summary>Следствие 1</summary>

$$\lim_{x\to0}\frac{\sin(a\cdot x)}x=\lim_{x\to0}\frac{\sin(a\cdot x)\cdot(a\cdot x)}{(a\cdot x)\cdot x}=\lim_{x\to0}\frac{\sin(a\cdot x)}{(a\cdot x)}\cdot\frac{(a\cdot x)}x=\lim_{x\to0}\frac{\sin(a\cdot x)}{(a\cdot x)}\cdot\lim_{x\to0}\frac{(a\cdot x)}x=1\cdot a.$$
Следствие доказано.

> **Расхождение со слайдами.** Деление на $a\cdot x$ требует $a\ne0$ (в слайде не оговорено). При $a=0$ предел $=0=a$ тривиально. Переход $\lim\frac{\sin ax}{ax}=1$ — предел сложной функции с $t=ax\ne0$ при $x\ne0$ (условие 1 из «Главное: предел сложной функции»).
</details>

<details><summary>Следствие 2</summary>

$$\lim_{x\to0}\frac{\operatorname{tg}x}x=\lim_{x\to0}\frac{\sin x}{\cos x\cdot x}=\lim_{x\to0}\frac{\sin x}x\cdot\frac1{\cos x}=\lim_{x\to0}\frac{\sin x}x\cdot\lim_{x\to0}\frac1{\cos x}=1\cdot\frac1{\cos0}=1\cdot\frac11=1.$$
Следствие доказано.
</details>

<details><summary>Следствие 3</summary>

Замена переменной сводит к первому замечательному пределу: $\arcsin x=t$, $x=\sin t$; $x\to0\Rightarrow t\to0$.
$$\lim_{x\to0}\frac{\arcsin x}x=\lim_{t\to0}\frac t{\sin t}=\lim_{t\to0}\frac1{\frac{\sin t}t}=\frac1{\lim\limits_{t\to0}\frac{\sin t}t}=\frac11=1.$$
Следствие доказано.
</details>

<details><summary>Следствие 4</summary>

Замена сводит ко второму следствию: $\operatorname{arctg}x=y$, $x=\operatorname{tg}y$; $x\to0\Rightarrow y\to0$.
$$\lim_{x\to0}\frac{\operatorname{arctg}x}x=\lim_{y\to0}\frac y{\operatorname{tg}y}=\lim_{y\to0}\frac1{\frac{\operatorname{tg}y}y}=\frac{\lim\limits_{y\to0}1}{\lim\limits_{y\to0}\frac{\operatorname{tg}y}y}=\frac11=1.$$
Следствие доказано.
</details>

<details><summary>Следствие 5</summary>

Формула понижения степени $1-\cos x=2\sin^2\frac x2$ сводит к первому замечательному пределу:
$$\lim_{x\to0}\frac{1-\cos x}{x^2}=\lim_{x\to0}\frac{2\left(\sin\frac x2\right)^2}{x^2}=2\lim_{x\to0}\frac{\sin^2\frac x2}{x^2}=2\lim_{x\to0}\frac{\sin\frac x2}{\frac x2}\cdot\frac{\sin\frac x2}{\frac x2}\cdot\frac{\frac x2\cdot\frac x2}{x^2}$$
$$=2\cdot\lim_{x\to0}\frac{\sin\frac x2}{\frac x2}\cdot\lim_{x\to0}\frac{\sin\frac x2}{\frac x2}\cdot\lim_{x\to0}\frac{\frac x2\cdot\frac x2}{x^2}=2\cdot1\cdot1\cdot\frac14=\frac12.$$
</details>

## Рабочие формулы

| Предел ($x\to0$) | Значение | Как эквивалентность (тема 22) |
|---|---|---|
| $\frac{\sin x}x$ | $1$ | $\sin x\sim x$ |
| $\frac{\sin ax}x$ | $a$ | $\sin ax\sim ax$ |
| $\frac{\operatorname{tg}x}x$ | $1$ | $\operatorname{tg}x\sim x$ |
| $\frac{\arcsin x}x$ | $1$ | $\arcsin x\sim x$ |
| $\frac{\operatorname{arctg}x}x$ | $1$ | $\operatorname{arctg}x\sim x$ |
| $\frac{1-\cos x}{x^2}$ | $\frac12$ | $1-\cos x\sim\frac{x^2}2$ |

**Обобщение через сложную функцию:** если $u(x)\to0$ при $x\to x_0$ и $u(x)\ne0$ около $x_0$, то $\lim\limits_{x\to x_0}\frac{\sin u(x)}{u(x)}=1$ (то же для всех строк таблицы).

Неравенства из доказательства: $\sin x<x<\operatorname{tg}x$ при $x\in\left(0,\frac\pi2\right)$; $|\sin x|\le|x|$ для всех $x$ (л. 9 old, «Утверждение 1»).

## Алгоритм: тригонометрический предел $\frac00$

1. Убедиться, что неопределённость $\frac00$ и аргумент тригонометрических функций $\to0$. **Если аргумент $\to x_0\ne0$** — сделать замену $t=x-x_0$ (или $t=x_0-x$) и формулы приведения, чтобы аргумент $\to0$.
2. Преобразовать: $\operatorname{tg}=\frac{\sin}{\cos}$; $1-\cos u=2\sin^2\frac u2$; разности синусов/косинусов — в произведения.
3. Каждый множитель $\sin u$ (или $\operatorname{tg}u$, $\arcsin u$, …) дополнить до $\frac{\sin u}u$, умножив и разделив на $u$.
4. Предел произведения — произведение пределов: $\frac{\sin u}u\to1$, остальное — алгебра.
5. Короче — то же через эквивалентности (тема 22).

## Разобранные примеры

**Пример 1.** $\lim\limits_{x\to0}\dfrac{\sin5x}{\sin3x}$.

<details><summary>Решение</summary>

$$\frac{\sin5x}{\sin3x}=\frac{\sin5x}{5x}\cdot\frac{3x}{\sin3x}\cdot\frac{5x}{3x}\to1\cdot1\cdot\frac53=\frac53.$$
</details>

**Пример 2.** $\lim\limits_{x\to0}\dfrac{\operatorname{tg}x-\sin x}{x^3}$.

<details><summary>Решение</summary>

$\operatorname{tg}x-\sin x=\operatorname{tg}x\,(1-\cos x)$ (так как $\sin x=\operatorname{tg}x\cos x$):
$$\frac{\operatorname{tg}x(1-\cos x)}{x^3}=\frac{\operatorname{tg}x}x\cdot\frac{1-\cos x}{x^2}\to1\cdot\frac12=\frac12.$$
Нельзя заменять $\operatorname{tg}x$ и $\sin x$ на $x$ в разности — получится $\frac{0}{x^3}=0$ (неверно), см. тема 22.
</details>

**Пример 3.** $\lim\limits_{x\to0}\dfrac{1-\cos4x}{x\sin x}$.

<details><summary>Решение</summary>

$1-\cos4x=2\sin^22x$:
$$\frac{2\sin^22x}{x\sin x}=2\cdot\left(\frac{\sin2x}{2x}\right)^2\cdot\frac{x}{\sin x}\cdot\frac{4x^2}{x\cdot x}\to2\cdot1\cdot1\cdot4=8.$$
</details>

**Пример 4 (аргумент не к нулю).** $\lim\limits_{x\to\pi}\dfrac{\sin x}{\pi-x}$.

<details><summary>Решение</summary>

Замена $t=\pi-x\to0$, $\sin x=\sin(\pi-t)=\sin t$:
$$\lim_{t\to0}\frac{\sin t}t=1.$$
</details>

**Пример 5.** $\lim\limits_{x\to0}\dfrac{\arcsin2x}{\operatorname{tg}3x}$.

<details><summary>Решение</summary>

$$\frac{\arcsin2x}{\operatorname{tg}3x}=\frac{\arcsin2x}{2x}\cdot\frac{3x}{\operatorname{tg}3x}\cdot\frac{2x}{3x}\to1\cdot1\cdot\frac23=\frac23.$$
</details>

## Типичные ошибки
- Применять $\frac{\sin x}x\to1$ при $x\to\infty$ (там $0$, тема 12) или при $x\to x_0\ne0$.
- Забывать про замену $t=x-x_0$, когда аргумент синуса не стремится к нулю.
- Заменять на $x$ слагаемые в разности ($\operatorname{tg}x-\sin x$).
- В доказательстве ссылаться на предельный переход в неравенстве до того, как доказано существование предела.
- Писать площадь сектора через хорду $KA$.
