"""Рисунки к РК1 по аналитической геометрии: векторы, плоскости, прямые.

Запуск:  python tools/figs_angem.py notes/angem-rk1/figs.json

Все трёхмерные рисунки строятся по настоящим координатам в косоугольной
(кабинетной) проекции: ось z вверх, y вправо, x «на нас» под 45° с сокращением 0,5.
Цвет — currentColor (подстраивается под тему), результат выделен акцентом --accent.
"""
import json
import math
import sys

ACC = 'style="stroke:var(--accent);fill:none"'
ACC_T = 'style="fill:var(--accent)"'
DEFS = ('<defs>'
        '<marker id="agA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
        '<path d="M0,0 L10,5 L0,10 z" fill="currentColor" stroke="none"/></marker>'
        '<marker id="agB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
        '<path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)" stroke="none"/></marker>'
        '</defs>')


class Fig:
    def __init__(self, w, h, ox=0, oy=0, scale=40, k=0.5, ang=45):
        self.w, self.h = w, h
        self.ox, self.oy, self.s = ox, oy, scale
        a = math.radians(ang)
        self.kx, self.ky = -k * math.cos(a), k * math.sin(a)
        self.out = []

    # ---- проекция ----
    def p(self, P):
        if len(P) == 2:  # уже плоская точка в «единицах»
            x, y = P
            return (self.ox + self.s * x, self.oy - self.s * y)
        x, y, z = P
        return (self.ox + self.s * (y + self.kx * x), self.oy - self.s * (z - self.ky * x))

    @staticmethod
    def f(v): return ("%.1f" % v).rstrip("0").rstrip(".")

    def pt(self, P):
        u, v = self.p(P)
        return self.f(u) + "," + self.f(v)

    # ---- примитивы ----
    def line(self, A, B, dash=False, accent=False, width=None, op=None):
        a, b = self.p(A), self.p(B)
        attrs = []
        if dash: attrs.append('stroke-dasharray="4 3"')
        if width: attrs.append('stroke-width="%s"' % width)
        if op: attrs.append('stroke-opacity="%s"' % op)
        if accent: attrs.append(ACC)
        self.out.append('<line x1="%s" y1="%s" x2="%s" y2="%s" %s/>' % (self.f(a[0]), self.f(a[1]), self.f(b[0]), self.f(b[1]), " ".join(attrs)))

    def vec(self, A, B, label=None, accent=False, dash=False, lpos=0.55, off=(6, -6), width=None):
        a, b = self.p(A), self.p(B)
        attrs = ['marker-end="url(#%s)"' % ("agB" if accent else "agA")]
        if dash: attrs.append('stroke-dasharray="4 3"')
        if accent: attrs.append(ACC); attrs.append('stroke-width="%s"' % (width or 2))
        elif width: attrs.append('stroke-width="%s"' % width)
        self.out.append('<line x1="%s" y1="%s" x2="%s" y2="%s" %s/>' % (self.f(a[0]), self.f(a[1]), self.f(b[0]), self.f(b[1]), " ".join(attrs)))
        if label:
            mx = a[0] + (b[0] - a[0]) * lpos + off[0]
            my = a[1] + (b[1] - a[1]) * lpos + off[1]
            self.text((mx, my), label, accent=accent, screen=True, vec=True)

    def poly(self, pts, op=".10", dash=False, stroke=False, accent=False):
        d = " ".join(self.pt(P) for P in pts)
        if accent:
            self.out.append('<polygon points="%s" style="fill:var(--accent)" fill-opacity="%s" stroke="none"/>' % (d, op))
        else:
            self.out.append('<polygon points="%s" fill="currentColor" fill-opacity="%s" %s/>' % (
                d, op, ('stroke="currentColor" stroke-width="1" stroke-opacity=".5"' + (' stroke-dasharray="4 3"' if dash else "")) if stroke else 'stroke="none"'))

    def dot(self, P, label=None, hollow=False, off=(6, -6), accent=False):
        u, v = self.p(P)
        fill = 'fill="none"' if hollow else ('style="fill:var(--accent)"' if accent else 'fill="currentColor"')
        self.out.append('<circle cx="%s" cy="%s" r="2.6" %s stroke="%s"/>' % (self.f(u), self.f(v), fill, "currentColor" if not accent else "none"))
        if label:
            self.text((u + off[0], v + off[1]), label, screen=True)

    def text(self, P, s, accent=False, screen=False, vec=False, anchor="start", size=None, italic=None):
        u, v = P if screen else self.p(P)
        it = italic if italic is not None else vec
        attrs = ['x="%s"' % self.f(u), 'y="%s"' % self.f(v), 'stroke="none"']
        attrs.append(ACC_T if accent else 'fill="currentColor"')
        if anchor != "start": attrs.append('text-anchor="%s"' % anchor)
        if size: attrs.append('font-size="%s"' % size)
        if it: attrs.append('font-style="italic"')
        if vec: attrs.append('font-weight="600"')
        self.out.append("<text %s>%s</text>" % (" ".join(attrs), s))

    def axes(self, L=(2.6, 3.2, 2.4), labels=True, neg=0.0):
        O = (0, 0, 0)
        for i, (lab, n) in enumerate(zip("xyz", L)):
            E = [0, 0, 0]; E[i] = n
            S = [0, 0, 0]; S[i] = -neg
            self.vec(tuple(S), tuple(E), width=1)
            if labels:
                u, v = self.p(tuple(E))
                d = {"x": (-12, 12), "y": (4, 14), "z": (6, 4)}[lab]
                self.text((u + d[0], v + d[1]), lab, screen=True, italic=True)
        self.out[-1:] = self.out[-1:]

    def arc2(self, C, r, a0, a1, accent=False, label=None, lr=None):
        """дуга в экранных координатах вокруг точки C (экран), углы в градусах (против часовой, ось вверх)."""
        cx, cy = C
        p0 = (cx + r * math.cos(math.radians(a0)), cy - r * math.sin(math.radians(a0)))
        p1 = (cx + r * math.cos(math.radians(a1)), cy - r * math.sin(math.radians(a1)))
        large = 1 if abs(a1 - a0) > 180 else 0
        sweep = 0 if a1 > a0 else 1
        self.out.append('<path d="M%s,%s A%s,%s 0 %d %d %s,%s" %s/>' % (
            self.f(p0[0]), self.f(p0[1]), r, r, large, sweep, self.f(p1[0]), self.f(p1[1]),
            ACC if accent else 'stroke-width="1"'))
        if label:
            am = math.radians((a0 + a1) / 2); rr = lr or r + 9
            self.text((cx + rr * math.cos(am) - 3, cy - rr * math.sin(am) + 4), label, screen=True, italic=True)

    def ang(self, P, A, B):
        """экранный угол (градусы) направления P->A."""
        p, a = self.p(P), self.p(A)
        return math.degrees(math.atan2(-(a[1] - p[1]), a[0] - p[0]))

    def arc_between(self, P, A, B, r=16, **kw):
        a0, a1 = self.ang(P, A, B), self.ang(P, B, A)
        if a1 < a0: a0, a1 = a1, a0
        if a1 - a0 > 180: a0, a1 = a1, a0 + 360
        self.arc2(self.p(P), r, a0, a1, **kw)

    def right(self, P, A, B, size=0.18):
        """значок прямого угла в вершине P между направлениями PA и PB (в пространстве)."""
        def unit(v):
            n = math.sqrt(sum(c * c for c in v)); return tuple(c / n for c in v)
        a = unit(tuple(A[i] - P[i] for i in range(len(P))))
        b = unit(tuple(B[i] - P[i] for i in range(len(P))))
        q1 = tuple(P[i] + size * a[i] for i in range(len(P)))
        q2 = tuple(P[i] + size * (a[i] + b[i]) for i in range(len(P)))
        q3 = tuple(P[i] + size * b[i] for i in range(len(P)))
        self.out.append('<polyline points="%s %s %s" stroke-width="1"/>' % (self.pt(q1), self.pt(q2), self.pt(q3)))

    def svg(self):
        return ('<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" class="fig" font-size="12" fill="none" '
                'stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' % (self.w, self.h)) + DEFS + "".join(self.out) + "</svg>"


