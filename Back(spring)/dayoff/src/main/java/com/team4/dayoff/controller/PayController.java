package com.team4.dayoff.controller;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import com.team4.dayoff.api.kakaoPayAPI.KakaoPay;
import com.team4.dayoff.entity.Cart;
import com.team4.dayoff.entity.CartView;
import com.team4.dayoff.entity.Deliver;
import com.team4.dayoff.entity.KakaoPayApprovalVO;
import com.team4.dayoff.entity.OrderGroup;
import com.team4.dayoff.entity.Orders;
import com.team4.dayoff.entity.Users;
import com.team4.dayoff.entity.payInfoDTO;
import com.team4.dayoff.entity.Product;
import com.team4.dayoff.repository.CartViewRepository;
import com.team4.dayoff.repository.DeliverRepository;
import com.team4.dayoff.repository.OrderGroupRepository;
import com.team4.dayoff.repository.OrdersRepository;
import com.team4.dayoff.repository.UsersRepository;

import org.apache.http.client.methods.HttpHead;
import org.apache.tomcat.util.json.JSONParser;
import org.hibernate.validator.constraints.SafeHtml.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.tags.Param;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PayController {
	@Autowired
	private CartViewRepository cartViewRepository;
	@Autowired
	private KakaoPay kakaopay;
	@Autowired
	private UsersRepository userRepository;
	@Autowired
	private OrderGroupRepository orderGroupRepository;
	@Autowired
	private OrdersRepository ordersRepository;
	@Autowired
	private DeliverRepository deliverRepository;
	public List<CartView> list;
	private String store;
//	@GetMapping
//	public List<Cart> listCart() {
//		return cartdao.findAll();
//	}

	@PostMapping("/order")
	public void order(@RequestBody List<Cart> carts) {
		System.out.print("carts" + carts);
		return;
	}

	@GetMapping("/payInfoList{userId}")
	public List<CartView> listCart(@PathVariable int userId) {
		System.out.println("aadd " + cartViewRepository.findById(userId));
		return cartViewRepository.findByUserId(userId);
	}

	@GetMapping("/kakaoPay")
	public void kakaoPayGet() {
		System.out.println("a");

	}

	//@PostMapping("/kakaoPay3")
	//public String kakaoPay3(@RequestBody List<CartView> cartview) {
		// Deliver deliver, List<CartView> cartView
		// gson, jackson
//		new Gson();
		// Deliever delievertrans=new Deliever();
		// delievertrans=deliever;
		// System.out.println(delievertrans);
		//System.out.println("deliever 성공");
		//System.out.println("kakaoPay post............................................");
		//System.out.println("aa         " + cartview);
		// list = new ArrayList();
		// list = cartview;
		// int sum = 0;
		// for (int i = 0; i < list.size(); i++) {
		// 	sum += list.get(i).getTotalPrice();
		// }
		//System.out.println(kakaopay.kakaoPayReady(list, sum));
		// Users user=new Users();
		// user.setId(list.get(0).getId());
		// delievertrans.setUsers(user);;
		// delieverRepository.save(delievertrans);
		// response.sendRedirect(kakaopay.kakaoPayReady());
		//return kakaopay.kakaoPayReady(list, sum);
	//}

	@PostMapping("/kakaoPay")
	public String kakaoPay(@RequestBody payInfoDTO s) {
		// Deliver deliver, List<CartView> cartView
		// gson, jackson
//		new Gson();
		System.out.println(s);

		// delievertrans = deliever;
		// System.out.println(delievertrans);

		// System.out.println(s);
		System.out.println("deliever 성공");
		System.out.println("kakaoPay post............................................");
		store=s.getStore();
		// System.out.println("aa " + cartview);
		list = new ArrayList();
		list = s.getCartview();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			sum += list.get(i).getTotalPrice();
		}
		System.out.println(kakaopay.kakaoPayReady(list, sum));
		
		if (s.getService().equals("1")) {
		    System.out.println("a");
			Deliver deliever = new Deliver();
			Users user = new Users();
			user.setId(list.get(0).getId());
			deliever.setUsers(user);
			deliever.setLocation(s.getLocation());
			deliever.setName(s.getName());
			deliever.setPhone(s.getPhone());
			deliever.setPostalcode(Integer.parseInt(s.getPostalcode()));
			deliverRepository.save(deliever);
		}
		return kakaopay.kakaoPayReady(list, sum);
	}
