import Hero from "./components/Hero";
import AnimatedStars from "./components/AnimatedStars";
import ExploreUniverse from "./components/ExploreUniverse";
import FeaturedComic from "./components/FeaturedComics";
import AuthorSection from "./components/AuthorSection";
import ComicPreview from "./components/ComicPreview";
import BuyComic from "./components/BuyComic";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white">

      <AnimatedStars />

      <Hero />
      <FeaturedComic></FeaturedComic>
      <ComicPreview></ComicPreview>
      <BuyComic></BuyComic>


<AuthorSection></AuthorSection>
<ExploreUniverse></ExploreUniverse>
    </main>
  );
}