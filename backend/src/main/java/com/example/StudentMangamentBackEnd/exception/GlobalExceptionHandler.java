package com.example.StudentMangamentBackEnd.exception;

import com.example.StudentMangamentBackEnd.response.ApiResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiResponse<Object>> handleNotFound(ResourceNotFoundException ex) {

    return new ResponseEntity<>(
        new ApiResponse<>(404, ex.getMessage(), null, LocalDateTime.now()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ApiResponse<Object>> handleBadRequest(BadRequestException ex) {

    return new ResponseEntity<>(
        new ApiResponse<>(400, ex.getMessage(), null, LocalDateTime.now()), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult()
        .getFieldErrors()
        .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));

    return new ResponseEntity<>(
        new ApiResponse<>(400, "Validation failed", errors, LocalDateTime.now()),
        HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ApiResponse<Object>> handleDuplicate() {

    return new ResponseEntity<>(
        new ApiResponse<>(400, "Duplicate value exists", null, LocalDateTime.now()),
        HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiResponse<Object>> handleGeneric(Exception ex) {

    return new ResponseEntity<>(
        new ApiResponse<>(500, "Internal Server Error", null, LocalDateTime.now()),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
