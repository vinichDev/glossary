import { NextResponse } from "next/server";

type Params = {
  params: {
    keyword: string;
  };
};

const API_BASE_URL = process.env.GLOSSARY_API_URL ?? "http://localhost:8000";

export const GET = async (_request: Request, { params }: Params) => {
  const response = await fetch(`${API_BASE_URL}/terms/${params.keyword}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Term not found" },
      { status: response.status }
    );
  }

  const term = await response.json();
  return NextResponse.json({ data: term });
};

export const PUT = async (request: Request, { params }: Params) => {
  const payload = await request.json();
  const response = await fetch(`${API_BASE_URL}/terms/${params.keyword}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to update term" },
      { status: response.status }
    );
  }

  const term = await response.json();
  return NextResponse.json({ data: term });
};

export const DELETE = async (_request: Request, { params }: Params) => {
  const response = await fetch(`${API_BASE_URL}/terms/${params.keyword}`, {
    method: "DELETE"
  });

  return new NextResponse(null, { status: response.status });
};
