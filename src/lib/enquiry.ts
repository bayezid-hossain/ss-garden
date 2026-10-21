export const INTERESTS = ["buy", "landowner", "commercial"] as const;
export type Interest = (typeof INTERESTS)[number];

export const interestLabel: Record<Interest, string> = {
  buy: "Buying a home",
  landowner: "I own a plot",
  commercial: "Commercial space",
};

export interface EnquiryValues {
  name: string;
  phone: string;
  interest: Interest;
  message: string;
  plot: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = v.name.trim();
  const phone = v.phone.trim();
  const message = v.message.trim();
  const plot = v.plot.trim();

  if (name.length < 2 || name.length > 80) e.name = "Enter your name (2 to 80 characters).";
  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) e.phone = "Enter a valid phone number, for example +880 1712-345678.";
  if (!INTERESTS.includes(v.interest)) e.interest = "Choose what you are enquiring about.";
  if (message.length < 5 || message.length > 2000) e.message = "Write a short message (5 to 2000 characters).";
  if (v.interest === "landowner" && plot.length < 3) e.plot = "Tell us where the plot is and how large it is.";
  if (plot.length > 300) e.plot = "Keep this under 300 characters.";
  return e;
}
