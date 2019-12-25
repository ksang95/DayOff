import React, { Component } from 'react';
import XLSX from 'xlsx';

class ProductsFileForm extends Component {

    handleChange = (e) => {
        const file = e.target.files[0];
        let typeError = null;
        switch (file.name.substring(file.name.lastIndexOf("."))) {
            //case ".csv":
            case ".xlsx":
            case ".xls":
                this.xlsxToJson(file,this.props.addProduct)
                break;
            default:
                this.props.addProduct();
                typeError = '지원되는 파일 형식만 첨부 가능합니다.';
        }
        this.props.setTypeError(typeError);
    }

    xlsxToJson(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = reader.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetNameList = workbook.SheetNames; // 시트 이름 목록 가져오기 
            const firstSheetName = sheetNameList[0]; // 첫번째 시트명
            const firstSheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(firstSheet);
            const products=json.map(product=>{
                let sizes=product.size.split(";").filter(s=>s.length>0).map(s=>s.toUpperCase().trim()).reduce((prev,curr)=>{return prev.concat({size:curr})},[]);
                let colors=product.color.toString().split(";").filter(c=>c.length>0).map(c=>c.trim()).reduce((prev,curr)=>{return prev.concat({id:curr})},[]);
                let productImages=product.productImage.split(";").filter(i=>i.length>0).map(i=>i.trim()).reduce((prev,curr)=>{return prev.concat({originalName:curr})},[]);
                return {category: {id:product.category}, name:product.name, price:product.price, productSize:sizes, color:colors, detailImage:product.detailImage, productImage:productImages}
            })
            console.log(products);
            callback(products);
        };
        reader.readAsBinaryString(file);
    }


    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <div>{this.props.typeError}</div>
            </div>
        );
    }
}

export default ProductsFileForm;