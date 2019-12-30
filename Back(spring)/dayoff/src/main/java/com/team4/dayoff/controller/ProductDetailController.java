package com.team4.dayoff.controller;



import com.team4.dayoff.entity.Product;
import com.team4.dayoff.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductDetailController{

    @Autowired
   private ProductRepository productRepository;



    @PostMapping("/showProductDetail")
    public Product showProductDetail(@RequestParam("id") Integer id){
        Product product = productRepository.findById(id).get();
            
        System.out.println(product);
        return product ;
    }
   
    
}

  
