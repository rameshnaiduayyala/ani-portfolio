'use client'

import { useEffect } from 'react'
import styles from '@/styles/ui/PolicyModal.module.css'
import profile from '@/data/profile.json'

export default function PolicyModal({ isOpen, onClose, policyKey }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !policyKey) return null

  const policy = profile.policies?.[policyKey]
  if (!policy) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{policy.title}</h3>
            <p className={styles.lastUpdated}>Updated: {policy.lastUpdated}</p>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close policy modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {policy.sections?.map((sec, idx) => (
            <div key={idx} className={styles.section}>
              <h4 className={styles.sectionHeading}>{sec.heading}</h4>
              <p className={styles.sectionBody}>{sec.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.footerNote}>
            Secured &amp; verified by Razorpay Merchant Solutions
          </span>
          <button onClick={onClose} className={styles.doneButton}>
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
