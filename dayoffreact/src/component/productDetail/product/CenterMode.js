import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./mySlick.css";

export default class CenterMode extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nav1: null,
        nav2: null
      };
    }
  
    componentDidMount() {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2
      });
    }
  
    render() {
        const images=this.props.images;
        const baseUrl="https://storage.googleapis.com/bit-jaehoon/";
        const imageDiv=images.map(i=><div  key={i.id}><img src={baseUrl+i.name}></img></div>);
      return (
        <div>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            arrows={false}
            className="largeSlide"
          >
            {imageDiv}
          </Slider>
          <Slider
            centerPadding="0px"
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={9}
            infinite= {images.length > 9}
            swipeToSlide={true}
            focusOnSelect={true}
            centerMode={true}
            className="slick-thumb"
          >
           {imageDiv}
          </Slider>
        </div>
      );
    }
  }