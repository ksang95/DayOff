import React from 'react';
import './Review.css';
import BeautyStars from 'beauty-stars';
import SlideToggle from 'react-slide-toggle';
const Review = props => (
    <SlideToggle
      collapsed
      onExpanding={() => {
        const item = document
          .getElementsByClassName("ProductSlideToggle toggle_EXPANDED")
          .item(0);
        if (item) item.click();
      }}
      render={({ toggle, setCollapsibleElement, toggleState }) => (
      <React.Fragment>
          <tr
            className={
              "my-collapsible__toggle SeveralProductSlideToggle toggle_" +
              toggleState
            }
            onClick={toggle}
          >
       
       
            {/* <div className="title1"> */}
          <td>{props.id}</td>
          <td>{props.title}</td>
           <td>{props.user}</td> 
           <td>{props.date}</td> 
           <td className="stars"><BeautyStars
          value={props.rating}
          size={"15px"}
          inactiveColor={"gray"}
          
         
        /></td> 
              {/* <span className="toggleBtn" >&or;</span> */}
            {/* </div> */}
          </tr>
          <tr className="reviewContent" ref={setCollapsibleElement}>
            <td colSpan={5} className="inners">
              <div style={{"textAlign":"left"}}>
           <span style={{"padding-left":"20px"}}>키:{props.height}</span> 
           <span style={{"padding-left":"20px"}}>몸무게:{props.weight}</span> 
           </div>
            <article className="content">{props.content}</article>
            </td>
          </tr>
        </React.Fragment>
      )}
    />
    /* <Accordion atomic={true}>
      <AccordionItem title={props.title}>
        {props.user}
        {props.date}
        <BeautyStars
          value={props.rating}
          size={"20px"}
          inactiveColor={"gray"}
        />
        {props.content}
        {props.height}
        {props.weight}
      </AccordionItem>
    </Accordion> */
);
export default Review;