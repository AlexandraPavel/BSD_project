package com.project.user.administration;

public record PieSlice
        (String pie_name, Long user_id, Long pie_slice_id, String ticker, Double invested_money, Double shares)
        {}
