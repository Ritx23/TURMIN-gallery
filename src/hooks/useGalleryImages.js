import { useState, useEffect, useCallback } from 'react';
import { fetchAllImages } from '../services/unsplash';

export function useGalleryImages() {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    fetchAllImages()
      .then((imgs) => {
        setImages(imgs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gallery fetch failed:', err);
        setError(err.message || 'Failed to load images');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { images, loading, error, retry: load };
}
