import React, { Component } from 'react'
import ApiService_ from "../pay/service/ApiService_";
import InputMask from 'react-input-mask';
import DaumPostcode from 'react-daum-postcode';
import Popup  from 'reactjs-popup'

const contentStyle = {
    maxWidth: "600px",
    width: "90%"
  };
class ListCartComponent extends Component {
    

    constructor(props) {
        super(props)
        this.state = {
            carts: [],
            message: null,
            url: null,
            name: '',
            location: '',
            postalCode: '',
            phone: '',
            userId: '',
            selectValue: "",
            checked:false,
            checked_:false,
            service:"",
            total:"",
    grade:"",
     user:[],
     totalPay:"",
     discount:"",
     showPopup: false,
     location2:""
            
        }
        
        this.reloadCartList = this.reloadCartList.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    

    componentDidMount() {
        this.reloadCartList();        
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }  

    handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let postcode=data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState({location:data.address});
        this.setState({postalCode:data.postcode})

        console.log(postcode+"  "+fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        this.togglePopup();
   

      }
    
  
      
  
   
    reloadCartList() {

        ApiService_.fetchUserLevel(sessionStorage.getItem("userId"))
            .then((res) => {
               // console.log(res.data)
                
                this.setState({user: res.data})
                console.log(res.data.grade.level)
                this.setState({grade:res.data.grade.level})
                console.log(this.state.grade);
            console.log("ewrwrd"+this.state.grade);
    let cartlist=this.props.location.state.cartList
        this.setState({carts:this.props.location.state.cartList});
        let sum=0;
        let u =10;
        for (let i = 0; i < cartlist.length; i++)
                {
                      sum += cartlist[i].totalPrice;
                }
        let s=Math.round(Math.ceil(sum)/10)*10;
            this.setState({total:s});
            let discountprice=0;
            console.log("aaaaaaaaa");
            console.log("bb"+this.state.grade);
            if(this.state.grade=='브론즈'){
                console.log("bbbbbb")
                discountprice=Math.ceil(sum*0.95);
                console.log(discountprice)
            
            }
            if(this.state.grade=='실버'){
                discountprice=Math.ceil(sum*0.9);
                
            }
            if(this.state.grade=='골드'){
                discountprice=Math.ceil(sum*0.85);
            }
            if(this.state.grade=='플레티넘'){
                discountprice=Math.ceil(sum*0.8);
            }
            this.setState({totalPay:Math.round(Math.ceil(discountprice)/10)*10})
            let d=this.state.total-this.state.totalPay;
            this.setState({discount:d})
            console.log(cartlist)
              console.log(sum)
            });

    }
    handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
        
      }

    // startOrder=(e)=>{
    //     ApiService_.order(this.state.carts).then(res=>{
    //         this.props.history.push('/order');
    //     });
    // }
    // startKakaopay=(e)=>{
    //     ApiService_.kakaopay().then(res=>{
    //         this.props.history.push('/kakaoPay');
    //     });
    // }

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

    //   start2Kakaopay=(e)=>{
    //       let params = new URLSearchParams();
    //       params.append('a',this.state.name);
    //       let deliever_ = {name: this.state.name, location: this.state.location, postalCode: this.state.postalCode, phone: this.state.phone};
    //       this.setState({deliever:deliever_})
 
    //     ApiService_.kakaopay(this.state.carts).then((res)=>{
    //         this.props.history.push(res.data)
    //         window.location.assign(res.data);
    //     });
    // }
     handleChanged = (e) => {
         const { target: { checked } } = e;
         this.setState({ checked });
         console.log(checked)
 
       };
       handleChange = (e) => {
         const { target: {checked_} } = e;
         this.setState({ checked_ });
         console.log(checked_)
 
       };
    
    start2Kakaopay=(e)=>{
        // let params = new URLSearchParams();
        // params.append('name',this.state.name);
        // params.append('location',this.state.location);
        // params.append('postalCode',this.state.postalCode);
        // params.append('phone',this.state.phone);
        // params.append('carts',this.state.carts)

        let deliever_ = {name: this.state.name, location: this.state.location, postalCode: this.state.postalCode, phone: this.state.phone};
        

      ApiService_.kakaopay(this.state.carts, deliever_,this.state.selectValue,this.state.checked,this.state.store,this.state.service,this.state.discount,this.state.totalPay).then((res)=>{
          this.props.history.push(res.data)
          window.location.assign(res.data);
      });
      
  }
 
