import { describe, it, expect } from "vitest";
import { validateEnquiry, type EnquiryValues } from "../src/lib/enquiry";

const ok: EnquiryValues = {
  name: "Farzana Rahman",
  phone: "+880 1712-345678",
  interest: "buy",
  message: "I would like to visit the site this week.",
  plot: "",
};

describe("validateEnquiry", () => {
  it("accepts a valid enquiry", () => {
    expect(validateEnquiry(ok)).toEqual({});
  });
  it("rejects a short name", () => {
    expect(validateEnquiry({ ...ok, name: "A" }).name).toBeTruthy();
  });
  it("rejects a bad phone", () => {
    expect(validateEnquiry({ ...ok, phone: "abc" }).phone).toBeTruthy();
  });
  it("rejects an empty message", () => {
    expect(validateEnquiry({ ...ok, message: "  " }).message).toBeTruthy();
  });
  it("requires plot details for landowners", () => {
    expect(validateEnquiry({ ...ok, interest: "landowner" }).plot).toBeTruthy();
    expect(validateEnquiry({ ...ok, interest: "landowner", plot: "Uttara Sector 9, 6 katha" })).toEqual({});
  });
  it("rejects an unknown interest", () => {
    expect(validateEnquiry({ ...ok, interest: "other" as never }).interest).toBeTruthy();
  });
});
