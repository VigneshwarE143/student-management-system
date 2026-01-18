package com.example.StudentMangamentBackEnd.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Student name cannot be empty")
  private String name;

  @Email(message = "Invalid email")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "Student ID cannot be empty")
  @Column(name = "student_id", unique = true)
  private String studentId;

  @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10-15 digits")
  private String phone;

  private String address;

  @NotBlank(message = "Department cannot be empty")
  private String department;

  private LocalDate enrollmentDate;

  @Min(5)
  @Max(100)
  private Integer age;

  private String grade;

  @ManyToOne
  @JoinColumn(name = "teacher_id")
  private Teacher teacher;
}
