package com.example.StudentMangamentBackEnd.DTO.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminRequestDTO {

  @NotBlank(message = "Name cannot be empty")
  private String name;

  @Email(message = "Invalid email format")
  @NotBlank(message = "Email cannot be empty")
  private String email;

  @NotBlank(message = "Password cannot be empty")
  @Size(min = 6, message = "Password must be at least 6 characters")
  private String password;
}
