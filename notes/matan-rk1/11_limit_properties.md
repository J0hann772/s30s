# Тема 11. Общие свойства конечных пределов (л. 3–4, сл. 26–51)

Все шесть теорем лектор доказывает на слайдах подробно — доказательства приведены полностью (сжато по оформлению, без изменений по сути).

## Формулировки

**Теорема 1 (единственность).** Если существует конечный предел функции $y=f(x)$ при $x\to x_0$, то он единственный.

**Теорема 2 (локальная ограниченность).** Функция, имеющая конечный предел, локально ограничена.

**Теорема 3 (сохранение функцией знака своего предела).** Если функция $y=f(x)$ в точке $x_0$ имеет конечный предел, отличный от нуля, то существует проколотая окрестность этой точки, в которой функция сохраняет знак своего предела.
$$\exists\lim_{x\to x_0}f(x)=a\gtrless0\ \Rightarrow\ \exists\overset{\circ}{S}(x_0):\ \forall x\in\overset{\circ}{S}(x_0)\ \ f(x)\gtrless0\ \text{(тот же знак)}.$$

**Следствие.** Если функция $y=f(x)$ в точке $x_0$ имеет конечный предел и знакопостоянна в проколотой окрестности предельной точки $x_0$, то её предел не может иметь с ней противоположный знак: $f(x)>0\Rightarrow a\ge0$; $\ f(x)<0\Rightarrow a\le0$.

**Теорема 4 (предельный переход в неравенстве).** Пусть $f(x)$ и $g(x)$ определены в некоторой проколотой окрестности $\overset{\circ}{S}(x_0)$, причём $\forall x\in\overset{\circ}{S}(x_0)$ выполнено $f(x)<g(x)$. Тогда, если $\lim\limits_{x\to x_0}f(x)=a$, $\lim\limits_{x\to x_0}g(x)=b$, то $a\le b$.

**Теорема 5 (предел промежуточной функции).** Пусть $\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_0}g(x)=a$ и $\forall x\in\overset{\circ}{S}(x_0)$ выполнено $f(x)\le h(x)\le g(x)$. Тогда существует $\lim\limits_{x\to x_0}h(x)=a$.

**Теорема 6 (предел сложной функции).** Если $\lim\limits_{x\to x_0}f(x)=a$, а $\lim\limits_{y\to a}\varphi(y)=c$, то существует $\lim\limits_{x\to x_0}\varphi(f(x))=c$.
> **Расхождение со слайдами.** **В такой формулировке теорема неверна** (см. доказательство). Нужно дополнительное условие [не из лекций]: $f(x)\ne a$ в некоторой $\overset{\circ}{S}(x_0)$, **или** $\varphi$ непрерывна в точке $a$ ($\varphi(a)=c$). В лекции 9 (теорема 2 о непрерывности) условие непрерывности уже стоит.

## Доказательства

<details><summary>Теорема 1 (сл. 26–31)</summary>

Метод от противного. Пусть $\lim\limits_{x\to x_0}f(x)=a$ (1), $\lim\limits_{x\to x_0}f(x)=b$ (2), $a<b$. На языке $\varepsilon,\delta$:
$$(1):\ \forall\varepsilon_1>0\ \exists\delta_1(\varepsilon_1)>0:\ \forall x\in\overset{\circ}{S}_{\delta_1}(x_0)\Rightarrow|f(x)-a|<\varepsilon_1,$$
$$(2):\ \forall\varepsilon_2>0\ \exists\delta_2(\varepsilon_2)>0:\ \forall x\in\overset{\circ}{S}_{\delta_2}(x_0)\Rightarrow|f(x)-b|<\varepsilon_2.$$
Выберем $\delta=\min(\delta_1,\delta_2)$, $\ \varepsilon=\varepsilon_1=\varepsilon_2=\dfrac{b-a}2$. Раскрываем модули:
$$a-\varepsilon_1<f(x)<a+\varepsilon_1,\qquad b-\varepsilon_2<f(x)<b+\varepsilon_2.$$
Получаем $\forall x\in\overset{\circ}{S}_\delta(x_0)$:
$$f(x)<a+\varepsilon_1=a+\frac{b-a}2=\frac{a+b}2,\qquad f(x)>b-\varepsilon_2=b-\frac{b-a}2=\frac{a+b}2$$
— противоречие. Предположение неверно: $\exists!\lim\limits_{x\to x_0}f(x)=a=b$. **Теорема доказана.**

> В слайде 30 опечатка «Раскрываем **модель**» — «модуль».
</details>

<details><summary>Теорема 2 (сл. 31–33)</summary>

