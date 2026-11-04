# Вопросы РК: ответы

Формат: `### <блок><номер>. <вопрос>`, строка `refs:` — темы конспекта, затем ответ. `{{figure:key}}` — рисунок к ответу.

## A

### A1. Определение равенства геометрических векторов
refs: g01
Два вектора $\vec a$ и $\vec b$ **равны**, если
1. они коллинеарны и сонаправлены ($\vec a\uparrow\uparrow\vec b$);
2. их длины равны: $|\vec a|=|\vec b|$.

### A2. Определение суммы векторов и умножения вектора на число
refs: g01
**Сумма.** Совместим начало $\vec b$ с концом $\vec a$; вектор $\vec c$, идущий из начала $\vec a$ в конец $\vec b$, — сумма $\vec a+\vec b$ (правило треугольника; равносильно — диагональ параллелограмма, построенного на $\vec a,\vec b$ из общего начала).
**Умножение на число.** Произведение ненулевого $\vec a$ на $\lambda\in\mathbb R$ — вектор $\vec c=\lambda\vec a$, у которого $|\vec c|=|\lambda|\cdot|\vec a|$, $\vec c\uparrow\uparrow\vec a$ при $\lambda>0$ и $\vec c\uparrow\downarrow\vec a$ при $\lambda<0$. Если $\lambda=0$ или $\vec a=\vec 0$, то $\lambda\vec a=\vec 0$.
{{figure:vec_sum}}

### A3. Определение коллинеарных и компланарных векторов
refs: g01
**Коллинеарные** — лежат на одной прямой или на параллельных прямых; нулевой вектор коллинеарен любому.
**Компланарные** — три вектора, лежащие в одной плоскости или параллельные одной плоскости.
{{figure:collinear_coplanar}}

### A4. Определение линейно зависимой и линейно независимой системы векторов
refs: g02
Система $\{\vec a_1,\dots,\vec a_n\}$ **линейно зависима**, если существует нетривиальный набор $\lambda_1,\dots,\lambda_n$ (хотя бы одно $\lambda_i\ne0$) такой, что $\lambda_1\vec a_1+\dots+\lambda_n\vec a_n=\vec 0$.
**Линейно независима**, если $\lambda_1\vec a_1+\dots+\lambda_n\vec a_n=\vec 0\ \Rightarrow\ \lambda_1=\dots=\lambda_n=0$.

### A5. Геометрические критерии линейной зависимости 2-х и 3-х векторов
refs: g02
- Два вектора линейно зависимы $\iff$ они коллинеарны.
- Три вектора линейно зависимы $\iff$ они компланарны.

### A6. Определение базиса и координат вектора
refs: g03
**Базис** в $V_n$ ($n=1,2,3$) — упорядоченная максимальная линейно независимая система векторов: один ненулевой вектор в $V_1$, два неколлинеарных в $V_2$, три некомпланарных в $V_3$.
**Координаты** вектора $\vec x$ — коэффициенты $(x_1,\dots,x_n)$ его единственного разложения по базису: $\vec x=x_1\vec e_1+\dots+x_n\vec e_n$.

### A7. Сформулировать теорему о разложении вектора по базису
refs: g03
Любой вектор пространства можно разложить по базису, и притом единственным образом: если $(\vec e_1,\dots,\vec e_n)$ — базис, то $\forall\vec x\ \exists!\,(x_1,\dots,x_n):\ \vec x=\sum_{i=1}^n x_i\vec e_i$.

### A8. Определение ортогональной скалярной проекции вектора на направление
refs: g04
Ортогональная скалярная проекция вектора $\vec a$ на направление вектора $\vec b$ — число
$$\operatorname{Пр}_{\vec b}\vec a=|\vec a|\cos\varphi,$$
где $\varphi$ — угол между $\vec a$ и $\vec b$.
{{figure:projection}}

### A9. Определение скалярного произведения векторов
refs: g04
Скалярное произведение $\vec a$ и $\vec b$ — число, равное произведению их длин на косинус угла между ними:
$$\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\varphi=|\vec b|\operatorname{Пр}_{\vec b}\vec a.$$

### A10. Свойство линейности скалярного произведения
refs: g04
1. $(\vec a+\vec b)\cdot\vec c=\vec a\cdot\vec c+\vec b\cdot\vec c$;
2. $(\lambda\vec a)\cdot\vec b=\lambda(\vec a\cdot\vec b)$.

