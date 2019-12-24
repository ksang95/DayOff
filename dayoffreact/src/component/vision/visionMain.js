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
             <button onClick={() => window.location.reload(false)}>다시하기</button>
          <br></br>
          <button onClick={this.aaaa.bind(this)}>검색하기</button>
          <div className="info"><h3>인공지능으로 똑똑하게!</h3>
          <br></br>
          SNS나 인터넷에서 봤던 옷들을 보다 쉽게 저희 쇼핑몰에서 찾을 수 있습니다.
          원하는 사진을 업로드 후 특정 부위를 잘라 검색할 수 있습니다. <br>
          </br>
          일치하는 상품이 없더라도 똑똑한 인공지능이 해당 제품의 카테고리를
          분석하여 같은 종류의 의류들을 추천해줍니다.
          
          </div>
          
         
          
          </div>
          </div> : ''}
          
          <VisionList recommendlist={this.state.recommendlist} list={this.state.list}></VisionList>
          
          </div>
         )

    }
}
export default visionMain;
