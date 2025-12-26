import { useEffect, useState } from "react";

export const useAspectRatio = (imageUrl?: string) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();

    const handleLoad = () => {
      const ratio = img.width / img.height;

      setAspectRatio(ratio);
    };

    const handleError = () => setAspectRatio(null);

    img.src = imageUrl;

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [imageUrl]);

  return aspectRatio;
};