### A11. Вычисление скалярного произведения в ОНБ
refs: g04
$$\vec a\cdot\vec b=x_ax_b+y_ay_b+z_az_b.$$

### A12. Косинус угла между векторами в ОНБ
refs: g04
$$\cos\varphi=\frac{x_ax_b+y_ay_b+z_az_b}{\sqrt{x_a^2+y_a^2+z_a^2}\cdot\sqrt{x_b^2+y_b^2+z_b^2}}\qquad(\vec a,\vec b\ne\vec 0).$$

### A13. Определение правой и левой тройки векторов
refs: g05
Упорядоченная тройка некомпланарных векторов $(\vec a,\vec b,\vec c)$ **правая**, если из конца третьего вектора $\vec c$ кратчайший поворот от $\vec a$ к $\vec b$ виден против часовой стрелки; если по часовой — **левая**.
{{figure:right_left}}

### A14. Определение векторного произведения векторов
refs: g05
Векторное произведение неколлинеарных $\vec a$ и $\vec b$ — вектор $\vec c=\vec a\times\vec b$, для которого:
1. $\vec c\perp\vec a$ и $\vec c\perp\vec b$;
2. $|\vec c|=|\vec a|\,|\vec b|\sin\varphi$ (площадь параллелограмма на $\vec a$ и $\vec b$);
3. тройка $(\vec a,\vec b,\vec c)$ правая.

Если $\vec a\parallel\vec b$, то $\vec a\times\vec b=\vec 0$.
{{figure:cross}}

### A15. Симметричность скалярного и антисимметричность векторного произведения
refs: g04, g05
- Скалярное коммутативно: $\vec a\cdot\vec b=\vec b\cdot\vec a$.
- Векторное антикоммутативно: $\vec a\times\vec b=-(\vec b\times\vec a)$.

### A16. Сформулировать свойство линейности векторного произведения векторов
refs: g05
1. $(\vec a_1+\vec a_2)\times\vec b=\vec a_1\times\vec b+\vec a_2\times\vec b$;
2. $(\lambda\vec a)\times\vec b=\lambda(\vec a\times\vec b)$.

### A17. Записать формулу для вычисления векторного произведения в правом ортонормированном базисе
refs: g05
$$\vec a\times\vec b=\begin{vmatrix}\vec i&\vec j&\vec k\\x_a&y_a&z_a\\x_b&y_b&z_b\end{vmatrix}=\vec i\,(y_az_b-z_ay_b)-\vec j\,(x_az_b-z_ax_b)+\vec k\,(x_ay_b-y_ax_b).$$

### A18. Определение смешанного произведения векторов
refs: g06
Смешанное произведение трёх векторов — число $\vec a\vec b\vec c=(\vec a\times\vec b)\cdot\vec c$.
{{figure:mixed}}

### A19. Правило перестановок смешанного произведения
refs: g06
$$\vec a\vec b\vec c=\vec b\vec c\vec a=\vec c\vec a\vec b=-\vec b\vec a\vec c=-\vec c\vec b\vec a=-\vec a\vec c\vec b.$$
Циклическая перестановка не меняет значения, перестановка двух сомножителей меняет знак.

### A20. Свойство линейности смешанного произведения
refs: g06
1. $(\vec a_1+\vec a_2)\vec b\vec c=\vec a_1\vec b\vec c+\vec a_2\vec b\vec c$;
2. $(\lambda\vec a)\vec b\vec c=\lambda(\vec a\vec b\vec c)$.

### A21. Записать формулу для вычисления смешанного произведения в правом ортонормированном базисе
refs: g06
$$\vec a\vec b\vec c=\begin{vmatrix}x_a&y_a&z_a\\x_b&y_b&z_b\\x_c&y_c&z_c\end{vmatrix}.$$

### A22. Записать общее уравнение плоскости и уравнение «в отрезках». Объяснить геометрический смысл входящих в эти уравнения параметров
refs: g07
- **Общее:** $Ax+By+Cz+D=0$, $A^2+B^2+C^2\ne0$. Смысл: $\vec n=\{A,B,C\}$ — **нормальный вектор**, перпендикулярный плоскости; $D$ задаёт положение плоскости: $D=0$ — плоскость проходит через начало координат, а $\frac{|D|}{|\vec n|}$ — расстояние от начала координат до плоскости.
- **В отрезках:** $\dfrac xa+\dfrac yb+\dfrac zc=1$ ($a,b,c\ne0$). Смысл: $a,b,c$ — **величины отрезков** (со знаком), отсекаемых плоскостью на осях $Ox,Oy,Oz$: плоскость проходит через точки $(a,0,0)$, $(0,b,0)$, $(0,0,c)$.
{{figure:plane_intercepts}}

