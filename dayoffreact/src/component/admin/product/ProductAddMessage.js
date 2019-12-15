import React from 'react';

const ProductAddMessage= ({latestProduct,productCount})=>{
    let completeMessage=null;
    if(latestProduct)
     completeMessage=
            (<div>
                <img style={{width:"60px", height:"60px"}} src={latestProduct&&"https://storage.googleapis.com/my_test_bucket_01/"+latestProduct}></img>
            <span>{productCount}</span>
            </div>);
    
    return(
        <div className="completeMessage">

        {completeMessage}
        </div>
    );
}

export default ProductAddMessage;