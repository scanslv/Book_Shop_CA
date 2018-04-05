package com.iivanovs.bookshopca.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String CLAIM_ROLES = "roles";
    public static final String SIGN_UP_URL = "/user/register";
    public static final String CHECK_EMAIL_URL = "/user/checkemail";
    public static final String GET_ALL_BOOKS_URL = "/book/getall";
    public static final String GET_BOOK_URL = "/book/getbook";
    public static final String SEARCH_BOOK_URL = "/book/search";
}
