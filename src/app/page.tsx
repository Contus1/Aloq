import Hero from '@/components/home/Hero';
import ValueProposition from '@/components/home/ValueProposition';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import Ethics from '@/components/home/Ethics';
import ForBusiness from '@/components/home/ForBusiness';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <Features />
      <Ethics />
      <ForBusiness />
      <Footer />
    </main>
  );
}
