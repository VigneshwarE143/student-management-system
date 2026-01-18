package com.example.StudentMangamentBackEnd.Services.student;

import com.example.StudentMangamentBackEnd.DTO.student.*;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {

  StudentResponseDTO createStudent(StudentRequestDTO dto);

  StudentResponseDTO updateStudent(Long id, StudentRequestDTO dto);

  StudentResponseDTO getStudentById(Long id);

  List<StudentResponseDTO> getAllStudents();

  Page<StudentResponseDTO> getAllStudents(Pageable pageable);

  List<StudentResponseDTO> searchStudentByName(String name);

  Page<StudentResponseDTO> searchStudentByName(String name, Pageable pageable);

  StudentResponseDTO assignTeacher(Long studentId, Long teacherId);

  StudentResponseDTO removeTeacher(Long studentId);

  void deleteStudent(Long id);

  // Method aliases for controller compatibility
  StudentResponseDTO assignTeacherToStudent(Long studentId, Long teacherId);

  StudentResponseDTO removeTeacherFromStudent(Long studentId);
}
