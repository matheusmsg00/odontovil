import { AtendimentoSection } from './components/AtendimentoSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ResultsSection } from './components/ResultsSection'
import { Hero } from './components/Hero'
import { HighlightSection } from './components/HighlightSection'
import { InfoStrip } from './components/InfoStrip'
import { InstitutionalSection } from './components/InstitutionalSection'
import { LocationSection } from './components/LocationSection'
import { Navbar } from './components/Navbar'
import { ReviewsSection } from './components/ReviewsSection'
import { WhatsAppButton } from './components/WhatsAppButton'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <InfoStrip />
        <InstitutionalSection />
        <AtendimentoSection />
        <HighlightSection />
        <ReviewsSection />
        <ResultsSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
