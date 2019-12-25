package com.team4.dayoff.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import com.team4.dayoff.api.visionAPI.ProductManagement;
import com.team4.dayoff.entity.RecommendByCategory;
import com.team4.dayoff.repository.RecommendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * VisionController
 */
@RestController
public class VisionController {

    @Autowired
	private ProductManagement productManagement;
	@Autowired
	private RecommendRepository recommendRepository;
	
	@PostMapping("/test")
	public Map<String,Object> test(@RequestBody Map<String,RecommendByCategory> recommendByCategory){

		System.out.println(recommendByCategory.values());

		Map<String,Object> map = new HashMap<String,Object>();

		return map;
	}

    @PostMapping("/crop")
	@GetMapping("/crop")
	public Map<String,Object> crop(@RequestBody Map<String,String> result) throws IOException {
		System.out.println(result.get("realTest"));
		
		// BufferedImage srcImg = ImageIO.read(new File(path2));
		// System.out.println(srcImg);
		// int x1 = Integer.parseInt(x);
		// int y1 = Integer.parseInt(y);
		// int w1 = Integer.parseInt(w);
		// int h1 = Integer.parseInt(h);
		
//		BufferedImage destImg = Scalr.resize(cropImg, dw, dh);
//		String thumbName = "THUMB_" + fileName;
//
		// try {
		// 	BufferedImage result = Scalr.crop(srcImg, x1, y1, w1, h1);
		// 	System.out.println(result);
		// 	File thumbFile = new File(path2);
		// 	ImageIO.write(result, "jpg", thumbFile);
		// 	model.addAttribute("path", path);
			
		// } catch (Exception e) {
		// 	e.printStackTrace();
		// }

		String data1 = result.get("result").split(",")[1];
		
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data1);
		
		try {
			
			BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
			
			ImageIO.write(bufImg, "png", new File("./newfile"));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		
		
		Map<String,Object> map = new HashMap<String,Object>();
		List<RecommendByCategory> realList = new ArrayList<RecommendByCategory>();
		List<String> List = productManagement.getSimilarProductsFile("apparel",
		"./newfile");
		System.out.println(List.get(0));
		if(!List.get(0).contains("https")){
			System.out.println(recommendRepository.findByCategoryName(List.get(0)));
			map.put("recommend", recommendRepository.findByCategoryName(List.get(0)));

			return map;
		}

		for (String data : List) {
			realList.add(recommendRepository.findByProductThumbnailName(data));
		}
		// for (String data : realList) {
		// 	data = data.replace("gs://", "https://storage.googleapis.com/");
		// 	System.out.println(data);
		// 	data = data + "?hl=ko";
		// 	realList2.add(data);
		// }
		map.put("list", realList);
		map.put("test", "테스트조아");

		return map;
	}
}