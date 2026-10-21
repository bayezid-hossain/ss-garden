import { Hero } from "@/components/home/Hero";
import { FeaturedPan } from "@/components/home/FeaturedPan";
import { StatusBento } from "@/components/home/StatusBento";
import { JointVenture } from "@/components/home/JointVenture";
import { CommitmentStack } from "@/components/home/CommitmentStack";
import { Testimonials } from "@/components/home/Testimonials";
import { EnquirySection } from "@/components/home/EnquirySection";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { imageRef } from "@/data/image-plan";

const order = { ongoing: 0, upcoming: 1, completed: 2 } as const;

export default function Home() {
  const featured = [...projects].sort((a, b) => order[a.status] - order[b.status]).slice(0, 4);
  return (
    <>
      <Hero />
      <FeaturedPan projects={featured} />
      <StatusBento projects={projects} />
      <JointVenture image={imageRef("/images/site/landowner.webp")} />
      <CommitmentStack />
      <Testimonials items={testimonials} />
      <EnquirySection />
    </>
  );
}
