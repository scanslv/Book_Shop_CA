package com.iivanovs.bookshopca.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason="Access is denied")
public class ForbiddenException extends RuntimeException {}