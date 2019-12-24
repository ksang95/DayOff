package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.OrderDetailView;
import com.team4.dayoff.entity.OrderGroup;
import com.team4.dayoff.entity.OrderView;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.ProductList;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.repository.OrderDetailViewRepository;
import com.team4.dayoff.repository.OrderGroupRepository;
import com.team4.dayoff.repository.OrderViewRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.RecommendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * OrderController
 */
@RestController
public class OrderController {


    @Autowired
    private OrderGroupRepository orderGroupRepository;

    @Autowired
    private OrderDetailViewRepository orderDetailViewRepository;
   
    @Autowired
    private OrderViewRepository orderViewRepository;


    @Autowired
    private RecommendRepository recommendRepository;  

    @Autowired
    private ProductRepository productReporitory; 

    @Autowired
    private OrdersRepository orderRepository;

    @PostMapping("/updateInvoice")
    public String  updateInvoice(@RequestParam("invoice") String invoice, @RequestParam("groupId") Integer groupId, @RequestParam("orderId") Integer orderId){
        OrderGroup orderGroup = new OrderGroup();
        
        orderGroup = orderGroupRepository.findById(groupId).get();
        orderGroup.setInvoice(invoice);
        orderGroupRepository.save(orderGroup);



        Code code = new Code();

        code.setCode("0007");
        code.setContent("배송중");

         orderGroup.getOrders().forEach(i->{
            if(i.getId() == orderId ){
                i.setCode(code);
                orderRepository.save(i);
            }
        });


        

        

        return "1";
    }


    @PostMapping("/orderList")
    public Page<OrderView> orderList(@RequestParam("code") String code,@RequestParam("name") String name, Pageable pageable){
        Page<OrderView> list = null;
        System.out.println(code);
        System.out.println(pageable.getPageSize());
        System.out.println(name);
        if(name.equals("")){
        if(code.equals("all") ){
        list = orderViewRepository.findAll(pageable);
        }else{
            list = orderViewRepository.findByCode(code, pageable);
        }
    }
    if(!name.equals("")){
    if(code.equals("all") ){
        list = orderViewRepository.findByUserName(name, pageable);
    }else{
        list = orderViewRepository.findByUserNameAndCode(name, code, pageable);
    }
}
        
        return list;
    }

    
    @PostMapping("/setcookie")
    public void cookie(@RequestParam("id") String Id,HttpServletResponse response, HttpServletRequest request){
        Cookie cookie = new Cookie(Id, Id);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*24*7);
        System.out.println(cookie.getValue());
        response.addCookie(cookie);

       

    }

    @GetMapping("/showcookie")
    public List<RecommendByCategory> showcookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        List<RecommendByCategory> list = new ArrayList<>();
        System.out.println(1234);
        for(Cookie data : cookies){
            System.out.println(data.getValue());
            System.out.println(recommendRepository.findByProductId(Integer.parseInt(data.getValue())));
            list.add(recommendRepository.findByProductId(Integer.parseInt(data.getValue())));

        }
        System.out.println(list);
        return list;
    }
    @PostMapping("/togetherBuy")
    public List<ProductList> togetherBuy(@RequestParam("id") Integer id){
        List<ProductList> list = new ArrayList<>();
        ProductList productList = new ProductList();
        productReporitory.testView(1).forEach(i->{
            productList.setId((Integer)i[0]);
            productList.setName((String)i[1]);
            productList.setUri((String)i[2]);
            list.add(productList);
        });
        System.out.println(list);
        return list;

    }




    @GetMapping("/orderDetail/{groupId}")
    public List<OrderDetailView> orderDetail(@PathVariable Integer groupId) {
        List<OrderDetailView> list = orderDetailViewRepository.findByGroupId(groupId);
        
        return list;
    }

    


}