def add(t, a): return tuple(t[i] + a[i] for i in range(len(t)))
def sub(t, a): return tuple(t[i] - a[i] for i in range(len(t)))
def mul(t, k): return tuple(c * k for c in t)


FIGS = {}

# ---------- 1. сумма векторов: треугольник и параллелограмм ----------
f = Fig(360, 170, ox=0, oy=150, scale=40)
O = (0.5, 0.3); A = (2.6, 0.7); B = (3.6, 2.6)
f.vec(O, A, "a", off=(-4, 14)); f.vec(A, B, "b", off=(8, 2)); f.vec(O, B, "a + b", accent=True, off=(-46, -4))
f.text((20, 22), "правило треугольника", screen=True, size=11)
O2 = (5.0, 0.3); a = (2.1, 0.4); b = (0.8, 1.9)
f.poly([O2, add(O2, a), add(add(O2, a), b), add(O2, b)], op=".07")
f.vec(O2, add(O2, a), "a", off=(-4, 14)); f.vec(O2, add(O2, b), "b", off=(-14, 0))
f.line(add(O2, a), add(add(O2, a), b), dash=True); f.line(add(O2, b), add(add(O2, a), b), dash=True)
f.vec(O2, add(add(O2, a), b), "a + b", accent=True, lpos=0.6, off=(4, 16))
f.text((196, 22), "правило параллелограмма", screen=True, size=11)
FIGS["vec_sum"] = f.svg()

