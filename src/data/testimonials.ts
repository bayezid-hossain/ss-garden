// Sample testimonials. Replace with real, permissioned quotes before launch.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We visited the site every month and the flat matched the plan down to the balcony planters. Handover came on the date written in our agreement.",
    name: "Farzana Rahman",
    role: "Flat owner, Dhanmondi Terraces",
  },
  {
    quote:
      "They explained the joint-venture split on paper before anything else, and the share of flats was exactly what we had agreed.",
    name: "Tanvir Ahmed Chowdhury",
    role: "Landowner, Uttara",
  },
  {
    quote:
      "Our office floor was handed over with the services already tested. We moved in the following week.",
    name: "Shirin Akter",
    role: "Tenant representative, Kalpa Business Centre",
  },
];
