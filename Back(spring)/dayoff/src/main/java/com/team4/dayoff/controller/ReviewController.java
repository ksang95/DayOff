package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.List;

import com.team4.dayoff.entity.Review;
import com.team4.dayoff.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class ReviewController{
    
    @Autowired
    ReviewRepository reviewRepository;

    @PostMapping("/review")
    public List<Review> rivewList(@RequestParam("productId") Integer productId){
        System.out.println(productId);
        List<Review> rv= new ArrayList<Review>();
        rv= reviewRepository.findByProductId(productId);
        System.out.println(rv);
        return rv;
    }


    @PostMapping("/addReview")
    public void addReview(@RequestBody Review review){
        reviewRepository.save(review);

    }

   
}