# ---------- 2. умножение на число ----------
f = Fig(360, 130, ox=0, oy=90, scale=40)
O = (0.6, 0.6); a = (1.5, 0.5)
f.vec(O, add(O, a), "a", off=(-6, -8))
O = (3.0, 0.6); f.vec(O, add(O, mul(a, 2)), "2a", accent=True, off=(-6, -8))
O = (7.8, 1.6); f.vec(O, add(O, mul(a, -1)), "−a", off=(-6, -8))
f.text((22, 108), "|λa| = |λ|·|a|", screen=True, size=10.5)
f.text((22, 123), "λ > 0: направление то же; λ < 0: противоположное", screen=True, size=10.5)
FIGS["vec_scale"] = f.svg()

# ---------- 3. коллинеарные и компланарные ----------
f = Fig(400, 200, ox=20, oy=170, scale=38)
f.line((0, 0), (3.6, 1.0), dash=True, op=".5"); f.line((0, 1.5), (3.6, 2.5), dash=True, op=".5")
f.vec((0.3, 0.08), (2.0, 0.55), "a", off=(-4, 14)); f.vec((3.0, 2.33), (1.6, 1.94), "b", off=(-4, -6))
f.text((14, 20), "коллинеарны:", screen=True, size=10.5)
f.text((14, 34), "на параллельных прямых", screen=True, size=10.5)
g = Fig(400, 200, ox=210, oy=175, scale=38)
def pl3(u, v): return (0.9 * v, u, 0.7 * v)          # наклонная плоскость
g.poly([pl3(0, 0), pl3(4.4, 0), pl3(4.4, 3.4), pl3(0, 3.4)], op=".08", stroke=True)
o = pl3(0.5, 0.6)
g.vec(o, pl3(2.6, 0.9), "a", off=(-2, 14)); g.vec(o, pl3(1.4, 3.0), "b", off=(-14, 2)); g.vec(o, pl3(3.8, 2.4), "c", off=(4, -4))
f.out += g.out
f.text((214, 20), "компланарны:", screen=True, size=10.5)
f.text((214, 34), "в одной плоскости", screen=True, size=10.5)
FIGS["collinear_coplanar"] = f.svg()

# ---------- 4. доказательство Б.1: c = αa + βb ----------
f = Fig(320, 200, ox=30, oy=170, scale=40)
O = (0, 0); a = (2.6, 0.4); b = (0.9, 2.6); C = (4.4, 3.4)
# прямые через C параллельно a и b
# C = αa + βb
det = a[0] * b[1] - a[1] * b[0]
al = (C[0] * b[1] - C[1] * b[0]) / det; be = (a[0] * C[1] - a[1] * C[0]) / det
A1, B1 = mul(a, al), mul(b, be)
f.poly([O, A1, C, B1], op=".06")
f.line(A1, C, dash=True); f.line(B1, C, dash=True)
f.line(a, A1, dash=True, op=".5"); f.line(b, B1, dash=True, op=".5")
f.vec(O, a, "a", off=(-2, 14)); f.vec(O, b, "b", off=(-14, 4)); f.vec(O, C, "c", accent=True, lpos=0.62, off=(4, 14))
f.dot(A1, "A′", off=(4, 14)); f.dot(B1, "B′", off=(-18, -4)); f.dot(C, "C", off=(6, -2)); f.dot(O, "O", off=(-12, 12))
f.text((14, 18), "c = OA′ + OB′ = αa + βb", screen=True, size=11)
FIGS["lin_dep_proof"] = f.svg()

