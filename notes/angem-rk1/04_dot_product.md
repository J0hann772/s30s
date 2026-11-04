# Тема 4. Проекция и скалярное произведение

РК: А8 (проекция), А9 (скалярное произведение), А10 (линейность), А11 (вычисление в ОНБ), А12 (косинус угла), А15 (симметричность — первая половина), Б3 (доказательство линейности), Б4 (вывод формулы в ОНБ); дополнение из лекций: Г3 (направляющие косинусы).

## Суть
Скалярное произведение — число, которое «измеряет» вектор вдоль другого: $|\vec b|$ раз проекция $\vec a$ на $\vec b$. Из него получаются длины, углы, перпендикулярность и, позже, расстояние от точки до плоскости. В ОНБ оно считается как сумма попарных произведений координат.

## Определения

**Ортогональная скалярная проекция (А8)** вектора $\vec a$ на направление вектора $\vec b\ne\vec 0$ — число
$$\operatorname{Пр}_{\vec b}\vec a=|\vec a|\cos\varphi,\qquad \varphi=\angle(\vec a,\vec b)\in[0,\pi].$$
Знак проекции: $+$ при остром угле, $-$ при тупом, $0$ при прямом.

{{figure:projection}}

**Скалярное произведение (А9)** векторов $\vec a$ и $\vec b$ — число
$$\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\varphi=|\vec b|\operatorname{Пр}_{\vec b}\vec a=|\vec a|\operatorname{Пр}_{\vec a}\vec b.$$
Если хотя бы один вектор нулевой, $\vec a\cdot\vec b=0$.

## Свойства
1. **Симметричность (А15):** $\vec a\cdot\vec b=\vec b\cdot\vec a$ (косинус чётный).
2. **Линейность (А10):** $(\vec a+\vec b)\cdot\vec c=\vec a\cdot\vec c+\vec b\cdot\vec c$; $\ (\lambda\vec a)\cdot\vec b=\lambda(\vec a\cdot\vec b)$.
3. **Положительность:** $\vec a\cdot\vec a=|\vec a|^2\ge0$, и $=0\iff\vec a=\vec 0$.
4. **Ортогональность** (теорема 4.1 лекций): два ненулевых вектора ортогональны $\iff\vec a\cdot\vec b=0$.
5. **Знак и угол** (лекции): $\vec a\cdot\vec b>0$ — угол острый, $=0$ — прямой, $<0$ — тупой (знак совпадает со знаком $\cos\varphi$).

<details><summary>Доказательство линейности (Б3)</summary>

Опора: $\vec a\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}\vec a$ и свойства ортогонального проектирования: проекция суммы равна сумме проекций, $\operatorname{Пр}_{\vec c}(\lambda\vec a)=\lambda\operatorname{Пр}_{\vec c}\vec a$.

**Случай нулевого вектора** (в лекциях разобран первым): если $\vec c=\vec 0$, то обе части равенства $(\vec a+\vec b)\cdot\vec c=\vec a\cdot\vec c+\vec b\cdot\vec c$ равны нулю; если $\vec b=\vec 0$, то $(\lambda\vec a)\cdot\vec 0=0=\lambda(\vec a\cdot\vec 0)$. Дальше векторы, на которые проектируем, ненулевые.

1. $(\vec a+\vec b)\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}(\vec a+\vec b)=|\vec c|\left(\operatorname{Пр}_{\vec c}\vec a+\operatorname{Пр}_{\vec c}\vec b\right)=\vec a\cdot\vec c+\vec b\cdot\vec c.$
2. $(\lambda\vec a)\cdot\vec b=|\vec b|\operatorname{Пр}_{\vec b}(\lambda\vec a)=|\vec b|\,\lambda\operatorname{Пр}_{\vec b}\vec a=\lambda(\vec a\cdot\vec b).$

Линейность по второму аргументу следует из симметричности. $\blacksquare$
</details>

## Вычисление в ОНБ (А11, теорема 4.2 лекций)
$$\vec a\cdot\vec b=x_ax_b+y_ay_b+z_az_b.$$

