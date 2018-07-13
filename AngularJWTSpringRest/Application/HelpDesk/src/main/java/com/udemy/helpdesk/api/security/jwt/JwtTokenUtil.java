package com.udemy.helpdesk.api.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = 8222122513785189580L;

	public static final String CLAIM_KEY_USERNAME = "sub";
	public static final String CLAIM_KEY_CREATED = "created";
	public static final String CLAIM_KEY_EXPIRED = "exp";
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.expiration}")
	private Long expiration;

	
	public String getUsernameFromToken(String token){
		String username = null;
		try{
			final Claims claims = getClaimsFromToken(token);
			username = claims.getSubject();
		}catch(Exception e){
			
		}
		return username;
	}

	public Date getExpirationDateFromToken(String token){
		Date expiration = null;
		try{
			final Claims claims = getClaimsFromToken(token);
			expiration = claims.getExpiration();
		}catch(Exception e){
			
		}
		return expiration;		
	}

	private Claims getClaimsFromToken(String token) {
		Claims claims = null;
		try{
			claims = Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(token)
					.getBody();
		} catch (Exception e){
			
		}
		return claims;
	}
	
	private Boolean isTokenExpired(String token){
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	public String generateToken(UserDetails userDetails){
		
		Map<String, Object> claims = new HashMap<String, Object>();
		
		claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
		
		final Date createDate = new Date();
		claims.put(CLAIM_KEY_CREATED, createDate);
		
		return doGenerateToken(claims);
		
	}

	private String doGenerateToken(Map<String, Object> claims) {
		final Date createdDate = (Date) claims.get(CLAIM_KEY_CREATED);
		final Date expirationDate = new Date(createdDate.getTime() + expiration * 1000);
		return Jwts.builder().setClaims(claims).setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact() ;
	}
	
	public Boolean canTokenBeRefreshed(String token){
		return (!isTokenExpired(token));
	}
	
	public String refreshToken(String token){
		String refreshedToken = null;
		try {
			final Claims claims = getClaimsFromToken(token);
			claims.put(CLAIM_KEY_CREATED, new Date());
			refreshedToken = doGenerateToken(claims);
		} catch (Exception e) {
		}
		return refreshedToken;
	}
	
	
	public Boolean validateToken(String token, UserDetails userDetails){
		JwtUser user = (JwtUser) userDetails;
		final String username = getUsernameFromToken(token);
		return (username.equals(user.getUsername()) && !isTokenExpired(token));
	}
}