# ---------- 5. разложение по базису ----------
f = Fig(320, 240, ox=120, oy=175, scale=42)
x1, x2, x3 = 1.8, 2.4, 1.9
f.axes(L=(3.0, 3.6, 2.9))
X = (x1, x2, x3)
for P, Q in [((x1, 0, 0), (x1, x2, 0)), ((0, x2, 0), (x1, x2, 0)), ((x1, x2, 0), X), ((0, 0, x3), (x1, 0, x3)), ((0, 0, x3), (0, x2, x3)),
             ((x1, 0, x3), X), ((0, x2, x3), X), ((x1, 0, 0), (x1, 0, x3)), ((0, x2, 0), (0, x2, x3))]:
    f.line(P, Q, dash=True, op=".55")
f.vec((0, 0, 0), (x1, 0, 0), "x₁e₁", off=(-34, 8)); f.vec((0, 0, 0), (0, x2, 0), "x₂e₂", lpos=0.45, off=(-4, 16)); f.vec((0, 0, 0), (0, 0, x3), "x₃e₃", off=(-38, 0))
f.vec((0, 0, 0), X, "x", accent=True, lpos=0.5, off=(-4, -10))
f.text((12, 20), "x = x₁e₁ + x₂e₂ + x₃e₃", screen=True, size=11)
FIGS["basis"] = f.svg()

# ---------- 6. проекция ----------
f = Fig(320, 170, ox=30, oy=130, scale=46)
O = (0, 0); bb = (5.6, 0); aa = (3.4, 2.0)
H = (aa[0], 0)
f.vec(O, bb, "b", off=(-6, 16), lpos=0.95)
f.vec(O, aa, "a", off=(-14, -4))
f.line(aa, H, dash=True)
f.right(H, aa, O, size=0.2)
f.line(O, H, accent=True, width=3)
f.arc_between(O, aa, bb, r=26, label="φ", lr=36)
f.text((60, 154), "Пр<tspan dy=\"3\" font-size=\"9\">b</tspan><tspan dy=\"-3\"> a = |a|·cos φ</tspan>", screen=True, size=11, accent=True)
FIGS["projection"] = f.svg()

# ---------- 7. правая и левая тройка ----------
def rot_arc(fig, P, deg0, deg1, r=30):
    """дуга со стрелкой от направления deg0 к deg1 (экранные градусы)"""
    cx, cy = fig.p(P)
    p0 = (cx + r * math.cos(math.radians(deg0)), cy - r * math.sin(math.radians(deg0)))
    p1 = (cx + r * math.cos(math.radians(deg1)), cy - r * math.sin(math.radians(deg1)))
    sweep = 0 if deg1 > deg0 else 1
    fig.out.append('<path d="M%.1f,%.1f A%d,%d 0 0 %d %.1f,%.1f" marker-end="url(#agB)" %s/>' % (p0[0], p0[1], r, r, sweep, p1[0], p1[1], ACC))
f = Fig(380, 200, ox=70, oy=150, scale=40)
O = (0, 0, 0)
f.vec(O, (2.2, 0, 0), "a", lpos=1, off=(-16, 2)); f.vec(O, (0, 2.4, 0), "b", lpos=1, off=(-2, 16)); f.vec(O, (0, 0, 2.3), "c", lpos=0.9, off=(6, 0))
rot_arc(f, O, -122, -12)
f.text((14, 22), "правая: из конца c поворот", screen=True, size=10.5)
f.text((14, 36), "a → b против часовой", screen=True, size=10.5)
g = Fig(380, 200, ox=265, oy=150, scale=40)
g.vec(O, (0, 2.4, 0), "a", lpos=1, off=(-2, 16)); g.vec(O, (2.2, 0, 0), "b", lpos=1, off=(-16, 2)); g.vec(O, (0, 0, 2.3), "c", lpos=0.9, off=(6, 0))
rot_arc(g, O, -12, -122)
f.out += g.out
f.text((210, 22), "левая: поворот a → b", screen=True, size=10.5)
f.text((210, 36), "по часовой", screen=True, size=10.5)
FIGS["right_left"] = f.svg()

# ---------- 8. векторное произведение ----------
f = Fig(320, 220, ox=100, oy=170, scale=40)
O = (0, 0, 0); a = (2.4, 0.4, 0); b = (0.3, 3.0, 0)
c = (0, 0, 2.6)
f.poly([O, a, add(a, b), b], op=".10", stroke=True)
f.vec(O, a, "a", off=(-14, 4)); f.vec(O, b, "b", lpos=0.8, off=(-2, 14))
f.vec(O, c, "c = a × b", accent=True, lpos=0.8, off=(8, 0))
f.right(O, c, a, size=0.28); f.right(O, c, b, size=0.28)
f.text((150, 40), "S = |a × b| = |a||b| sin φ", screen=True, size=11)
FIGS["cross"] = f.svg()