### A23. Уравнение плоскости через три точки
refs: g07
Через точки $M_1,M_2,M_3$, не лежащие на одной прямой:
$$\begin{vmatrix}x-x_1&y-y_1&z-z_1\\x_2-x_1&y_2-y_1&z_2-z_1\\x_3-x_1&y_3-y_1&z_3-z_1\end{vmatrix}=0.$$

### A24. Записать условия параллельности и перпендикулярности плоскостей
refs: g07
- Перпендикулярность: $A_1A_2+B_1B_2+C_1C_2=0$ ($\vec n_1\cdot\vec n_2=0$).
- Параллельность: $\dfrac{A_1}{A_2}=\dfrac{B_1}{B_2}=\dfrac{C_1}{C_2}$ ($\vec n_1\parallel\vec n_2$); различны, если это отношение $\ne\dfrac{D_1}{D_2}$, совпадают, если $=\dfrac{D_1}{D_2}$.

### A25. Записать формулу для расстояния от точки до плоскости, заданной общим уравнением
refs: g07
$$\rho(M_0,\pi)=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}.$$
{{figure:dist_point_plane}}

### A26. Записать канонические и параметрические уравнения прямой в пространстве. Объяснить геометрический смысл входящих в эти уравнения параметров
refs: g08
- **Канонические:** $\dfrac{x-x_0}l=\dfrac{y-y_0}m=\dfrac{z-z_0}n$.
- **Параметрические:** $x=x_0+lt,\ y=y_0+mt,\ z=z_0+nt$, $t\in\mathbb R$.

Смысл: $(x_0,y_0,z_0)$ — координаты **точки $M_0$**, через которую проходит прямая; $\vec s=\{l,m,n\}\ne\vec 0$ — **направляющий вектор**, параллельный прямой; $t$ — параметр: $\overrightarrow{M_0M}=t\vec s$, каждому $t$ соответствует одна точка прямой ($|t|\,|\vec s|$ — расстояние от $M_0$). Нуль в знаменателе канонических уравнений означает, что соответствующая координата постоянна.
{{figure:line_param}}

### A27. Уравнение прямой через две точки
refs: g08
$$\frac{x-x_1}{x_2-x_1}=\frac{y-y_1}{y_2-y_1}=\frac{z-z_1}{z_2-z_1}.$$

### A28. Условие принадлежности двух прямых одной плоскости
refs: g08
Прямые $L_1(M_1,\vec s_1)$ и $L_2(M_2,\vec s_2)$ лежат в одной плоскости (пересекаются или параллельны) $\iff$ векторы $\vec s_1,\vec s_2,\overrightarrow{M_1M_2}$ компланарны:
$$\vec s_1\,\vec s_2\,\overrightarrow{M_1M_2}=0.$$
{{figure:coplanar_lines}}

### A29. Расстояние от точки M₁ до прямой L(M₀, s)
refs: g08
$$\rho(M_1,L)=\frac{|\overrightarrow{M_0M_1}\times\vec s|}{|\vec s|}.$$
{{figure:dist_point_line}}
**Другой способ — через скалярное произведение.** Вычесть из $\overrightarrow{M_0M_1}$ его проекцию на прямую:
$$\vec h=\overrightarrow{M_0M_1}-\frac{\overrightarrow{M_0M_1}\cdot\vec s}{\vec s\cdot\vec s}\,\vec s,\qquad \rho=|\vec h|.$$
Основание перпендикуляра: $H=M_0+t\,\vec s$, где $t=\dfrac{\overrightarrow{M_0M_1}\cdot\vec s}{\vec s\cdot\vec s}$. На вопрос РК пиши формулу через векторное произведение, как в конспекте.

### A30. Расстояние между скрещивающимися прямыми L₁(M₁, s₁) и L₂(M₂, s₂)
refs: g08
$$\rho(L_1,L_2)=\frac{|\vec s_1\,\vec s_2\,\overrightarrow{M_1M_2}|}{|\vec s_1\times\vec s_2|}.$$
{{figure:skew}}

## B

