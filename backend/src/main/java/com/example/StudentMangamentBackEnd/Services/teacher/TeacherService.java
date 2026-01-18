package com.example.StudentMangamentBackEnd.Services.teacher;

import com.example.StudentMangamentBackEnd.DTO.teacher.*;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeacherService {

  TeacherResponseDTO createTeacher(TeacherRequestDTO dto);

  TeacherLoginResponseDTO loginTeacher(TeacherLoginDTO dto);

  TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto);

  TeacherResponseDTO getTeacherById(Long id);

  List<TeacherResponseDTO> getAllTeachers();

  Page<TeacherResponseDTO> getAllTeachers(Pageable pageable);

  List<TeacherResponseDTO> searchTeacherByName(String name);

  Page<TeacherResponseDTO> searchTeacherByName(String name, Pageable pageable);

  void deleteTeacher(Long id);
}