    render() {      
 
  
        return (
     
         
                <div>
                    <h2>{this.state.selectValue}</h2>
                <h2 >Cart Details</h2>
                <table className="n-table" >
                <colgroup>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
             <col style={{ width: +10 + "%" }}></col>
           </colgroup>
                <thead>
                        <tr>
                            <th>productThumbnailName</th>
                            <th>color</th>
                            <th>size</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>totalPrice</th>
                            {/* <th>id</th>
                            <th>userId</th>
                            <th>productId</th>
                            <th>name</th> */}
                        </tr>
                    </thead>
                     
                    <tbody>
                  {  this.state.carts.map(
            cart =>
                        <tr key={cart.id}>
                            <img height="100px"width="100px" src={cart.productThumbnailName} alt="image"></img>
                            <td>{cart.color}</td>
                            <td>{cart.size}</td>
                            <td>{cart.quantity}</td>
                            <td>{cart.price}</td>
                            <td>{cart.totalPrice}</td>
                            {/* <td>{cart.id}</td>
                            <td>{cart.userId}</td>
                            <td>{cart.productId}</td>
                            <td>{cart.name}</td> */}
                        </tr>
                            
                )
        }
                    </tbody> 
                    {/* <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>id</th>
                            <th>productId</th>
                            <th>color</th>
                            <th>size</th>
                            <th>quantity</th>
                            <th>cartDate</th>
                            <th>price</th>
                            <th>userId</th>
                        </tr>
                    </thead>
                     
                    <tbody>
                  {  this.state.carts.map(
            cart =>
                        <tr key={cart.id}>
                            <td>{cart.productId}</td>
                            <td>{cart.color}</td>
                            <td>{cart.size}</td>
                            <td>{cart.quantity}</td>
                            <td>{cart.cartDate}</td>
                            <td>{cart.price}</td>
                            <td>{cart.userId}</td>
                        </tr>
                )
        }
                    </tbody>  */}
                </table>
    <h3>총주문금액{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
    <h3>할인금액{this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
    <h3>결제금액{this.state.totalPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
   

  



    {/* <Popup trigger={<button> 우편번호</button>} position="right center">
<DaumPostcode
        onComplete={this.handleAddress}
/> 

: null  
} 
  </Popup> */}
 {/* <div>
     <button onClick={this.togglePopup.bind(this)}> 우편번호</button>  
 {this.state.showPopup ?  
 <DaumPostcode
         onComplete={this.handleAddress}
 /> 

 : null  
 }  </div>  */}
  
        
    
<form>
  <input type="radio" name="service" value="1" onChange={this.onChange} />배송서비스
  <input type="radio" name="service" value="0"  onChange={this.onChange}/>매장픽업서비스
</form>
                <h2>aa{this.state.service}</h2>
                

                <h2 className="text-center">배송지 입력</h2>
                

                    <div >
                        <label>name:</label>
                        <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>postalCode:</label>
                        <input placeholder="postalCode" name="postalCode" className="form-control" value={this.state.postalCode} onChange={this.onChange}/>
                    </div>
                    <div>
     <button onClick={this.togglePopup.bind(this)}> 우편번호</button>  
 {this.state.showPopup ?  
 <DaumPostcode
         onComplete={this.handleAddress}
 /> 

 : null  
 }  </div> 
                    {/* <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
       <DaumPostcode
         onComplete={this.handleAddress}
 /> 
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup> */}

                    <div >
                        <label>location:</label>
                        <input placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.onChange}/>
                    </div>
                    <div >
                        <label>상세주소:</label>
                        <input placeholder="location" name="location2" className="form-control" value={this.state.location2} onChange={this.onChange}/>
                    </div>
  
                    <div >
                        <label>phone</label>
                        <InputMask mask="999-9999-9999" maskChar={null}  name="phone" className="form-control" value={this.state.phone} onChange={this.onChange}/>
                    </div>


          
                <div>
            <h2>매장픽업</h2>
            <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="배송">매장선택</option>
              <option value="강남점">강남점</option>
              <option value="역삼점">역삼점</option>
              <option value="선릉점">선릉점</option>
            </select>
          </div>

          
                <button className="btn btn-success" onClick={this.start2Kakaopay}> 결제하기</button>
                
          </div>
          
        );
    }

}

export default ListCartComponent;