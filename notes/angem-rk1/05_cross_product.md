# Тема 5. Ориентация троек. Векторное произведение

РК: А13 (правая и левая тройка), А14 (векторное произведение), А15 (антисимметричность — вторая половина), А16 (линейность), А17 (вычисление в правом ОНБ), Б5 (вывод формулы).

## Суть
Векторное произведение даёт **вектор**, перпендикулярный обоим сомножителям, длиной в площадь параллелограмма на них. Направление выбирается по правилу правой тройки, поэтому от перестановки множителей знак меняется. В задачах это главный инструмент: нормаль плоскости по двум векторам, направляющий вектор линии пересечения плоскостей, расстояния.

## Ориентация (А13)
Упорядоченная тройка **некомпланарных** векторов $(\vec a,\vec b,\vec c)$, отложенных от одной точки, называется **правой**, если из конца третьего вектора $\vec c$ кратчайший поворот от $\vec a$ к $\vec b$ виден **против часовой стрелки**; если по часовой — **левой**.

{{figure:right_left}}

- Циклическая перестановка $(\vec a,\vec b,\vec c)\to(\vec b,\vec c,\vec a)$ ориентацию сохраняет; перестановка двух векторов меняет её на противоположную.
- Базис $(\vec i,\vec j,\vec k)$ при обычном выборе осей правый.

## Определение (А14)
**Векторным произведением** неколлинеарных векторов $\vec a$ и $\vec b$ называется вектор $\vec c=\vec a\times\vec b$ такой, что
1. $\vec c\perp\vec a$ и $\vec c\perp\vec b$;
2. $|\vec c|=|\vec a|\,|\vec b|\sin\varphi$ — площадь параллелограмма, построенного на $\vec a$ и $\vec b$;
3. тройка $(\vec a,\vec b,\vec c)$ правая.

Для коллинеарных векторов (в том числе если один нулевой) $\vec a\times\vec b=\vec 0$.

{{figure:cross}}

> **Неточность в конспекте.** В конспекте определение дано только для неколлинеарных векторов, а случай $\vec a\parallel\vec b$ не оговорён. Без него не работают ни формула через определитель, ни признак коллинеарности $\vec a\times\vec b=\vec 0$. На РК добавь фразу: «если $\vec a\parallel\vec b$, то $\vec a\times\vec b=\vec 0$».

## Свойства
1. **Антисимметричность (А15):** $\vec a\times\vec b=-\vec b\times\vec a$ (при перестановке тройка $(\vec b,\vec a,\vec c)$ стала бы левой). В частности, $\vec a\times\vec a=\vec 0$.
2. **Линейность (А16):** $(\vec a_1+\vec a_2)\times\vec b=\vec a_1\times\vec b+\vec a_2\times\vec b$; $\ (\lambda\vec a)\times\vec b=\lambda(\vec a\times\vec b)$. По второму аргументу — через антисимметричность.
3. **Коллинеарность:** $\vec a\parallel\vec b\iff\vec a\times\vec b=\vec 0$.
4. **Не ассоциативно** [не из конспекта]: $(\vec i\times\vec i)\times\vec j=\vec 0$, а $\vec i\times(\vec i\times\vec j)=\vec i\times\vec k=-\vec j$.

Таблица для правого ОНБ:
$$\vec i\times\vec j=\vec k,\quad \vec j\times\vec k=\vec i,\quad \vec k\times\vec i=\vec j,\qquad \vec j\times\vec i=-\vec k,\ \dots,\qquad \vec i\times\vec i=\vec j\times\vec j=\vec k\times\vec k=\vec 0.$$
Запоминание: по циклу $i\to j\to k\to i$ плюс, против цикла минус.

## Вычисление в правом ОНБ (А17)
$$\vec a\times\vec b=\begin{vmatrix}\vec i&\vec j&\vec k\\x_a&y_a&z_a\\x_b&y_b&z_b\end{vmatrix}=\vec i\,(y_az_b-z_ay_b)-\vec j\,(x_az_b-z_ax_b)+\vec k\,(x_ay_b-y_ax_b).$$

<details><summary>Вывод (Б5)</summary>

Раскладываем $\vec a=x_a\vec i+y_a\vec j+z_a\vec k$, $\vec b=x_b\vec i+y_b\vec j+z_b\vec k$ и раскрываем по линейности, пользуясь таблицей: слагаемые с $\vec i\times\vec i$ и т. п. исчезают, остаются шесть:
$$\vec a\times\vec b=x_ay_b\,\vec k-x_az_b\,\vec j-y_ax_b\,\vec k+y_az_b\,\vec i+z_ax_b\,\vec j-z_ay_b\,\vec i$$
$$=(y_az_b-z_ay_b)\vec i-(x_az_b-z_ax_b)\vec j+(x_ay_b-y_ax_b)\vec k.$$
Это в точности разложение определителя по первой строке. $\blacksquare$
</details>

## Рабочие формулы

| Задача | Формула |
|---|---|
| площадь параллелограмма на $\vec a,\vec b$ | $S=|\vec a\times\vec b|$ |
| площадь треугольника $ABC$ | $S=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|$ |
| вектор, перпендикулярный $\vec a$ и $\vec b$ | $\vec a\times\vec b$ |
| нормаль плоскости по двум направлениям $\vec u,\vec v$ | $\vec n=\vec u\times\vec v$ |
| направление прямой $\{A_1x+\dots=0,\ A_2x+\dots=0\}$ | $\vec s=\vec n_1\times\vec n_2$ |
| синус угла | $\sin\varphi=\dfrac{|\vec a\times\vec b|}{|\vec a||\vec b|}$ |

**Пример.** Площадь треугольника $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{-1,2,0\}$, $\overrightarrow{AC}=\{-1,0,3\}$.
$$\overrightarrow{AB}\times\overrightarrow{AC}=\begin{vmatrix}\vec i&\vec j&\vec k\\-1&2&0\\-1&0&3\end{vmatrix}=\{6,\,3,\,2\},\qquad |\cdot|=\sqrt{36+9+4}=7.$$
**Ответ:** $S=\frac72$.
</details>

## Типичные ошибки
- Потерять минус у среднего слагаемого ($\vec j$) при раскрытии определителя.
- Переставить строки $\vec a$ и $\vec b$ в определителе: результат сменит знак.
- Применять формулу через определитель в левом базисе или в неортонормированном: она верна только в **правом ОНБ**.
