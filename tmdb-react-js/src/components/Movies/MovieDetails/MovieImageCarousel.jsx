import { Carousel, Empty } from "antd";

export default function MovieImageCarousel({ images = [] }) {
  if (!images.length) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No movie images available"
      />
    );
  }

  return (
    <Carousel
      autoplay
      arrows
      style={{ borderRadius: 8, overflow: "hidden" }}
    >
      {images.map((image) => (
        <div key={image.id}>
          <img
            src={image.filePath}
            alt="Movie"
            style={{ width: "100%", height: 500, objectFit: "cover" }}
          />
        </div>
      ))}
    </Carousel>
  );
}