//	    @PostMapping("/kakaoPay")
//	    public String kakaoPay(@RequestBody List<Cart> carts) {
//	       System.out.println("kakaoPay post............................................");
//	        System.out.println(kakaopay.kakaoPayReady());
//	        return "redirect:" + kakaopay.kakaoPayReady();
//	 
//	    }

//KakaoPayApprovalVO	[aid=A2708011463624675988, tid=T2708011390609359508, cid=TC0ONETIME, sid=null, partner_order_id=1001, 
//partner_user_id=1, payment_method_type=MONEY, amount=AmountVO [total=94000, tax_free=100, vat=8536, 
//point=0, discount=0], card_info=null, item_name=상품, item_code=null, payload=null, quantity=1,
//tax_free_amount=null, vat_amount=null,created_at=Tue Dec 24 22:07:15 KST 2019, approved_at=Tue Dec 24 22:07:34 KST 2019]
	@GetMapping("/kakaoPaySuccess")
	public void kakaoPaySuccess(@RequestParam("pg_token") String pg_token, HttpServletResponse response)
			throws IOException {
		OrderGroup ordergroup = new OrderGroup();

		Users users = new Users();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			sum += list.get(i).getTotalPrice();
		}
		System.out.println("kakaoPaySuccess get............................................");
		System.out.println("kakaoPaySuccess pg_token : " + pg_token);
		KakaoPayApprovalVO info = kakaopay.kakaoPayInfo(pg_token, sum);
		System.out.println(info);
		int userId = Integer.parseInt(info.getPartner_user_id());
		users = userRepository.findByid(userId);
		ordergroup.setAid(info.getAid());
		ordergroup.setCid(info.getCid());
		ordergroup.setOrderDate(info.getApproved_at());
//		ordergroup.setPointUser(0);
		ordergroup.setTid(info.getTid());
		ordergroup.setTotalPay(info.getAmount().getTotal());
		ordergroup.setUsers(users);
		System.out.println(ordergroup);
		orderGroupRepository.save(ordergroup);

		for (int i = 0; i < list.size(); i++) {
			Orders order = new Orders();
			Product product = new Product();
			product.setId(list.get(i).getProductId());
			order.setProduct(product);
			order.setColor(list.get(i).getColor());
			order.setOrderGroup(ordergroup);
			order.setPrice(list.get(i).getPrice());
			order.setQuantity(list.get(i).getQuantity());
			order.setSize(list.get(i).getSize());
			ordersRepository.save(order);
		}
		System.out.println("approvalvo   " + info);
		// return new ModelAndView("redirct:?pg_token=");
		response.sendRedirect("https://localhost:3000/mypage/myorders");

	}

	@GetMapping("/kakaoPaySuccess3")
	public ResponseEntity<KakaoPayApprovalVO> kakaoPaySuccess3(@RequestParam("pg_token") String pg_token)
			throws URISyntaxException {
		// @RequestBody KakaoPayApprovalVO kakaoPayApprovalVO
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			sum += list.get(i).getTotalPrice();
		}
		System.out.println("kakaoPaySuccess get............................................");
		// URI uri = new URI("http://localhost:3000/");
		KakaoPayApprovalVO a = kakaopay.kakaoPayInfo(pg_token, sum);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(URI.create("https://localhost:3000/"));
		ResponseEntity<KakaoPayApprovalVO> r = new ResponseEntity<KakaoPayApprovalVO>(a, headers, HttpStatus.OK);
		System.out.println(r);
		// r.created(uri);
		// System.out.println(uri);
		System.out.println("kakaoPaySuccess pg_token : " + pg_token);
		// return new ModelAndView("redirct:?pg_token=");
		return r;
	}

}