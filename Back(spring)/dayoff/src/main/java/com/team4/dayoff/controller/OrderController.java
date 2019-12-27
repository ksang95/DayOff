package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.List;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import org.json.JSONException;
import org.json.JSONObject;

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

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    @PostMapping("/confirm")
    public void confirm(@RequestParam("orderId") Integer orderId){
        Orders orders = new Orders();
        orders = orderRepository.findByOrderId(orderId);
        Code code = new Code();
        code.setCode("0003");
        code.setContent("구매확정");
        
            orders.setCode(code);
            orderRepository.save(orders);
    }

    @PostMapping("/myOrderLIst")
    public Page<OrderView> myOrderList(@RequestParam("userId") Integer userId, Pageable pageable)
            throws JSONException, IOException {

                if(pageable.getPageNumber()==0){
                    System.out.println("Test");
                List<OrderView> list2 = new ArrayList<>();
                list2 = orderViewRepository.findByCode("0007");
                    
                list2.forEach(i->{
                            
                    try {
                        JSONObject json = readJsonFromUrl(
                            "https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=oFdKCB2Dyz923dBuKoJdYg&t_code=04&t_invoice="
                            + i.getInvoice());
                            System.out.println(i.getInvoice());
                            if(json.toString().contains("배달완료")){
                                List<Orders> orders = new ArrayList<>();
                                Code code1 = new Code();
                                code1.setCode("0002");
                                code1.setContent("배송완료");
                                
                                orders = orderRepository.findByOrderGroup(i.getGroupId());
                                
                                orders.forEach(j->{
                                    j.setCode(code1);
                                    orderRepository.save(j);
        
                                });
            
            
                            }
                } catch (JSONException | IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            });
        
                }
        Page<OrderView> list = null;

        System.out.println(userId);

        list = orderViewRepository.findByIdpage(userId, pageable);



      
	    


        return list;
        
    }

    @PostMapping("/orderCount")
    public int orderCount(@RequestParam("groupId") Integer groupId){

        orderRepository.countGroup(groupId);


        return  orderRepository.countGroup(groupId);
        
    }

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


        if(pageable.getPageNumber()==0){
            System.out.println("Test");
        List<OrderView> list2 = new ArrayList<>();
        list2 = orderViewRepository.findByCode("0007");
            
        list2.forEach(i->{
                    
            try {
                JSONObject json = readJsonFromUrl(
                    "https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=oFdKCB2Dyz923dBuKoJdYg&t_code=04&t_invoice="
                    + i.getInvoice());
                    System.out.println(i.getInvoice());
                    if(json.toString().contains("배달완료")){
                        List<Orders> orders = new ArrayList<>();
                        Code code1 = new Code();
                        code1.setCode("0002");
                        code1.setContent("배송완료");
                        
                        orders = orderRepository.findByOrderGroup(i.getGroupId());
                        
                        orders.forEach(j->{
                            j.setCode(code1);
                            orderRepository.save(j);

                        });
    
    
                    }
        } catch (JSONException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    });

        }

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