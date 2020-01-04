import React, { Component } from 'react';
import './productNav.css';
import { NavLink } from 'react-router-dom';
import ApiService from '../../main/ApiService';


class ProductNav extends Component {
    state = {
      category:'',
        categorySub:[],
        categoryName:[]
      }

      //   ApiService.CategoryList(keyword).then(res => {
      //     console.log(res);
      //     console.log(keyword);
      //     this.setState({keyword : res.data[0].name})
      //     this.setState({category : res.data});
      //       // ApiService.KeywordSubNameCategory(keyword).then(res => {
      //       //   this.setState({categorySubName :res.data});
      //       // })
      // })

    ClickCategory() {
      const category=this.state.category;
      if(category !=='BEST' && category !=='아우터' && category !=='상의' && category !=='셔츠_블라우스' && category !=='팬츠' && category !=='원피스' && category !=='악세사리'){
      ApiService.CategorySubList(category).then(res =>{
        this.setState({categorySub : res.data});
      });
    } else {
      ApiService.CategoryNameList(category).then(res =>{
        this.setState({categoryName : res.data});
      });
    }
  }

      componentDidMount() {
        this.setState({category : this.props.category},this.ClickCategory);
      }

      componentWillReceiveProps(nextProps){
        if(nextProps.category!==this.props.category){
          this.setState({category : nextProps.category},this.ClickCategory);
        }
      }

      shouldComponentUpdate(nextProps, nextState){
        return true;
      }

    render() {
      if(!this.state.category){
        return ( <div className='ProductNav'>
        <div className='Product_NavTitle'>
          <h3> 검색: {this.props.keyword} </h3>
            </div>
        </div>)
      }
      else if(this.state.category !=='BEST' && this.state.category !=='아우터' && this.state.category !=='상의' && this.state.category !=='셔츠_블라우스' && this.state.category !=='팬츠' && this.state.category !=='원피스' && this.state.category !=='악세사리'){
        return (
            <div className='ProductNav'>
            <div className='Product_NavTitle'>
              <h3>{this.state.categorySub.length>0&&this.state.categorySub[0].name}</h3>
            </div>
            <br></br>
            <div className='Product_NavCategory'>
            <br></br>
            { this.state.categorySub.map(categorySubs => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categorySubs.subName}>{categorySubs.subName}<br></br><br></br></NavLink></div>)}
            </div>
            <div className='NavColor'>
            <h3>Color</h3>
            <NavLink to={"/productList/category/RED"}><button className='NavColor1' value='RED'/></NavLink>
            <NavLink to={"/productList/category/BLACK"}><button className='NavColor2' value='BLACK'/></NavLink>
            <NavLink to={"/productList/category/GRAY"}><button className='NavColor3' value='GRAY'/></NavLink><br></br>
            <NavLink to={"/productList/category/BLUE"}><button className='NavColor4' value='BLUE'/></NavLink>
            <NavLink to={"/productList/category/PINK"}><button className='NavColor5' vale='PINK'/></NavLink>
            <NavLink to={"/productList/category/WHITE"}><button className='NavColor6' vale='WHITE'/></NavLink><br></br>
            <NavLink to={"/productList/category/GREEN"}><button className='NavColor7' value='GREEN'/></NavLink>
            <NavLink to={"/productList/category/PURPLE"}><button className='NavColor8' value='PURPLE'/></NavLink>
            <NavLink to={"/productList/category/ORANGE"}><button className='NavColor9' value='ORANGE'/></NavLink><br></br>
            <NavLink to={"/productList/category/YELLOW"}><button className='NavColor10' value='YELLOW'/></NavLink>
            </div>
            </div>
        );
        } else {
      return (
        <div className='ProductNav'>
        <div className='Product_NavTitle'>
        <h3>{this.state.category}</h3>
        </div>
        <br></br>
        <div className='Product_NavCategory'>
        <br></br>
        { this.state.categoryName.map(categoryNames => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productList/category/"+categoryNames.subName}>{categoryNames.subName}<br></br><br></br></NavLink></div>)}
        </div>
        <div className='NavColor'>
        <h3>Color</h3>
        <NavLink to={"/productList/category/RED"}><button className='NavColor1' value='RED'/></NavLink>
        <NavLink to={"/productList/category/BLACK"}><button className='NavColor2' value='BLACK'/></NavLink>
        <NavLink to={"/productList/category/GRAY"}><button className='NavColor3' value='GRAY'/></NavLink><br></br>
        <NavLink to={"/productList/category/BLUE"}><button className='NavColor4' value='BLUE'/></NavLink>
        <NavLink to={"/productList/category/PINK"}><button className='NavColor5' vale='PINK'/></NavLink>
        <NavLink to={"/productList/category/WHITE"}><button className='NavColor6' vale='WHITE'/></NavLink><br></br>
        <NavLink to={"/productList/category/GREEN"}><button className='NavColor7' value='GREEN'/></NavLink>
        <NavLink to={"/productList/category/PURPLE"}><button className='NavColor8' value='PURPLE'/></NavLink>
        <NavLink to={"/productList/category/ORANGE"}><button className='NavColor9' value='ORANGE'/></NavLink><br></br>
        <NavLink to={"/productList/category/YELLOW"}><button className='NavColor10' value='YELLOW'/></NavLink>
        </div>
        </div>
    );
} 
    }
  }

export default ProductNav;