import { AICouncil } from './components/AICouncil'
import { DecisionLedger } from './components/DecisionLedger'
import { EvidenceLab } from './components/EvidenceLab'
import { EvolutionTimeline } from './components/EvolutionTimeline'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MethodComparison } from './components/MethodComparison'
import { OpportunityMap } from './components/OpportunityMap'
import { ProductConcept } from './components/ProductConcept'
import { Resources } from './components/Resources'
import { ScopeFlow } from './components/ScopeFlow'
import { ValidationBoard } from './components/ValidationBoard'

const App = () => (
  <>
    <a className="skip-link" href="#main-content">
      跳到主要内容
    </a>
    <Header />
    <main id="main-content">
      <Hero />
      <ScopeFlow />
      <EvidenceLab />
      <OpportunityMap />
      <DecisionLedger />
      <AICouncil />
      <ProductConcept />
      <EvolutionTimeline />
      <ValidationBoard />
      <MethodComparison />
      <Resources />
    </main>
    <Footer />
  </>
)

export default App
