import Link from 'next/link'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ServicesPage.module.css'
import {
  FaArrowLeft,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaCloud,
  FaCheck,
  FaShieldAlt,
  FaClock,
  FaMoneyCheckAlt
} from 'react-icons/fa'

export const metadata = {
  title: 'Engineering Services · Web & Mobile Apps',
  description: 'Fullstack web application engineering, React Native mobile apps, .NET Core APIs, and cloud deployments.',
}

const SERVICE_ICONS = {
  'web-app-development': <FaLaptopCode />,
  'mobile-app-development': <FaMobileAlt />,
  'backend-api-architecture': <FaServer />,
  'cloud-devops-deployment': <FaCloud />,
}

export default function ServicesPage() {
  const { services, name, email } = profile
  const initials = `${name.first[0]}${name.last[0]}`

  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={styles.servicesContainer}>
      {/* Top Navbar */}
      <header className={styles.topBar}>
        <Link href="/" className={styles.brandLink}>
          <div className={styles.monogram}>{initials}</div>
          <span>{name.full}</span>
        </Link>

        <nav className={styles.navLinksGroup}>
          <Link href="/" className={styles.navBtn}>
            <FaArrowLeft size={11} />
            Portfolio
          </Link>
          <Link href="/pricing" className={styles.navBtn}>
            Pricing &amp; Plans
          </Link>
          <a href={`mailto:${email}`} className={`${styles.navBtn} ${styles.primaryNavBtn}`}>
            Inquire Now
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <span className={styles.pulseDot} />
            Available For Hire &amp; Contract Work
          </div>
          <h1 className={styles.title}>
            Engineered For Scale: <br />
            <span className={styles.gradientText}>Web, Mobile &amp; Cloud Apps</span>
          </h1>
          <p className={styles.subtitle}>
            From zero-to-one MVP launches to enterprise migrations. Crafting production-grade React web applications, cross-platform mobile apps, and robust .NET Core microservices.
          </p>
        </section>

        {/* Services Showcase Grid */}
        <section className={styles.servicesGrid}>
          {services?.map((svc) => (
            <div key={svc.id} className={styles.serviceCard}>
              <div>
                <div className={styles.cardTop}>
                  <div className={styles.serviceIconWrap}>
                    {SERVICE_ICONS[svc.id] || <FaLaptopCode />}
                  </div>
                  <span className={styles.serviceTag}>{svc.tag}</span>
                </div>

                <h2 className={styles.cardTitle}>{svc.title}</h2>
                <p className={styles.cardSubtitle}>{svc.subtitle}</p>
                <p className={styles.cardDesc}>{svc.description}</p>

                <div className={styles.deliverablesSection}>
                  <div className={styles.deliverablesHeading}>Key Deliverables &amp; Outcomes</div>
                  <ul className={styles.deliverablesList}>
                    {svc.deliverables?.map((item, idx) => (
                      <li key={idx} className={styles.deliverableItem}>
                        <FaCheck className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.techPills}>
                  {svc.technologies?.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div>
                  <span className={styles.priceLabel}>Starting from</span>
                  <span className={styles.priceValue}>{formatINR(svc.startingPriceINR)}</span>
                </div>
                <Link
                  href={`mailto:${email}?subject=Project%20Inquiry%20-%20${encodeURIComponent(
                    svc.title
                  )}&body=Hi%20Ramesh,%20I%20would%20like%20to%20discuss%20a%20project%20for%20${encodeURIComponent(
                    svc.title
                  )}.`}
                  className={styles.bookBtn}
                >
                  Book Service →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Razorpay Verified Trust Banner */}
        <section className={styles.trustBanner}>
          <div>
            <h3 className={styles.trustTitle}>Transparent Contracting &amp; Verified Security</h3>
            <p className={styles.trustSub}>
              GST compliant invoicing, signed NDAs, and milestone payments processed securely via Razorpay.
            </p>
          </div>
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <FaShieldAlt className={styles.trustIcon} />
              <span>Razorpay Verified</span>
            </div>
            <div className={styles.trustBadge}>
              <FaClock className={styles.trustIcon} />
              <span>Dedicated Weekly Sprints</span>
            </div>
            <div className={styles.trustBadge}>
              <FaMoneyCheckAlt className={styles.trustIcon} />
              <span>Milestone-Based Escrow</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