По условию $\lim\limits_{x\to x_0}f(x)=a\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon$. Раскроем модуль:
$$a-\varepsilon<f(x)<a+\varepsilon,\quad\forall x\in\overset{\circ}{S}_\delta(x_0).$$
Последнее неравенство гарантирует локальную ограниченность: найдётся $M$ (например, $M=\max(|a-\varepsilon|,|a+\varepsilon|)$ — в слайде не указано), что $|f(x)\rvert\le M$, $\forall x\in\overset{\circ}{S}_\delta(x_0)$. **Теорема доказана.**
</details>

<details><summary>Теорема 3 и следствие (сл. 34–38)</summary>

$\lim\limits_{x\to x_0}f(x)=a\iff\forall\varepsilon>0\ \exists\delta(\varepsilon)>0:\ \forall x\in\overset{\circ}{S}_\delta(x_0)\Rightarrow|f(x)-a|<\varepsilon.$

*Пусть $a>0$.* Выберем $\varepsilon=a>0$. Для $\forall x\in\overset{\circ}{S}_\delta(x_0)$:
$$-\varepsilon<f(x)-a<\varepsilon,\qquad a-\varepsilon<f(x)<a+\varepsilon,\qquad 0<f(x)<2a.$$
*Пусть $a<0$.* Выберем $\varepsilon=-a>0$. Для $\forall x\in\overset{\circ}{S}_\delta(x_0)$:
$$a-\varepsilon<f(x)<a+\varepsilon,\qquad 2a<f(x)<0.$$
Знак предела (числа $a$) и самой функции совпадают. Вывод: функция сохраняет знак своего предела в окрестности предельной точки. **Теорема доказана.**

*Следствие* (в лекции без отдельного доказательства; идея [не из лекций]): если бы при $f(x)>0$ было $a<0$, то по теореме 3 $f(x)<0$ в некоторой проколотой окрестности — противоречие.

> **Исправление моего раннего замечания.** В первом разборе я назвал запись $2a<f(x)<0$ (сл. 37) неточностью «в направлении неравенств». Это **не опечатка**: при $\varepsilon=-a$ имеем $a-\varepsilon=2a$, $a+\varepsilon=0$, и запись верна. Слайд можно переписывать как есть.
</details>

<details><summary>Теорема 4 (сл. 39–43)</summary>

Рассмотрим $F(x)=f(x)-g(x)$, $\forall x\in\overset{\circ}{S}(x_0)$. Так как $f(x)<g(x)$, то $F(x)<0$ в $\overset{\circ}{S}(x_0)$. Функция $F(x)$ имеет конечный предел в точке $x_0$ (как разность — теорема о пределе разности, л. 5). По следствию из теоремы 3: $\lim\limits_{x\to x_0}F(x)\le0$. Распишем:
$$\lim_{x\to x_0}F(x)=\lim_{x\to x_0}\bigl(f(x)-g(x)\bigr)=\lim_{x\to x_0}f(x)-\lim_{x\to x_0}g(x)\le0\ \Rightarrow\ a\le b.$$
**Теорема доказана.**

> В слайде 42: «для $\forall x\in\overset{\circ}{S}(x_0)$ имеет место неравенство $\lim F(x)\le0$» — квантор по $x$ перед пределом лишний (предел от $x$ не зависит).

**Пример (сл. 43): строгое неравенство переходит в нестрогое.** $f(x)=0$, $g(x)=x^2$, $x_0=0$: в $\overset{\circ}{S}_\delta(0)$ верно $0<x^2$, но $\lim\limits_{x\to0}0=0$, $\lim\limits_{x\to0}x^2=0$, т. е. $0\le0$.
</details>

<details><summary>Теорема 5 (сл. 44–48)</summary>

$$\lim_{x\to x_0}f(x)=a\iff\forall\varepsilon_1>0\ \exists\delta_1(\varepsilon_1)>0:\ \forall x\in\overset{\circ}{S}_{\delta_1}(x_0)\Rightarrow|f(x)-a|<\varepsilon_1,$$
$$\lim_{x\to x_0}g(x)=a\iff\forall\varepsilon_2>0\ \exists\delta_2(\varepsilon_2)>0:\ \forall x\in\overset{\circ}{S}_{\delta_2}(x_0)\Rightarrow|g(x)-a|<\varepsilon_2.$$
Раскроем модули: $a-\varepsilon_1<f(x)<a+\varepsilon_1$ в $\overset{\circ}{S}_{\delta_1}$; $\ a-\varepsilon_2<g(x)<a+\varepsilon_2$ в $\overset{\circ}{S}_{\delta_2}$.

