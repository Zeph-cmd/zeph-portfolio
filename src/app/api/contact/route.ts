import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

const ipRequests = new Map<string, number[]>();

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function escapeSpecialChars(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeInput(input: string): string {
  return escapeSpecialChars(stripHtml(input.trim()));
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestTimes = ipRequests.get(ip) || [];
  const recentRequests = requestTimes.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequests.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  ipRequests.set(ip, recentRequests);
  return false;
}

function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const company = sanitizeInput(String(body.company || ""));

  // Honeypot: if filled, pretend success and do nothing.
  if (company.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = sanitizeInput(String(body.name || ""));
  const email = sanitizeInput(String(body.email || ""));
  const message = sanitizeInput(String(body.message || ""));

  if (name.length < 2 || name.length > 50) {
    return NextResponse.json(
      { error: "Name must be between 2 and 50 characters." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (message.length === 0 || message.length > 500) {
    return NextResponse.json(
      { error: "Message is required and must be at most 500 characters." },
      { status: 400 }
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 }
    );
  }

  const upstreamForm = new FormData();
  upstreamForm.append("access_key", accessKey);
  upstreamForm.append("subject", "New message from portfolio");
  upstreamForm.append("name", name);
  upstreamForm.append("email", email);
  upstreamForm.append("message", message);

  try {
    const upstreamRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: upstreamForm,
    });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { error: "Unable to send message right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function OPTIONS() {
  return methodNotAllowed();
}
