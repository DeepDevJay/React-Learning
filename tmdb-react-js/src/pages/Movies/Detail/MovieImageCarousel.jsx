import { Carousel, Empty } from "antd";

import { getImageUrl } from "../../../utils/image";

export default function MovieImageCarousel({ movie }) {
  const images = movie?.movieImages || [];

  const carouselImages = [];

  // Main movie image
  if (movie?.imageUrl) {
    carouselImages.push({ id: "main-image", filePath: movie.imageUrl });
  }

  // Additional movie images
  images.forEach((image) => {
    if (image.filePath) {
      carouselImages.push({ id: image.id, filePath: image.filePath });
    }
  });

  if (carouselImages.length === 0) {
    return (
      <div
        style={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty description="No images available" />
      </div>
    );
  }

  return (
    <Carousel
      autoplay
      arrows
      dots
    >
      {carouselImages.map(
        (image) => {
          const imageUrl = getImageUrl(image.filePath);

          return (
            <div key={image.id}>
              <div
                style={{
                  height: 500,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f5f5f5",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageUrl}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          );
        }
      )}
    </Carousel>
  );
}
