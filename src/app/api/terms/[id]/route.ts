import { NextResponse } from "next/server";
import { terms } from "@/shared/data/terms";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_request: Request, { params }: Params) => {
  const term = terms.find((item) => item.id === params.id);

  if (!term) {
    return NextResponse.json({ error: "Term not found" }, { status: 404 });
  }

  return NextResponse.json({ data: term });
};
