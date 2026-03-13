import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Portfolio from '@/components/sections/Portfolio';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Portfolio />
      {/* Footer is already in Layout */}
    </>
  );
}
