import { NextResponse } from "next/server";
import { termSummaries } from "@/shared/data/termSummaries";

export const GET = async () => {
  return NextResponse.json({ data: termSummaries });
};
