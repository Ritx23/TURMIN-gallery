import styles from './SkeletonCard.module.css';

export default function SkeletonCard({ index }) {
  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-hidden="true"
    >
      <div className={styles.imageWrap}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.info}>
        <div className={styles.line} style={{ width: '65%' }} />
        <div className={styles.line} style={{ width: '45%', opacity: 0.5 }} />
        <div className={styles.metaRow}>
          <div className={styles.line} style={{ width: '40%' }} />
          <div className={styles.line} style={{ width: '25%' }} />
        </div>
      </div>
    </div>
  );
}
