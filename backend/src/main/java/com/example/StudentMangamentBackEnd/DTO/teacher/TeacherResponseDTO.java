package com.example.StudentMangamentBackEnd.DTO.teacher;

import java.util.List;
import lombok.Data;

@Data
public class TeacherResponseDTO {

  private Long id;
  private String name;
  private String email;
  private String subject;
  private String address;
  private String department;
  private Integer age;
  private String phone;

  private List<Long> studentIds;
}
