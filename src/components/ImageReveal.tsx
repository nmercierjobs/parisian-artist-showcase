import { useState, useEffect, useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ImageReveal = ({ src, alt, className = "", style }: ImageRevealProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden" style={style}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={`img-reveal ${isLoaded ? 'loaded' : ''} ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ImageReveal;

