# Задачи из слитых билетов РК1

Источник — фото билетов «АГ, 1с, ИУ3, ИУ7 (2026-27). РК 1 (задачи) (R1)»: 7 задач, № 1–5 по 4 балла, № 6–7 по 6 баллов, min 19, max 32. Номер задачи `s18_3` — билет 18, задача 3. Все ответы проверены вычислением (sympy).

# @pos1 Задача 1 (4 балла): деление отрезка, разложение вектора, точка пересечения прямых

### s3_1. В параллелограмме $ABCD$ точка $M$ делит диагональ $BD$ в отношении $1:3$, а точка $N$ делит сторону $CD$ пополам. Найти разложение вектора $\overrightarrow{MN}$ по векторам $\vec a=\overrightarrow{AB}$ и $\vec b=\overrightarrow{AD}$.
Выразить положения точек через $\vec a,\vec b$, отложив их от $A$.

<details><summary>Решение</summary>

От точки $A$: $B=\vec a$, $D=\vec b$, $C=\vec a+\vec b$.
$BM:MD=1:3\Rightarrow\overrightarrow{AM}=\overrightarrow{AB}+\frac14\overrightarrow{BD}=\vec a+\frac14(\vec b-\vec a)=\frac34\vec a+\frac14\vec b$.
$N$ — середина $CD$: $\overrightarrow{AN}=\frac12\bigl((\vec a+\vec b)+\vec b\bigr)=\frac12\vec a+\vec b$.
$$\overrightarrow{MN}=\overrightarrow{AN}-\overrightarrow{AM}=-\frac14\vec a+\frac34\vec b.$$
**Ответ:** $\overrightarrow{MN}=-\frac14\vec a+\frac34\vec b$.
</details>

### s7_1. Разложить вектор $\vec c=\{-10;3\}$ по векторам $\vec a=\{3;-1\}$ и $\vec b=\{7;-2\}$.
$\vec c=\alpha\vec a+\beta\vec b$ — система из двух уравнений.

<details><summary>Решение</summary>

$$\begin{cases}3\alpha+7\beta=-10\\-\alpha-2\beta=3\end{cases}\Rightarrow\alpha=-3-2\beta,\ \ -9-6\beta+7\beta=-10\Rightarrow\beta=-1,\ \alpha=-1.$$
Проверка: $-\{3,-1\}-\{7,-2\}=\{-10,3\}$.
**Ответ:** $\vec c=-\vec a-\vec b$.
</details>

### s9_1. Найти точку пересечения прямых $3x-5y-13=0$ и $2x+7y-81=0$.
Решить систему.

<details><summary>Решение</summary>

Умножим первое на $7$, второе на $5$ и сложим: $21x+10x=91+405$, $31x=496$, $x=16$; $\ 5y=3\cdot16-13=35$, $y=7$.
**Ответ:** $(16;7)$.
</details>

### s11_1. Даны точки $A(1;1;2)$ и $B(-4;6;12)$. Найти точку $C$, которая делит отрезок $AB$ в отношении $2:3$.
$AC:CB=\lambda=\frac23$: $C=A+\frac{\lambda}{1+\lambda}\overrightarrow{AB}$.

<details><summary>Решение</summary>

$C=A+\frac25\overrightarrow{AB}=(1;1;2)+\frac25(-5;5;10)=(-1;3;6)$.
(Через формулу: $x_C=\frac{x_A+\lambda x_B}{1+\lambda}=\frac{1+\frac23(-4)}{\frac53}=-1$ и т. д.)
**Ответ:** $C(-1;3;6)$.
</details>

### s16_1. Даны точки $A(-2;0;-3)$ и $B(6;8;9)$. Найти точку $C$, которая делит отрезок $AB$ в отношении $1:3$.
$C=A+\frac14\overrightarrow{AB}$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=(8;8;12)$, $C=(-2;0;-3)+(2;2;3)=(0;2;0)$.
**Ответ:** $C(0;2;0)$.
</details>

### s17_1. Найти точку пересечения прямых $-4x+y-3=0$ и $-5x+y-4=0$.
Вычесть уравнения.

<details><summary>Решение</summary>

Вычитаем: $x+1=0$, $x=-1$; $\ y=3+4x=-1$.
**Ответ:** $(-1;-1)$.
</details>

