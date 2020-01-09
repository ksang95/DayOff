import * as React from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './banner.css';
import { Link } from "react-router-dom"
 
function Banner() {
  const [index, setIndex] = React.useState(0);
 
  const images = [
    {
      src:
      'https://cdn-cms.f-static.com/ready_uploads/media/2050/1600_5cc9fa0bb63a7.jpg'
    },
    {
      src:
      'https://i.imgur.com/udvJZxe.png'
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
          <Link to="/vision"><GalleryImage objectFit="contain" key={img.src} src={img.src} /></Link>
        ))}
      </Gallery>
    </div>
  );
}

export default Banner;