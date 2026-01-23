import { NextResponse } from "next/server";

import { createTerm, listTerms, mapGrpcError } from "@/entities/term/api/grpc";

export const GET = async () => {
  try {
    const summaries = await listTerms();
    return NextResponse.json({ data: summaries });
  } catch (error) {
    const mapped = mapGrpcError(error as Parameters<typeof mapGrpcError>[0]);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
};

export const POST = async (request: Request) => {
  const payload = await request.json();

  try {
    const term = await createTerm(payload);

    if (!term) {
      return NextResponse.json(
        { error: "Failed to create term" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: term }, { status: 201 });
  } catch (error) {
    const mapped = mapGrpcError(error as Parameters<typeof mapGrpcError>[0]);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
};