### s18_1. В трапеции $ABCD$ основания $AD$ и $BC$ относятся как $2:1$, точка $M$ делит сторону $AB$ в отношении $2:3$, а точка $N$ — середина стороны $CD$. Найти разложение вектора $\overrightarrow{MN}$ по векторам $\vec a=\overrightarrow{AD}$ и $\vec b=\overrightarrow{AB}$.
$\overrightarrow{BC}=\frac12\vec a$ (основания параллельны и сонаправлены).

<details><summary>Решение</summary>

От $A$: $D=\vec a$, $B=\vec b$, $C=\vec b+\frac12\vec a$; $\ \overrightarrow{AM}=\frac25\vec b$.
$\overrightarrow{AN}=\frac12\left(\vec b+\frac12\vec a+\vec a\right)=\frac34\vec a+\frac12\vec b$.
$$\overrightarrow{MN}=\frac34\vec a+\frac12\vec b-\frac25\vec b=\frac34\vec a+\frac1{10}\vec b.$$
**Ответ:** $\overrightarrow{MN}=\frac34\vec a+\frac1{10}\vec b$.
</details>

# @pos2 Задача 2 (4 балла): площадь, объём, компланарность

### s3_2. Объём параллелепипеда, построенного на векторах $\vec a,\vec b,\vec c$, равен $3$. Найти объём параллелепипеда, построенного на векторах $-\vec a+\vec b+\vec c$, $\vec a-\vec b+\vec c$, $\vec a+\vec b-\vec c$.
Смешанное произведение линейных комбинаций = определитель коэффициентов $\times\ \vec a\vec b\vec c$.

<details><summary>Решение</summary>

$$\begin{vmatrix}-1&1&1\\1&-1&1\\1&1&-1\end{vmatrix}=-1(1-1)-1(-1-1)+1(1+1)=4.$$
$V'=|4|\cdot3=12$.
**Ответ:** $12$.
</details>

### s7_2. Найти площадь треугольника, вершинами которого служат точки $A(0;1;-1)$, $B(0;1;0)$, $C(0;2;-3)$.
$S=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{0,0,1\}$, $\overrightarrow{AC}=\{0,1,-2\}$, $\overrightarrow{AB}\times\overrightarrow{AC}=\{-1,0,0\}$.
**Ответ:** $S=\frac12$.
</details>

### s9_2. Найти площадь треугольника, вершинами которого служат точки $A(1;-2;3)$, $B(4;2;2)$, $C(3;0;2)$.
$S=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{3,4,-1\}$, $\overrightarrow{AC}=\{2,2,-1\}$:
$$\overrightarrow{AB}\times\overrightarrow{AC}=\{-4+2,\ -(-3+2),\ 6-8\}=\{-2,1,-2\},\quad|\cdot|=3.$$
**Ответ:** $S=\frac32$.
</details>

### s11_2. Найти все значения $\lambda$, при которых точки $A(2;1;3)$, $B(3;-2;2)$, $C(2;2;3)$, $D(1;0;\lambda)$ лежат в одной плоскости.
Компланарность: $\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}=0$.

<details><summary>Решение</summary>

$$\begin{vmatrix}1&-3&-1\\0&1&0\\-1&-1&\lambda-3\end{vmatrix}=1\cdot(\lambda-3)-0+(-1)\cdot(0+1)=\lambda-4=0.$$
**Ответ:** $\lambda=4$.
</details>

### s16_2. Найти объём тетраэдра с вершинами $A(2;2;3)$, $B(2;-1;3)$, $C(3;1;2)$, $D(2;3;1)$.
$V=\frac16|\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}|$.

<details><summary>Решение</summary>

$$\begin{vmatrix}0&-3&0\\1&-1&-1\\0&1&-2\end{vmatrix}=3\cdot(1\cdot(-2)-(-1)\cdot0)=-6.$$
**Ответ:** $V=\frac{6}{6}=1$.
</details>

