# Тема 8b. Гиперболические функции (л. 3–4, сл. 12–14)

В файле РК этой темы нет. В лекции — только определения и три формулы без доказательств; все доказательства ниже [не из лекций].

## Определения

**Гиперболический синус:**
$$\operatorname{sh}x=\frac{e^x-e^{-x}}2.$$

**Гиперболический косинус:**
$$\operatorname{ch}x=\frac{e^x+e^{-x}}2.$$

**Гиперболический тангенс:**
$$\operatorname{th}x=\frac{\operatorname{sh}x}{\operatorname{ch}x}=\frac{e^x-e^{-x}}{e^x+e^{-x}}.$$

**Гиперболический котангенс:**
$$\operatorname{cth}x=\frac{\operatorname{ch}x}{\operatorname{sh}x}=\frac{e^x+e^{-x}}{e^x-e^{-x}}.$$

> **Расхождение со слайдами.** На слайде 13 заголовок «гиперболические котангенс» (множественное число) — опечатка, правильно «гиперболический котангенс».

## Теоремы (основные соотношения, сл. 14)

$$\operatorname{sh}(2x)=2\operatorname{sh}x\operatorname{ch}x,\qquad\operatorname{ch}(2x)=\operatorname{ch}^2x+\operatorname{sh}^2x.$$
**Основное гиперболическое тождество:**
$$\operatorname{ch}^2x-\operatorname{sh}^2x=1.$$

## Доказательства [не из лекций]

<details><summary>Основное гиперболическое тождество</summary>

$$\operatorname{ch}^2x-\operatorname{sh}^2x=\frac{(e^x+e^{-x})^2-(e^x-e^{-x})^2}4=\frac{e^{2x}+2+e^{-2x}-e^{2x}+2-e^{-2x}}4=\frac44=1.$$
</details>

<details><summary>Формулы двойного аргумента</summary>

$$2\operatorname{sh}x\operatorname{ch}x=2\cdot\frac{e^x-e^{-x}}2\cdot\frac{e^x+e^{-x}}2=\frac{e^{2x}-e^{-2x}}2=\operatorname{sh}2x.$$
$$\operatorname{ch}^2x+\operatorname{sh}^2x=\frac{(e^x+e^{-x})^2+(e^x-e^{-x})^2}4=\frac{2e^{2x}+2e^{-2x}}4=\frac{e^{2x}+e^{-2x}}2=\operatorname{ch}2x.$$
</details>

## Дополнительные свойства [не из лекций]

- Область определения: $\operatorname{sh}x$, $\operatorname{ch}x$, $\operatorname{th}x$ — на $R$; $\operatorname{cth}x$ — при $x\ne0$ (так как $\operatorname{sh}x=0$ только при $x=0$: $e^x=e^{-x}\iff x=0$).
- Чётность: $\operatorname{sh}$ нечётна, $\operatorname{ch}$ чётна, $\operatorname{th}$, $\operatorname{cth}$ нечётны.
- $\operatorname{ch}x\ge1$, так как $\operatorname{ch}^2x=1+\operatorname{sh}^2x\ge1$ и $\operatorname{ch}x>0$; $|\operatorname{th}x|<1$, так как $\operatorname{th}^2x=1-\frac1{\operatorname{ch}^2x}$.
- Связь с экспонентой: $\operatorname{ch}x+\operatorname{sh}x=e^x$, $\ \operatorname{ch}x-\operatorname{sh}x=e^{-x}$.
- Другие формы: $\operatorname{ch}2x=2\operatorname{ch}^2x-1=1+2\operatorname{sh}^2x$.
- Название: точки $(\operatorname{ch}t,\operatorname{sh}t)$ лежат на гиперболе $x^2-y^2=1$ (тождество выше), как точки $(\cos t,\sin t)$ на окружности.
- Непрерывность: $\operatorname{sh}$, $\operatorname{ch}$ непрерывны на $R$ как комбинации непрерывной $e^x$ (темы 26, 27).

## Рабочие формулы

- $\operatorname{sh}x=\dfrac{e^x-e^{-x}}2$, $\ \operatorname{ch}x=\dfrac{e^x+e^{-x}}2$, $\ \operatorname{th}x=\dfrac{\operatorname{sh}x}{\operatorname{ch}x}$, $\ \operatorname{cth}x=\dfrac{\operatorname{ch}x}{\operatorname{sh}x}$.
- $\operatorname{ch}^2x-\operatorname{sh}^2x=1$.
- $\operatorname{sh}2x=2\operatorname{sh}x\operatorname{ch}x$, $\ \operatorname{ch}2x=\operatorname{ch}^2x+\operatorname{sh}^2x$.
- $\operatorname{sh}x\sim x$ при $x\to0$ [не из лекций, вывод в примере].

## Алгоритм типовых задач

1. Если в выражении есть $\operatorname{sh}$, $\operatorname{ch}$ — подставить определения через $e^x$.
2. Привести к $e^x$ и применять свойства показательной функции или таблицу эквивалентных б.м. (тема 22).
3. Для упрощения использовать $\operatorname{ch}^2-\operatorname{sh}^2=1$ и формулы двойного аргумента.

## Разобранный пример

**Задача.** Найти $\lim\limits_{x\to0}\dfrac{\operatorname{sh}x}x$.

<details><summary>Решение</summary>

$$\operatorname{sh}x=\frac{e^x-e^{-x}}2=\frac{e^{-x}\left(e^{2x}-1\right)}2.$$
При $x\to0$: $e^{2x}-1\sim2x$ (таблица эквивалентностей, $e^u-1\sim u$), $e^{-x}\to1$. Поэтому
$$\lim_{x\to0}\frac{\operatorname{sh}x}x=\lim_{x\to0}\frac{e^{-x}\cdot2x}{2x}=\lim_{x\to0}e^{-x}=1.$$
**Ответ:** $1$.
</details>

## Типичные ошибки

- Писать $\operatorname{ch}^2x+\operatorname{sh}^2x=1$ (по аналогии с тригонометрией). Верно $\operatorname{ch}^2x-\operatorname{sh}^2x=1$; сумма $\operatorname{ch}^2x+\operatorname{sh}^2x=\operatorname{ch}2x$.
- Путать знаки в определениях: в $\operatorname{sh}$ — разность, в $\operatorname{ch}$ — сумма.
- Считать $\operatorname{cth}x$ определённым при $x=0$.
- Переносить тригонометрические формулы без проверки: например, $\operatorname{ch}2x\ne1-2\operatorname{sh}^2x$ (верно $1+2\operatorname{sh}^2x$).
