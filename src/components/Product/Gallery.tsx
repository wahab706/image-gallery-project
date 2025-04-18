import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { ProductImage } from "./types";

interface GalleryProps {
  images: ProductImage[];
}

export const Gallery: FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleImageHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;

      const target = e.currentTarget;
      const { left, top, width, height } = target.getBoundingClientRect();

      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      setZoomPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    },
    [isZoomed]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  return (
    <>
      {/* Image gallery */}
      <div className="flex flex-col-reverse">
        {/* Thumbnail selector */}
        <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  setSelectedImage(image);
                  setIsZoomed(false);
                }}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => {
                    setSelectedImage(image);
                    setIsZoomed(false);
                  })
                }
                role="button"
                tabIndex={0}
                aria-label={`View ${image.name}`}
                className={`relative rounded-md overflow-hidden bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  selectedImage.id === image.id ? "ring-2 ring-indigo-500" : ""
                }`}
              >
                <Image
                  src={`/images/${image.src}`}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="w-full h-full object-center object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main image with zoom */}
        <div className="w-full aspect-w-1 aspect-h-1 relative overflow-hidden">
          <div
            className={`relative rounded-lg overflow-hidden ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsZoomed(!isZoomed))}
            onMouseMove={handleImageHover}
            onMouseLeave={() => setIsZoomed(false)}
            role="button"
            tabIndex={0}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <Image
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.alt}
              width={800}
              height={800}
              className="w-full h-full object-center object-cover"
              priority
            />
            {isZoomed && (
              <div
                className="absolute inset-0 bg-no-repeat pointer-events-none"
                style={{
                  backgroundImage: `url(/images/${selectedImage.src})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: "200%",
                  transform: "scale(1.5)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: "transform 0.1s ease",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
