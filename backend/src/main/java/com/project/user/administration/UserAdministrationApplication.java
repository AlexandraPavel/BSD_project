package com.project.user.administration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class UserAdministrationApplication {
	public static Map<String, Double> prices;

	public static void main(String[] args)
	{
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

		SpringApplication.run(UserAdministrationApplication.class, args);
	}
}