### s17_2. Найти площадь треугольника, вершинами которого служат точки $A(0;0;7)$, $B(2;3;5)$, $C(6;4;3)$.
$S=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{2,3,-2\}$, $\overrightarrow{AC}=\{6,4,-4\}$:
$$\overrightarrow{AB}\times\overrightarrow{AC}=\{-12+8,\ -(-8+12),\ 8-18\}=\{-4,-4,-10\},\quad|\cdot|=\sqrt{132}=2\sqrt{33}.$$
**Ответ:** $S=\sqrt{33}$.
</details>

### s18_2. Найти все значения $\lambda$, при которых точки $A(1;-3;4)$, $B(3;1;-2)$, $C(-8;5;5)$, $D(-1;-2;\lambda)$ лежат в одной плоскости.
$\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}=0$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{2,4,-6\}$, $\overrightarrow{AC}=\{-9,8,1\}$, $\overrightarrow{AD}=\{-2,1,\lambda-4\}$:
$$2\bigl(8(\lambda-4)-1\bigr)-4\bigl(-9(\lambda-4)+2\bigr)-6(-9+16)=52\lambda-260=0.$$
**Ответ:** $\lambda=5$.
</details>

# @pos3 Задача 3 (4 балла): плоскость

### s3_3. Найти точки пересечения плоскости $2x-5y-z+10=0$ с осями координат и задать эту плоскость уравнением «в отрезках».
Перенести свободный член вправо и разделить на него.

<details><summary>Решение</summary>

$2x-5y-z=-10\ \Big|:(-10)$: $\ \dfrac x{-5}+\dfrac y2+\dfrac z{10}=1$.
**Ответ:** $(-5;0;0)$, $(0;2;0)$, $(0;0;10)$; $\ \dfrac x{-5}+\dfrac y2+\dfrac z{10}=1$.
</details>

### s7_3. Составить общее уравнение плоскости, которая проходит через точку $M(2;0;-3)$ и перпендикулярна прямой $\dfrac x2=\dfrac{y+2}{-1}=\dfrac{z-3}{-2}$.
$\vec n=\vec s$.

<details><summary>Решение</summary>

$2(x-2)-(y-0)-2(z+3)=0$.
**Ответ:** $2x-y-2z-10=0$.
</details>

### s9_3. Составить общее уравнение плоскости, которая проходит через точку $M(3;2;1)$ параллельно плоскости $x+y-z+1=0$.
Та же нормаль, новый свободный член.

<details><summary>Решение</summary>

$x+y-z+D=0$, $3+2-1+D=0\Rightarrow D=-4$.
**Ответ:** $x+y-z-4=0$.
</details>

### s11_3. Найти расстояние от точки $M(-2;-3;3)$ до плоскости $9x-4y+z+17=0$.
Формула расстояния от точки до плоскости.

<details><summary>Решение</summary>

$\rho=\dfrac{|9(-2)-4(-3)+3+17|}{\sqrt{81+16+1}}=\dfrac{14}{\sqrt{98}}=\dfrac{14}{7\sqrt2}$.
**Ответ:** $\sqrt2$.
</details>

### s16_3. Составить общее уравнение плоскости, проходящей через точки $A(1;1;2)$, $B(7;-2;2)$, $C(-1;5;6)$.
$\vec n=\overrightarrow{AB}\times\overrightarrow{AC}$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{6,-3,0\}$, $\overrightarrow{AC}=\{-2,4,4\}$:
$\vec n=\{-12-0,\ -(24-0),\ 24-6\}=\{-12,-24,18\}\parallel\{2,4,-3\}$.
$2(x-1)+4(y-1)-3(z-2)=0$. Проверка $B$: $14-8-6=0$, $C$: $-2+20-18=0$.
**Ответ:** $2x+4y-3z=0$.
</details>

### s17_3. Составить общее уравнение плоскости, которая проходит через точку $M(3;-3;4)$ параллельно плоскости $-3x-2y+2z-1=0$.
Та же нормаль.

<details><summary>Решение</summary>

$-3x-2y+2z+D=0$: $-9+6+8+D=0\Rightarrow D=-5$.
**Ответ:** $3x+2y-2z+5=0$.
</details>

### s18_3. Составить общее уравнение плоскости, которая проходит через точку $M(1;2;3)$ параллельно плоскости $x-y-z+1=0$.
Та же нормаль.

<details><summary>Решение</summary>

