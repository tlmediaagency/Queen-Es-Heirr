import { SITE } from "@/data/site";

export type InquiryKind = "contact" | "wholesale" | "booking" | "mailing";

export type Inquiry = {
  id: string;
  kind: InquiryKind;
  createdAt: string;
  payload: Record<string, string>;
};

const KEY = "queen-e-inquiries";

export function loadInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Inquiry[];
  } catch {
    return [];
  }
}

export function saveInquiry(kind: InquiryKind, payload: Record<string, string>) {
  const inquiry: Inquiry = {
    id: crypto.randomUUID(),
    kind,
    createdAt: new Date().toISOString(),
    payload,
  };
  const next = [inquiry, ...loadInquiries()];
  localStorage.setItem(KEY, JSON.stringify(next));
  return inquiry;
}

export function mailtoFor(subject: string, body: string) {
  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export function openClientEmail(subject: string, body: string) {
  window.location.href = mailtoFor(subject, body);
}
