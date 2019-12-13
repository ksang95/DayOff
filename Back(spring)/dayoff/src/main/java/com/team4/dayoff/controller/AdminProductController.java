package com.team4.dayoff.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.team4.dayoff.entity.Category;
import com.team4.dayoff.entity.Color;
import com.team4.dayoff.entity.Product;
import com.team4.dayoff.entity.ProductSize;
import com.team4.dayoff.repository.CategoryRepository;
import com.team4.dayoff.repository.ColorRepository;
import com.team4.dayoff.repository.ProductImageRepository;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.ProductSizeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminProductController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductImageRepository productImageRepository;

    @RequestMapping("/addProduct")
    public Map<String,Object> addProduct(){
        Map<String,Object> map=new HashMap<String,Object>();
        List<Color> color=colorRepository.findAll();
        List<Category> category=categoryRepository.findAll();
        map.put("color", color);
        map.put("category", category);
        return map;
    }

    @PostMapping("/addProductProcess")
    public void addProductProcess(@RequestBody Product product){
        //System.out.println(product);
        Product product2=productRepository.save(product);
        List<ProductSize> productSizes=product.getProductSize();
        productSizes.forEach(i->{i.setProduct(product);});
        productSizeRepository.saveAll(productSizes);
        //System.out.println(product2); //기존 product에 id만 들어감(그 외 default값 제대로 저장은 됨)
    }

    @GetMapping("/getProduct")
    public Product getProduct(Integer id){
        Product product=productRepository.findById(id).get();
        return product;
    }

    @PostMapping("/deleteProduct")
    public void deleteProduct(@RequestParam("id") Integer id){
        //productRepository.deleteById(id); //실제 delete 잘 작동한다
        System.out.println(1);
        productRepository.disableProduct(id); //상품 이용불가로.
        System.out.println(2);
    }

    
}