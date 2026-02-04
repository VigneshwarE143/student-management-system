package com.example.StudentMangamentBackEnd.DTO.teacher;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TeacherRequestDTO {

  @NotBlank(message = "Teacher name cannot be empty")
  private String name;

  @Email(message = "Invalid email format")
  @NotBlank(message = "Email cannot be empty")
  private String email;

  @NotBlank(message = "Subject cannot be empty")
  private String subject;

  private String address;

  @NotBlank(message = "Department cannot be empty")
  private String department;

  @Min(value = 18, message = "Teacher age must be at least 18")
  @Max(value = 80, message = "Teacher age must be less than 80")
  private Integer age;

  @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10-15 digits")
  private String phone;

  @NotBlank(message = "Password cannot be empty")
  @Size(min = 6, message = "Password must be at least 6 characters")
  private String password;
}
