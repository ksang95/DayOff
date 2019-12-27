import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import axios from 'axios';
import './contact.css';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            contactData : []
        };

        this.handelChange = this.handelChange.bind(this);
    }

    test1() {axios.get(`/productList`)
        .then(res => {
            console.log(res)
        this.setState({contactData : res.data.result});
        })
    }
        
  componentWillMount() {
    this.test1();
    console.log(this.state.contactData)
  }

    handelChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }


    render() {
        console.log(this.state.contactData)
        let mapToConponents = null;
        if(this.state.contactData!==null){
         mapToConponents = (data) => {
            data.sort();
            data = data.filter(
                contact => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
                }
                )
                console.log(data)
            return data.map((contactData, i) => {
                return (<ContactInfo contactData={contactData} key={i}/>);
            });
        };
    }
        return (
            <div className= "search_box">
                <input className="search_input"
                name ="keyword"
                placeholder="  Search"
                value={this.state.keyword}
                onChange={this.handelChange}
                >
                </input>
                <button className="search_button"><img src='https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_960_720.png'></img></button>
                

                {/* <div>{mapToConponents(this.state.contactData)}</div> */}
            </div>
        );
    }
}

export default Contact;