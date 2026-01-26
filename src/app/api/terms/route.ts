export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(_request: NextRequest) {
  const terms = await prisma.term.findMany({
    select: {
      id: true,
      title: true,
      related: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  return NextResponse.json({ data: terms });
}