$x-y-z+D=0$: $1-2-3+D=0\Rightarrow D=4$.
**Ответ:** $x-y-z+4=0$.
</details>

# @pos4 Задача 4 (4 балла): плоскость и прямая, расстояния, проекции

### s3_4. Найти проекцию $Q$ точки $P(5;1;2)$ на плоскость $2x-2y-z=-3$.
$Q=P-\dfrac{f(P)}{|\vec n|^2}\vec n$.

<details><summary>Решение</summary>

$f=2x-2y-z+3$, $f(P)=10-2-2+3=9$, $|\vec n|^2=9$: $Q=(5;1;2)-1\cdot(2;-2;-1)$.
Проверка: $6-6-3+3=0$.
**Ответ:** $Q(3;3;3)$.
</details>

### s7_4. Составить общее уравнение плоскости, которая проходит через прямую $\dfrac x3=\dfrac y3=\dfrac{z-1}2$ и перпендикулярна плоскости $2x+2y+3z=7$.
$\vec n=\vec s\times\vec n_1$, точка — с прямой.

<details><summary>Решение</summary>

$\vec s=\{3,3,2\}$, $\vec n_1=\{2,2,3\}$: $\vec s\times\vec n_1=\{9-4,\ -(9-4),\ 6-6\}=\{5,-5,0\}\parallel\{1,-1,0\}$.
Через $M_0(0;0;1)$: $x-y=0$.
**Ответ:** $x-y=0$.
</details>

### s9_4. Найти расстояние от точки $M(9;0;5)$ до прямой $\dfrac{x-4}3=\dfrac{y+5}{-1}=\dfrac{z+4}0$.
$\rho=\frac{|\overrightarrow{M_0M}\times\vec s|}{|\vec s|}$. На фото последняя дробь читается нечётко — решено для $\frac{z+4}0$.

<details><summary>Решение</summary>

$M_0(4;-5;-4)$, $\vec s=\{3,-1,0\}$, $\overrightarrow{M_0M}=\{5,5,9\}$.
$\overrightarrow{M_0M}\times\vec s=\{0+9,\ -(0-27),\ -5-15\}=\{9,27,-20\}$, $|\cdot|=\sqrt{1210}=11\sqrt{10}$; $|\vec s|=\sqrt{10}$.
**Ответ:** $\rho=11$.
</details>

### s11_4. Для прямой $x-y-z-2=0,\ x-3y+3z-2=0$ найти параметрические уравнения.
$\vec s=\vec n_1\times\vec n_2$; точка — при $z=0$.

<details><summary>Решение</summary>

$\vec s=\{1,-1,-1\}\times\{1,-3,3\}=\{-3-3,\ -(3+1),\ -3+1\}=\{-6,-4,-2\}\parallel\{3,2,1\}$.
$z=0$: $x-y=2$, $x-3y=2\Rightarrow y=0$, $x=2$.
**Ответ:** $x=2+3t,\ y=2t,\ z=t$.
</details>

### s16_4. Найти точку пересечения плоскости $x+y+z=0$ с прямой, проходящей через точки $A(-6;-9;-1)$ и $B(8;5;3)$.
Параметрически прямую $AB$ — в уравнение плоскости.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{14,14,4\}\parallel\{7,7,2\}$: $(-6+7t;\ -9+7t;\ -1+2t)$.
$-16+16t=0\Rightarrow t=1$.
**Ответ:** $(1;-2;1)$.
</details>

### s17_4. Составить общее уравнение плоскости, которая проходит через прямую $\dfrac{x-1}1=\dfrac{y-2}1=\dfrac{z-3}2$ и перпендикулярна плоскости $2x+y-z-1=0$.
$\vec n=\vec s\times\vec n_1$.

<details><summary>Решение</summary>

$\{1,1,2\}\times\{2,1,-1\}=\{-1-2,\ -(-1-4),\ 1-2\}=\{-3,5,-1\}$.
$-3(x-1)+5(y-2)-(z-3)=0$.
**Ответ:** $3x-5y+z+4=0$.
</details>

### s18_4. Найти расстояние от точки $M(5;-1;-2)$ до прямой $\dfrac{x-2}1=\dfrac{y+1}0=\dfrac{z-1}0$.
Прямая: $y=-1$, $z=1$, параллельна $Ox$.

