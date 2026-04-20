import Image from "next/image";
import type { HomeImageCrop } from "@/app/home-content";

type HomeCroppedImageProps = {
  image: HomeImageCrop;
  fallbackSrc: string;
  fallbackAlt: string;
  sizes: string;
  className?: string;
};

export default function HomeCroppedImage({
  image,
  fallbackSrc,
  fallbackAlt,
  sizes,
  className = "",
}: HomeCroppedImageProps) {
  const src = image.src || fallbackSrc;
  const alt = image.alt || fallbackAlt;
  const scale = Number.isFinite(image.scale) ? image.scale : 1;
  const x = Number.isFinite(image.x) ? image.x : 0;
  const y = Number.isFinite(image.y) ? image.y : 0;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={["object-cover", className].filter(Boolean).join(" ")}
      style={{
        objectPosition: "center center",
        translate: `${x}px ${y}px`,
        scale: String(scale),
        transformOrigin: "center",
      }}
    />
  );
}
