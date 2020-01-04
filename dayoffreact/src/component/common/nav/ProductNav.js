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

    ClickCategory(category) {
      this.setState({category : this.props.category});
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
        this.ClickCategory(this.props.category);
      }

    

      shouldComponentUpdate(nextProps, nextState){
        return true;
      }

    render() {
      if(this.state.category !=='BEST' && this.state.category !=='아우터' && this.state.category !=='상의' && this.state.category !=='셔츠_블라우스' && this.state.category !=='팬츠' && this.state.category !=='원피스' && this.state.category !=='악세사리'){
        return (
            <div className='ProductNav'>
            <div className='Product_NavTitle'>
              <h3> Women / {this.state.category} <br>
              </br> Women Category</h3>
            </div>
            <br></br>
            <div className='Product_NavCategory'>
            <br></br>
            { this.state.categorySub.map(categorySubs => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productListPage/"+categorySubs.subName}>{categorySubs.subName}<br></br><br></br></NavLink></div>)}
            </div>
            <div className='NavColor'>
            <h3>Color</h3>
            <NavLink to={"/productListPage/RED"}><button className='NavColor1' value='RED'/></NavLink>
            <NavLink to={"/productListPage/BLACK"}><button className='NavColor2' value='BLACK'/></NavLink>
            <NavLink to={"/productListPage/GRAY"}><button className='NavColor3' value='GRAY'/></NavLink><br></br>
            <NavLink to={"/productListPage/BLUE"}><button className='NavColor4' value='BLUE'/></NavLink>
            <NavLink to={"/productListPage/PINK"}><button className='NavColor5' vale='PINK'/></NavLink>
            <NavLink to={"/productListPage/WHITE"}><button className='NavColor6' vale='WHITE'/></NavLink><br></br>
            <NavLink to={"/productListPage/GREEN"}><button className='NavColor7' value='GREEN'/></NavLink>
            <NavLink to={"/productListPage/PURPLE"}><button className='NavColor8' value='PURPLE'/></NavLink>
            <NavLink to={"/productListPage/ORANGE"}><button className='NavColor9' value='ORANGE'/></NavLink><br></br>
            <NavLink to={"/productListPage/YELLOW"}><button className='NavColor10' value='YELLOW'/></NavLink>
            </div>
            </div>
        );
        } else {
      return (
        <div className='ProductNav'>
        <div className='Product_NavTitle'>
          <h3> Women / {this.state.category} <br>
          </br> Women Category</h3>
        </div>
        <br></br>
        <div className='Product_NavCategory'>
        <br></br>
        { this.state.categoryName.map(categoryNames => <div className='NavCate'><NavLink activeStyle={{fontWeight:'bold'}} className="Nava" to={"/productListPage/"+categoryNames.subName}>{categoryNames.subName}<br></br><br></br></NavLink></div>)}
        </div>
        <div className='NavColor'>
        <h3>Color</h3>
        <NavLink to={"/productListPage/RED"}><button className='NavColor1' value='RED'/></NavLink>
        <NavLink to={"/productListPage/BLACK"}><button className='NavColor2' value='BLACK'/></NavLink>
        <NavLink to={"/productListPage/GRAY"}><button className='NavColor3' value='GRAY'/></NavLink><br></br>
        <NavLink to={"/productListPage/BLUE"}><button className='NavColor4' value='BLUE'/></NavLink>
        <NavLink to={"/productListPage/PINK"}><button className='NavColor5' vale='PINK'/></NavLink>
        <NavLink to={"/productListPage/WHITE"}><button className='NavColor6' vale='WHITE'/></NavLink><br></br>
        <NavLink to={"/productListPage/GREEN"}><button className='NavColor7' value='GREEN'/></NavLink>
        <NavLink to={"/productListPage/PURPLE"}><button className='NavColor8' value='PURPLE'/></NavLink>
        <NavLink to={"/productListPage/ORANGE"}><button className='NavColor9' value='ORANGE'/></NavLink><br></br>
        <NavLink to={"/productListPage/YELLOW"}><button className='NavColor10' value='YELLOW'/></NavLink>
        </div>
        </div>
    );
} 
    }
  }

export default ProductNav;