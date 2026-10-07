import Link from 'next/link'
import PricingSection from '@/components/sections/PricingSection'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/PricingPage.module.css'
import { FaArrowLeft } from 'react-icons/fa'

export const metadata = {
  title: 'Pricing & Compliance Policies',
  description: 'Transparent pricing, customer support, and Razorpay compliant merchant policies.',
}

export default function PricingPage() {
  const { policies, merchantInfo } = profile
  const initials = `${profile.name.first[0]}${profile.name.last[0]}`

  return (
    <div className={styles.pageContainer}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.brandLink}>
          <div className={styles.monogram}>{initials}</div>
          <span>{profile.name.full}</span>
        </Link>
        <Link href="/" className={styles.backBtn}>
          <FaArrowLeft size={12} />
          Back to Portfolio
        </Link>
      </header>

      <main>
        {/* Interactive Pricing and Quick Modal Compliance */}
        <PricingSection />

        {/* Static, Crawlable Policies (Direct audit anchor targets for Razorpay verification) */}
        <section className={styles.policyStaticSection} id="compliance-policies">
          <div id="cancellation-and-refund" className={styles.policyCard}>
            <h2 className={styles.policyTitle}>{policies.cancellation_refund.title}</h2>
            <p className={styles.policyMeta}>Last updated: {policies.cancellation_refund.lastUpdated}</p>
            {policies.cancellation_refund.sections.map((sec, i) => (
              <div key={i} className={styles.policyItem}>
                <h3 className={styles.policyItemHeading}>{sec.heading}</h3>
                <p className={styles.policyItemBody}>{sec.body}</p>
              </div>
            ))}
          </div>

          <div id="terms-and-conditions" className={styles.policyCard}>
            <h2 className={styles.policyTitle}>{policies.terms_conditions.title}</h2>
            <p className={styles.policyMeta}>Last updated: {policies.terms_conditions.lastUpdated}</p>
            {policies.terms_conditions.sections.map((sec, i) => (
              <div key={i} className={styles.policyItem}>
                <h3 className={styles.policyItemHeading}>{sec.heading}</h3>
                <p className={styles.policyItemBody}>{sec.body}</p>
              </div>
            ))}
          </div>

          <div id="privacy-policy" className={styles.policyCard}>
            <h2 className={styles.policyTitle}>{policies.privacy_policy.title}</h2>
            <p className={styles.policyMeta}>Last updated: {policies.privacy_policy.lastUpdated}</p>
            {policies.privacy_policy.sections.map((sec, i) => (
              <div key={i} className={styles.policyItem}>
                <h3 className={styles.policyItemHeading}>{sec.heading}</h3>
                <p className={styles.policyItemBody}>{sec.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
