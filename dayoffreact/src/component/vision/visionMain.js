import React, { Component } from 'react';
import axios from 'axios';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '../common/css/crop.css'
import {Link} from 'react-router-dom';
import VisionList from './visionList'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class visionMain extends Component {
 state = {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
        list : null,
      };
     
     
      
  
      
     
    

    
    
    
      render() {
        console.log(this.state.result)
        const {result} = this.props;
        return (
         <div> 
        
          
          s
          
          </div>
         )

    }
}
export default visionMain;