### B1. Доказать геометрический критерий линейной зависимости трёх векторов
refs: g02
**Теорема.** Три вектора ЛЗ $\iff$ они компланарны.

**⇒** Пусть $\lambda_1\vec a+\lambda_2\vec b+\lambda_3\vec c=\vec 0$, $\lambda_1\ne0$. Тогда $\vec a=\beta\vec b+\gamma\vec c$, где $\beta=-\frac{\lambda_2}{\lambda_1}$, $\gamma=-\frac{\lambda_3}{\lambda_1}$. Отложим $\vec b,\vec c$ из точки $O$: $\beta\vec b$ и $\gamma\vec c$ лежат в плоскости $\vec b,\vec c$, их сумма $\vec a$ (правило параллелограмма) — тоже. Векторы компланарны.

**⇐** Если среди векторов есть нулевой или два коллинеарных — ЛЗ очевидна (нулевой с коэффициентом $1$; коллинеарные ЛЗ по критерию для двух векторов). Пусть $\vec a\nparallel\vec b$. Отложим $\overrightarrow{OA}=\vec a$, $\overrightarrow{OB}=\vec b$, $\overrightarrow{OC}=\vec c$ в одной плоскости. Через $C$ проведём прямые, параллельные $OA$ и $OB$; получим параллелограмм $OA'CB'$:
$$\vec c=\overrightarrow{OA'}+\overrightarrow{OB'}=\alpha\vec a+\beta\vec b\ \Rightarrow\ \alpha\vec a+\beta\vec b-1\cdot\vec c=\vec 0.$$
Коэффициент $-1\ne0$ — комбинация нетривиальна, векторы ЛЗ. $\blacksquare$
{{figure:lin_dep_proof}}

### B2. Теорема о разложении вектора по базису
refs: g03
**Теорема.** Любой вектор $V_3$ раскладывается по базису $(\vec e_1,\vec e_2,\vec e_3)$, и единственным образом.

**Существование.** Любые 4 вектора в $V_3$ ЛЗ: $\alpha_0\vec x+\alpha_1\vec e_1+\alpha_2\vec e_2+\alpha_3\vec e_3=\vec 0$ нетривиально. Здесь $\alpha_0\ne0$, иначе базис был бы ЛЗ. Делим на $\alpha_0$:
$$\vec x=-\tfrac{\alpha_1}{\alpha_0}\vec e_1-\tfrac{\alpha_2}{\alpha_0}\vec e_2-\tfrac{\alpha_3}{\alpha_0}\vec e_3.$$
**Единственность.** Если $\vec x=\sum x_i\vec e_i=\sum y_i\vec e_i$, то $\vec 0=\sum(x_i-y_i)\vec e_i$; базис ЛНЗ, значит $x_i=y_i$. $\blacksquare$
{{figure:basis}}

### B3. Доказательство линейности скалярного произведения
refs: g04
Опора: $\vec a\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}\vec a$; проекция суммы равна сумме проекций, $\operatorname{Пр}(\lambda\vec a)=\lambda\operatorname{Пр}\vec a$.
1. $(\vec a+\vec b)\cdot\vec c=|\vec c|\operatorname{Пр}_{\vec c}(\vec a+\vec b)=|\vec c|(\operatorname{Пр}_{\vec c}\vec a+\operatorname{Пр}_{\vec c}\vec b)=\vec a\cdot\vec c+\vec b\cdot\vec c$.
2. $(\lambda\vec a)\cdot\vec b=|\vec b|\operatorname{Пр}_{\vec b}(\lambda\vec a)=\lambda|\vec b|\operatorname{Пр}_{\vec b}\vec a=\lambda(\vec a\cdot\vec b)$. $\blacksquare$

### B4. Вывод скалярного произведения в ОНБ
refs: g04
$\vec a=x_a\vec i+y_a\vec j+z_a\vec k$, $\vec b=x_b\vec i+y_b\vec j+z_b\vec k$. В ОНБ $\vec i\cdot\vec i=\vec j\cdot\vec j=\vec k\cdot\vec k=1$, $\vec i\cdot\vec j=\vec i\cdot\vec k=\vec j\cdot\vec k=0$. Раскрываем скобки по линейности — из девяти слагаемых остаются три:
$$\vec a\cdot\vec b=x_ax_b\cdot1+y_ay_b\cdot1+z_az_b\cdot1=x_ax_b+y_ay_b+z_az_b.\ \blacksquare$$

