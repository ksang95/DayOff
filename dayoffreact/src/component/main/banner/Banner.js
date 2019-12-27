import * as React from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import './banner.css';
 
function Banner() {
  const [index, setIndex] = React.useState(0);
 
  const images = [
    {
      src:
      'https://app-storage-edge-008.cafe24.com/bannermanage2/mall66/2019/12/11/f0223852e7be84d1bd7e90aebc40b5ff.jpg'
    },
    {
      src:
      'https://www.66girls.co.kr/web/upload/category/shop1_306_top_931007.jpg'
    },
    {
      src:
      'https://app-storage-edge-008.cafe24.com/bannermanage2/mall66/2019/12/11/f0223852e7be84d1bd7e90aebc40b5ff.jpg'
    },
    {
      src:
      'https://www.66girls.co.kr/web/upload/category/shop1_306_top_931007.jpg'
    },
    {
      src:
      'https://app-storage-edge-008.cafe24.com/bannermanage2/mall66/2019/12/11/f0223852e7be84d1bd7e90aebc40b5ff.jpg'
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