import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json({ error: "No policy IDs" }, { status: 400 });
    }

    const policyIds = ids.split(",");

    const placeholders = policyIds.map(() => "?").join(",");

    const [rows] = await db.query(
      `SELECT FileName, Files
       FROM ebmfile
       WHERE Police IN (${placeholders})`,
      policyIds
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "No EBMs found" }, { status: 404 });
    }

    // ✅ Create merged PDF
    const mergedPdf = await PDFDocument.create();

    for (const row of rows) {
      const pdf = await PDFDocument.load(row.Files);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    return new NextResponse(Buffer.from(mergedBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=EBM_MERGED.pdf",
      },
    });
  } catch (err) {
    console.error("PDF merge error:", err);

    return NextResponse.json(
      { error: "Failed to merge PDFs" },
      { status: 500 }
    );
  }
}
