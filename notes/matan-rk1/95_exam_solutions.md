# Решения задач РК-1 и эталонный вариант

Все ответы проверены вычислением (sympy). Ссылки на приёмы — «Дан предел: с чего начать», темы 13, 19–22, 25.

# Задача 1. Пределы

### 1.1. $\lim\limits_{x\to1}\dfrac{x^3+4x^2+x-6}{x^3+3x^2-4}$
Тип: $\frac00$, многочлены → разложить, сократить $(x-1)$.

<details><summary>Решение</summary>

Деление на $(x-1)$ (схема Горнера):
$x^3+4x^2+x-6=(x-1)(x^2+5x+6)=(x-1)(x+2)(x+3)$;
$x^3+3x^2-4=(x-1)(x^2+4x+4)=(x-1)(x+2)^2$.
$$\lim_{x\to1}\frac{(x+2)(x+3)}{(x+2)^2}=\lim_{x\to1}\frac{x+3}{x+2}=\frac43.$$
**Ответ:** $\frac43$.
</details>

### 1.2. $\lim\limits_{x\to-3}\dfrac{x^3-7x+6}{x^3+7x^2+15x+9}$
Тип: $\frac00$, многочлены; **ловушка — кратный корень знаменателя.**

<details><summary>Решение</summary>

$x^3-7x+6=(x+3)(x^2-3x+2)=(x+3)(x-1)(x-2)$;
$x^3+7x^2+15x+9=(x+3)(x^2+4x+3)=(x+3)^2(x+1)$.
$$\frac{(x-1)(x-2)}{(x+3)(x+1)}\to\frac{(-4)(-5)}{0\cdot(-2)}=\frac{20}{0}.$$
Числитель $\to20\ne0$, знаменатель — б.м. ⇒ предел $\infty$ (тема 18).
Односторонние: $x\to-3+$: $(x+3)\to0+$, $(x+1)\to-2$, знаменатель $\to0-$ ⇒ $-\infty$; $x\to-3-$ ⇒ $+\infty$.
**Ответ:** $\infty$ ($-\infty$ справа, $+\infty$ слева).
</details>

### 1.3. $\lim\limits_{x\to+\infty}\sqrt x\left(\sqrt{x+3}-\sqrt{x-2}\right)$
Тип: $\infty\cdot0$ (точнее $\infty\cdot(\infty-\infty)$) → сопряжённое.

<details><summary>Решение</summary>

$$\sqrt{x+3}-\sqrt{x-2}=\frac{(x+3)-(x-2)}{\sqrt{x+3}+\sqrt{x-2}}=\frac5{\sqrt{x+3}+\sqrt{x-2}}.$$
$$\sqrt x\cdot\frac5{\sqrt{x+3}+\sqrt{x-2}}=\frac5{\sqrt{1+\frac3x}+\sqrt{1-\frac2x}}\to\frac5{1+1}=\frac52.$$
**Ответ:** $\frac52$.
</details>

### 1.4. $\lim\limits_{x\to+\infty}\left(\sqrt{x(x+3)}-\sqrt{x^2+1}\right)$
Тип: $\infty-\infty$ → сопряжённое.

<details><summary>Решение</summary>

$$\frac{(x^2+3x)-(x^2+1)}{\sqrt{x^2+3x}+\sqrt{x^2+1}}=\frac{3x-1}{\sqrt{x^2+3x}+\sqrt{x^2+1}}=\frac{3-\frac1x}{\sqrt{1+\frac3x}+\sqrt{1+\frac1{x^2}}}\to\frac32$$
(делим на $x>0$, $\sqrt{x^2}=x$).
**Ответ:** $\frac32$.
</details>

### 1.5. $\lim\limits_{x\to0}\dfrac{\sqrt[3]{1+x\operatorname{tg}x}-1}{2^{x^2}-1}$
Тип: $\frac00$ → эквивалентности.

<details><summary>Решение</summary>

$u=x\operatorname{tg}x\to0$: $\sqrt[3]{1+u}-1\sim\frac u3=\frac{x\operatorname{tg}x}3\sim\frac{x^2}3$.
$2^{x^2}-1\sim x^2\ln2$.
$$\lim_{x\to0}\frac{x^2/3}{x^2\ln2}=\frac1{3\ln2}.$$
**Ответ:** $\frac1{3\ln2}$.
</details>

### 1.6. $\lim\limits_{x\to0}\dfrac{e^x-e^{2x}}{\sqrt{4-x}-2}$
Тип: $\frac00$ → вынести множитель + эквивалентности.

<details><summary>Решение</summary>

