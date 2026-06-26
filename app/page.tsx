import Hero from "./components/Hero";
import AnimatedStars from "./components/AnimatedStars";
import ExploreUniverse from "./components/ExploreUniverse";
import FeaturedComic from "./components/FeaturedComics";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white">

      <AnimatedStars />

      <Hero />
<ExploreUniverse></ExploreUniverse>
<FeaturedComic></FeaturedComic>
    </main>
  );
}