import Image from "next/image";
import Link from "next/link";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="SS Garden home">
      <Image src="/brand/leaf.webp" alt="" width={40} height={40} className="h-10 w-10" />
      <span className="font-display text-xl font-extrabold tracking-tight">SS Garden</span>
    </Link>
  );
}
