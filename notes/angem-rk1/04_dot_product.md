# Тема 4. Проекция и скалярное произведение

РК: А8 (проекция), А9 (скалярное произведение), А10 (линейность), А11 (вычисление в ОНБ), А12 (косинус угла), А15 (симметричность — первая половина), Б3 (доказательство линейности), Б4 (вывод формулы в ОНБ).

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
4. **Ортогональность:** для ненулевых $\vec a\perp\vec b\iff\vec a\cdot\vec b=0$.

<details><summary>Доказательство линейности (Б3)</summary>

Опора: $\vec a\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}\vec a$ и свойства ортогонального проектирования: проекция суммы равна сумме проекций, $\operatorname{Пр}_{\vec c}(\lambda\vec a)=\lambda\operatorname{Пр}_{\vec c}\vec a$.

1. $(\vec a+\vec b)\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}(\vec a+\vec b)=|\vec c|\left(\operatorname{Пр}_{\vec c}\vec a+\operatorname{Пр}_{\vec c}\vec b\right)=\vec a\cdot\vec c+\vec b\cdot\vec c.$
2. $(\lambda\vec a)\cdot\vec b=|\vec b|\operatorname{Пр}_{\vec b}(\lambda\vec a)=|\vec b|\,\lambda\operatorname{Пр}_{\vec b}\vec a=\lambda(\vec a\cdot\vec b).$

Линейность по второму аргументу следует из симметричности. $\blacksquare$
</details>

## Вычисление в ОНБ (А11)
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
| направляющие косинусы | $\cos\alpha=\frac{x_a}{|\vec a|}$, $\cos\beta=\frac{y_a}{|\vec a|}$, $\cos\gamma=\frac{z_a}{|\vec a|}$, $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$ [не из конспекта] |

**Пример.** $\vec a=\{1,2,2\}$, $\vec b=\{3,0,4\}$. Найти угол и $\operatorname{Пр}_{\vec b}\vec a$.

<details><summary>Решение</summary>

$\vec a\cdot\vec b=3+0+8=11$, $|\vec a|=3$, $|\vec b|=5$.
$\cos\varphi=\frac{11}{15}$, $\varphi=\arccos\frac{11}{15}$; $\ \operatorname{Пр}_{\vec b}\vec a=\frac{11}{5}$.
</details>

## Типичные ошибки
- Путать проекцию (число со знаком) с вектором-проекцией $\frac{\vec a\cdot\vec b}{|\vec b|^2}\vec b$.
- Считать формулу $x_ax_b+y_ay_b+z_az_b$ верной в любом базисе. Она верна **только в ОНБ**.
- Делить на $|\vec b|$, не проверив $\vec b\ne\vec 0$; в формуле косинуса оба вектора ненулевые.