<details><summary>Решение</summary>

Расстояние до прямой, параллельной $Ox$, — расстояние в плоскости $yz$: $\sqrt{(-1+1)^2+(-2-1)^2}=3$.
(Формулой: $\overrightarrow{M_0M}=\{3,0,-3\}$, $\times\{1,0,0\}=\{0,-3,0\}$, $\rho=\frac31$.)
**Ответ:** $3$.
</details>

# @pos5 Задача 5 (4 балла): уравнения прямой, углы

### s3_5. Составить канонические уравнения прямой, проходящей через точку $M(1;0;0)$ параллельно оси $Oz$.
$\vec s=\vec k=\{0,0,1\}$.

<details><summary>Решение</summary>

**Ответ:** $\dfrac{x-1}0=\dfrac y0=\dfrac z1$ (то есть $x=1$, $y=0$).
</details>

### s7_5. Составить параметрические уравнения прямой, проходящей через точку $M(0;1;0)$ перпендикулярно плоскости $x+z=0$.
$\vec s=\vec n=\{1,0,1\}$.

<details><summary>Решение</summary>

**Ответ:** $x=t,\ y=1,\ z=t$.
</details>

### s9_5. Составить параметрические уравнения прямой, проходящей через точку $M(3;3;3)$ перпендикулярно плоскости $z=1$.
$\vec s=\vec n=\{0,0,1\}$.

<details><summary>Решение</summary>

**Ответ:** $x=3,\ y=3,\ z=3+t$.
</details>

### s11_5. Найти угол между прямыми $x=2+3t,\ y=t,\ z=-t$ и $x=2+t,\ y=3t,\ z=t$.
$\cos\varphi=\frac{|\vec s_1\cdot\vec s_2|}{|\vec s_1||\vec s_2|}$.

<details><summary>Решение</summary>

$\vec s_1=\{3,1,-1\}$, $\vec s_2=\{1,3,1\}$: $\vec s_1\cdot\vec s_2=5$, $|\vec s_1|=|\vec s_2|=\sqrt{11}$.
**Ответ:** $\varphi=\arccos\frac5{11}$.
</details>

### s16_5. Составить параметрические уравнения прямой, проходящей через точку $M(2;1;-1)$ перпендикулярно плоскости $2x+y+z-5=0$.
$\vec s=\vec n$.

<details><summary>Решение</summary>

**Ответ:** $x=2+2t,\ y=1+t,\ z=-1+t$.
</details>

### s17_5. Составить канонические уравнения прямой, проходящей через точку $M(3;0;-1)$ параллельно оси $Oy$.
$\vec s=\vec j$.

<details><summary>Решение</summary>

**Ответ:** $\dfrac{x-3}0=\dfrac y1=\dfrac{z+1}0$ (то есть $x=3$, $z=-1$).
</details>

### s18_5. Найти угол между плоскостями $x-y+12=0$ и $-2x+2z-1=0$.
Угол между нормалями, по модулю.

<details><summary>Решение</summary>

$\vec n_1=\{1,-1,0\}$, $\vec n_2=\{-2,0,2\}$: $|\vec n_1\cdot\vec n_2|=2$, $|\vec n_1|\,|\vec n_2|=\sqrt2\cdot2\sqrt2=4$, $\cos\varphi=\frac12$.
**Ответ:** $\varphi=\frac\pi3$.
</details>

# @pos6 Задача 6 (6 баллов): высоты через линейные комбинации, объём пирамиды

### s3_6. Объём параллелепипеда, построенного на векторах $\vec a,\vec b,\vec c$, равен $V=6$. Площадь параллелограмма, построенного на векторах $\vec a,\vec b$, равна $S=2$. Найти высоту параллелепипеда, построенного на векторах $\vec a+\vec b$, $4\vec a-2\vec b$, $-\vec a-\vec b+3\vec c$, которая опущена из конца третьего вектора на грань, построенную на первых двух.
$h=\frac{V'}{S'}$; $V'$ — через определитель коэффициентов, $S'$ — через $\vec a\times\vec b$.

<details><summary>Решение</summary>

