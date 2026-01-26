export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

type Ctx = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: Ctx) {
  const { id } = await params;

  const term = await prisma.term.findUnique({
    where: { id },
  });

  if (!term) {
    return NextResponse.json({ error: "Term not found" }, { status: 404 });
  }

  return NextResponse.json({ data: term });
}
