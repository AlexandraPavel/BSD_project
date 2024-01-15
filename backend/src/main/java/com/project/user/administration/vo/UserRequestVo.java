package com.project.user.administration.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestVo {

    private String username;
    private String email;
    private String password;
    private String token;

}