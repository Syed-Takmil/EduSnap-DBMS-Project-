import FaqSection from "@/Components/FAQ";
import HeroBanner from "@/Components/HeroBanner";
import SuccessStories from "@/Components/Stories";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <SuccessStories/>
      <FaqSection/>
    </div>
  );
}
