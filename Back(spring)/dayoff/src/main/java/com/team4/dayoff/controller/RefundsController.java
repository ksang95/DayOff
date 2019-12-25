package com.team4.dayoff.controller;

import java.util.List;

import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.Refunds;
import com.team4.dayoff.repository.CodeRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.RefundsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * RefundsController
 */
@RestController
public class RefundsController {

    // @Autowired
    // private OrderViewRepository orderViewRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private RefundsRepository refundsRepository;

    @Autowired
    private CodeRepository codeRepository;


    @GetMapping("/refundRequest")
    public List<Code> refundRequest() {
        List<Code> list = codeRepository.findByCodeLikeOrderByCode("01%");

        return list;
    }

    @PostMapping("/refundRequestProcess")
    public void refundRequestProcess(@RequestBody Refunds refunds) {
        Orders orders=ordersRepository.findById(refunds.getId()).get();
        orders.setCode(new Code("0004","환불신청완료"));
        refunds.setOrders(orders);
        refunds.setId(null);
        Refunds savedRefunds=refundsRepository.save(refunds);
    }
}