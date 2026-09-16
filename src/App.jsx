import { useState, useMemo } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FilterBar from './components/FilterBar/FilterBar';
import GalleryCard from './components/GalleryCard/GalleryCard';
import SkeletonCard from './components/SkeletonCard/SkeletonCard';
import Lightbox from './components/Lightbox/Lightbox';
import { useLightbox } from './hooks/useLightbox';
import { useGalleryImages } from './hooks/useGalleryImages';
import './App.css';

const ALL_CATEGORIES = ['All', 'Nature', 'Architecture', 'Portrait', 'Abstract', 'Ocean'];

// Local fallback images (already in /public/images/) used when API fails
const BASE = import.meta.env.BASE_URL;
const FALLBACK_IMAGES = [
  { id: 'f1',  src: `${BASE}images/nature1.jpg`,   thumb: `${BASE}images/nature1.jpg`,   title: 'Alpine Majesty',      photographer: 'TURMIN',  category: 'Nature',       location: 'Grand Teton, USA',    likes: 4821 },
  { id: 'f2',  src: `${BASE}images/arch1.jpg`,     thumb: `${BASE}images/arch1.jpg`,     title: 'Glass Geometry',      photographer: 'TURMIN',  category: 'Architecture', location: 'New York, USA',       likes: 3102 },
  { id: 'f3',  src: `${BASE}images/portrait1.jpg`, thumb: `${BASE}images/portrait1.jpg`, title: 'Neon Gaze',           photographer: 'TURMIN',  category: 'Portrait',     location: 'Paris, France',       likes: 6734 },
  { id: 'f4',  src: `${BASE}images/abstract1.jpg`, thumb: `${BASE}images/abstract1.jpg`, title: 'Liquid Dreams',       photographer: 'TURMIN',  category: 'Abstract',     location: 'Studio',              likes: 2987 },
  { id: 'f5',  src: `${BASE}images/ocean1.jpg`,    thumb: `${BASE}images/ocean1.jpg`,    title: 'Deep Azure',          photographer: 'TURMIN',  category: 'Ocean',        location: 'Maldives',            likes: 5613 },
  { id: 'f6',  src: `${BASE}images/nature2.jpg`,   thumb: `${BASE}images/nature2.jpg`,   title: 'Enchanted Canopy',    photographer: 'TURMIN',  category: 'Nature',       location: 'Black Forest',        likes: 3874 },
  { id: 'f7',  src: `${BASE}images/arch2.jpg`,     thumb: `${BASE}images/arch2.jpg`,     title: 'Neon Bridge',         photographer: 'TURMIN',  category: 'Architecture', location: 'Brisbane, Australia',  likes: 4210 },
  { id: 'f8',  src: `${BASE}images/ocean2.jpg`,    thumb: `${BASE}images/ocean2.jpg`,    title: 'Coastal Fury',        photographer: 'TURMIN',  category: 'Ocean',        location: 'Scottish Highlands',  likes: 5290 },
  { id: 'f9',  src: `${BASE}images/portrait2.jpg`, thumb: `${BASE}images/portrait2.jpg`, title: 'The Quiet Man',       photographer: 'TURMIN',  category: 'Portrait',     location: 'Berlin, Germany',     likes: 7891 },
  { id: 'f10', src: `${BASE}images/abstract2.jpg`, thumb: `${BASE}images/abstract2.jpg`, title: 'Cyber Grid',          photographer: 'TURMIN',  category: 'Abstract',     location: 'Digital Studio',      likes: 4450 },
  { id: 'f11', src: `${BASE}images/nature3.jpg`,   thumb: `${BASE}images/nature3.jpg`,   title: 'Sakura Path',         photographer: 'TURMIN',  category: 'Nature',       location: 'Kyoto, Japan',        likes: 6102 },
  { id: 'f12', src: `${BASE}images/arch3.jpg`,     thumb: `${BASE}images/arch3.jpg`,     title: 'Tower Bridge Dusk',   photographer: 'TURMIN',  category: 'Architecture', location: 'London, UK',          likes: 3560 },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { images: apiImages, loading, error, retry } = useGalleryImages();

  // Use API images if available, otherwise fall back to local images
  const images = (!loading && apiImages.length > 0) ? apiImages : (!loading ? FALLBACK_IMAGES : []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  const lightbox = useLightbox(filtered);

  return (
    <div className="app">
      <Navbar />
      <Hero />

      {/* ── Gallery Section ── */}
      <section className="gallery-section" id="gallery">
        <div className="section-header">
          <span className="section-tag">✦ Collections</span>
          <h2 className="section-title">Explore Our Gallery</h2>
          <p className="section-sub">
            Filter by category and click any image to open the full-screen lightbox.
          </p>
        </div>

        <FilterBar
          categories={ALL_CATEGORIES}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* API error banner — still shows cards (fallback) */}
        {error && !loading && (
          <div className="error-banner">
            <span>⚠️ Could not reach Pexels API — showing local photos.</span>
            <button className="retry-btn" onClick={retry} id="retry-btn">
              Try again
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="gallery-grid" key={activeCategory}>
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))
            : filtered.map((img, idx) => (
                <GalleryCard
                  key={img.id}
                  image={img}
                  index={idx}
                  onOpen={lightbox.open}
                />
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <span>🖼️</span>
            <p>No images found in this category.</p>
          </div>
        )}
      </section>

      {/* ── About Section ── */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-text">
            <span className="section-tag">✦ About TURMIN</span>
            <h2 className="section-title">Where Vision Meets Art</h2>
            <p className="about-desc">
              TURMIN is a premium visual gallery platform dedicated to showcasing
              stunning photography from talented artists around the world. From
              majestic mountain landscapes to intimate portraits, every image is
              hand-curated to inspire and captivate.
            </p>
            <div className="about-features">
              {[
                { icon: '🎨', title: 'Curated Collections', desc: 'Hand-picked images powered by Pexels API' },
                { icon: '🔍', title: 'Full Lightbox View', desc: 'Immersive full-screen viewing experience' },
                { icon: '📱', title: 'Fully Responsive', desc: 'Seamless experience on any device' },
              ].map((f) => (
                <div className="about-feature" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="visual-grid">
              {(loading ? Array.from({ length: 4 }) : images.slice(0, 4)).map((img, i) => (
                <div key={i} className="visual-thumb" style={{ animationDelay: `${i * 0.1}s` }}>
                  {img ? (
                    <img src={img.thumb} alt={img.title} loading="lazy" />
                  ) : (
                    <div className="visual-thumb-skeleton" />
                  )}
                </div>
              ))}
            </div>
            <div className="visual-badge">
              <span>{loading ? '…' : `${images.length}+`}</span>
              <p>Stunning<br />Photos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="footer-logo-t">T</span>URMIN
          </div>
          <p className="footer-copy">
            © 2026 TURMIN · Photos by Pexels
          </p>
          <div className="footer-links">
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
          </div>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      <Lightbox
        isOpen={lightbox.isOpen}
        image={lightbox.activeImage}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
        currentIndex={lightbox.activeIndex ?? 0}
        total={filtered.length}
      />
    </div>
  );
}