### B5. Вывести формулу для вычисления векторного произведения в правом ортонормированном базисе
refs: g05
В правом ОНБ: $\vec i\times\vec i=\vec j\times\vec j=\vec k\times\vec k=\vec 0$; $\vec i\times\vec j=\vec k$, $\vec j\times\vec k=\vec i$, $\vec k\times\vec i=\vec j$; при перестановке — знак минус. Раскрываем по линейности:
$$\vec a\times\vec b=x_ay_b\vec k-x_az_b\vec j-y_ax_b\vec k+y_az_b\vec i+z_ax_b\vec j-z_ay_b\vec i$$
$$=(y_az_b-z_ay_b)\vec i-(x_az_b-z_ax_b)\vec j+(x_ay_b-y_ax_b)\vec k=\begin{vmatrix}\vec i&\vec j&\vec k\\x_a&y_a&z_a\\x_b&y_b&z_b\end{vmatrix}.\ \blacksquare$$

### B6. Доказательство линейности смешанного произведения
refs: g06
По определению $\vec a\vec b\vec c=(\vec a\times\vec b)\cdot\vec c$ и линейности векторного и скалярного произведений:
1. $(\vec a_1+\vec a_2)\vec b\vec c=(\vec a_1\times\vec b+\vec a_2\times\vec b)\cdot\vec c=\vec a_1\vec b\vec c+\vec a_2\vec b\vec c$;
2. $(\lambda\vec a)\vec b\vec c=(\lambda(\vec a\times\vec b))\cdot\vec c=\lambda(\vec a\vec b\vec c)$. $\blacksquare$

### B7. Вывод смешанного произведения в правом ОНБ
refs: g06
$\vec a\times\vec b=\{y_az_b-z_ay_b,\ -(x_az_b-z_ax_b),\ x_ay_b-y_ax_b\}$. Скалярно на $\vec c$:
$$(\vec a\times\vec b)\cdot\vec c=x_c(y_az_b-z_ay_b)-y_c(x_az_b-z_ax_b)+z_c(x_ay_b-y_ax_b)=\begin{vmatrix}x_a&y_a&z_a\\x_b&y_b&z_b\\x_c&y_c&z_c\end{vmatrix}$$
— разложение определителя по третьей строке. $\blacksquare$

### B8. Вывести формулу для расстояния от точки до плоскости, заданной общим уравнением
refs: g07
Возьмём $M_1(x_1,y_1,z_1)\in\pi$: $D=-(Ax_1+By_1+Cz_1)$. Расстояние — модуль проекции $\overrightarrow{M_1M_0}$ на нормаль:
$$\rho=\frac{|\overrightarrow{M_1M_0}\cdot\vec n|}{|\vec n|},\qquad \overrightarrow{M_1M_0}\cdot\vec n=A(x_0-x_1)+B(y_0-y_1)+C(z_0-z_1)=Ax_0+By_0+Cz_0+D.$$
$|\vec n|=\sqrt{A^2+B^2+C^2}$, откуда $\rho=\dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$. $\blacksquare$
{{figure:dist_point_plane}}

### B9. Вывести формулу для расстояния от точки до прямой в пространстве
refs: g08
Построим параллелограмм на $\vec s$ и $\overrightarrow{M_0M_1}$. Площадь двумя способами: $S=|\overrightarrow{M_0M_1}\times\vec s|$ и $S=|\vec s|\cdot h$, где $h$ — высота из $M_1$ на $L$, то есть $\rho(M_1,L)$. Приравнивая:
$$\rho(M_1,L)=\frac{|\overrightarrow{M_0M_1}\times\vec s|}{|\vec s|}.\ \blacksquare$$
{{figure:dist_point_line}}

### B10. Вывод расстояния между скрещивающимися прямыми
refs: g08
$\vec s_1,\vec s_2,\overrightarrow{M_1M_2}$ некомпланарны — строим на них параллелепипед. Объём двумя способами: $V=|\vec s_1\vec s_2\overrightarrow{M_1M_2}|$ и $V=S_{\text{осн}}\cdot h$, где $S_{\text{осн}}=|\vec s_1\times\vec s_2|$, а $h$ — расстояние между параллельными плоскостями, содержащими прямые, то есть $\rho(L_1,L_2)$:
$$\rho(L_1,L_2)=\frac{|\vec s_1\vec s_2\overrightarrow{M_1M_2}|}{|\vec s_1\times\vec s_2|}.\ \blacksquare$$
{{figure:skew}}

