# Тема 6. Смешанное и двойное векторное произведение

РК: А18 (определение), А19 (перестановки), А20 (линейность), А21 (вычисление в правом ОНБ), Б6 (доказательство линейности), Б7 (вывод формулы); часть В.3 (двойное векторное произведение).

## Суть
Смешанное произведение $\vec a\vec b\vec c$ — число, по модулю равное **объёму параллелепипеда** на трёх векторах, со знаком «$+$» для правой тройки и «$-$» для левой. Нуль означает компланарность. В координатах это определитель из координат векторов.

## Определение (А18)
$$\vec a\vec b\vec c=(\vec a\times\vec b)\cdot\vec c.$$
Другие обозначения: $(\vec a,\vec b,\vec c)$, $\langle[\vec a;\vec b];\vec c\rangle$.

{{figure:mixed}}

**Геометрический смысл** [не из конспекта, но нужен в задачах]: $|\vec a\times\vec b|$ — площадь основания, $\operatorname{Пр}_{\vec a\times\vec b}\vec c$ — высота со знаком, поэтому
$$\vec a\vec b\vec c=\pm V_{\text{пар}},\qquad V_{\text{пир}}=\tfrac16|\vec a\vec b\vec c|.$$
Знак $+$, если тройка $(\vec a,\vec b,\vec c)$ правая, $-$ если левая, $0$ если векторы компланарны.

## Свойства

**Перестановки (А19).** Циклическая перестановка не меняет значения, перестановка двух сомножителей меняет знак:
$$\vec a\vec b\vec c=\vec b\vec c\vec a=\vec c\vec a\vec b=-\vec b\vec a\vec c=-\vec c\vec b\vec a=-\vec a\vec c\vec b.$$
Следствие: $(\vec a\times\vec b)\cdot\vec c=\vec a\cdot(\vec b\times\vec c)$ — крестик и точку можно менять местами.

**Линейность (А20)** по каждому аргументу:
$$(\vec a_1+\vec a_2)\vec b\vec c=\vec a_1\vec b\vec c+\vec a_2\vec b\vec c,\qquad (\lambda\vec a)\vec b\vec c=\lambda(\vec a\vec b\vec c).$$

<details><summary>Доказательство линейности (Б6)</summary>

По определению и линейности векторного, затем скалярного произведения:
1. $(\vec a_1+\vec a_2)\vec b\vec c=\bigl((\vec a_1+\vec a_2)\times\vec b\bigr)\cdot\vec c=(\vec a_1\times\vec b+\vec a_2\times\vec b)\cdot\vec c=(\vec a_1\times\vec b)\cdot\vec c+(\vec a_2\times\vec b)\cdot\vec c=\vec a_1\vec b\vec c+\vec a_2\vec b\vec c.$
2. $(\lambda\vec a)\vec b\vec c=\bigl((\lambda\vec a)\times\vec b\bigr)\cdot\vec c=\bigl(\lambda(\vec a\times\vec b)\bigr)\cdot\vec c=\lambda\bigl((\vec a\times\vec b)\cdot\vec c\bigr)=\lambda(\vec a\vec b\vec c).$

По остальным аргументам — через правило перестановок. $\blacksquare$
</details>

**Компланарность** [не из конспекта]: $\vec a,\vec b,\vec c$ компланарны $\iff\vec a\vec b\vec c=0$.

## Вычисление в правом ОНБ (А21)
$$\vec a\vec b\vec c=\begin{vmatrix}x_a&y_a&z_a\\x_b&y_b&z_b\\x_c&y_c&z_c\end{vmatrix}.$$

<details><summary>Вывод (Б7)</summary>

$\vec a\vec b\vec c=(\vec a\times\vec b)\cdot\vec c$. Координаты $\vec a\times\vec b$ (тема 5):
$$\{\,y_az_b-z_ay_b,\ -(x_az_b-z_ax_b),\ x_ay_b-y_ax_b\,\}.$$
Скалярно умножаем на $\vec c=\{x_c,y_c,z_c\}$ (тема 4):
$$x_c(y_az_b-z_ay_b)-y_c(x_az_b-z_ax_b)+z_c(x_ay_b-y_ax_b).$$
Это разложение определителя $3\times3$ по третьей строке $(x_c,y_c,z_c)$. $\blacksquare$
</details>

## Двойное векторное произведение (В.3)
$$\vec u\times(\vec v\times\vec w)=\vec v\,(\vec u\cdot\vec w)-\vec w\,(\vec u\cdot\vec v)\qquad(\text{«бац минус цаб»}).$$
Мнемоника: средний вектор умножается на скалярное произведение крайних, минус третий — на скалярное произведение первых двух. Результат лежит в плоскости $\vec v,\vec w$.

**Тождество Якоби:** $\vec u\times(\vec v\times\vec w)+\vec v\times(\vec w\times\vec u)+\vec w\times(\vec u\times\vec v)=\vec 0$.

> **Неточность в конспекте.** Формулу «бац минус цаб» оба присланных файла называют тождеством Лагранжа. Во многих учебниках тождеством Лагранжа называют другое: $|\vec a\times\vec b|^2=|\vec a|^2|\vec b|^2-(\vec a\cdot\vec b)^2$. На РК используй название лектора, но если спросят про Лагранжа без формулы — уточни, о какой из двух речь.

## Рабочие формулы

| Задача | Формула |
|---|---|
| объём параллелепипеда | $V=|\vec a\vec b\vec c|$ |
| объём тетраэдра $ABCD$ | $V=\frac16|\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}|$ |
| высота тетраэдра из $D$ | $h=\dfrac{|\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}|}{|\overrightarrow{AB}\times\overrightarrow{AC}|}$ |
| четыре точки в одной плоскости | $\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}=0$ |
| ориентация тройки | знак $\vec a\vec b\vec c$ |

**Пример.** Объём тетраэдра $A(0,0,0)$, $B(2,0,0)$, $C(0,3,0)$, $D(1,1,4)$.

<details><summary>Решение</summary>

$$\begin{vmatrix}2&0&0\\0&3&0\\1&1&4\end{vmatrix}=2\cdot3\cdot4=24,\qquad V=\frac{24}6=4.$$
</details>

## Типичные ошибки
- Забыть множитель $\frac16$ для тетраэдра (пирамиды с треугольным основанием).
- Брать объём со знаком: объём — это **модуль** смешанного произведения.
- В «бац минус цаб» перепутать, какой вектор стоит снаружи: $\vec u\times(\vec v\times\vec w)$ лежит в плоскости **внутренних** $\vec v,\vec w$.
