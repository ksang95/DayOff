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
                 <div className="info"><h3>인공지능으로 똑똑하게!</h3>
          <br></br>
          SNS나 인터넷에서 봤던 옷들을 보다 쉽게 저희 쇼핑몰에서 찾을 수 있습니다.
          원하는 사진을 업로드 후 특정 부위를 잘라 검색할 수 있습니다. 
          <br></br>
          일치하는 상품이 없더라도 똑똑한 인공지능이 해당 제품의 카테고리를
          분석하여 같은 종류의 의류들을 추천해줍니다.
          </div>
                 <VisionMain result={this.state.result}></VisionMain>
            </div>
        );
    }
}

export default visionCrop;