package com.example.StudentMangamentBackEnd.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Teacher name cannot be empty")
  private String name;

  @Email(message = "Invalid email")
  @Column(unique = true)
  private String email;

  @NotBlank(message = "Subject cannot be empty")
  private String subject;

  private String address;

  private String department;

  private Integer age;
  private String phone;

  private String password; // required for login

  @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
  private List<Student> students = new ArrayList<>();
}
