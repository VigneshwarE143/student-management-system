package com.example.StudentMangamentBackEnd.DTO.student;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import lombok.Data;

@Data
public class StudentRequestDTO {

  @NotBlank(message = "Student name cannot be empty")
  private String name;

  @Email(message = "Invalid email format")
  @NotBlank(message = "Email cannot be empty")
  private String email;

  @NotBlank(message = "Student ID cannot be empty")
  private String studentId;

  @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10-15 digits")
  private String phone;

  private String address;

  @NotBlank(message = "Department cannot be empty")
  private String department;

  private LocalDate enrollmentDate;

  @Min(value = 5, message = "Age must be at least 5")
  @Max(value = 100, message = "Age must be less than 100")
  private Integer age;

  private String grade;

  private Long teacherId; // Optional: can assign teacher during creation or later
}