# ---------- 9. смешанное произведение ----------
f = Fig(320, 220, ox=90, oy=180, scale=38)
a = (2.6, 0.3, 0); b = (0.2, 3.0, 0); c = (0.9, 0.8, 2.4)
base = [O, a, add(a, b), b]
top = [add(P, c) for P in base]
f.poly(base, op=".10")
for i in range(4):
    f.line(base[i], top[i], dash=(i == 0 or i == 3) and False, op=".6")
    f.line(top[i], top[(i + 1) % 4], op=".6")
    f.line(base[i], base[(i + 1) % 4], op=".6")
f.vec(O, a, "a", off=(-14, 4)); f.vec(O, b, "b", lpos=0.85, off=(-2, 14)); f.vec(O, c, "c", accent=True, lpos=0.55, off=(-16, 0))
f.text((150, 20), "V = |a b c| = |(a × b)·c|", screen=True, size=11)
FIGS["mixed"] = f.svg()

# ---------- 10. плоскость: нормаль ----------
f = Fig(320, 210, ox=60, oy=160, scale=40)
pl = [(0, 0, 0), (0, 4.6, 0), (3.2, 4.6, 0), (3.2, 0, 0)]
f.poly(pl, op=".08", stroke=True)
M0 = (1.2, 1.2, 0); M = (2.0, 3.9, 0)
f.dot(M0, "M₀", off=(-22, 14)); f.dot(M, "M", off=(8, 6))
f.vec(M0, M, "M₀M", lpos=0.45, off=(4, 16))
f.vec(M0, (1.2, 1.2, 2.2), "n = {A, B, C}", accent=True, lpos=0.95, off=(8, 4))
f.right(M0, (1.2, 1.2, 1), M, size=0.3)
f.text((150, 26), "n · M₀M = 0", screen=True, size=11)
f.text((150, 40), "A(x−x₀)+B(y−y₀)+C(z−z₀)=0", screen=True, size=10.5)
FIGS["plane_normal"] = f.svg()

# ---------- 11. плоскость в отрезках ----------
f = Fig(320, 220, ox=110, oy=165, scale=42)
f.axes(L=(3.4, 3.8, 3.0))
A_, B_, C_ = (2.6, 0, 0), (0, 3.0, 0), (0, 0, 2.3)
f.poly([A_, B_, C_], op=".12", stroke=True)
f.dot(A_, "a", off=(-14, 4)); f.dot(B_, "b", off=(-4, 16)); f.dot(C_, "c", off=(-14, 0))
f.text((150, 24), "x/a + y/b + z/c = 1", screen=True, size=11)
FIGS["plane_intercepts"] = f.svg()

# ---------- 12. расстояние от точки до плоскости (Б.8) ----------
f = Fig(320, 220, ox=50, oy=170, scale=40)
f.poly(pl, op=".08", stroke=True)
M1 = (1.0, 0.8, 0); H = (1.8, 2.9, 0); M0 = (1.8, 2.9, 2.4)
f.dot(M1, "M₁", off=(-22, 12)); f.dot(H, "H", off=(6, 14)); f.dot(M0, "M₀", off=(6, -4))
f.vec(M1, M0, "M₁M₀", lpos=0.55, off=(-44, 0))
f.line(H, M0, accent=True, width=3)
f.line(M1, H, dash=True)
f.vec((2.6, 0.6, 0), (2.6, 0.6, 1.3), "n", off=(6, 0))
f.right(H, M0, M1, size=0.28)
f.text((170, 26), "ρ = |Прₙ M₁M₀|", screen=True, size=11, accent=True)
f.text((170, 42), "= |Ax₀+By₀+Cz₀+D| / |n|", screen=True, size=10.5)
FIGS["dist_point_plane"] = f.svg()

# ---------- 13. прямая: точка и направляющий вектор ----------
f = Fig(320, 190, ox=40, oy=150, scale=40)
M0 = (0, 0.4, 0.2); s = (0.2, 1.4, 0.7)
f.line(add(M0, mul(s, -0.6)), add(M0, mul(s, 3.6)), op=".7")
f.dot(M0, "M₀", off=(-8, 18))
f.vec(M0, add(M0, s), "s = {l, m, n}", accent=True, off=(-36, -14))
M = add(M0, mul(s, 2.6))
f.dot(M, "M", off=(-4, -10))
f.text((150, 160), "M₀M = t·s:  x = x₀ + l t, …", screen=True, size=11)
FIGS["line_param"] = f.svg()

