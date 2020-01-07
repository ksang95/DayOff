import React, { Component } from 'react';
import Cards from './Cards'
import './cards.css'
 class Display extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentCard: 0,
        position: 0,
        cardStyle: {
          transform: 'translateX(0px)'
        },
        width: 220,
      };
    }
  
    componentDidMount() {
    }
    
    // func: click the slider buttons
    handleClick(type) {
      // get the card's margin-right
      let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
      margin = JSON.parse(margin.replace(/px/i, '')); 
  
      const cardWidth = 244; // the card's width
      const cardMargin = margin; // the card's margin
      const cardNumber = (this.props.cookieList.length-6); // the number of cards
      let currentCard = this.state.currentCard; // the index of the current card
      let position = this.state.position; // the position of the cards
  
      // slide cards
      if(type === 'next' && currentCard < cardNumber-1) {
        currentCard++;
        position -= (cardWidth+cardMargin);
      } else if(type === 'prev' && currentCard > 0) {
        currentCard--;
        position += (cardWidth+cardMargin);
      }
      this.setCard(currentCard, position);
    }
    
    setCard(currentCard, position) {
      this.setState({
        currentCard: currentCard,
        position: position,
        cardStyle: {
          transform: `translateX(${position}px)`
        }
      })
    }
  
    render() {
      return (
        <div className="cards-slider">
          <div className="slider-btns">
            <button className="slider-btn btn-l" onClick={() => this.handleClick('prev')}>&lt;</button>
            <button className="slider-btn btn-r" onClick={() => this.handleClick('next')}>&gt;</button>
          </div>
          <Cards cardStyle={this.state.cardStyle} cookieList={this.props.cookieList} />
        </div>
      )
    }
  }
  export default Display;