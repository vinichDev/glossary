import { NextResponse } from "next/server";

import {
  createTerm,
  deleteTerm,
  getTerm,
  mapGrpcError,
  updateTerm
} from "@/entities/term/api/grpc";

type Params = {
  params: {
    keyword: string;
  };
};

export const GET = async (_request: Request, { params }: Params) => {
  try {
    const term = await getTerm(params.keyword);

    if (!term) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }

    return NextResponse.json({ data: term });
  } catch (error) {
    const mapped = mapGrpcError(error as Parameters<typeof mapGrpcError>[0]);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
};

export const PUT = async (request: Request, { params }: Params) => {
  const payload = await request.json();

  try {
    if (payload.keyword && payload.keyword !== params.keyword) {
      const created = await createTerm(payload);

      if (!created) {
        return NextResponse.json(
          { error: "Failed to update term" },
          { status: 500 }
        );
      }

      await deleteTerm(params.keyword);
      return NextResponse.json({ data: created });
    }

    const term = await updateTerm(params.keyword, payload);

    if (!term) {
      return NextResponse.json(
        { error: "Failed to update term" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: term });
  } catch (error) {
    const mapped = mapGrpcError(error as Parameters<typeof mapGrpcError>[0]);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
};

export const DELETE = async (_request: Request, { params }: Params) => {
  try {
    await deleteTerm(params.keyword);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const mapped = mapGrpcError(error as Parameters<typeof mapGrpcError>[0]);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
};
