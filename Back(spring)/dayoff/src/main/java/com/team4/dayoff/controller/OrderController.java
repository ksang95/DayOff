package com.team4.dayoff.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.Grade;
import com.team4.dayoff.entity.OrderDetailView;
import com.team4.dayoff.entity.OrderGroup;
import com.team4.dayoff.entity.OrderView;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.ProductList;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.entity.Refunds;
import com.team4.dayoff.entity.Users;
import com.team4.dayoff.repository.OrderDetailViewRepository;
import com.team4.dayoff.repository.OrderGroupRepository;
import com.team4.dayoff.repository.OrderViewRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.ProductRepository;
import com.team4.dayoff.repository.RecommendRepository;
import com.team4.dayoff.repository.RefundsRepository;
import com.team4.dayoff.repository.UsersRepository;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.security.access.annotation.Secured;
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

    @Autowired
    private RefundsRepository refundsRepository;

    @Autowired
    private UsersRepository usersRepository;

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
    public void confirm(@RequestParam("orderId") Integer orderId, @RequestParam("userId") Integer userId,
            @RequestParam("groupId") Integer groupId) {
        Orders orders = new Orders();
        orders = orderRepository.findByOrderId(orderId);
        Code code = new Code();
        code.setCode("0007");
        code.setContent("구매확정");

        int count = orderRepository.countGroup(groupId);

        orders.setCode(code);
        orderRepository.save(orders);

        OrderGroup orderGroup = orderGroupRepository.findById(groupId).get();

        double ratio = orders.getPrice() / (orderGroup.getTotalPay() + orderGroup.getGradeDiscount()
                + orderGroup.getCouponDiscount() + orderGroup.getPointUse());
        double totalpay = orders.getPrice() - Math.round(ratio * orderGroup.getGradeDiscount())
                - Math.round(ratio * orderGroup.getCouponDiscount()) - Math.round(orderGroup.getPointUse() / count);
        int result = (int) totalpay;
        Users users = usersRepository.findById(userId).get();

        int resultPay = users.getAccrue() + result;

        double resultEmoney = users.getTotalEmoney() + (totalpay * users.getGrade().getRate() / 100);
        // System.out.println("======================================================");
        // System.out.println(users.getGrade().getRate());
        // System.out.println(rate);
        // System.out.println(resultEmoney);
        // System.out.println("======================================================");
        users.setAccrue(resultPay);
        users.setTotalEmoney((int) resultEmoney);

        usersRepository.save(users);

        users = usersRepository.findById(userId).get();

        Grade grade = new Grade();
        if (users.getAccrue() > 5000) {
            grade.setLevel("실버");
            grade.setRate(2);

        } else if (users.getAccrue() > 50000) {
            grade.setLevel("골드");
            grade.setRate(3);
        } else if (users.getAccrue() > 500000) {
            grade.setLevel("플래티넘");
            grade.setRate(3);
        }

        users.setGrade(grade);
        usersRepository.save(users);

    }

    @PostMapping("/myOrderLIst")
    public Page<OrderView> myOrderList(@RequestParam("userId") Integer userId, Pageable pageable)
            throws JSONException, IOException {

        if (pageable.getPageNumber() == 0) {
            List<OrderView> list3 = new ArrayList<>();
            list3 = orderViewRepository.findByCode("0002");

            list3.forEach(i -> { //배송완료 후 7일이 지난 주문내역을 구매확정으로 전환
                String start = i.getDeliverDate();
                Calendar end = Calendar.getInstance();
                int year = end.get(Calendar.YEAR);
                int month = end.get(Calendar.MONTH) + 1;
                int day = end.get(Calendar.DAY_OF_MONTH);
                String end2 = Integer.toString(year)+"-"+Integer.toString(month)+"-"+Integer.toString(day);
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date beginDate = formatter.parse(start);
                    // System.out.println(beginDate); //그냥 데이트 객체만 출력할떈 시간까지 다나옴. 포매터 적용인 안된 모습.
                    Date endDate = formatter.parse(end2);
                    System.out.println(endDate.getTime());
                    System.out.println("==========================");
                    long diff = endDate.getTime() - beginDate.getTime(); 

                    System.out.println(diff);
                    long diffDays = diff / (24*60*60*1000); // 시간차이를 시간,분,초를 곱한 값으로 나누면 하루 단위가 나옴
                    System.out.println("결과는!!"+diffDays);


                    Orders orderList = new Orders();
                    int orderId = i.getOrderId();
                    orderList = orderRepository.findByOrderId(orderId);

                    if(diffDays > 6){
                        Code code2 = new Code();
                        code2.setCode("0007");
                        code2.setContent("구매확정");
                        orderList.setCode(code2);
                        orderRepository.save(orderList);

                    }
                } catch (ParseException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            System.out.println("======================================");
        });


            System.out.println("Test");
            List<OrderView> list2 = new ArrayList<>();
            list2 = orderViewRepository.findByCode("0001");

            list2.forEach(i -> {  //배송완료된 주문내역을 배송중에서 배송 완료로 전환.

                try {
                    JSONObject json = readJsonFromUrl(
                            "https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=oFdKCB2Dyz923dBuKoJdYg&t_code=04&t_invoice="
                                    + i.getInvoice());
                    System.out.println(i.getInvoice());
                    if (json.toString().contains("배달완료")) {
                       Orders orders = new Orders();
                        Code code1 = new Code();
                        code1.setCode("0002");
                        code1.setContent("배송완료");
                        orders = orderRepository.findByOrderId(i.getOrderId());

                        
                            orders.setCode(code1);
                            orders.setDeliverDate(new Date());
                            orderRepository.save(orders);


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
    public int orderCount(@RequestParam("groupId") Integer groupId) {

        orderRepository.countGroup(groupId);

        return orderRepository.countGroup(groupId);

    }

    @PostMapping("/updateInvoice")
    public String updateInvoice(@RequestParam("invoice") String invoice, @RequestParam("groupId") Integer groupId,
            @RequestParam("orderId") Integer orderId) {
        OrderGroup orderGroup = new OrderGroup();

        orderGroup = orderGroupRepository.findById(groupId).get();
        orderGroup.setInvoice(invoice);
        orderGroupRepository.save(orderGroup);

        Code code = new Code();

        code.setCode("0001");
        code.setContent("배송중");

        orderGroup.getOrders().forEach(i -> {
            i.setCode(code);
            orderRepository.save(i);
        });

        return "1";
    }

    @PostMapping("/orderList")
    public Page<OrderView> orderList(@RequestParam("code") String code, @RequestParam("name") String name,
            Pageable pageable) {

        if (pageable.getPageNumber() == 0) {
            List<OrderView> list3 = new ArrayList<>();
            list3 = orderViewRepository.findByCode("0002");

            list3.forEach(i -> {//배송완료 후 7일이 지난 주문내역을 구매확정으로 전환
                String start = i.getDeliverDate();
                Calendar end = Calendar.getInstance();
                int year = end.get(Calendar.YEAR);
                int month = end.get(Calendar.MONTH) + 1;
                int day = end.get(Calendar.DAY_OF_MONTH);
                String end2 = Integer.toString(year)+"-"+Integer.toString(month)+"-"+Integer.toString(day);
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date beginDate = formatter.parse(start);
                    System.out.println(beginDate); //그냥 데이트 객체만 출력할떈 시간까지 다나옴. 포매터 적용인 안된 모습.
                    System.out.println("==========================");
                    Date endDate = formatter.parse(end2);
                    System.out.println(endDate);
                    long diff = endDate.getTime() - beginDate.getTime(); //겟타임으로 뽑아줘야 포매터의 형식대로 뽑혀온다.
                    long diffDays = diff / (24*60*60*1000);
                    System.out.println("결과는!!"+diffDays);


                    Orders orderList = new Orders();
                    int orderId = i.getOrderId();
                    orderList = orderRepository.findByOrderId(orderId);

                    if(diffDays > 6){
                        Code code2 = new Code();
                        code2.setCode("0007");
                        code2.setContent("구매확정");
                        orderList.setCode(code2);
                        orderRepository.save(orderList);

                    }
                } catch (ParseException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            System.out.println("======================================");
        });


            System.out.println("Test");
            List<OrderView> list2 = new ArrayList<>();
            list2 = orderViewRepository.findByCode("0001");

            list2.forEach(i -> {//배송완료된 주문내역을 배송중에서 배송 완료로 전환.

                try {
                    JSONObject json = readJsonFromUrl(
                            "https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=oFdKCB2Dyz923dBuKoJdYg&t_code=04&t_invoice="
                                    + i.getInvoice());
                    System.out.println(i.getInvoice());
                    if (json.toString().contains("배달완료")) {
                        Orders orders = new Orders();
                        Code code1 = new Code();
                        code1.setCode("0002");
                        code1.setContent("배송완료");

                        orders = orderRepository.findByOrderId(i.getOrderId());

                        
                            orders.setCode(code1);
                            orders.setDeliverDate(new Date());
                            orderRepository.save(orders);

                    

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

    
   
    

    

    @GetMapping("/orderDetail/{groupId}")
    public List<OrderDetailView> orderDetail(@PathVariable Integer groupId) {
        List<OrderDetailView> list = orderDetailViewRepository.findByGroupId(groupId);

        return list;
    }

    @PostMapping("/goNextState")
    public void goNextState(@RequestParam("orderId") Integer orderId){
        Orders orders =orderRepository.findById(orderId).get();
        String nextCode="000"+(Integer.parseInt(orders.getCode().getCode())+1);
        switch(nextCode){
            case "0004":
            orders.setCode(new Code(nextCode,"픽업완료"));
            break;
            case "0006":
            orders.setCode(new Code(nextCode,"환불완료"));
            refundsRepository.giveRefunds(orderId);
            break;
        }
        orderRepository.save(orders);
    }

}