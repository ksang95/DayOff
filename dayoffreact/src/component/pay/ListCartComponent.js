import React, { Component } from 'react'
import ApiService_ from "../pay/service/ApiService_";
import InputMask from 'react-input-mask';


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
            total:""
            
        
            
        }
        

        
  
        this.reloadCartList = this.reloadCartList.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
   
    componentDidMount() {
        this.reloadCartList();        
    }
  
      
  
   
    reloadCartList() {
       
        // ApiService_.fetchCartById(sessionStorage.getItem("userId"))
        //     .then((res) => {
        //         console.log(res.data)
        //         this.setState({carts: res.data})
        //         let sum=0;
        //         for (let i = 0; i < res.data.length; i++)
        //          {sum += res.data[i].totalPrice;}
        //           this.setState({total:sum});
        //           console.log(res.data)
        //           console.log(sum)
                  

        //     });
    let cartlist=this.props.location.state.cartList
        this.setState({carts:this.props.location.state.cartList});
        let sum=0;
        for (let i = 0; i < cartlist.length; i++)
                {
                      sum += cartlist[i].totalPrice;
                }
            this.setState({total:sum});
            console.log(cartlist)
              console.log(sum)

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
        

      ApiService_.kakaopay(this.state.carts, deliever_,this.state.selectValue,this.state.checked,this.state.store,this.state.service).then((res)=>{
          this.props.history.push(res.data)
          window.location.assign(res.data);
      });
      
  }

    render() {      
 
  
        return (
     
         
                <div>
                    <h2>{this.state.selectValue}</h2>
                <h2 className="text-center">Cart Details</h2>
                <table className="table table-striped">
                <thead>
                        <tr>
                            <th>id</th>
                            <th>color</th>
                            <th>size</th>
                            <th>quantity</th>
                            <th>totalPrice</th>
                            <th>userId</th>
                            <th>productId</th>
                            <th>name</th>
                            <th>price</th>
                            <th>productThumbnailName</th>
                        </tr>
                    </thead>
                     
                    <tbody>
                  {  this.state.carts.map(
            cart =>
                        <tr key={cart.id}>
                            <td>{cart.id}</td>
                            <td>{cart.color}</td>
                            <td>{cart.size}</td>
                            <td>{cart.quantity}</td>
                            <td>{cart.totalPrice}</td>
                            <td>{cart.userId}</td>
                            <td>{cart.productId}</td>
                            <td>{cart.name}</td>
                            <td>{cart.price}</td>
                            <td>{cart.productThumbnailName}</td>
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
    <h3>총주문금액{this.state.total}</h3>
                <form>
  <input type="radio" name="service" value="1" onChange={this.onChange} />배송서비스
  <input type="radio" name="service" value="0"  onChange={this.onChange}/>매장픽업서비스
</form>
                <h2>aa{this.state.service}</h2>
                

                <h2 className="text-center">배송지 입력</h2>
                <form>

                    <div className="form-group">
                        <label>name:</label>
                        <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>location:</label>
                        <input placeholder="location" name="location" className="form-control" value={this.state.location} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>postalCode:</label>
                        <input placeholder="postalCode" name="postalCode" className="form-control" value={this.state.postalCode} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>phone</label>
                        <InputMask mask="999-9999-9999" maskChar={null}  name="phone" className="form-control" value={this.state.phone} onChange={this.onChange}/>
                    </div>


                </form>
                <div>
            <h2>매장픽업</h2>
            <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="배송">매장선택</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          
                <button className="btn btn-success" onClick={this.start2Kakaopay}> 결제하기</button>
                
          </div>
          
        );
    }

}

export default ListCartComponent;