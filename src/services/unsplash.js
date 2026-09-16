// Pexels API service
const API_KEY = 'nwvNZfEvsYSxU6u0tjrNwu0gZ1ZEopsxPtyvUHcOXhp5j8pXn6N1MjWK';
const BASE_URL = 'https://api.pexels.com/v1';

// Pexels search queries per category
const CATEGORY_QUERIES = {
  Nature:       'nature landscape mountains',
  Architecture: 'architecture building modern city',
  Portrait:     'portrait photography face',
  Abstract:     'abstract colorful art',
  Ocean:        'ocean sea beach waves',
};

/**
 * Fetch photos for one category from Pexels
 * Pexels requires the API key in the Authorization header
 */
async function fetchCategory(category, perPage = 3) {
  const query = CATEGORY_QUERIES[category];
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;

  const res = await fetch(url, {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!res.ok) throw new Error(`Pexels error ${res.status}: ${res.statusText}`);

  const data = await res.json();

  return (data.photos || []).map((photo, i) => ({
    id:              `${category}-${photo.id}`,
    src:             photo.src.large2x || photo.src.large || photo.src.original,
    thumb:           photo.src.medium  || photo.src.small,
    title:           photo.alt || `${category} ${i + 1}`,
    photographer:    photo.photographer,
    photographerUrl: photo.photographer_url,
    category,
    location:        'Pexels',
    likes:           Math.floor(Math.random() * 8000) + 1000, // Pexels has no likes field
    color:           photo.avg_color,
  }));
}

/**
 * Fetch all categories in parallel and interleave results
 */
export async function fetchAllImages() {
  const categories = Object.keys(CATEGORY_QUERIES);

  const results = await Promise.all(
    categories.map((cat) =>
      fetchCategory(cat, 3).catch((err) => {
        console.warn(`Failed to fetch "${cat}":`, err.message);
        return [];
      })
    )
  );

  // Interleave: pick one from each category in turn so grid looks varied
  const flat = [];
  const maxLen = Math.max(...results.map((r) => r.length));
  for (let i = 0; i < maxLen; i++) {
    for (const arr of results) {
      if (arr[i]) flat.push(arr[i]);
    }
  }
  return flat;
}
