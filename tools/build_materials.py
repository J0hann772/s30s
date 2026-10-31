#!/usr/bin/env python3
"""Сборка материалов контрольной.

  python tools/build_materials.py matan-rk1

Источник:  materials-src/<exam>/<NN_Название группы>/файлы   (в git не попадает)
Результат: materials/<exam>/<группа>/...  оптимизированные фото и файлы как есть
           materials/<exam>/_t/<группа>/... миниатюры
           materials/<exam>/_zip/<группа>.zip и all.zip (детерминированные: без изменений файлов git не видит разницы)
           materials/<exam>/index.js        описание для сайта

Фото сжимаются до длинной стороны 2200 px (JPEG, q85) — для чтения условий этого хватает,
а вес остаётся разумным. Нужен Pillow (pip install pillow); без него фото копируются как есть.
Если materials-src/<exam> нет — скрипт тихо завершается (его можно держать в deploy.sh).
"""
import json, os, re, shutil, sys, zipfile
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"}
MAX_SIDE, THUMB_SIDE = 2200, 520
KINDS = {".pdf": "pdf", ".doc": "doc", ".docx": "doc", ".ppt": "ppt", ".pptx": "ppt", ".xls": "xls", ".xlsx": "xls", ".txt": "txt", ".md": "txt"}

try:
    from PIL import Image, ImageOps
    try:
        import pillow_heif; pillow_heif.register_heif_opener()
    except Exception:
        pass
except Exception:
    Image = None


def natkey(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


def title_of(folder):
    return re.sub(r"^\d+[_\-. ]+", "", folder).replace("_", " ").strip() or folder


def url(*parts):
    return "/".join(quote(p) for p in parts)


def det_zip(path, files):
    """files: [(arcname, abspath)] — фиксированные даты и порядок, без сжатия (jpg/pdf не сжимаются)."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with zipfile.ZipFile(path, "w", zipfile.ZIP_STORED) as z:
        for arc, src in sorted(files, key=lambda x: natkey(x[0])):
            zi = zipfile.ZipInfo(arc, (2026, 1, 1, 0, 0, 0)); zi.compress_type = zipfile.ZIP_STORED; zi.external_attr = 0o644 << 16
            with open(src, "rb") as f:
                z.writestr(zi, f.read())
    return os.path.getsize(path)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    exam = sys.argv[1]
    src_root = os.path.join(ROOT, "materials-src", exam)
    out_root = os.path.join(ROOT, "materials", exam)
    if not os.path.isdir(src_root):
        print("materials: нет materials-src/%s, пропуск" % exam)
        return
    if os.path.isdir(out_root):
        shutil.rmtree(out_root)
    os.makedirs(out_root)
    groups, allfiles, total = [], [], 0
    for gname in sorted([d for d in os.listdir(src_root) if os.path.isdir(os.path.join(src_root, d)) and not d.startswith((".", "_"))], key=natkey):
        gsrc = os.path.join(src_root, gname)
        items, gfiles = [], []
        for fname in sorted([f for f in os.listdir(gsrc) if os.path.isfile(os.path.join(gsrc, f)) and not f.startswith(".")], key=natkey):
            stem, ext = os.path.splitext(fname); ext = ext.lower()
            s = os.path.join(gsrc, fname)
            if ext in IMG:
                outname = stem + ".jpg"; o = os.path.join(out_root, gname, outname); t = os.path.join(out_root, "_t", gname, outname)
                os.makedirs(os.path.dirname(o), exist_ok=True); os.makedirs(os.path.dirname(t), exist_ok=True)
                if Image is not None:
                    im = ImageOps.exif_transpose(Image.open(s)).convert("RGB")
                    if max(im.size) > MAX_SIDE:
                        k = MAX_SIDE / max(im.size); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
                    im.save(o, "JPEG", quality=85, optimize=True, progressive=True)
                    th = im.copy(); th.thumbnail((THUMB_SIDE, THUMB_SIDE), Image.LANCZOS); th.save(t, "JPEG", quality=78, optimize=True)
                    w, h = im.size
                else:
                    if ext not in (".jpg", ".jpeg"):
                        print("  пропущено без Pillow:", fname); continue
                    shutil.copy(s, o); shutil.copy(s, t); w = h = 0
                items.append({"name": stem, "kind": "img", "url": url("materials", exam, gname, outname), "thumb": url("materials", exam, "_t", gname, outname), "w": w, "h": h, "size": os.path.getsize(o)})
                gfiles.append((gname + "/" + outname, o))
            else:
                o = os.path.join(out_root, gname, fname); os.makedirs(os.path.dirname(o), exist_ok=True); shutil.copy(s, o)
                items.append({"name": stem, "ext": ext.lstrip("."), "kind": KINDS.get(ext, "file"), "url": url("materials", exam, gname, fname), "size": os.path.getsize(o)})
                gfiles.append((gname + "/" + fname, o))
        if not items:
            continue
        zp = os.path.join(out_root, "_zip", gname + ".zip"); zsize = det_zip(zp, [(a.split("/", 1)[1], p) for a, p in gfiles])
        gsum = sum(i["size"] for i in items)
        groups.append({"id": gname, "title": title_of(gname), "items": items, "zip": url("materials", exam, "_zip", gname + ".zip"), "zipSize": zsize})
        allfiles += gfiles; total += gsum
        print("  %-40s %3d файлов, %.1f МБ" % (title_of(gname), len(items), gsum / 1048576))
    allzip = None
    if allfiles:
        az = os.path.join(out_root, "_zip", "all.zip"); allzip = {"url": url("materials", exam, "_zip", "all.zip"), "size": det_zip(az, allfiles), "count": len(allfiles)}
    data = {"groups": groups, "all": allzip}
    with open(os.path.join(out_root, "index.js"), "w", encoding="utf-8") as f:
        f.write("window.S30S.materials=window.S30S.materials||{};window.S30S.materials[%s]=%s;\n" % (json.dumps(exam), json.dumps(data, ensure_ascii=False, separators=(",", ":"))))
    print("materials: %d групп, %d файлов, %.1f МБ" % (len(groups), len(allfiles), total / 1048576))


if __name__ == "__main__":
    main()
