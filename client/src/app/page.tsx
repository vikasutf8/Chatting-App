import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReviews";
import Image from "next/image";

export default function Home() {
  return (
<div className="min-h-screen bg-base-200 flex flex-col">
    <Navbar/>
    <HeroSection/>
    <FeatureSection/>
    <UserReviews/>
    <Footer/>
</div>
  );
}
