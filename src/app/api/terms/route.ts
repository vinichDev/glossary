import { NextResponse } from "next/server";

const API_BASE_URL = process.env.GLOSSARY_API_URL ?? "http://localhost:8000";

export const GET = async () => {
  const response = await fetch(`${API_BASE_URL}/terms`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Не удалось загрузить термины" },
      { status: response.status }
    );
  }

  const terms = await response.json();
  const summaries = terms.map((term: { keyword: string; title: string; related: string[] }) => ({
    keyword: term.keyword,
    title: term.title,
    related: term.related
  }));

  return NextResponse.json({ data: summaries });
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const response = await fetch(`${API_BASE_URL}/terms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create term" },
      { status: response.status }
    );
  }

  const term = await response.json();
  return NextResponse.json({ data: term }, { status: response.status });
};
