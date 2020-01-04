import React, { Component } from 'react'
import './contents.css';
import ApiService from './ApiService';

export default class Content extends Component {
  state = {
    products: [],
    AdminProducts:[],
    value : '',
    selected:'',
    login: false,
    style: '',
    role:false
  }
 
  SearchProduct() {
    const keyword=this.props.keyword;
    if(keyword){
      ApiService.SearchProduct(keyword).then(res => {
          this.setState({products : res.data});
      })
    }
    else{
      console.log(this.state.selected);
      const category=this.props.category;
      if(category==='RED' || category==='BLACK' || category==='GRAY' || category==='BLUE' || category==='PINK' || category==='WHITE' || category==='GREEN'
      || category==='PURPLE' || category==='ORANGE' || category==='YELLOW'){
        ApiService.ColorProductList(category, this.state.selected).then(res => {
          this.setState({products : res.data})
        })
      }else if(category==='아우터' || category==='상의' || category==='셔츠_블라우스' || category==='팬츠' || category==='원피스' || category==='악세사리'){
        ApiService.MainCategoryList(category, this.state.selected).then(res=>{
          this.setState({products : res.data})
        });
      }else if(category==='BEST'){
        ApiService.MonthProductList().then(res=>{
          this.setState({products : res.data})
        });
      }else{
        ApiService.SubCategoryList(category,this.state.selected).then(res=>{
          this.setState({products :res.data})
        })
      }
    }
    
  }

   SearchAdminProduct() {
    const keyword=this.props.keyword;
    if(keyword){
      ApiService.SearchAdminProduct(keyword).then(res => {
          this.setState({AdminProducts : res.data});
      })
    }
    else{
      const category=this.props.category;
      if(category==='RED' || category==='BLACK' || category==='GRAY' || category==='BLUE' || category==='PINK' || category==='WHITE' || category==='GREEN'
      || category==='PURPLE' || category==='ORANGE' || category==='YELLOW'){
        ApiService.AdminColorProductList(category, this.state.selected).then(res => {
          this.setState({AdminProducts : res.data})
        })
      }else if(category==='아우터' || category==='상의' || category==='셔츠_블라우스' || category==='팬츠' || category==='원피스' || category==='악세사리'){
        ApiService.AdminMainCategoryList(category, this.state.selected).then(res=>{
          this.setState({AdminProducts : res.data})
        });
      }else if(category==='BEST'){
        ApiService.MonthProductList().then(res=>{
          this.setState({products : res.data})
        });
      }else{
        ApiService.AdminSubCategoryList(category, this.state.selected).then(res=>{
          this.setState({AdminProducts :res.data})
        })
      }
    }
    
  }

  componentDidMount() {
    this.SearchProduct();
    this.SearchAdminProduct();
    // sessionStorage.getItem("userRole")==="user"?this.SearchProduct():this.SearchAdminProduct();
    if(sessionStorage.getItem("userId")){
      this.setState({
        login:true
      })
    }
    else{
      this.setState({
        login:false
      })
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.keyword !== nextProps.keyword){
      this.SearchProduct(nextProps.keyword);
      this.SearchAdminProduct(nextProps.keyword);
      window.scrollTo(0, 0);
    } if(nextProps.category!==this.props.keyword){
      this.SearchProduct(nextProps.keyword);
      this.SearchAdminProduct(nextProps.keyword);
      window.history.go(0);
      window.scrollTo(0, 0);
    }
  }
  
  pStop=(e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
    if(e.target.value === '판매중지'){
      document.getElementById("product"+e.target.name).style.opacity = "0.3";
      ApiService.isAvailableDown(e.target.name);
  }
}

pStart=(e) => {
  this.setState({
    [e.target.name]:e.target.value
  })
  if(e.target.value === '판매시작'){
    document.getElementById("product"+e.target.name).style.opacity = "1.0";
    ApiService.isAvailableUp(e.target.name);
}
}

Change1=(e)=> {
  this.setState({
    selected:e.target.value
  },this.SearchProduct);
}