# ---------- 14. расстояние от точки до прямой (Б.9) ----------
f = Fig(320, 200, ox=30, oy=160, scale=44)
M0 = (0, 0); s = (2.6, 0.5); M1 = (1.4, 2.4)
f.line(mul(s, -0.25), mul(s, 2.2), op=".5")
f.poly([M0, s, add(s, M1), M1], op=".08")
f.line(s, add(s, M1), dash=True); f.line(M1, add(s, M1), dash=True)
f.vec(M0, s, "s", off=(-4, 16)); f.vec(M0, M1, "M₀M₁", off=(-46, 0))
# основание перпендикуляра из M1
tt = (M1[0] * s[0] + M1[1] * s[1]) / (s[0] ** 2 + s[1] ** 2); Hh = mul(s, tt)
f.line(M1, Hh, accent=True, width=3); f.right(Hh, M1, s, size=0.2)
f.text(f.p((1.62, 1.45)), "h = ρ", screen=True, accent=True, size=11)
f.dot(M0, "M₀", off=(-8, 16)); f.dot(M1, "M₁", off=(-10, -8))
f.text((150, 186), "S = |M₀M₁ × s| = |s|·h", screen=True, size=11)
FIGS["dist_point_line"] = f.svg()

# ---------- 15. скрещивающиеся прямые (Б.10) ----------
f = Fig(380, 270, ox=110, oy=225, scale=44)
M1 = (0, 0, 0); s1 = (0, 3.4, 0); s2 = (2.6, -0.4, 0); h = 2.5
M2 = (0.5, 1.4, h)
base = [M1, s1, add(s1, s2), s2]
top = [add(P, (0, 0, h)) for P in base]
f.poly(base, op=".10"); f.poly(top, op=".05", stroke=True)
for i in range(4):
    f.line(base[i], top[i], dash=True, op=".45")
f.line(add(M1, mul(s1, -0.2)), add(M1, mul(s1, 1.3)), op=".9")
f.text(f.p(add(M1, mul(s1, 1.3))), " L₁", screen=True, size=11)
f.line(add(M2, mul(s2, -0.55)), add(M2, mul(s2, 0.75)), op=".9")
f.text(f.p(add(M2, mul(s2, -0.55))), " L₂", screen=True, size=11)
f.vec(M1, s1, "s₁", lpos=0.8, off=(-2, 16)); f.vec(M1, s2, "s₂", lpos=0.8, off=(-20, 2))
f.vec(M1, M2, "M₁M₂", lpos=0.45, off=(-50, 0))
foot = (M2[0], M2[1], 0)
f.line(foot, M2, accent=True, width=3); f.right(foot, M2, s1, size=0.25)
f.text(f.p((M2[0], M2[1], h * 0.45)), "  ρ", screen=True, accent=True, size=14, italic=True)
f.dot(M1, "M₁", off=(-24, 4)); f.dot(M2, "M₂", off=(6, -8))
f.text((14, 22), "V = |s₁ s₂ M₁M₂| = |s₁ × s₂|·ρ", screen=True, size=11)
FIGS["skew"] = f.svg()

# ---------- 16. прямые в одной плоскости ----------
f = Fig(340, 200, ox=50, oy=180, scale=38)
def q(u, v): return (0.9 * v, u, 0.85 * v)
f.poly([q(0, 0), q(6.0, 0), q(6.0, 3.4), q(0, 3.4)], op=".07", stroke=True)
M1, M2 = q(1.0, 0.7), q(3.0, 2.5)
d1, d2 = (0, 1.6, 0), sub(q(1.0, -0.6), q(0, 0))
f.line(add(M1, mul(d1, -0.4)), add(M1, mul(d1, 2.9)), op=".85")
f.line(add(M2, mul(d2, -1.4)), add(M2, mul(d2, 2.8)), op=".85")
f.vec(M1, add(M1, d1), "s₁", off=(-4, 16)); f.vec(M2, add(M2, d2), "s₂", lpos=0.9, off=(4, -6))
f.vec(M1, M2, "M₁M₂", accent=True, lpos=0.5, off=(-50, -2))
f.dot(M1, "M₁", off=(-20, 14)); f.dot(M2, "M₂", off=(-22, -6))
f.text((150, 22), "(s₁, s₂, M₁M₂) = 0", screen=True, size=11)
FIGS["coplanar_lines"] = f.svg()

