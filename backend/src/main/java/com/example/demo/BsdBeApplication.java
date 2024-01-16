package com.example.demo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

@SpringBootApplication
public class BsdBeApplication {

	public static Map<String, Double> prices;

//	@Bean
//	public CorsFilter corsFilter() {
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOriginPattern("*");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("OPTIONS");
//		config.addAllowedMethod("GET");
//		config.addAllowedMethod("POST");
//		config.addAllowedMethod("PUT");
//		config.addAllowedMethod("DELETE");
//		source.registerCorsConfiguration("/**", config);
//		return new CorsFilter(source);
//	}

	public static void main(String[] args) {
		try {
			prices = new HashMap<>();
			List<Price> priceList = new ObjectMapper().readValue(
				new File("src/test/resources/prices.json"),
				new TypeReference<List<Price>>() {
				});
			priceList.forEach(price -> prices.put(price.companyAbvr(), price.price()));
			System.out.println("Prices " + prices);
		} catch (IOException e) {
			e.getMessage();
		}

		SpringApplication.run(BsdBeApplication.class, args);
	}

}
