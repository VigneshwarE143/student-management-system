package com.example.StudentMangamentBackEnd.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Admin name cannot be empty")
  private String name;

  @Email(message = "Invalid email format")
  @Column(unique = true, nullable = false)
  private String email;

  @NotBlank(message = "Password cannot be empty")
  @Column(length = 255, nullable = false)
  private String password;
}
