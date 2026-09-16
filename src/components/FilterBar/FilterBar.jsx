import styles from './FilterBar.module.css';

export default function FilterBar({ categories, activeCategory, onChange }) {
  return (
    <div className={styles.wrapper} id="filter-bar">
      <div className={styles.inner}>
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            className={`${styles.btn} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
            {activeCategory === cat && <span className={styles.dot} />}
          </button>
        ))}
      </div>
    </div>
  );
}
