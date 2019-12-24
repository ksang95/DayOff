import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '../common/css/crop.css'
import VisionMain from './visionMain'

class visionCrop extends Component {
    state = {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
        list : null,
      };
     
     
      
      onChange = value => {
        this.setState(value);
      };



    render() {
        return (
            <div>
                 <h1>AI 상품 검색</h1>
           <hr width="97%"></hr>
           <br></br>
           <h1>인공지능을 통해 상품을 찾아보세요. </h1>
           <br></br><br></br>
                 <DropNCrop onChange={this.onChange} value={this.state} />
                 
                 <VisionMain result={this.state.result}></VisionMain>
            </div>
        );
    }
}

export default visionCrop;