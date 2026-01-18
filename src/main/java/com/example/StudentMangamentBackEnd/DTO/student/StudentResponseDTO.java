package com.example.StudentMangamentBackEnd.DTO.student;

import java.time.LocalDate;
import lombok.Data;

@Data
public class StudentResponseDTO {

  private Long id;
  private String name;
  private String email;
  private String studentId;
  private String phone;
  private String address;
  private String department;
  private LocalDate enrollmentDate;
  private Integer age;
  private String grade;

  private Long teacherId;
  private String teacherName;
}
