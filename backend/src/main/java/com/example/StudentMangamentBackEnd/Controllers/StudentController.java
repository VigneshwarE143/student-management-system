package com.example.StudentMangamentBackEnd.Controllers;

import com.example.StudentMangamentBackEnd.DTO.student.StudentRequestDTO;
import com.example.StudentMangamentBackEnd.DTO.student.StudentResponseDTO;
import com.example.StudentMangamentBackEnd.Services.student.StudentService;
import com.example.StudentMangamentBackEnd.response.ApiResponse;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
  // Api response is used for better presentation and front end mostly reads objects "data "
  private final StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @PostMapping
  public ApiResponse<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO dto) {

    return new ApiResponse<>(
        201,
        "Student created successfully",
        studentService.createStudent(dto),
        LocalDateTime.now());
  }

  @PutMapping("/{id}")
  public ApiResponse<StudentResponseDTO> updateStudent(
      @PathVariable long id, @Valid @RequestBody StudentRequestDTO dto) {

    return new ApiResponse<>(
        200,
        "Student updated successfully",
        studentService.updateStudent(id, dto),
        LocalDateTime.now());
  }

  @GetMapping("/{id}")
  public ApiResponse<StudentResponseDTO> getStudentById(@PathVariable long id) {

    return new ApiResponse<>(
        200,
        "Student fetched successfully",
        studentService.getStudentById(id),
        LocalDateTime.now());
  }

  @GetMapping
  public ApiResponse<Object> getAllStudents(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id,asc") String sort) {

    String[] sortParams = sort.split(",");
    Sort.Direction direction = Sort.Direction.fromString(sortParams[1].toUpperCase());
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    Page<StudentResponseDTO> response = studentService.getAllStudents(pageable);

    return new ApiResponse<>(200, "Students fetched successfully", response, LocalDateTime.now());
  }

  @GetMapping("/search")
  public ApiResponse<Object> searchStudents(
      @RequestParam String name,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id,asc") String sort) {

    String[] sortParams = sort.split(",");
    Sort.Direction direction = Sort.Direction.fromString(sortParams[1].toUpperCase());
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    Page<StudentResponseDTO> response = studentService.searchStudentByName(name, pageable);

    return new ApiResponse<>(200, "Students searched successfully", response, LocalDateTime.now());
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Void> deleteStudent(@PathVariable long id) {

    studentService.deleteStudent(id);

    return new ApiResponse<>(200, "Student deleted successfully", null, LocalDateTime.now());
  }

  @PutMapping("/{studentId}/teacher/{teacherId}")
  public ApiResponse<StudentResponseDTO> assignTeacher(
      @PathVariable long studentId, @PathVariable long teacherId) {

    return new ApiResponse<>(
        200,
        "Teacher assigned successfully",
        studentService.assignTeacherToStudent(studentId, teacherId),
        LocalDateTime.now());
  }

  @DeleteMapping("/{studentId}/teacher")
  public ApiResponse<StudentResponseDTO> removeTeacher(@PathVariable long studentId) {

    return new ApiResponse<>(
        200,
        "Teacher removed successfully",
        studentService.removeTeacherFromStudent(studentId),
        LocalDateTime.now());
  }
}