Числитель: $e^x-e^{2x}=e^x(1-e^x)=-e^x(e^x-1)\sim-1\cdot x=-x$.
Знаменатель: $\sqrt{4-x}-2=2\left(\sqrt{1-\frac x4}-1\right)\sim2\cdot\frac{-x/4}2=-\frac x4$.
$$\lim_{x\to0}\frac{-x}{-x/4}=4.$$
(Или сопряжённое: $\sqrt{4-x}-2=\frac{-x}{\sqrt{4-x}+2}$.)
**Ответ:** $4$.
</details>

### 1.7. $\lim\limits_{x\to0}\dfrac{\ln\cos2x}{x^2}$
Тип: $\frac00$ → $\ln(1+u)\sim u$.

<details><summary>Решение</summary>

$\ln\cos2x=\ln\bigl(1+(\cos2x-1)\bigr)\sim\cos2x-1\sim-\frac{(2x)^2}2=-2x^2$.
**Ответ:** $-2$.
</details>

### 1.8. $\lim\limits_{x\to\pi}\dfrac{1+\cos x}{(\pi-x)\sin x}$
Тип: $\frac00$, точка $\ne0$ → замена $t=x-\pi$.

<details><summary>Решение</summary>

$t=x-\pi\to0$: $\cos x=\cos(\pi+t)=-\cos t$; $\sin x=\sin(\pi+t)=-\sin t$; $\pi-x=-t$.
$$\frac{1-\cos t}{(-t)(-\sin t)}=\frac{1-\cos t}{t\sin t}\sim\frac{t^2/2}{t\cdot t}=\frac12.$$
**Ответ:** $\frac12$.
</details>

### 1.9. $\lim\limits_{x\to0}\dfrac{\operatorname{tg}2x-\sin2x}{2^{x^3}-1}$
Тип: $\frac00$; **в разности не заменять почленно.**

<details><summary>Решение</summary>

$\operatorname{tg}2x-\sin2x=\operatorname{tg}2x\,(1-\cos2x)\sim2x\cdot\frac{(2x)^2}2=4x^3$. $\ 2^{x^3}-1\sim x^3\ln2$.
**Ответ:** $\frac4{\ln2}$.
</details>

### 1.10. $\lim\limits_{x\to\infty}\left(\dfrac{x+5}{x-1}\right)^{3x+2}$
Тип: $1^\infty$.

<details><summary>Решение</summary>

$u-1=\frac{x+5}{x-1}-1=\frac6{x-1}$; $\ (u-1)v=\frac{6(3x+2)}{x-1}\to18$.
$$\left(1+\frac6{x-1}\right)^{3x+2}=\left[\left(1+\frac6{x-1}\right)^{\frac{x-1}6}\right]^{\frac{6(3x+2)}{x-1}}\to e^{18}.$$
**Ответ:** $e^{18}$.
</details>

### 1.11. $\lim\limits_{x\to0}\left(\dfrac{\operatorname{tg}x}{\sin x}\right)^{1/\sin^2x}$
Тип: $1^\infty$.

<details><summary>Решение</summary>

$u=\frac{\operatorname{tg}x}{\sin x}=\frac1{\cos x}\to1$; $u-1=\frac{1-\cos x}{\cos x}\sim\frac{x^2}2$; $v=\frac1{\sin^2x}\sim\frac1{x^2}$.
$(u-1)v\to\frac12$. **Ответ:** $e^{1/2}=\sqrt e$.
</details>

### 1.12. $\lim\limits_{x\to0}(\cos x)^{1/\operatorname{tg}x^2}$
Тип: $1^\infty$.

<details><summary>Решение</summary>

$u-1=\cos x-1\sim-\frac{x^2}2$; $v=\frac1{\operatorname{tg}x^2}\sim\frac1{x^2}$; $(u-1)v\to-\frac12$.
**Ответ:** $e^{-1/2}=\frac1{\sqrt e}$.
</details>

### 1.13. $\lim\limits_{x\to+\infty}x\bigl(\ln(1+x)-\ln x\bigr)$
Тип: $\infty\cdot0$ → $\ln(1+u)\sim u$, $u=\frac1x$.

<details><summary>Решение</summary>

$x\ln\frac{1+x}x=x\ln\left(1+\frac1x\right)\sim x\cdot\frac1x=1$. **Ответ:** $1$.
</details>

### 1.14. $\lim\limits_{x\to\infty}\dfrac{\ln(1+x^2)}{\lg(10+x^4)}$
Тип: $\frac\infty\infty$ с логарифмами → выделить главный член под логарифмом. **Ловушка: $\lg\ne\ln$.**