# ---------- 17. биссекторные плоскости (сечение, перпендикулярное ребру) ----------
f = Fig(340, 250, ox=170, oy=135, scale=44)
def ray(deg, L=3.2): return (L * math.cos(math.radians(deg)), L * math.sin(math.radians(deg)))
a1, a2 = 15, 85  # следы плоскостей П1 и П2
for d in (a1, a2):
    f.line(ray(d + 180, 2.6), ray(d, 2.6))
f.text(f.p(ray(a1, 2.7)), "П₁", screen=True, size=11)
f.text(f.p(ray(a2 + 180, 2.5)), " П₂", screen=True, size=11)
bm = (a1 + a2) / 2
f.line(ray(bm + 180, 2.6), ray(bm, 2.6), dash=True, accent=True)
f.line(ray(bm + 90 + 180, 2.2), ray(bm + 90, 2.2), dash=True)
f.arc2(f.p((0, 0)), 30, a1, a2)
f.text(f.p(ray(30, 0.95)), "φ", screen=True, size=12, italic=True)
f.text(f.p(ray(bm, 2.7)), "острый", screen=True, size=10.5, accent=True)
f.text(f.p(ray(bm + 90, 2.25)), "тупой", screen=True, size=10.5)
f.text((6, 18), "|f₁|/|n₁| = |f₂|/|n₂|: две биссекторные плоскости", screen=True, size=10.5)
FIGS["bisector"] = f.svg()

# ---------- 18. симметричная точка ----------
f = Fig(320, 250, ox=50, oy=150, scale=40)
f.poly(pl, op=".08", stroke=True)
H = (1.6, 2.4, 0); P = (1.6, 2.4, 1.8); P2 = (1.6, 2.4, -1.8)
f.line(P, H, accent=True); f.line(H, P2, dash=True, accent=True)
f.dot(P, "P", off=(6, -2)); f.dot(H, "H", off=(6, 14)); f.dot(P2, "P′", off=(6, 4))
f.vec((0.6, 0.8, 0), (0.6, 0.8, 1.2), "n", off=(-14, 0))
f.text((180, 26), "H — основание", screen=True, size=10.5)
f.text((180, 40), "перпендикуляра", screen=True, size=10.5)
f.text((180, 60), "P′ = 2H − P", screen=True, size=11, accent=True)
FIGS["symmetric"] = f.svg()

# ---------- 19. общий перпендикуляр ----------
f = Fig(320, 200, ox=50, oy=150, scale=40)
L1a, L1b = (0, -0.4, 0), (0, 5.0, 0.0)
P = (0, 2.2, 0); Q = (0, 2.2, 2.0)
L2a, L2b = add(Q, (2.6, -1.0, 0)), add(Q, (-2.4, 1.0, 0))
f.line(L1a, L1b); f.line(L2a, L2b)
f.text(f.p(L1b), " L₁", screen=True, size=11); f.text(f.p(L2b), " L₂", screen=True, size=11)
f.line(P, Q, accent=True, width=3)
f.right(P, Q, L1b, size=0.25); f.right(Q, P, L2b, size=0.25)
f.dot(P, "P", off=(-14, 14)); f.dot(Q, "Q", off=(6, -4))
f.text((150, 180), "PQ ⊥ s₁, PQ ⊥ s₂: |PQ| = ρ(L₁, L₂)", screen=True, size=10.5)
FIGS["common_perp"] = f.svg()

# ---------- 20. аффинные подпространства ----------
f = Fig(420, 200, ox=30, oy=120, scale=36)
f.dot((0.4, 0.4), "P₀", off=(6, -4))
f.text((14, 186), "dim 0: точка P = P₀", screen=True, size=10.5)
g = Fig(420, 190, ox=130, oy=135, scale=36)
P0 = (0, 0.3, 0.3); s = (0, 1.0, 0.9)
g.line(add(P0, mul(s, -0.4)), add(P0, mul(s, 2.4)), op=".8"); g.dot(P0, "P₀", off=(-22, 10)); g.vec(P0, add(P0, s), "s", accent=True, off=(-14, -2))
g.text((132, 186), "dim 1: P = P₀ + ts", screen=True, size=10.5)
h = Fig(420, 200, ox=275, oy=118, scale=36)
h.poly([(0, 0, 0), (0, 3.4, 0), (3.2, 3.4, 0), (3.2, 0, 0)], op=".09", stroke=True)
P0 = (1.2, 0.8, 0); h.dot(P0, "P₀", off=(-22, 10))
h.vec(P0, add(P0, (0, 1.6, 0)), "u", accent=True, lpos=0.8, off=(-2, 14)); h.vec(P0, add(P0, (-1.6, 0.4, 0)), "v", accent=True, lpos=0.8, off=(-14, -2))
h.text((262, 186), "dim 2: P = P₀ + λu + μv", screen=True, size=10.5)
f.out += g.out + h.out
FIGS["affine"] = f.svg()

