import { NextResponse } from "next/server";
import { terms } from "@/shared/data/terms";

export const GET = async () => {
  return NextResponse.json({ data: terms });
};
