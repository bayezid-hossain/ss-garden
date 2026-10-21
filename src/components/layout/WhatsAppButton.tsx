import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center bg-accent text-accent-ink transition duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <WhatsappLogo size={28} weight="fill" />
    </a>
  );
}
