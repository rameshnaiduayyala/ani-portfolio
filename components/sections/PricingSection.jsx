'use client'

import { useState } from 'react'
import profile from '@/data/profile.json'
import PolicyModal from '@/components/ui/PolicyModal'
import styles from '@/styles/sections/PricingSection.module.css'
import { FaCheck, FaShieldAlt, FaBuilding, FaHeadset, FaFileContract } from 'react-icons/fa'

export default function PricingSection({ onBookPlan }) {
  const [activePolicy, setActivePolicy] = useState(null)
  const { merchantInfo, pricing } = profile

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={styles.pricingContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.pulseDot} />
          Engineering &amp; Consulting
        </div>
        <h2 className={styles.title}>
          Transparent <span className={styles.titleGradient}>Pricing &amp; Plans</span>
        </h2>
        <p className={styles.subtitle}>
          Fixed-scope deliverables and consulting agreements. Clear, compliant, and processed securely via Razorpay in INR.
        </p>
      </div>

      {/* Cards Grid */}
      <div className={styles.grid}>
        {pricing?.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.card} ${plan.popular ? styles.cardPopular : ''}`}
          >
            {plan.popular && <span className={styles.badge}>Recommended</span>}

            <div>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <p className={styles.cardSubtitle}>{plan.subtitle}</p>
                <p className={styles.cardDesc}>{plan.description}</p>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.priceAmount}>{formatINR(plan.priceINR)}</span>
                <span className={styles.priceType}>/ {plan.billingType}</span>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feat, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <FaCheck className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                if (onBookPlan) {
                  onBookPlan(plan)
                } else {
                  window.location.href = `mailto:${profile.email}?subject=Booking%20Inquiry%20-%20${encodeURIComponent(
                    plan.title
                  )}&body=Hi%20Ramesh,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                    plan.title
                  )}%20(${formatINR(plan.priceINR)}).`
                }
              }}
              className={`${styles.actionButton} ${
                plan.popular ? styles.btnPrimary : styles.btnSecondary
              }`}
            >
              Get Started with Razorpay
            </button>
          </div>
        ))}
      </div>

      {/* Razorpay Merchant Compliance Footer Box */}
      <div className={styles.complianceBox}>
        {/* Entity details */}
        <div>
          <h4 className={styles.merchantColTitle}>
            <FaBuilding /> Merchant Entity
          </h4>
          <p className={styles.merchantText}>
            <strong>Legal Name:</strong> {merchantInfo.legalName}
          </p>
          <p className={styles.merchantText}>
            <strong>Trade Name:</strong> {merchantInfo.tradeName}
          </p>
          <p className={styles.merchantText}>
            <strong>Registered Address:</strong> {merchantInfo.registeredAddress}
          </p>
        </div>

        {/* Contact details */}
        <div>
          <h4 className={styles.merchantColTitle}>
            <FaHeadset /> Support &amp; Contact
          </h4>
          <p className={styles.merchantText}>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${merchantInfo.supportEmail}`} style={{ color: 'var(--accent)' }}>
              {merchantInfo.supportEmail}
            </a>
          </p>
          <p className={styles.merchantText}>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${merchantInfo.supportPhone}`} style={{ color: 'var(--accent)' }}>
              {merchantInfo.supportPhone}
            </a>
          </p>
          <p className={styles.merchantText}>
            <strong>Hours:</strong> {merchantInfo.operatingHours}
          </p>
        </div>

        {/* Policies */}
        <div>
          <h4 className={styles.merchantColTitle}>
            <FaFileContract /> Mandatory Policies
          </h4>
          <ul className={styles.policyLinks}>
            <li>
              <button
                className={styles.policyButton}
                onClick={() => setActivePolicy('cancellation_refund')}
              >
                → Cancellation &amp; Refund Policy
              </button>
            </li>
            <li>
              <button
                className={styles.policyButton}
                onClick={() => setActivePolicy('terms_conditions')}
              >
                → Terms and Conditions
              </button>
            </li>
            <li>
              <button
                className={styles.policyButton}
                onClick={() => setActivePolicy('privacy_policy')}
              >
                → Privacy Policy
              </button>
            </li>
          </ul>

          <div className={styles.paymentNotice}>
            <FaShieldAlt style={{ color: 'var(--status-available)' }} />
            <span>100% Secure Checkout via Razorpay Payment Gateway</span>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={Boolean(activePolicy)}
        onClose={() => setActivePolicy(null)}
        policyKey={activePolicy}
      />
    </div>
  )
}
