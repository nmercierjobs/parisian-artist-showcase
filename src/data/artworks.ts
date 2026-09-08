export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  detailImage: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "3D Camera Distance Sensor",
    slug: "3d-camera-distance-sensor",
    description: "A breathtaking landscape capturing the golden hour as the sun descends behind rolling hills. The warm palette of oranges, pinks and purples reflects the tranquil beauty of rural France.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    detailImage: "/artworks/chromatic-tension.jpg",
  },
  {
    id: "2",
    title: "Steer-by-wire Bicycle",
    slug: "steer-by-wire-bicycle",
    description: "An intimate portrait study exploring light and shadow. The subject's contemplative gaze invites viewers into a moment of quiet introspection.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    detailImage: "/artworks/equilibre-instable.jpg",
  },
  {
    id: "3",
    title: "USB Torque Sensor",
    slug: "usb-torque-sensor",
    description: "A classical still life composition featuring a vibrant bouquet of garden flowers. Each petal is rendered with meticulous attention to color and texture.",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800&q=80",
    detailImage: "/artworks/fragments-of-silence.jpg",
  },
  {
    id: "4",
    title: "Wireless MCU Timer Synchronization",
    slug: "wireless-mcu-timer-synchronization",
    description: "A maritime scene depicting fishing boats at rest in a historic French harbor. The interplay of light on water creates a sense of peaceful nostalgia.",
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800&q=80",
    detailImage: "/artworks/paris-layers.jpg",
  },
];

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find((artwork) => artwork.slug === slug);
};
