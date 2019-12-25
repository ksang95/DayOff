import axios from 'axios';
import React, { Component } from 'react';
import ProductImageForm from './ProductImageForm';
import ProductsFileForm from './ProductsFileForm';

class SeveralProductForm extends Component {
    state = {
        products: [],
        error: '',
        post: false,
        selectedProductImage: [],
        typeError: ''
    }

    handleProductAdd = (products) => {
        this.setState({
            products: products
        })
    }

    setTypeError = (typeError) => {
        this.setState({
            typeError: typeError
        })
    }

    handleClick = async () => {
        let flag = true;

        if (this.state.selectedProductImage.length === 0 || this.state.products.length === 0) {
            flag = false;
        }
        if (flag) {

            let params = new FormData();
            params.append('json', JSON.stringify(this.state.products));
            const file = this.state.selectedProductImage;

            file.forEach((f) => {
                params.append('file', f);
            })
            await axios({
                method: 'post',
                url: '/addSeveralProductProcess',
                data: params
            }).then(success => {
                const data = success.data;
                this.props.createMessage({
                    latestProduct: data.latestProduct.name,
                    productCount: data.productCount
                });
            }).catch(
                error => console.log(error)
            );
            this.setState({
                products: [],
                error: '',
                post: true,
                selectedProductImage: [],
                typeError: ''
            });
        } else {
            this.setState({
                error: '모든 항목을 입력해주세요.'
            });
        }
    }

    handleFileAdd = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].concat(file),
            typeError: '',
            error: '',
            post: false
        });
    };

    handleFileRemove = (file, stateKey) => {
        this.setState({
            [stateKey]: this.state[stateKey].filter(f => f.name !== file.name)
        });
    }

    render() {
        const { error, post, typeError } = this.state;
        const { handleClick, handleProductAdd, handleFileAdd, handleFileRemove, setTypeError } = this;
        return (
            <div className="Form">
                <ProductsFileForm addProduct={handleProductAdd} typeError={typeError} setTypeError={setTypeError}></ProductsFileForm>
                <ProductImageForm onAdd={handleFileAdd} onRemove={handleFileRemove} post={post} stateKey="selectedProductImage" name="상품 이미지"></ProductImageForm>
                <div>{error}</div>
                <button onClick={handleClick}> 등록</button>
            </div>
        );
    };
}

export default SeveralProductForm;