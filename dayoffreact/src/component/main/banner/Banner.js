import * as React from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './banner.css';
 
function Banner() {
  const [index, setIndex] = React.useState(0);
 
  const images = [
    {
      src:
      'https://cdn-cms.f-static.com/ready_uploads/media/2050/1600_5cc9fa0bb63a7.jpg'
    },
    {
      src:
      'https://cdn-cms.f-static.com/ready_uploads/media/18871/1600_5cdba55e204eb.jpg'
    },
    {
      src:
      'https://cdn-cms.f-static.com/ready_uploads/media/8080/1600_5cda756a84f49.jpg'
    }
  ];
 
  return (
    <div className='Banner'>
      <Gallery 
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(img => (
          <GalleryImage objectFit="contain" key={img.src} src={img.src} />
        ))}
      </Gallery>
    </div>
  );
}

export default Banner;