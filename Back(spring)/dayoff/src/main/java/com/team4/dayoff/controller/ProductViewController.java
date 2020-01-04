package com.team4.dayoff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.team4.dayoff.entity.Category;
import com.team4.dayoff.entity.ProductView;
import com.team4.dayoff.repository.CategoryRepository;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.ProductViewRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;

@RestController
public class ProductViewController {

    @Autowired
	ProductViewRepository productRepository;
    
    @Autowired
    CategoryRepository categoryRepository;
    
//    @GetMapping("/productList")
//    public List<ProductView> productList(){
//    	System.out.println();
//    	return productRepository.findAll();
//    }
//    
//    @GetMapping("/productTop")
//    public List<ProductView> productTop(){
//    	return productRepository.TopproductList();
//    }
//	
//	@GetMapping("/productPriceAsc")
//	public List<ProductView> ascproductList(){
//		return productRepository.AscpriceList();
//	}
//	
//	@GetMapping("/productPriceDesc")
//	public List<ProductView> descproductList(){
//		return productRepository.DescpriceList();
//	}
//	
	@GetMapping("/productRegister")
	public List<ProductView> productRegisterList(){
		return productRepository.RegisterList();
	}
	
	@GetMapping("/MonthProductList")
	public List<ProductView> MonthProductList(){
		return productRepository.MonthProductList();
	}
	
//	
	@GetMapping("/MainCategory/{name}")
	public List<ProductView> MainCategory(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println(pageable);
		System.out.println(productRepository.MainCategory(name,pageable));
		return productRepository.MainCategory(name,pageable);
	}
	
	@GetMapping("/SubCategory/{name}")
	public List<ProductView> SubCateogry(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.SubCategory(name,pageable);
	}
	
	@GetMapping("/AdminMainCategory/{name}")
	public List<ProductView> AdminMainCategory(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		System.out.println(pageable);
		return productRepository.AdminMainCategory(name,pageable);
	}
	
	@GetMapping("/AdminSubCategory/{name}")
	public List<ProductView> AdminSubCateogry(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.AdminSubCategory(name,pageable);
	}
	
//	
//	@GetMapping("/CategoryList/{name}")
//	public List<Category> CategoryList(@PathVariable String name){
//		System.out.println(name+"안녕");
//		return categoryRepository.CategoryList(name);
//	}
	
	@GetMapping("/CategoryNameList/{name}")
	public List<Category> CategoryNameList(@PathVariable String name){
		return categoryRepository.CategoryNameList(name);
	}
	
	@GetMapping("/CategorySubList/{name}")
	public List<Category> CategorySubList(@PathVariable String name){
		return categoryRepository.CategorySubList(name);
	}
	
	
	
	@GetMapping("/SearchProduct/{name}")
	public List<ProductView> SearchProductList(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.SearchProduct(name,pageable);
	}

	@GetMapping("/SearchAdminProduct/{name}")
	public List<ProductView> SearchAdminProductList(@PathVariable String name, @PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC) Pageable pageable){
		return productRepository.SearchAdminProduct(name,pageable);
	}
	
//	@GetMapping("/isAvailableUp/{id}")
//	public void isAvailableUp(@PathVariable("id") int id, Pageable pageable){
//    productRepository.isAvailableUp(id);
//	}
//	
//	@GetMapping("/isAvailableDown/{id}")
//	public void isAvailableDown(@PathVariable("id") int id, Pageable pageable){
//    productRepository.isAvailableDown(id);
//	}
//	@PageableDefault(size=1000, page=0, sort="registerDate", direction=Direction.DESC)
	@GetMapping("/ColorProduct/{name}")
	public List<ProductView> ColorProduct(@PathVariable String name){
		System.out.println(productRepository.ColorProduct(name));
		return productRepository.ColorProduct(name);
	}
	
	@GetMapping("/AdminColorProduct/{name}")
	public List<ProductView> AdminColorProduct(@PathVariable String name){
		System.out.println(productRepository.AdminColorProduct(name));
		return productRepository.AdminColorProduct(name);
	}
}