<details><summary>Решение</summary>

**Приём [не из лекций]:** $\ln(A\cdot(1+\text{б.м.}))=\ln A+\ln(1+\text{б.м.})$, второе слагаемое $\to0$ — б.б. плюс б.м. эквивалентна б.б.
$\ln(1+x^2)=\ln x^2+\ln\left(1+\frac1{x^2}\right)\sim2\ln|x|$.
$\lg(10+x^4)=\lg x^4+\lg\left(1+\frac{10}{x^4}\right)\sim4\lg|x|=\frac{4\ln|x|}{\ln10}$.
$$\lim_{x\to\infty}\frac{2\ln|x|}{4\ln|x|/\ln10}=\frac{\ln10}2.$$
**Ответ:** $\frac{\ln10}2\approx1{,}151$.
</details>

# Задача 2. Главная часть, порядки, сравнение

### 2.1. $f(x)=x^7\sin\dfrac1x+x\cos x$, $\ g(x)=x^3\operatorname{arctg}\dfrac1x$, $x\to\infty$

<details><summary>Решение</summary>

**а)** $u=\frac1x\to0$: $x^7\sin\frac1x\sim x^7\cdot\frac1x=x^6\to\infty$. Слагаемое $x\cos x$: $\left|\frac{x\cos x}{x^6}\right|\le\frac1{|x|^5}\to0$, т. е. $x\cos x=o(x^6)$. Тогда $f=x^6\left(x\sin\frac1x+\frac{\cos x}{x^5}\right)$, скобка $\to1+0=1$ ⇒ $f\to\infty$ — **б.б.**
$g=x^3\operatorname{arctg}\frac1x\sim x^3\cdot\frac1x=x^2\to\infty$ — **б.б.**

**б)** $f\sim x^6$: главная часть $x^6$ ($C=1$), **порядок роста $6$**.
$g\sim x^2$: главная часть $x^2$ ($C=1$), **порядок роста $2$**.

**в)** $\frac fg\sim x^4\to\infty$ ⇒ $f$ — б.б. **высшего порядка роста** по сравнению с $g$.
</details>

### 2.2. $f(x)=x\ln(1+x)$, $\ g(x)=e^{2x}-e^x$, $x\to0$

<details><summary>Решение</summary>

**а)** $f\to0\cdot\ln1=0$; $g\to1-1=0$ — обе **б.м.**

**б)** $f=x\cdot\ln(1+x)\sim x\cdot x=x^2$: главная часть $x^2$, **порядок малости $2$**.
$g=e^x(e^x-1)$, $e^x\to1$, $e^x-1\sim x$ ⇒ $g\sim x$: главная часть $x$, **порядок $1$**.

**в)** $\frac fg\sim x\to0$ ⇒ $f=o(g)$: $f$ — **высшего порядка малости**.
</details>

### 2.3. $f(x)=1+\cos x$, $\ g(x)=\dfrac{(x-\pi)^2}{x-3{,}14}$, $x\to\pi$
**Ловушка: $3{,}14\ne\pi$.**

<details><summary>Решение</summary>

**а)** $f\to1+\cos\pi=0$; $g\to\frac0{\pi-3{,}14}=0$ ($\pi-3{,}14\approx0{,}0016\ne0$) — обе **б.м.**

**б)** $t=x-\pi$: $1+\cos x=1-\cos t\sim\frac{t^2}2$ ⇒ $f\sim\frac12(x-\pi)^2$: **порядок $2$**, $C=\frac12$.
$x-3{,}14\to\pi-3{,}14$ (число) ⇒ $g\sim\frac1{\pi-3{,}14}(x-\pi)^2$: **порядок $2$**, $C=\frac1{\pi-3{,}14}\approx628{,}7$.

**в)** $\frac fg\to\frac{\pi-3{,}14}2\approx0{,}0008\ne0$, $\ne1$ ⇒ **одного порядка малости**, не эквивалентны.
</details>

# Задача 3. Непрерывность

### 3.1. $f(x)=\begin{cases}\cos\dfrac1x,&|x|<\pi;\\ e^{1/(x^2-\pi^2)},&|x|\ge\pi.\end{cases}$

<details><summary>Решение</summary>

**Подозрительные точки.** $\cos\frac1x$ не определена при $x=0$; $e^{1/(x^2-\pi^2)}$ не определена при $x=\pm\pi$ (**ловушка**: $|x|\ge\pi$ формально включает $\pm\pi$, но формула там не работает). Точки склейки — те же $\pm\pi$. Вне $\{0,\pm\pi\}$ функция непрерывна как элементарная.

