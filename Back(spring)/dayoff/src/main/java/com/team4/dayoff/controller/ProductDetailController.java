package com.team4.dayoff.controller;



import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.team4.dayoff.entity.Product;
import com.team4.dayoff.entity.ProductList;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.RecommendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class ProductDetailController{

    @Autowired
   private ProductRepository productRepository;

   @Autowired
   private RecommendRepository recommendRepository;



    @PostMapping("/showProductDetail")
    public Product showProductDetail(@RequestParam("id") String id,HttpServletResponse response){
        Product product = productRepository.findById(Integer.parseInt(id)).get();
            
        System.out.println(product);

        Cookie cookie = new Cookie("product$"+id, id);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*24*7);
        System.out.println(cookie.getValue()+"22222222222222222222");
        response.addCookie(cookie);

        return product ;
    }
    @GetMapping("/showcookie")
    public List<RecommendByCategory> showcookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        List<RecommendByCategory> list = new ArrayList<>();
        System.out.println(1234);
        for(Cookie data : cookies){
            System.out.println(data.getValue());
            if(data.getName().contains("product$")){
                // int index = data.getValue().indexOf("$");
                // String value = data.getValue().substring(index);
                // int result = Integer.parseInt(value);

            System.out.println(recommendRepository.findByProductId(Integer.parseInt(data.getValue()))+"aaaaaaaaaaaaa");
            if(recommendRepository.findByProductId(Integer.parseInt(data.getValue()))!=null){
            list.add(recommendRepository.findByProductId(Integer.parseInt(data.getValue())));
            }
        }
        }
        System.out.println("======================================");
        System.out.println(list);
        System.out.println("======================================");
        return list;
    }
    @PostMapping("/togetherBuy")
    public List<ProductList> togetherBuy(@RequestParam("id") Integer id){
        List<ProductList> list = new ArrayList<>();
        ProductList productList = new ProductList();
        productRepository.togetherBuy(id).forEach(i->{
            productList.setProductId((Integer)i[0]);
            productList.setPrice((Integer)i[1]);
            productList.setProductName((String)i[2]);
            productList.setProductThumbnailName((String)i[3]);
            list.add(productList);
        });
        System.out.println(list+"222222222222333333333333333333333");
        return list;

    }
    
}

  