$V'=\left|\begin{vmatrix}1&1&0\\4&-2&0\\-1&-1&3\end{vmatrix}\right|\cdot V=|3\cdot(-2-4)|\cdot6=108$.
$(\vec a+\vec b)\times(4\vec a-2\vec b)=-2\,\vec a\times\vec b+4\,\vec b\times\vec a=-6\,\vec a\times\vec b$, $S'=6\cdot2=12$.
**Ответ:** $h=\frac{108}{12}=9$.
</details>

### s7_6. Объём параллелепипеда, построенного на векторах $\vec a,\vec b,\vec c$, равен $5$. Площадь параллелограмма, построенного на векторах $\vec a,\vec b$, равна $10$. Найти высоту параллелепипеда, построенного на векторах $\vec a+4\vec b$, $2\vec a+3\vec b$, $\vec a+\vec b-2\vec c$, опущенную из конца третьего вектора на грань, построенную на первых двух.
$h=\frac{V'}{S'}$.

<details><summary>Решение</summary>

$V'=\left|\begin{vmatrix}1&4&0\\2&3&0\\1&1&-2\end{vmatrix}\right|\cdot5=|-2(3-8)|\cdot5=50$.
$(\vec a+4\vec b)\times(2\vec a+3\vec b)=(3-8)\,\vec a\times\vec b$, $S'=5\cdot10=50$.
**Ответ:** $h=1$.
</details>

### s9_6. Параллелограмм построен на векторах $\vec m=13\vec a-2\vec b$ и $\vec n=-3\vec a+\vec b$, где $|\vec a|=|\vec b|=1$ и угол между $\vec a$ и $\vec b$ равен $60^\circ$. Найти высоту параллелограмма, опущенную из конца вектора $\vec n$ на вектор $\vec m$.
$h=\frac{S}{|\vec m|}=\frac{|\vec m\times\vec n|}{|\vec m|}$.

<details><summary>Решение</summary>

$\vec m\times\vec n=13\,\vec a\times\vec b+6\,\vec b\times\vec a=7\,\vec a\times\vec b$, $S=7\cdot1\cdot1\cdot\sin60^\circ=\frac{7\sqrt3}2$.
$\vec a\cdot\vec b=\frac12$: $|\vec m|^2=169-52\cdot\frac12+4=147$, $|\vec m|=7\sqrt3$.
**Ответ:** $h=\frac12$.
</details>

### s11_6. Объём параллелепипеда, построенного на векторах $\vec a,\vec b,\vec c$, равен $V=4$. Площадь параллелограмма, построенного на векторах $\vec a,\vec b$, равна $S=2$. Найти высоту параллелепипеда, построенного на векторах $\vec a+3\vec b$, $\vec a-4\vec b$, $2\vec a-3\vec b+4\vec c$, которая опущена из конца третьего вектора на грань, построенную на первых двух.
$h=\frac{V'}{S'}$.

<details><summary>Решение</summary>

$V'=\left|\begin{vmatrix}1&3&0\\1&-4&0\\2&-3&4\end{vmatrix}\right|\cdot4=|4(-4-3)|\cdot4=112$.
$(\vec a+3\vec b)\times(\vec a-4\vec b)=(-4-3)\,\vec a\times\vec b$, $S'=7\cdot2=14$.
**Ответ:** $h=8$.
</details>

### s16_6. Вершинами тетраэдра служат точки $A(-1;2;2)$, $B(0;1;2)$, $C(-1;4;2)$, $D(0;1;0)$. Найти высоту тетраэдра, опущенную из вершины $D$ на грань $ABC$.
$h=\frac{|\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}|}{|\overrightarrow{AB}\times\overrightarrow{AC}|}$ — или заметить, что грань лежит в плоскости $z=2$.

<details><summary>Решение</summary>

У $A,B,C$ одинаковая $z=2$ — грань в плоскости $z=2$; расстояние от $D(0;1;0)$ до неё $|0-2|=2$.
(Формулой: $\overrightarrow{AB}=\{1,-1,0\}$, $\overrightarrow{AC}=\{0,2,0\}$, $\overrightarrow{AD}=\{1,-1,-2\}$; смешанное $=-4$, $|\overrightarrow{AB}\times\overrightarrow{AC}|=2$, $h=2$.)
**Ответ:** $h=2$.
</details>

