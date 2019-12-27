import React from 'react';
import Header from '../../common/header/Header';
import Nav from '../nav/Nav';
import GoogleMapsContainer from './GoogleMapsContainer';
import Footer from '../footer/Footer';


function MapPage() {
  return (
      <div>
          <Header />
          <Nav />
          <GoogleMapsContainer />
          <Footer />
          </div>
  );
}

export default MapPage;
