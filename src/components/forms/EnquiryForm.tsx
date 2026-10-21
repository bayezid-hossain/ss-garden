"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass } from "../ui/Button";
import { site } from "@/data/site";
import {
  INTERESTS, interestLabel, validateEnquiry,
  type EnquiryErrors, type EnquiryValues, type Interest,
} from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "error";

const input =
  "h-12 w-full border border-field bg-surface px-4 text-base text-text placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function Field({
  id, label, error, help, children,
}: { id: string; label: string; error?: string; help?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {help && !error && <p id={`${id}-help`} className="text-sm text-muted">{help}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export function EnquiryForm({
  variant = "general",
  project = "",
  defaultInterest = "buy",
}: {
  variant?: "general" | "landowner";
  project?: string;
  defaultInterest?: Interest;
}) {
  const [values, setValues] = useState<EnquiryValues>({
    name: "", phone: "", message: "", plot: "",
    interest: variant === "landowner" ? "landowner" : defaultInterest,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") done.current?.focus();
  }, [status]);

  const set = <K extends keyof EnquiryValues>(k: K, v: EnquiryValues[K]) => setValues((p) => ({ ...p, [k]: v }));
  const describe = (id: string, e?: string, help?: boolean) => (e ? `${id}-error` : help ? `${id}-help` : undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (new FormData(e.currentTarget).get("website")) {
      setStatus("success");
      return;
    }
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      if (process.env.NEXT_PUBLIC_MOCK_FORM === "1") {
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const res = await fetch("/api/enquiry.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, project }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error ?? "Request failed");
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={done} tabIndex={-1} role="status" className="border border-text p-6 outline-none">
        <p className="font-display text-2xl">Thank you.</p>
        <p className="mt-2 text-muted">We have your enquiry and will call you on {values.phone || "the number you gave"}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {project && <p className="text-sm text-muted">Enquiring about {project}.</p>}

      <Field id="name" label="Your name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" className={input} value={values.name}
          onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={describe("name", errors.name)} />
      </Field>

      <Field id="phone" label="Phone number" error={errors.phone} help="We will call you on this number.">
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} value={values.phone}
          onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={describe("phone", errors.phone, true)} />
      </Field>

      {variant === "general" && (
        <Field id="interest" label="I am interested in" error={errors.interest}>
          <select id="interest" name="interest" className={input} value={values.interest}
            onChange={(e) => set("interest", e.target.value as Interest)}>
            {INTERESTS.map((i) => <option key={i} value={i}>{interestLabel[i]}</option>)}
          </select>
        </Field>
      )}

      {variant === "landowner" && (
        <Field id="plot" label="Plot location and size" error={errors.plot} help="For example: Uttara Sector 9, 6 katha, east facing.">
          <input id="plot" name="plot" className={input} value={values.plot}
            onChange={(e) => set("plot", e.target.value)} aria-invalid={!!errors.plot} aria-describedby={describe("plot", errors.plot, true)} />
        </Field>
      )}

      <Field id="message" label="Message" error={errors.message}>
        <textarea id="message" name="message" rows={5} className={`${input} h-auto min-h-32 py-3`} value={values.message}
          onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={describe("message", errors.message)} />
      </Field>

      {status === "error" && (
        <p role="alert" className="border border-danger p-4 text-sm text-danger">
          Your message could not be sent. Please try again, or call {site.phone}.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "w-full disabled:opacity-60 md:w-fit")}>
        {status === "submitting" ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}