### s17_6. Треугольная пирамида $ABCD$ имеет объём $9$, вершины $A(2;-1;-1)$, $B(-1;2;-1)$, $C(-1;-1;2)$, а о вершине $D$ известно, что она лежит на положительной части оси $OX$. Найти координаты вершины $D$.
$D(d;0;0)$, $d>0$; $V=\frac16|\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}|$.

<details><summary>Решение</summary>

$\overrightarrow{AB}=\{-3,3,0\}$, $\overrightarrow{AC}=\{-3,0,3\}$, $\overrightarrow{AD}=\{d-2,1,1\}$:
$$\begin{vmatrix}-3&3&0\\-3&0&3\\d-2&1&1\end{vmatrix}=-3(0-3)-3(-3-3(d-2))=9d.$$
$\frac{|9d|}6=9\Rightarrow|d|=6$, $d>0$.
**Ответ:** $D(6;0;0)$.
</details>

### s18_6. Параллелограмм построен на векторах $\vec m=15\vec a+11\vec b$ и $\vec n=\vec a+2\vec b$, где $|\vec a|=1$, $|\vec b|=\sqrt3$ и угол между $\vec a$ и $\vec b$ равен $30^\circ$. Найти высоту параллелограмма, опущенную из конца вектора $\vec n$ на вектор $\vec m$.
$h=\frac{|\vec m\times\vec n|}{|\vec m|}$.

<details><summary>Решение</summary>

$\vec m\times\vec n=(30-11)\,\vec a\times\vec b$, $S=19\cdot1\cdot\sqrt3\cdot\frac12=\frac{19\sqrt3}2$.
$\vec a\cdot\vec b=\sqrt3\cdot\frac{\sqrt3}2=\frac32$: $|\vec m|^2=225+330\cdot\frac32+121\cdot3=1083$, $|\vec m|=19\sqrt3$.
**Ответ:** $h=\frac12$.
</details>

# @pos7 Задача 7 (6 баллов): симметрия, пересекающиеся прямые

### s3_7. Найти точку $Q$, симметричную точке $P(-4;1;2)$ относительно прямой $\dfrac x1=\dfrac{y+1}{-3}=\dfrac{z-3}0$.
Основание перпендикуляра $H$, затем $Q=2H-P$.

<details><summary>Решение</summary>

$M_0(0;-1;3)$, $\vec s=\{1,-3,0\}$, $\overrightarrow{M_0P}=\{-4,2,-1\}$; $t^*=\frac{-4-6+0}{10}=-1$, $H=(-1;2;3)$.
**Ответ:** $Q(2;3;4)$.
</details>

### s7_7. Составить канонические уравнения прямой, симметричной прямой $x=2+t,\ y=-1,\ z=3-3t$ относительно плоскости $x+z-3=0$.
Точка пересечения прямой с плоскостью остаётся на месте; вторую точку отразить.

<details><summary>Решение</summary>

