export interface Artwork {
  id: string;
  title: string;
  slug: string;
  medium: string;
  dimensions: string;
  year: number;
  description: string;
  image: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Sunset over the Valley",
    slug: "sunset-over-the-valley",
    medium: "Oil on canvas",
    dimensions: "80 × 100 cm",
    year: 2024,
    description: "A breathtaking landscape capturing the golden hour as the sun descends behind rolling hills. The warm palette of oranges, pinks and purples reflects the tranquil beauty of rural France.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
  },
  {
    id: "2",
    title: "Portrait of Clara",
    slug: "portrait-of-clara",
    medium: "Oil on linen",
    dimensions: "60 × 80 cm",
    year: 2024,
    description: "An intimate portrait study exploring light and shadow. The subject's contemplative gaze invites viewers into a moment of quiet introspection.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
  },
  {
    id: "3",
    title: "Still Life with Flowers",
    slug: "still-life-with-flowers",
    medium: "Oil on canvas",
    dimensions: "50 × 60 cm",
    year: 2023,
    description: "A classical still life composition featuring a vibrant bouquet of garden flowers. Each petal is rendered with meticulous attention to color and texture.",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800&q=80",
  },
  {
    id: "4",
    title: "The Old Harbor",
    slug: "the-old-harbor",
    medium: "Oil on canvas",
    dimensions: "100 × 120 cm",
    year: 2023,
    description: "A maritime scene depicting fishing boats at rest in a historic French harbor. The interplay of light on water creates a sense of peaceful nostalgia.",
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80",
  },
  {
    id: "5",
    title: "Morning in Provence",
    slug: "morning-in-provence",
    medium: "Oil on canvas",
    dimensions: "90 × 110 cm",
    year: 2023,
    description: "Lavender fields stretching toward distant mountains under a soft morning sky. This piece celebrates the iconic beauty of the Provençal countryside.",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
  },
  {
    id: "6",
    title: "The Reading Room",
    slug: "the-reading-room",
    medium: "Oil on panel",
    dimensions: "70 × 90 cm",
    year: 2022,
    description: "An interior scene bathed in warm afternoon light. A figure absorbed in reading creates a timeless moment of domestic tranquility.",
    image: "https://images.unsplash.com/photo-1577720643272-265f09367456?w=800&q=80",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
