import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import DatasetSection from '@/components/sections/DatasetSection'
import MethodologySection from '@/components/sections/MethodologySection'
import ModelsSection from '@/components/sections/ModelsSection'
import ResultsSection from '@/components/sections/ResultsSection'
import DemoSection from '@/components/sections/DemoSection'
import AuthorSection from '@/components/sections/AuthorSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <ProblemSection />
        <DatasetSection />
        <MethodologySection />
        <ModelsSection />
        <ResultsSection />
        <DemoSection />
        <AuthorSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