## C

### C1. Аксиомы векторного (линейного) пространства V(ℝ)
refs: g09
Множество $V$ с операциями сложения и умножения на число из $\mathbb R$, $\forall\vec u,\vec v,\vec w\in V$, $\forall\alpha,\beta\in\mathbb R$:
1. $(\vec u+\vec v)+\vec w=\vec u+(\vec v+\vec w)$;
2. $\exists\vec 0\in V:\ \vec v+\vec 0=\vec v$;
3. $\exists(-\vec v)\in V:\ \vec v+(-\vec v)=\vec 0$;
4. $\vec u+\vec v=\vec v+\vec u$;
5. $(\alpha\beta)\vec v=\alpha(\beta\vec v)$;
6. $1\cdot\vec v=\vec v$;
7. $\alpha(\vec u+\vec v)=\alpha\vec u+\alpha\vec v$;
8. $(\alpha+\beta)\vec v=\alpha\vec v+\beta\vec v$.

### C2. Аксиомы скалярного произведения и нормы
refs: g09
**Скалярное произведение** $\langle\vec u,\vec v\rangle$ в $V(\mathbb R)$:
- линейность: $\langle\alpha\vec u,\vec v\rangle=\alpha\langle\vec u,\vec v\rangle$, $\langle\vec u+\vec w,\vec v\rangle=\langle\vec u,\vec v\rangle+\langle\vec w,\vec v\rangle$;
- симметричность: $\langle\vec u,\vec v\rangle=\langle\vec v,\vec u\rangle$;
- положительная определённость и невырожденность: $\langle\vec v,\vec v\rangle\ge0$, $\langle\vec v,\vec v\rangle=0\iff\vec v=\vec 0$.

**Норма:** $\|\alpha\vec v\|=|\alpha|\,\|\vec v\|$; $\vec v\ne\vec 0\Rightarrow\|\vec v\|>0$; $\|\vec x+\vec y\|\le\|\vec x\|+\|\vec y\|$. Скалярное произведение порождает норму $\|\vec v\|=\sqrt{\langle\vec v,\vec v\rangle}$.

### C3. Двойное векторное произведение и тождества
refs: g06, g09
$$[\vec u,[\vec v,\vec w]]=\vec v\langle\vec u,\vec w\rangle-\vec w\langle\vec u,\vec v\rangle\qquad\text{(тождество Лагранжа у лектора, «бац минус цаб»)};$$
$$[\vec u,[\vec v,\vec w]]+[\vec v,[\vec w,\vec u]]+[\vec w,[\vec u,\vec v]]=\vec 0\qquad\text{(тождество Якоби)}.$$

### C4. Аффинное пространство и аффинное подпространство
refs: g09
**Аффинное пространство** $A(V)$ — множество точек с операцией сдвига точки на вектор $P+\vec v=Q$:
1. $(P+\vec u)+\vec v=P+(\vec u+\vec v)$;
2. $\forall P,Q\in A\ \exists!\,\vec v\in V:\ P+\vec v=Q$ (обозначение $\overrightarrow{PQ}$).

**Аффинное подпространство** через точку $P_0$ с направляющим линейным подпространством $V_0\subseteq V$:
$$L=P_0+V_0=\{P\in A\mid P=P_0+\vec v,\ \vec v\in V_0\},\qquad\dim L=\dim V_0.$$

### C5. Геометрические примеры аффинных подпространств
refs: g09
- $\dim0$: $V_0=\{\vec 0\}$, $P=P_0$ — точка;
- $\dim1$: $V_0=\operatorname{span}\{\vec s\}$, $P=P_0+t\vec s$ — прямая;
- $\dim2$: $V_0=\operatorname{span}\{\vec u,\vec v\}$, $P=P_0+\lambda\vec u+\mu\vec v$ — плоскость;
- $\dim3$: $V_0=V_3$, $P=P_0+\vec v$ — всё пространство.
{{figure:affine}}

## D

