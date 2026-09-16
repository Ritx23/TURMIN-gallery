import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Animated orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        <div className={styles.badge}>✦ Premium Visual Gallery</div>
        <h1 className={styles.heading}>
          Discover the World<br />
          Through <span className={styles.gradientText}>TURMIN</span>
        </h1>
        <p className={styles.subtext}>
          A curated collection of stunning photography across nature,
          architecture, portraits, and beyond. Every image tells a story.
        </p>
        <div className={styles.actions}>
          <a href="#gallery" className={styles.btnPrimary} id="explore-btn">
            Explore Gallery
          </a>
          <a href="#about" className={styles.btnSecondary}>
            Learn More
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>12+</span>
            <span className={styles.statLabel}>Images</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>4K</span>
            <span className={styles.statLabel}>Resolution</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
