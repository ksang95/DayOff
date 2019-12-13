package com.team4.dayoff.controller;

import java.util.Map;
import java.util.Optional;

import com.team4.dayoff.entity.orderGroup;
import com.team4.dayoff.repository.orderGroupRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * OrderController
 */
@RestController
public class OrderController {


    @Autowired
    private orderGroupRepository orderGroupRepository;

    @PostMapping("/invoice")
    public orderGroup aaa(@RequestBody orderGroup orderGroup) {

        System.out.println(orderGroup);


        return orderGroupRepository.save(orderGroup);



    }
}