**$x=0$:** $f(0)$ не определено. Предела $\cos\frac1x$ нет ни справа, ни слева (по Гейне: $x_n=\frac1{2\pi n}\to0+$ даёт $1$, $x_n=\frac1{\pi+2\pi n}\to0+$ даёт $-1$; слева аналогично). ⇒ **II рода**.

**$x=\pi$:** $f(\pi-0)=\cos\frac1\pi\approx0{,}95$; $\ f(\pi+0)$: $x^2-\pi^2\to0+$, $e^{1/(0+)}=e^{+\infty}=+\infty$ ⇒ **II рода**.

**$x=-\pi$:** $f(-\pi+0)=\cos\left(-\frac1\pi\right)=\cos\frac1\pi$; $\ f(-\pi-0)$: $x^2-\pi^2\to0+$ ⇒ $+\infty$ ⇒ **II рода**.

**График:** около $0$ — волна, сгущающаяся к $x=0$, в полосе $y\in[-1;1]$ (пунктиры $y=\pm1$). Около $\pm\pi$: изнутри ветвь подходит к выколотой точке $(\pm\pi;\cos\frac1\pi)$; снаружи — пунктирная асимптота $x=\pm\pi$, ветвь уходит вверх к $+\infty$.
</details>

### 3.2. $f(x)=\begin{cases}\dfrac{\sin x}x,&x<0;\\ \operatorname{arctg}\dfrac\pi{\pi-x},&x\ge0.\end{cases}$

<details><summary>Решение</summary>

**Подозрительные точки:** $x=0$ (склейка), $x=\pi$ ($\pi-x=0$, $f(\pi)$ не определено). Вне — непрерывна.

**$x=0$:** $f(0)=\operatorname{arctg}1=\frac\pi4$; $f(0-0)=\lim\limits_{x\to0-}\frac{\sin x}x=1$; $f(0+0)=\frac\pi4$. Пределы конечны и различны ⇒ **I рода, скачок**, $\Delta f=\left|\frac\pi4-1\right|=1-\frac\pi4\approx0{,}215$.

**$x=\pi$:** $x\to\pi-$: $\pi-x\to0+$, $\frac\pi{\pi-x}\to+\infty$, $\operatorname{arctg}\to\frac\pi2$. $x\to\pi+$: $\to-\infty$, $\operatorname{arctg}\to-\frac\pi2$. ⇒ **I рода, скачок** (**ловушка**: «деление на ноль», но $\operatorname{arctg}$ ограничен), $\Delta f=\pi$.

**График:** в $0$: слева ветвь подходит снизу к выколотой точке $(0;1)$ ($\frac{\sin x}x<1$), справа начинается закрашенная точка $(0;\frac\pi4)$, функция растёт. В $\pi$: слева подходит снизу к выколотой $(\pi;\frac\pi2)$; справа выходит из выколотой $(\pi;-\frac\pi2)$ и растёт к $0$ при $x\to+\infty$. Пунктиры $y=\pm\frac\pi2$.
</details>

# Эталонный вариант

## Теория (2–4 балла)

**1. (1 балл) Сходящаяся последовательность.**
Последовательность $x_n$ называется сходящейся, если она имеет конечный предел: $\exists a\in R:\ \lim\limits_{n\to+\infty}x_n=a$.

**2. (2 балла) По Коши $\lim\limits_{x\to a}f(x)=\infty$, $a\in R$ + пример + иллюстрация.**
$$\lim_{x\to a}f(x)=\infty\overset{def}{\iff}\forall M>0\ \exists\delta(M)>0:\ \forall x:\ 0<|x-a|<\delta\Rightarrow|f(x)|>M.$$
Пример: $f(x)=\frac1{x-a}$: $|f(x)|>M\iff|x-a|<\frac1M$, $\delta(M)=\frac1M$. Иллюстрация — рисунок B5 (блок B).

**3. (1 балл) Теорема о сумме конечного числа б.м.**
Сумма конечного числа бесконечно малых функций при $x\to x_0$ есть бесконечно малая функция.

## Задачи (10–16 баллов)

**1. (3 балла)** $\lim\limits_{x\to+\infty}\dfrac{\sqrt{2x}-\sqrt{x-1}}{\sqrt x-3}$.

<details><summary>Решение по шагам</summary>

