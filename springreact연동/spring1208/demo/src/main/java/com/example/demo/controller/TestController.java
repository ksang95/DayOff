package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entity.OrderDetailView;
import com.example.demo.repository.OrderDetailViewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestController{
    @Autowired
    OrderDetailViewRepository orderDetailViewRepository;

    @RequestMapping(value="/home", method=RequestMethod.GET)
    public List<OrderDetailView> home() {
        List<OrderDetailView> list = orderDetailViewRepository.findByGroupId(1);
        
        return list;
    }
    
}