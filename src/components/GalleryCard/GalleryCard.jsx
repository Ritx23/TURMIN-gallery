import { useState } from 'react';
import styles from './GalleryCard.module.css';

const categoryColors = {
  Nature: '#22c55e',
  Architecture: '#3b82f6',
  Portrait: '#ec4899',
  Abstract: '#8b5cf6',
  Ocean: '#14b8a6',
};

export default function GalleryCard({ image, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const color = categoryColors[image.category] || '#8b5cf6';

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onOpen(index)}
      id={`card-${image.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(index)}
      aria-label={`Open ${image.title} in lightbox`}
    >
      {/* Image container */}
      <div className={styles.imageWrap}>
        {!loaded && <div className={styles.skeleton} />}
        <img
          src={image.thumb}
          alt={image.title}
          className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        {/* Overlay */}
        <div className={styles.overlay}>
          <div className={styles.overlayInner}>
            <span className={styles.zoomIcon}>⊕</span>
            <p className={styles.overlayText}>View Full</p>
          </div>
        </div>

        {/* Category badge */}
        <span
          className={styles.categoryBadge}
          style={{ '--cat-color': color }}
        >
          {image.category}
        </span>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <div>
            <h3 className={styles.title}>{image.title}</h3>
            <p className={styles.photographer}>by {image.photographer}</p>
          </div>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked((l) => !l);
            }}
            id={`like-${image.id}`}
            aria-label={liked ? 'Unlike' : 'Like'}
            title={liked ? 'Unlike' : 'Like'}
          >
            {liked ? '♥' : '♡'}
          </button>
        </div>
        <div className={styles.meta}>
          <span className={styles.metaItem}>📍 {image.location}</span>
          <span className={styles.metaItem}>
            ♥ {(image.likes + (liked ? 1 : 0)).toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}
