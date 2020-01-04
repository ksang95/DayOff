import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./mySlick.css";


class CenterMode2 extends Component {
  render() {
    const images=this.props.images;
    const baseUrl="https://storage.googleapis.com/bit-jaehoon/";
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img  src={baseUrl+images[i].name} />
          </a>
        );
      },
      className: "largeSlide",
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const imageDiv=images.map(i=><div key={i.id}><img src={baseUrl+i.name}></img></div>)
    return (
      <div>
        <h2>Custom Paging</h2>
        <Slider {...settings}>
          {imageDiv}
        </Slider>
      </div>
    );
  }
}


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