# ---------- 21. прямая на плоскости: нормаль, направляющий вектор, отрезки на осях ----------
f = Fig(340, 240, ox=58, oy=190, scale=34)
f.vec((-0.7, 0), (7.6, 0), width=1); f.text(f.p((7.5, -0.45)), "x", screen=True, italic=True)
f.vec((0, -0.9), (0, 5.0), width=1); f.text(f.p((0.15, 4.9)), "y", screen=True, italic=True)
f.text(f.p((-0.45, -0.45)), "O", screen=True, italic=True)
f.line((-0.6, 3.45), (5.6, -1.2))                       # 3x + 4y - 12 = 0
f.dot((4, 0), "a", off=(4, 14)); f.dot((0, 3), "b", off=(-14, 4))
M0 = (2.6, 1.05); n = (3 * 0.42, 4 * 0.42); m = (-4 * 0.42, 3 * 0.42)
f.vec(M0, add(M0, n), "n = {A, B}", accent=True, lpos=1.0, off=(6, 0))
f.vec(M0, add(M0, m))
u, v = f.p(add(M0, m)); f.text((u + 8, v - 10), "m = {−B, A}", screen=True, vec=True)
f.right(M0, add(M0, n), add(M0, m), size=0.28)
f.dot(M0, "M₀", off=(8, 14))
f.text((150, 226), "Ax + By + C = 0", screen=True, size=11)
FIGS["line2d"] = f.svg()

# ---------- 22. расстояние от точки до прямой на плоскости, нормальное уравнение ----------
f = Fig(340, 240, ox=58, oy=192, scale=34)
f.vec((-0.7, 0), (7.6, 0), width=1); f.text(f.p((7.5, -0.45)), "x", screen=True, italic=True)
f.vec((0, -0.9), (0, 5.0), width=1); f.text(f.p((0.15, 4.9)), "y", screen=True, italic=True)
f.text(f.p((-0.45, -0.45)), "O", screen=True, italic=True)
f.line((-0.6, 3.45), (5.6, -1.2))
N = (1.44, 1.92); M0 = (4.2, 3.6); H = (2.4, 1.2)
f.line((0, 0), N, dash=True); f.right(N, (0, 0), (5.6, -1.2), size=0.22)
f.text(f.p((0.3, 1.45)), "p", screen=True, italic=True)
f.line(M0, H, accent=True, width=2.5); f.right(H, M0, (5.6, -1.2), size=0.22)
f.text(f.p((3.45, 2.15)), "ρ", screen=True, italic=True, accent=True)
f.dot(M0, "M₀(x₀, y₀)", off=(6, -4)); f.dot(H, "H", off=(-16, 14))
f.vec((0, 0), (0.6, 0.8), accent=True)
f.text(f.p((0.72, 0.42)), "n₀", screen=True, vec=True, accent=True)
f.text((96, 22), "ρ = |Ax₀ + By₀ + C| / √(A² + B²)", screen=True, size=10.5, accent=True)
FIGS["dist2d"] = f.svg()

# ---------- 23. деление отрезка в отношении p : q ----------
f = Fig(340, 118, ox=30, oy=66, scale=40)
f.line((0, 0), (7, 0))
f.dot((0, 0), "M₁", off=(-8, 20)); f.dot((7, 0), "M₂", off=(-8, 20)); f.dot((3, 0), "M", accent=True, off=(-5, 20))
for a, b, lab in ((0, 3, "p"), (3, 7, "q")):
    u0, v0 = f.p((a, 0)); u1, _ = f.p((b, 0))
    f.out.append('<path d="M%s,%s q0,-10 10,-10 H%s q10,0 10,10" stroke-width="1"/>' % (f.f(u0 + 2), f.f(v0 - 8), f.f(u1 - 12)))
    f.text(((u0 + u1) / 2 - 3, v0 - 24), lab, screen=True, italic=True)
f.text((30, 108), "M = (q·M₁ + p·M₂) / (p + q)", screen=True, size=11, accent=True)
FIGS["segment_div"] = f.svg()

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "figs.json"
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(FIGS, fh, ensure_ascii=False, indent=1)
    print("рисунков:", len(FIGS), "->", out)