### D1. Аффинная и прямоугольная системы координат. Координаты точки
refs: g03
**Аффинная СК** — совокупность точки $O$ (начала координат) и базиса: $O\vec e_1\vec e_2\vec e_3$.
**Прямоугольная СК** — точка и ортонормированный базис: $O\vec i\vec j\vec k$.
**Координаты точки** $M$ — координаты её радиус-вектора $\overrightarrow{OM}$ в этом базисе: $\overrightarrow{OM}=x_0\vec e_1+y_0\vec e_2+z_0\vec e_3\iff M(x_0,y_0,z_0)$.
Отсюда $\overrightarrow{AB}=\overrightarrow{OB}-\overrightarrow{OA}=\{x_B-x_A,\ y_B-y_A,\ z_B-z_A\}$; длина $|AB|=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$ — только в прямоугольной СК.

### D2. Деление отрезка в данном отношении
refs: g03
Точка $M$ делит $M_1M_2$ в отношении $p:q$ ($|M_1M|:|MM_2|=p:q$). Из $q\,\overrightarrow{M_1M}=p\,\overrightarrow{MM_2}$:
$$x=\frac{qx_1+px_2}{p+q},\qquad y=\frac{qy_1+py_2}{p+q},\qquad z=\frac{qz_1+pz_2}{p+q}.$$
Середина отрезка ($p=q$): полусумма координат концов.
{{figure:segment_div}}

### D3. Направляющие косинусы вектора и орт
refs: g04
В ОНБ координаты вектора — проекции на оси: $x_1=|\vec x|\cos\alpha$, $x_2=|\vec x|\cos\beta$, $x_3=|\vec x|\cos\gamma$, где $\alpha,\beta,\gamma$ — углы с $\vec i,\vec j,\vec k$. $\cos\alpha,\cos\beta,\cos\gamma$ — **направляющие косинусы**:
$$\cos\alpha=\frac{x_1}{|\vec x|},\quad\cos\beta=\frac{x_2}{|\vec x|},\quad\cos\gamma=\frac{x_3}{|\vec x|},\qquad \cos^2\alpha+\cos^2\beta+\cos^2\gamma=1.$$
Они же — координаты орта $\vec x^{\,0}=\dfrac{\vec x}{|\vec x|}$.

### D4. Геометрический смысл смешанного произведения. Критерий компланарности
refs: g06
$\vec a\vec b\vec c=\pm V$ параллелепипеда, построенного на $\vec a,\vec b,\vec c$: «$+$», если тройка правая, «$-$», если левая. Доказательство: $(\vec a\times\vec b)\cdot\vec c=|\vec a\times\vec b|\operatorname{Пр}_{\vec a\times\vec b}\vec c=S\cdot(\pm h)$.
**Теорема 6.1:** $\vec a,\vec b,\vec c$ компланарны $\iff\vec a\vec b\vec c=0$.
{{figure:mixed}}

### D5. Общее уравнение прямой на плоскости. Нормальный и направляющий векторы
refs: g08a
$Ax+By+C=0$, $A^2+B^2\ne0$. Направляющий вектор $\vec m=\{-B,A\}$; в прямоугольной СК $\vec n=\{A,B\}$ — нормальный вектор (ненулевой, перпендикулярный прямой).
Через точку и нормаль: $A(x-x_0)+B(y-y_0)=0$. Через точку и направляющий вектор $\{a,b\}$: $\frac{x-x_0}a=\frac{y-y_0}b$, или $x=x_0+ka$, $y=y_0+kb$.
{{figure:line2d}}

### D6. Уравнения прямой на плоскости: с угловым коэффициентом, в отрезках, через две точки
refs: g08a
- $y=kx+b$: $k=-\frac AB=\operatorname{tg}\varphi$ — тангенс угла наклона к $Ox$, $b$ — отрезок на оси $Oy$ (нужно $B\ne0$).
- $\frac xa+\frac yb=1$: $a=-\frac CA$, $b=-\frac CB$ — отрезки, отсекаемые на осях (нужно $A,B,C\ne0$).
- Через $M_1,M_2$: $\dfrac{x-x_1}{x_2-x_1}=\dfrac{y-y_1}{y_2-y_1}$.

### D7. Нормальное уравнение прямой на плоскости. Нормирующий множитель
refs: g08a
$x\cos\alpha+y\cos\beta-p=0$, где $\{\cos\alpha,\cos\beta\}$ — единичная нормаль, направленная от начала координат к прямой, $p\ge0$ — расстояние от $O$ до прямой.
Из общего: умножить на $\mu=\pm\frac1{\sqrt{A^2+B^2}}$, знак $\mu$ противоположен знаку $C$.
Пример: $3x-4y+15=0\ \to\ -\frac35x+\frac45y-3=0$, $p=3$.

