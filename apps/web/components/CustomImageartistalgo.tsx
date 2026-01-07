import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CustomImageProps {
  src: string | Avatar;
  className?: string;
  objectFit?: "cover" | "contain";
}

interface Avatar {
  url: string;
  color?: string;
}

const CustomImageartistalgo: React.FC<CustomImageProps> = ({ src, className = "", objectFit = "cover" }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [isError, setError] = useState(false);

  useEffect(() => {
    try {
      let parsedAvatar: Avatar = typeof src === "string" && src.startsWith("{") ? JSON.parse(src) : (src as Avatar);

      if (parsedAvatar?.url) {
        setImageUrl(parsedAvatar.url);
        setBackgroundColor(parsedAvatar.color || "transparent");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setError(true);
    }
  }, [src]);

  return !isError ? (
    <div
      className={`${className} select-none noDrag`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor,
      }}
    >
      <Image
        src={imageUrl}
        alt="img"
        layout="fill"
        objectFit={objectFit}
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  ) : null;
};

export default CustomImageartistalgo as any;