1. Тип: числитель $\sqrt x\left(\sqrt2-\sqrt{1-\frac1x}\right)\to+\infty$ (коэффициенты $\sqrt2\ne1$, это **не** $\infty-\infty$ с сокращением), знаменатель $\to+\infty$ — $\frac\infty\infty$.
2. Делим на $\sqrt x$:
$$\frac{\sqrt2-\sqrt{1-\frac1x}}{1-\frac3{\sqrt x}}\to\frac{\sqrt2-1}{1}.$$
**Ответ:** $\sqrt2-1$.
</details>

**2. (3 балла)** $\lim\limits_{x\to0}\dfrac{x\left(\sqrt[3]{1-x^2}-1\right)\arccos x}{(2^x-1)\operatorname{arctg}x}$.

<details><summary>Решение по шагам</summary>

1. Тип: $\frac00$ (числитель $0\cdot0\cdot\frac\pi2$, знаменатель $0\cdot0$).
2. Множители: $\sqrt[3]{1-x^2}-1\sim\frac{-x^2}3$ ($u=-x^2$); $\arccos x\to\frac\pi2$ — **не б.м., заменяем числом** (ловушка); $2^x-1\sim x\ln2$; $\operatorname{arctg}x\sim x$.
3.
$$\lim_{x\to0}\frac{x\cdot\left(-\frac{x^2}3\right)\cdot\frac\pi2}{x\ln2\cdot x}=\lim_{x\to0}\left(-\frac{\pi x}{6\ln2}\right)=0.$$
**Ответ:** $0$.
</details>

**3. (3 балла)** $\lim\limits_{x\to0}\left(1+\arcsin^2x\right)^{\frac1{\ln(1+x^2)}}$.

<details><summary>Решение по шагам</summary>

1. Тип: $1^\infty$.
2. $u-1=\arcsin^2x\sim x^2$; $v=\frac1{\ln(1+x^2)}\sim\frac1{x^2}$; $(u-1)v\to1$.
3. $\left[\left(1+\arcsin^2x\right)^{\frac1{\arcsin^2x}}\right]^{\frac{\arcsin^2x}{\ln(1+x^2)}}\to e^1$.
**Ответ:** $e$.
</details>

**4. (4 балла)** $f(x)=e^x-2^x$, $g(x)=x\operatorname{tg}x$, $x\to0$.

<details><summary>Решение по шагам</summary>

**а)** $f\to1-1=0$, $g\to0\cdot0=0$ — обе б.м.
**б)** $f=2^x\left(\left(\frac e2\right)^x-1\right)$, $2^x\to1$, $\left(\frac e2\right)^x-1\sim x\ln\frac e2=x(1-\ln2)$ ⇒ $f\sim(1-\ln2)x$: главная часть $(1-\ln2)x$, $C=1-\ln2\approx0{,}307$, **порядок $1$**.
$g\sim x\cdot x=x^2$: главная часть $x^2$, **порядок $2$**.
**в)** $\frac gf\sim\frac{x}{1-\ln2}\to0$ ⇒ $g=o(f)$: $g$ — высшего порядка малости.
</details>

**5. (3 балла)** $f(x)=\begin{cases}e^{1/x},&x<0;\\ \dfrac{\sqrt x}{\ln(x+1/2)},&x\ge0.\end{cases}$

<details><summary>Решение по шагам</summary>

1. **Подозрительные точки:** $x=0$ (склейка); $x=\frac12$: $\ln(x+\frac12)=\ln1=0$ — знаменатель обращается в $0$ (**ловушка**). При $x\ge0$ аргумент логарифма $\ge\frac12>0$ — других проблем нет. Вне — непрерывна.
2. **$x=0$:** $f(0)=\frac0{\ln\frac12}=0$; $f(0-0)=e^{1/(0-)}=e^{-\infty}=0$; $f(0+0)=\frac0{\ln\frac12}=0$. Всё равно ⇒ **непрерывна**.
3. **$x=\frac12$:** числитель $\to\frac1{\sqrt2}>0$; $\ln(x+\frac12)\to0+$ при $x\to\frac12+$, $\to0-$ при $x\to\frac12-$ ⇒ $f(\frac12+0)=+\infty$, $f(\frac12-0)=-\infty$ ⇒ **II рода**.
4. **График:** около $0$ — слева ветвь $e^{1/x}>0$ очень полого подходит сверху к началу координат; справа на $(0;\frac12)$ $\ln(x+\frac12)<0$ ⇒ $f<0$: ветвь выходит из $(0;0)$ вниз (закрашенная точка в начале координат). Около $\frac12$ — пунктирная асимптота $x=\frac12$: слева ветвь уходит к $-\infty$, справа приходит с $+\infty$.

**Ответ:** единственная точка разрыва $x=\frac12$ — II рода; в $x=0$ функция непрерывна.
</details>