<details><summary>Вывод (Б4)</summary>

Разложим по ОНБ: $\vec a=x_a\vec i+y_a\vec j+z_a\vec k$, $\vec b=x_b\vec i+y_b\vec j+z_b\vec k$. В ОНБ
$$\vec i\cdot\vec i=\vec j\cdot\vec j=\vec k\cdot\vec k=1,\qquad \vec i\cdot\vec j=\vec j\cdot\vec k=\vec k\cdot\vec i=0.$$
По линейности раскрываем скобки: получаются девять слагаемых $x_ax_b(\vec i\cdot\vec i)+x_ay_b(\vec i\cdot\vec j)+\dots$. Шесть смешанных обнуляются, три остаются:
$$\vec a\cdot\vec b=x_ax_b+y_ay_b+z_az_b.\ \blacksquare$$
</details>

## Следствия (А12 и рабочие формулы)

| Величина | Формула в ОНБ |
|---|---|
| длина | $|\vec a|=\sqrt{x_a^2+y_a^2+z_a^2}$ |
| косинус угла (А12) | $\cos\varphi=\dfrac{x_ax_b+y_ay_b+z_az_b}{\sqrt{x_a^2+y_a^2+z_a^2}\,\sqrt{x_b^2+y_b^2+z_b^2}}$ (векторы ненулевые) |
| проекция | $\operatorname{Пр}_{\vec b}\vec a=\dfrac{\vec a\cdot\vec b}{|\vec b|}$ |
| перпендикулярность | $x_ax_b+y_ay_b+z_az_b=0$ |
| направляющие косинусы (лекции) | $\cos\alpha=\frac{x_a}{|\vec a|}$, $\cos\beta=\frac{y_a}{|\vec a|}$, $\cos\gamma=\frac{z_a}{|\vec a|}$, $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$ |
| орт (единичный вектор того же направления) | $\vec a^{\,0}=\dfrac{\vec a}{|\vec a|}=\{\cos\alpha,\cos\beta,\cos\gamma\}$ |

## Направляющие косинусы и орт (лекции, Г3)
В ОНБ координата вектора — его проекция на ось: $x_1=\operatorname{Пр}_{\vec i}\vec x=|\vec x|\cos\alpha$, $x_2=|\vec x|\cos\beta$, $x_3=|\vec x|\cos\gamma$, где $\alpha,\beta,\gamma$ — углы вектора с $\vec i,\vec j,\vec k$. Числа $\cos\alpha,\cos\beta,\cos\gamma$ — **направляющие косинусы**. Подставив в $|\vec x|^2=x_1^2+x_2^2+x_3^2$, получаем $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$. Направляющие косинусы — это координаты орта $\vec x^{\,0}=\vec x/|\vec x|$.

Пример: $\vec a=\{1,2,2\}$, $|\vec a|=3$, орт $\left\{\frac13,\frac23,\frac23\right\}$; проверка: $\frac19+\frac49+\frac49=1$.

**Пример.** $\vec a=\{1,2,2\}$, $\vec b=\{3,0,4\}$. Найти угол и $\operatorname{Пр}_{\vec b}\vec a$.

<details><summary>Решение</summary>

$\vec a\cdot\vec b=3+0+8=11$, $|\vec a|=3$, $|\vec b|=5$.
$\cos\varphi=\frac{11}{15}$, $\varphi=\arccos\frac{11}{15}$; $\ \operatorname{Пр}_{\vec b}\vec a=\frac{11}{5}$.
</details>

## Типичные ошибки
- Путать проекцию (число со знаком) с вектором-проекцией $\frac{\vec a\cdot\vec b}{|\vec b|^2}\vec b$.
- Считать формулу $x_ax_b+y_ay_b+z_az_b$ верной в любом базисе. Она верна **только в ОНБ**.
- Делить на $|\vec b|$, не проверив $\vec b\ne\vec 0$; в формуле косинуса оба вектора ненулевые.
