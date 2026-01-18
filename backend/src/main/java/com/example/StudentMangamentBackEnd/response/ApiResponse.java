package com.example.StudentMangamentBackEnd.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {

  private int status; // HTTP status code
  private String message; // Success / error message
  private T data; // Actual response data
  private LocalDateTime timestamp; // Response time
}
