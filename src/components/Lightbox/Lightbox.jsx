import { useState } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ isOpen, image, onClose, onNext, onPrev, currentIndex, total }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!isOpen || !image) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      id="lightbox-modal"
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} id="lightbox-close" aria-label="Close lightbox">
          ✕
        </button>

        {/* Counter */}
        <div className={styles.counter}>
          {currentIndex + 1} / {total}
        </div>

        {/* Main image */}
        <div className={styles.imageArea}>
          {/* Prev button */}
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={onPrev}
            id="lightbox-prev"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles.imgWrapper}>
            {!imgLoaded && (
              <div className={styles.spinner}>
                <div className={styles.spinnerRing} />
              </div>
            )}
            <img
              key={image.id}
              src={image.src}
              alt={image.title}
              className={`${styles.img} ${imgLoaded ? styles.imgVisible : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Next button */}
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={onNext}
            id="lightbox-next"
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        {/* Info panel */}
        <div className={styles.infoPanel}>
          <div className={styles.infoLeft}>
            <span className={styles.category}>{image.category}</span>
            <h2 className={styles.title}>{image.title}</h2>
            <p className={styles.photographer}>by {image.photographer} · {image.location}</p>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.likeStat}>
              <span className={styles.likeIcon}>♥</span>
              <span>{image.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail strip hint */}
        <p className={styles.hint}>← → Arrow keys to navigate · ESC to close</p>
      </div>
    </div>
  );
}
