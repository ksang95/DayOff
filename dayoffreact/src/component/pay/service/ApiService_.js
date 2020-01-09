import axios from 'axios';

const USER_API_BASE_URL = 'https://192.168.0.111:8443';
class ApiService_{

    fetchCarts() {
        return axios.get(USER_API_BASE_URL);
    }
    fetchUserLevel(userId) {
        return axios.get( USER_API_BASE_URL+'/payInfoList' + userId);
    }
    order(carts) {
        return axios.post(USER_API_BASE_URL+"/order",carts);
    }
    //  kakaopay(carts){
    //      return axios.post(USER_API_BASE_URL+"/kakaoPay",carts);
    //  }


    kakaopay(carts,deliever_,selectValue,checked,store_,service,discount,totalPay,emoney,useEmoney){
        var form={
            name: deliever_.name, location: deliever_.location, postalcode: deliever_.postalCode, phone: deliever_.phone,cartview:carts,
            checkedstore:store_,
            checkeddeliver:checked,
            store:selectValue,
            service:service,
            discount:discount,
            totalPay:totalPay,
            emoney:emoney,
            useEmoney:useEmoney
           // id: "123", name: "123", testTags: [{id: "1111", tag: "2222"},{id: "1111", tag: "2222"}]

        }
        // var form={
        //     delievertrans:deliever_, cartview:carts
        //    // id: "123", name: "123", testTags: [{id: "1111", tag: "2222"},{id: "1111", tag: "2222"}]

        // }
        // const params=new URLSearchParams();
        // params.append('a',form);
        // carts.forEach(element => {
        //     params.append('cartview',element);
        // });

        // return axios({
        //     method:"post",
        //     url:"/kakaoPay",
        //     data : JSON.stringify(params),
        //     dataType   : 'json'
        // ,
        //     contentType: 'application/json'
        // })
         return axios.post(USER_API_BASE_URL+"/kakaoPay",form);
    }


    kakaopaySuccess(){
        console.log("aaaaaaaaaaaaaa");
        return axios.get("/kakaoPaySuccess");
    }
   


}

export default new ApiService_();