import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { policyIds } = await req.json();

  if (!policyIds || policyIds.length === 0) {
    return NextResponse.json({ bills: [] });
  }

  // SQL query
  const placeholders = policyIds.map(() => "?").join(",");

  const [rows] = await db.query(
    `SELECT files 
     FROM ebmfile 
     WHERE police IN (${placeholders})`,
    policyIds,
  );

  const bills = rows.map((row) => ({
    summary: `${row.policy_id} — $${row.amount}`,
  }));

  return NextResponse.json({ bills });
}