Пересечение: $2+t+3-3t-3=0\Rightarrow t=1$, $K(3;-1;0)$.
Точка прямой $P(2;-1;3)$ ($t=0$): $f(P)=2$, $|\vec n|^2=2$, $P'=P-2\cdot\frac22\{1,0,1\}=(0;-1;1)$.
Направление $\overrightarrow{KP'}=\{-3,0,1\}$.
**Ответ:** $\dfrac{x-3}{-3}=\dfrac{y+1}0=\dfrac z1$.
</details>

### s9_7. Показать, что прямые $\dfrac{x-1}0=\dfrac{y-1}1=\dfrac{z-1}1$ и $\dfrac x{-1}=\dfrac{y-3}3=\dfrac z0$ пересекаются. Найти точку пересечения и составить уравнение плоскости, которой они принадлежат.
Параметрически приравнять; нормаль плоскости $\vec s_1\times\vec s_2$.

<details><summary>Решение</summary>

$L_1$: $(1;\ 1+t;\ 1+t)$, $L_2$: $(-u;\ 3+3u;\ 0)$. Из $z$: $t=-1$, из $x$: $u=-1$; $y$: $0=0$ — совпало, прямые пересекаются в $(1;0;0)$ (и не параллельны).
$\vec s_1\times\vec s_2=\{0,1,1\}\times\{-1,3,0\}=\{-3,-1,1\}$; $-3(x-1)-y+z=0$.
**Ответ:** точка $(1;0;0)$, плоскость $3x+y-z-3=0$.
</details>

### s11_7. Показать, что прямые $\dfrac{x-4}1=\dfrac y{-3}=\dfrac{z-10}7$ и $\dfrac{x+1}{-2}=\dfrac{y-13}5=\dfrac{z+19}{-11}$ пересекаются. Найти точку пересечения и составить уравнение плоскости, которой они принадлежат.
Параметрически приравнять.

<details><summary>Решение</summary>

$4+t=-1-2u$, $-3t=13+5u$, $10+7t=-19-11u$: из первых двух $t=-1$, $u=-2$; третье: $3=3$ — пересекаются в $(3;3;3)$.
$\vec s_1\times\vec s_2=\{1,-3,7\}\times\{-2,5,-11\}=\{-2,-3,-1\}$; $2(x-3)+3(y-3)+(z-3)=0$.
**Ответ:** точка $(3;3;3)$, плоскость $2x+3y+z-18=0$.
</details>

### s16_7. Составить параметрические уравнения прямой, проходящей через точку $(-2;1;4)$ и пересекающей прямые $\dfrac{x-1}1=\dfrac{y-1}0=\dfrac{z-1}1$ и $\dfrac x1=\dfrac{y-1}{-1}=\dfrac{z-2}2$.
Плоскость через точку $P$ и первую прямую; её пересечение со второй прямой — точка $Q$; ответ — прямая $PQ$.

<details><summary>Решение</summary>

$P(-2;1;4)$, $L_1$: $M_1(1;1;1)$, $\vec s_1=\{1,0,1\}$. Нормаль плоскости $(P,L_1)$: $\vec s_1\times\overrightarrow{PM_1}=\{1,0,1\}\times\{3,0,-3\}=\{0,6,0\}$ — плоскость $y=1$.
$L_2$: $(u;\ 1-u;\ 2+2u)$, $y=1\Rightarrow u=0$, $Q(0;1;2)$.
$\overrightarrow{PQ}=\{2,0,-2\}\parallel\{1,0,-1\}$; эта прямая пересекает $L_1$ в $M_1(1;1;1)$ и не параллельна $L_1$.
**Ответ:** $x=-2+t,\ y=1,\ z=4-t$.
</details>

### s17_7. Составить параметрические уравнения прямой, проходящей через точку $(4;2;-3)$ и пересекающей прямые $\dfrac{x-2}1=\dfrac y{-1}=\dfrac{z-1}0$ и $\dfrac{x-1}{-1}=\dfrac{y+1}{-1}=\dfrac{z-3}1$.
Плоскость через точку и первую прямую ∩ вторая прямая.

<details><summary>Решение</summary>

$P(4;2;-3)$, $M_1(2;0;1)$, $\vec s_1=\{1,-1,0\}$, $\overrightarrow{PM_1}=\{-2,-2,4\}$.
Нормаль: $\vec s_1\times\overrightarrow{PM_1}=\{-4-0,\ -(4-0),\ -2-2\}=\{-4,-4,-4\}\parallel\{1,1,1\}$ — плоскость $x+y+z-3=0$.
$L_2$: $(1-u;\ -1-u;\ 3+u)$: $3-u=3\Rightarrow u=0$, $Q(1;-1;3)$.
$\overrightarrow{PQ}=\{-3,-3,6\}\parallel\{1,1,-2\}$; прямая проходит и через $M_1(2;0;1)$ на $L_1$.
**Ответ:** $x=4+t,\ y=2+t,\ z=-3-2t$.
</details>

### s18_7. Найти точку $Q$, симметричную точке $P(3;2;-1)$ относительно прямой $\dfrac{x-2}1=\dfrac{y+1}{-1}=\dfrac{z-3}1$.
$H=M_0+t^*\vec s$, $Q=2H-P$.

<details><summary>Решение</summary>

$M_0(2;-1;3)$, $\vec s=\{1,-1,1\}$, $\overrightarrow{M_0P}=\{1,3,-4\}$; $t^*=\frac{1-3-4}3=-2$, $H=(0;1;1)$.
**Ответ:** $Q(-3;0;3)$.
</details>
