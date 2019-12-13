import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {
    state = {
        product: {
            name: '',
            price: '',
            category: '',
            color: [],
            productSize: []
        },
        colors: [],
        categories: [],
        selectedColor: '',
        selectedSize: '',
        selectedCategory: ''
    }

    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name === "selectedCategory") {
            this.setState({
                product: {
                    ...this.state.product,
                    category: this.state.categories[e.target.value]
                }
            });
        }
    }
    handleChange = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value
            }
        });
    }

    handleAdd = (e) => {
        switch (e.target.name) {
            case "colorBtn":
                if (this.state.selectedColor !== -1) {
                    this.setState({
                        product: {
                            ...this.state.product,
                            color: this.state.product.color.concat(this.state.colors[this.state.selectedColor])
                        }
                    });
                }
                break;
            case "sizeBtn":
                if (this.state.selectedSize !== -1)
                    this.setState({
                        product: {
                            ...this.state.product,
                            productSize: this.state.product.productSize.concat({ size: this.state.selectedSize })
                        }
                    })
                break;
            default:
                break;
        }

    }

    handleClick = async () => {

        console.log(this.state.product);
        const response = await axios.post("/addProductProcess", this.state.product);
        console.log(this.state);
        this.setState({
            product: {
                name: '',
                price: '',
                category: '',
                color: [],
                productSize: []
            },
            selectedColor: '',
            selectedSize: '',
            selectedCategory: ''
        });
    }

    async getForm() {
        const response = await axios.get("/addProduct");
        const { color, category } = response.data;
        this.setState({
            colors: color,
            categories: category
        });
    }

    componentDidMount() {
        this.getForm();
    }

    render() {
        const { name, price, color, size, category } = this.state.product;
        const { colors, categories, selectedColor, selectedSize, selectedCategory } = this.state;
        const { handleChange, handleClick, handleAdd, handleSelect } = this;
        const colorsOp = colors.map((c, index) => (<option key={c.id} value={index}>{c.color}</option>));
        const categoriesOp = categories.map((c, index) => (<option key={c.id} value={index}>{c.subName}</option>));

        return (
            <div className="Form">
                <select name="selectedCategory" value={selectedCategory} onChange={handleSelect}>
                    <option value="-1">카테고리 선택</option>
                    {categoriesOp}
                </select><br></br>
                <input name="name" placeholder="name" value={name} onChange={handleChange} /><br></br>
                <input name="price" placeholder="price" value={price} onChange={handleChange} /><br></br>
                <select name="selectedColor" value={selectedColor} onChange={handleSelect}>
                    <option value="-1">색상 선택</option>
                    {colorsOp}
                </select>
                <button name="colorBtn" onClick={handleAdd}>추가</button>{}<br></br>
                <input name="selectedSize" placeholder="size" value={selectedSize} onChange={handleSelect} /><button name="sizeBtn" onClick={handleAdd}>추가</button>{}<br></br>

                <button onClick={handleClick}> 등록</button>
            </div>
        );
    };
}

export default ProductForm;