Выберем $\delta=\min(\delta_1,\delta_2)$, $\varepsilon=\varepsilon_1=\varepsilon_2$; будем предполагать, что $\overset{\circ}{S}_1(x_0)=\overset{\circ}{S}(x_0)\cap\overset{\circ}{S}_\delta(x_0)\ne\varnothing$. Тогда $\forall x\in\overset{\circ}{S}_1(x_0)$:
$$a-\varepsilon=a-\varepsilon_1<f(x)\le h(x)\le g(x)<a+\varepsilon_2=a+\varepsilon.$$
Получаем $\forall\varepsilon>0\ \exists\overset{\circ}{S}_1(x_0):\ \forall x\in\overset{\circ}{S}_1(x_0)\Rightarrow|h(x)-a|<\varepsilon$ — это и есть $\lim\limits_{x\to x_0}h(x)=a$. **Теорема доказана.**
</details>

<details><summary>Теорема 6 (сл. 49–51) и пробел в доказательстве</summary>

Распишем определения:
$$\lim_{y\to a}\varphi(y)=c\iff\forall\varepsilon_1>0\ \exists\delta_1(\varepsilon_1)>0:\ |y-a|<\delta_1\Rightarrow|\varphi(y)-c|<\varepsilon_1,$$
$$\lim_{x\to x_0}f(x)=a\iff\forall\varepsilon_2>0\ \exists\delta_2(\varepsilon_2)>0:\ 0<|x-x_0|<\delta_2\Rightarrow|f(x)-a|<\varepsilon_2.$$
Обозначим $\varepsilon=\varepsilon_1$, $\varepsilon_2=\delta_1$. Цепочка:
$$\forall\varepsilon_1=\varepsilon>0\ \exists\delta_1(\varepsilon)=\varepsilon_2>0\ \exists\delta_2(\varepsilon_2)>0:\ 0<|x-x_0|<\delta_2\Rightarrow|y-a|<\delta_1=\varepsilon_2\Rightarrow|\varphi(y)-c|<\varepsilon_1=\varepsilon.$$
Подставляем $y=f(x)$:
$$0<|x-x_0|<\delta_2\Rightarrow|f(x)-a|<\delta_1\Rightarrow|\varphi(f(x))-c|<\varepsilon,$$
т. е. $\forall\varepsilon>0\ \exists\delta_2(\varepsilon)>0:\ 0<|x-x_0|<\delta_2\Rightarrow|\varphi(f(x))-c|<\varepsilon\iff\lim\limits_{x\to x_0}\varphi(f(x))=c$. **Теорема доказана** (в слайдах).

> **Расхождение со слайдами.** **Пробел.** В первой строке определение предела $\varphi$ записано с **непроколотой** окрестностью: «$|y-a|<\delta_1\Rightarrow\dots$». По определению предела должно быть $0<|y-a|<\delta_1$ — точка $y=a$ выколота. Если $f(x)=a$ для $x$ сколь угодно близких к $x_0$, вывод ломается.
>
> **Контрпример** [не из лекций]: $f(x)\equiv0$ ($a=0$), $\varphi(y)=\begin{cases}1,&y\ne0\\0,&y=0\end{cases}$ ($c=\lim\limits_{y\to0}\varphi(y)=1$). Но $\varphi(f(x))=\varphi(0)=0\to0\ne1$.
>
> **Исправление** [не из лекций]: добавить одно из условий — (а) $f(x)\ne a$ $\forall x\in\overset{\circ}{S}(x_0)$; тогда $0<|f(x)-a|<\delta_1$ и цепочка верна; (б) $\varphi(a)=c$ (непрерывность $\varphi$ в $a$); тогда неравенство $|\varphi(y)-c|<\varepsilon$ верно и при $y=a$.
>
> **На РК:** доказательство пишется как на слайде; если спросят — назвать условие (а) или (б). На практике при замене переменной в пределах (темы 19–20) условие (а) выполняется.
</details>

## Применение: теорема о промежуточной функции

**Алгоритм.**
1. Оценить $h(x)$ снизу и сверху функциями с известным одинаковым пределом.
2. Проверить, что оценки верны в проколотой окрестности $x_0$.
3. Сослаться на теорему 5.

**Пример.** $\lim\limits_{x\to0}x\sin\dfrac1x$.

<details><summary>Решение</summary>

$\left|\sin\frac1x\right|\le1\Rightarrow-|x|\le x\sin\frac1x\le|x|$ при $x\ne0$. $\lim\limits_{x\to0}(-|x|)=\lim\limits_{x\to0}|x|=0$, по теореме 5 предел равен $0$. (Короче — через теорему о произведении б.м. на ограниченную, тема 12.)
</details>

## Типичные ошибки
- Из $f(x)<g(x)$ выводить $a<b$: в пределе только $a\le b$ (пример $0<x^2$).
- В теореме 5 требовать только $f\le h\le g$ без равенства пределов $f$ и $g$.
- Применять теорему 6 при замене $y=f(x)$, когда $f(x)$ принимает значение $a$ сколь угодно близко к $x_0$ (см. расхождение выше).
- В теореме 3 забывать, что предел должен быть **отличен от нуля**.
