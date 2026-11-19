"""Buat demo/katalog-contoh.pdf dari demo/data/katalog.json.

Jalankan ulang setiap kali data katalog berubah:  npm run pdf
"""
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "demo" / "data" / "katalog.json"
OUT = ROOT / "demo" / "katalog-contoh.pdf"

NAVY = colors.HexColor("#0B2A4A")
STATUS = {"ready": "Ready stock gudang", "partai": "Siap kirim partai besar", "indent": "Indent"}
URUTAN_KATEGORI = ["Besi & baja", "Semen & mortar", "Pipa & fitting", "Atap & rangka", "Kayu & panel"]

judul = ParagraphStyle("judul", fontName="Helvetica-Bold", fontSize=18, textColor=NAVY, leading=22)
kecil = ParagraphStyle("kecil", fontName="Helvetica", fontSize=9, textColor=colors.HexColor("#4B5563"), leading=12)
sel = ParagraphStyle("sel", fontName="Helvetica", fontSize=9, leading=11)
sel_tebal = ParagraphStyle("selTebal", parent=sel, fontName="Helvetica-Bold")
kategori = ParagraphStyle("kategori", fontName="Helvetica-Bold", fontSize=12, textColor=NAVY, spaceBefore=8, spaceAfter=4)


def watermark(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica-Bold", 60)
    canvas.setFillColor(colors.Color(0.9, 0.3, 0.1, alpha=0.08))
    canvas.translate(landscape(A4)[0] / 2, landscape(A4)[1] / 2)
    canvas.rotate(20)
    canvas.drawCentredString(0, 0, "CONTOH")
    canvas.restoreState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64748B"))
    canvas.drawString(15 * mm, 8 * mm, "Katalog contoh untuk demo pitch. Data produk bukan data asli. Harga diberikan lewat surat Penawaran.")
    canvas.drawRightString(landscape(A4)[0] - 15 * mm, 8 * mm, f"Halaman {doc.page}")


def main():
    produk = json.loads(DATA.read_text(encoding="utf-8"))
    doc = SimpleDocTemplate(str(OUT), pagesize=landscape(A4), leftMargin=15 * mm, rightMargin=15 * mm,
                            topMargin=15 * mm, bottomMargin=15 * mm, title="Katalog produk (contoh)",
                            author="Sentosa Material Nusantara (contoh)")
    isi = [
        Paragraph("Katalog Material Bangunan — Sentosa Material Nusantara (CONTOH)", judul),
        Paragraph("Spesifikasi, standar, MOQ, dan status suplai. Tanpa harga — kirim permintaan penawaran lewat WhatsApp atau email.", kecil),
        Spacer(1, 6 * mm),
    ]
    lebar = [70 * mm, 85 * mm, 32 * mm, 30 * mm, 45 * mm]
    for kat in URUTAN_KATEGORI:
        baris = [[Paragraph(h, sel_tebal) for h in ("Produk", "Spesifikasi", "Standar", "MOQ", "Status suplai")]]
        for p in (p for p in produk if p["kategori"] == kat):
            baris.append([
                Paragraph(p["nama"], sel_tebal), Paragraph(p["spek"], sel), Paragraph(p["standar"], sel),
                Paragraph(f'{p["moq"]} {p["satuan"]}', sel), Paragraph(STATUS[p["status"]], sel),
            ])
        tabel = Table(baris, colWidths=lebar, repeatRows=1)
        tabel.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F6F8FB")),
            ("LINEBELOW", (0, 0), (-1, -1), 0.5, colors.HexColor("#E3E8EF")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]))
        isi += [Paragraph(kat, kategori), tabel]
    doc.build(isi, onFirstPage=watermark, onLaterPages=watermark)
    print(f"Ditulis: {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
