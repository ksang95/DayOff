import React from 'react';
import Header from '../common/header/Header';
import MainContents from './MainContents';
import Banner from './banner/Banner';
import Slider from './slider/Slider';
import Footer from '../common/footer/Footer';
const slideData = [
  {
    index: 0,
    headline: '',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
  },
  {
    index: 1,
    headline: '',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
  },
  {
    index: 2,
    headline: '',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
  },
  {
    index: 3,
    headline: '',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
  }
]
function Main() {
  return (
      <div>
          <Header />
          <Banner />
          <Slider heading="Example Slider" slides={slideData} />   
          <MainContents />
          <Footer />
          </div>
  );
}

export default Main;