  Change=(e)=> {
    this.setState({
      selected:e.target.value
    },this.SearchAdminProduct);
    // sessionStorage.getItem("userRole")==="user"?this.SearchProduct():this.SearchAdminProduct();

    // switch(e.target.value){
    //   case 'Top':
    //           axios.get(`/productTop`).then(res => {
    //             const products =res.data;
    //             this.setState({ products });
    //           });
    //           break;      

    //   case 'Asc' :
    //       axios.get(`/productPriceAsc`).then(res => {
    //         const products =res.data;
    //         this.setState({ products });
    //       });
    //       break;

    //   case 'Desc' :
    //         axios.get(`/productPriceDesc`).then(res => {
    //           const products =res.data;
    //           this.setState({ products });
    //         });
    //         break;

    //   case 'Register' :
    //         axios.get(`/productRegister`).then(res => {
    //           const products =res.data;
    //           this.setState({ products });
    //         });
    //         break;

    //     default:
    //       break;
    // }
  }
  
    render() {
      if(this.state.login === false){
      // if(sessionStorage.getItem("userRole")==="user"){
        return (
          <div className="PContents">
          <div className='PDropButton'>
            <select value={this.state.selected} onChange={this.Change1.bind(this)}> 
            <option value='registerDate_desc'> 등록날짜순 </option>
            <option value='orderCount_desc'> 인기상품순 </option>
            <option value='price_desc'> 높은가격순 </option>
            <option value='price_asc'> 낮은가격순 </option>
            </select>
            </div>
        
        {this.state.products.length > 0 ? 
        <div className='PContentItem_box'>
        {this.state.products.map(product => {
          return (
          <div className='PContentItem'>
          <img src='https://newsimg.sedaily.com/2019/07/10/1VLN24F9YM_17.jpg' alt=''/>
          <p>{product.id}</p>
          <h4>{product.name}</h4>
          <br></br>
          <h2>{product.price}원</h2>
          </div>
          )
        })}

        </div> : <h1 className='nullImg'><img src='http://file3.instiz.net/data/file3/2019/11/06/9/7/c/97c015a880b59f53280159a08fc0d357.jpg'></img><br></br>일치하는 상품이 없습니다. 다시 검색해주세요!</h1>}
        </div>
        )
      } else {
            return (
              <div className="PContents">
                <div className='PDropButton'>
            <select value={this.state.selected} onChange={this.Change.bind(this)}> 
            <option value='registerDate_desc'> 등록날짜순 </option>
            <option value='orderCount_desc'> 인기상품순 </option>
            <option value='price_desc'> 높은가격순 </option>
            <option value='price_asc'> 낮은가격순 </option>
            </select>
            </div>
            {this.state.products.length > 0 ? 
              <div className='PContentItem_box'>
              {this.state.AdminProducts.map((product) => {
                if(product.isAvailable ===1){
                return (
                <div className='PContentItem' id={"product"+product.id}>
                <select className='PeditButton' name={product.id} value={this.name} onChange={this.pStop.bind(this)}>
                    <option value="목록">=</option>
                    <option value="판매중지">판매중지</option>       
                    <option value="상품수정">상품수정</option>
                </select>
                <img src='https://newsimg.sedaily.com/2019/07/10/1VLN24F9YM_17.jpg' alt=''/>
                <p>{product.id}</p>
                <h4>{product.name}</h4>
                <h2>{product.price}원</h2>
                </div>
                )} else {
                  return (
                    <div className='PContentItem' id={"product"+product.id} style={{opacity : "0.3"}}>
                    <select className='PeditButton' name={product.id} value={this.name} onChange={this.pStart.bind(this)}>
                        <option value="목록">=</option>
                        <option value="판매시작">판매시작</option>       
                        <option value="상품수정">상품수정</option>
                    </select>
                    <img src='https://newsimg.sedaily.com/2019/07/10/1VLN24F9YM_17.jpg' alt=''/>
                    <p>{product.id}</p>
                    <h4>{product.name}</h4>
                    <h2>{product.price}원</h2>
                    </div>
                    )} 
                 })}
              </div>  : <h1 className='nullImg'><img src='http://file3.instiz.net/data/file3/2019/11/06/9/7/c/97c015a880b59f53280159a08fc0d357.jpg'></img><br></br>일치하는 상품이 없습니다. 다시 검색해주세요!</h1>}
              </div>
)}}}