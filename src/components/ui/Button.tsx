import Link from "next/link";

const base =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap px-6 text-sm font-medium transition duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-accent text-accent-ink hover:-translate-y-px",
  secondary: "border border-text text-text hover:bg-text hover:text-bg",
  onImage: "border border-on-image text-on-image hover:bg-on-image hover:text-scrim",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function buttonClass(variant: keyof typeof variants = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
