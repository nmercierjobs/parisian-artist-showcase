import { Link } from "react-router-dom";
import { Artwork } from "@/data/artworks";
import ImageReveal from "./ImageReveal";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

const ArtworkCard = ({ artwork, index }: ArtworkCardProps) => {
  return (
    <Link
      to={`/work/${artwork.slug}`}
      className="artwork-card group relative block overflow-hidden rounded-2xl bg-card"
      style={{
        opacity: 0,
        animation: `staggerFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageReveal
          src={artwork.image}
          alt={artwork.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="border-t border-border/60 bg-card p-3 sm:p-4">
        <h3 className="truncate text-sm font-medium text-card-foreground sm:text-base">
          {artwork.title}
        </h3>
      </div>
    </Link>
  );
};

export default ArtworkCard;
