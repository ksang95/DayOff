import React, { Component } from 'react';
import axios from 'axios';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '../common/css/crop.css'
import {Link} from 'react-router-dom';
import VisionList from './visionList'

class visionMain extends Component {
 state = {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
        list : null,
      };
     
     
      
  
      
      aaaa() {
        axios.post('/crop', {
          result : this.props.result
          
        })
        .then(response => { 
          console.log(response.data)
          this.setState({
            list : response.data.list,
            recommendlist : response.data.recommend
          })
        })
        .catch(error => {
            console.log(error.response)
        });
        
      }
    

    
    
    
      render() {
        console.log(this.state.result)
        const {result} = this.props;
        return (
         <div> 
         {result ? <div className="previewDiv">
         <img id="preview"width="400px" height="400px" alt="" src={this.props.result}></img>
          <div className="buttonDiv">
             <button className="buttonVision" onClick={() => window.location.reload(false)}>다시하기</button>
          <br></br>
          <button className="buttonVision" onClick={this.aaaa.bind(this)}>검색하기</button>
         
          
         
          
          </div>
          </div> : <div><br></br></div>}
          
          <VisionList recommendlist={this.state.recommendlist} list={this.state.list}></VisionList>
          
          </div>
         )

    }
}
export default visionMain;