### D8. Расстояние от точки до прямой на плоскости (вывод)
refs: g08a
$$\rho(M_0,l)=\frac{|Ax_0+By_0+C|}{\sqrt{A^2+B^2}}.$$
Вывод: в нормальном уравнении $x\cos\alpha+y\cos\beta-p=0$ проекция $\overrightarrow{OM_0}$ на единичную нормаль равна $x_0\cos\alpha+y_0\cos\beta=p+\delta$, где $\delta$ — отклонение точки от прямой. Значит $\rho=|\delta|=|x_0\cos\alpha+y_0\cos\beta-p|$; подставив $\cos\alpha=\mu A$, $\cos\beta=\mu B$, $p=-\mu C$, $|\mu|=\frac1{\sqrt{A^2+B^2}}$, получаем формулу.
{{figure:dist2d}}

### D9. Взаимное расположение и угол между прямыми на плоскости
refs: g08a
$\vec n_1=\{A_1,B_1\}$, $\vec n_2=\{A_2,B_2\}$.
- Пересекаются: $A_1B_2-A_2B_1\ne0$. Параллельны: $\frac{A_1}{A_2}=\frac{B_1}{B_2}\ne\frac{C_1}{C_2}$; совпадают — все три отношения равны. Перпендикулярны: $A_1A_2+B_1B_2=0$.
- Угол: $\cos\varphi=\dfrac{|A_1A_2+B_1B_2|}{\sqrt{A_1^2+B_1^2}\sqrt{A_2^2+B_2^2}}$.
- Через угловые коэффициенты: параллельны $k_1=k_2$, перпендикулярны $k_1k_2=-1$, $\operatorname{tg}\varphi=\left|\dfrac{k_2-k_1}{1+k_1k_2}\right|$.

### D10. Нормальное уравнение плоскости
refs: g07
$x\cos\alpha+y\cos\beta+z\cos\gamma-p=0$, где $\{\cos\alpha,\cos\beta,\cos\gamma\}$ — единичная нормаль, направленная от начала координат к плоскости, $p\ge0$ — расстояние от $O$ до плоскости. Для любой точки $M$ плоскости $\overrightarrow{OM}\cdot\vec n^{\,0}=\operatorname{Пр}_{\vec n^0}\overrightarrow{OM}=p$.
Из общего $Ax+By+Cz+D=0$: умножить на $\mu=\pm\frac1{\sqrt{A^2+B^2+C^2}}$, знак противоположен знаку $D$.
Расстояние от точки: $\rho=|x_0\cos\alpha+y_0\cos\beta+z_0\cos\gamma-p|$.

### D11. Расстояние между параллельными плоскостями
refs: g07
Если коэффициенты при $x,y,z$ одинаковые: $\rho=\dfrac{|D_1-D_2|}{\sqrt{A^2+B^2+C^2}}$.
Если пропорциональны ($A_1=kA_2$, $B_1=kB_2$, $C_1=kC_2$): $\rho=\dfrac{\left|\frac{D_1}{k}-D_2\right|}{\sqrt{A_2^2+B_2^2+C_2^2}}$.
Плоскости совпадают, если пропорциональны и свободные члены: $\frac{A_1}{A_2}=\frac{B_1}{B_2}=\frac{C_1}{C_2}=\frac{D_1}{D_2}$.

### D12. Взаимное расположение прямой и плоскости в пространстве
refs: g08
Прямая $L(M_0,\vec s)$, плоскость $Ax+By+Cz+D=0$, $\vec n=\{A,B,C\}$, $f(M_0)=Ax_0+By_0+Cz_0+D$.
- Пересекаются в одной точке: $\vec s\cdot\vec n\ne0$.
- Параллельны: $\vec s\cdot\vec n=0$, $f(M_0)\ne0$. Лежит в плоскости: $\vec s\cdot\vec n=0$, $f(M_0)=0$.
- Перпендикулярны: $\vec s\parallel\vec n$. Угол: $\sin\varphi=\dfrac{|\vec s\cdot\vec n|}{|\vec s||\vec n|}$.

Если прямая задана двумя плоскостями, система из трёх уравнений имеет единственное решение $\iff\begin{vmatrix}A_1&B_1&C_1\\A_2&B_2&C_2\\A&B&C\end{vmatrix}\ne0$; нет решений — параллельны; бесконечно много — прямая в плоскости.
