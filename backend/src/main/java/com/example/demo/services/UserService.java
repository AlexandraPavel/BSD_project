package com.example.demo.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.model.UserModel;
import com.example.demo.model.UserLogin;
import com.example.demo.repository.UserLoginRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.vo.UserAuthorizeResponseVo;
import com.example.demo.vo.UserRequestVo;
import com.example.demo.vo.UserRequestNameVo;
import com.example.demo.vo.UserTokenResponseVo;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private UserLoginRepository userLoginRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    public UserRequestVo findByUserId(Long userId) {

        UserModel user = userRepository.findByUserId(userId);

        return UserRequestVo.builder()
                .username(user.getUserName())
                .email(user.getEmail())
                .build();
    }

    public UserRequestNameVo findByUsername(String username) {

        UserModel user = userRepository.findUserByStatusAndName(username);

        return UserRequestNameVo.builder()
                .id(user.getUserId())
                .username(user.getUserName())
                .email(user.getEmail())
                .build();
    }

    public void registerNewUser(UserRequestVo userRequestVo) {
        UserModel user = UserModel.builder()
                .userName(userRequestVo.getUsername())
                .password(bCryptPasswordEncoder.encode(userRequestVo.getPassword()))
                .email(userRequestVo.getEmail())
                .build();
        userRepository.save(user);
    }

    public UserTokenResponseVo validateUserCredentialsAndGenerateToken(UserRequestVo userRequestVo) {
        UserModel user = userRepository.findUserByStatusAndName(userRequestVo.getUsername());
        if (user != null &&
                bCryptPasswordEncoder.matches(userRequestVo.getPassword(),
                        user.getPassword())) {
            String token = createJsonWebToken(userRequestVo.getUsername());
            UserLogin userLogin = UserLogin.builder()
                    .user(user)
                    .token(token)
                    .tokenExpireTime(getCurrentTimeStamp())
                    .build();
            userLoginRepository.save(userLogin);
            UserTokenResponseVo userTokenResponseVo = new UserTokenResponseVo();
            userTokenResponseVo.setToken(token);
            userTokenResponseVo.setUsername(userRequestVo.getUsername());
            userTokenResponseVo.setEmail(userRepository.findUserByStatusAndName(userRequestVo.getUsername()).getEmail());
            userTokenResponseVo.setId(userRepository.findUserByStatusAndName(userRequestVo.getUsername()).getUserId());

            return userTokenResponseVo;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public UserAuthorizeResponseVo authorizeV1(UserRequestVo userRequestVo) throws ParseException {
        UserLogin userLogin = userLoginRepository.findByUserAndToken(userRequestVo.getUsername(),
                userRequestVo.getToken());
        if (userLogin != null) {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = format.parse(userLogin.getTokenExpireTime());

            if (new Date().compareTo(date) < 1) {
                return new UserAuthorizeResponseVo(userRequestVo.getUsername(), true);
            } else {
                return new UserAuthorizeResponseVo(userRequestVo.getUsername(), false);
            }
        }
        return new UserAuthorizeResponseVo(userRequestVo.getUsername(), false);
    }

    public UserAuthorizeResponseVo authorizeV2(UserRequestVo userRequestVo) throws ParseException {
        String userName = extractUserNameFromToken(userRequestVo.getToken());
        UserLogin userLogin = userLoginRepository.findByUserAndToken(userName, userRequestVo.getToken());
        if (userLogin != null) {
            return new UserAuthorizeResponseVo(userRequestVo.getUsername(),
                    verifyToken(userRequestVo.getUsername(), userRequestVo.getToken()));
        }
        return new UserAuthorizeResponseVo(userRequestVo.getUsername(), false);
    }


    public String getCurrentTimeStamp() {
        Date newDate = DateUtils.addHours(new Date(), 3);
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(newDate);
    }

    public static String createJsonWebToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuer("auth0")
                .withExpiresAt(DateUtils.addHours(new Date(), 3))
                .sign(Algorithm.HMAC256("abc"));
    }

    public static String extractUserNameFromToken(String token) throws JWTVerificationException {

        Algorithm algorithm = Algorithm.HMAC256("abc");
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("auth0")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();

    }

    public static boolean verifyToken(String user, String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("abc");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            Date dateTheTokenWillExpire = jwt.getExpiresAt();
            if (new Date().compareTo(dateTheTokenWillExpire) < 1) {
                return true;
            } else {
                return false;
            }
        } catch (JWTVerificationException exception) {
            return false;
        }

    }
}
