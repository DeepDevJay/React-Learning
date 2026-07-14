import { Carousel, Image } from "antd";

export default function MovieCarousel({ movie }) {
  const images = movie.movieImages?.length
      ? movie.movieImages
      : [{ imageUrl: movie.imageUrl }];

  return (
    <Carousel autoplay>
      {images.map(
        (image, index) => (
          <Image
            key={index}
            src={image.imageUrl}
            preview={false}
            height={450}
            style={{ objectFit: "cover", width: "100%" }}
          />
        )
      )}
    </Carousel>
  );
}
