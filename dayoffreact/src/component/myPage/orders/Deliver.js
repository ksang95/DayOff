import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Deliver extends Component {
    openPopup(url){
        window.open(url,"name","width=700px, height=500px, left=500px ,top=200px")
      }
    render() {
        const delivery = "https://tracker.delivery/#/kr.epost/"
        return (
            <div>
                <Button variant="secondary" onClick={()=>this.openPopup.bind(this)(delivery+this.props.invoice)}>배송조회</Button>
            </div>
        );
    }
}

export default Deliver;