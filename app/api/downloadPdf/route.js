import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const ids = searchParams.get("ids");
    const preview = searchParams.get("preview"); // 👈 NEW

    if (!ids) {
      return NextResponse.json({ error: "No policy IDs" }, { status: 400 });
    }

    const policyIds = ids.split(",");
    const placeholders = policyIds.map(() => "?").join(",");

    const [rows] = await db.query(
      `SELECT FileName, Files
       FROM ebmfile
       WHERE Police IN (${placeholders})`,
      policyIds,
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "No EBMs found" }, { status: 404 });
    }

    // ✅ merge PDFs
    const mergedPdf = await PDFDocument.create();

    for (const row of rows) {
      const pdf = await PDFDocument.load(row.Files);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    // ✅ IMPORTANT PART
    const disposition =
      preview === "true"
        ? 'inline; filename="EBM_PREVIEW.pdf"'
        : 'attachment; filename="EBM_MERGED.pdf"';

    return new NextResponse(Buffer.from(mergedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
      },
    });
  } catch (err) {
    console.error("PDF merge error:", err);

    return NextResponse.json(
      { error: "Failed to merge PDFs" },
      { status: 500 },
    );
  }
}
