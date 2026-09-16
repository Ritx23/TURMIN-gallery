import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav} id="main-nav">
      <div className={styles.logo}>
        <span className={styles.logoT}>T</span>URMIN
      </div>
      <div className={styles.links}>
        <a href="#gallery" className={styles.link}>Gallery</a>
        <a href="#about" className={styles.link}>About</a>
        <a href="#gallery" className={styles.cta}>Explore</a>
      </div>
    </nav>
  );
}
