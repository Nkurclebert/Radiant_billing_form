import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const policyId = searchParams.get("ids");

    if (!policyId) {
      return new Response("Missing policy number", { status: 400 });
    }

    // Get single EBM PDF
    const [rows] = await db.query(
      `SELECT FileName, Files FROM ebmfile WHERE Police = ? LIMIT 1`,
      [policyId]
    );

    if (rows.length === 0) {
      return new Response("EBM not found", { status: 404 });
    }

    const pdfBuffer = rows[0].Files;
    const fileName = rows[0].FileName || "ebm.pdf";

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
