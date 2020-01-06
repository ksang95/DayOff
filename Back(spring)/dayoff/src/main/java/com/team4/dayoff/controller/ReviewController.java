package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.List;


import com.team4.dayoff.entity.Review;
import com.team4.dayoff.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class ReviewController{
    
    @Autowired
    ReviewRepository reviewRepository;

    @GetMapping(value = "/review")
    public List<Review> rivewList(){
        List<Review> rv= new ArrayList<Review>();
        // cartRepository.findAll().forEach(i -> {
        //     ct.add(i);
        // });
        rv= reviewRepository.findAll();
        System.out.println(rv);
        return rv;
    }


    @PostMapping("/addReview")
    public void addReview(@RequestBody Review review){
        reviewRepository.save(review);

    }

   
}