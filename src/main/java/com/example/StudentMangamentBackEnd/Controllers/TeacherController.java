package com.example.StudentMangamentBackEnd.Controllers;

import com.example.StudentMangamentBackEnd.DTO.teacher.TeacherLoginDTO;
import com.example.StudentMangamentBackEnd.DTO.teacher.TeacherLoginResponseDTO;
import com.example.StudentMangamentBackEnd.DTO.teacher.TeacherRequestDTO;
import com.example.StudentMangamentBackEnd.DTO.teacher.TeacherResponseDTO;
import com.example.StudentMangamentBackEnd.Services.teacher.TeacherService;
import com.example.StudentMangamentBackEnd.response.ApiResponse;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
  // Api response is used for better presentation and front end mostly reads objects "data "
  private final TeacherService teacherService;

  public TeacherController(TeacherService teacherService) {
    this.teacherService = teacherService;
  }

  // TEACHER Login
  @PostMapping("/login")
  public TeacherLoginResponseDTO loginTeacher(@Valid @RequestBody TeacherLoginDTO dto) {
    return teacherService.loginTeacher(dto);
  }

  // CREATE TEACHER
  @PostMapping
  public ApiResponse<TeacherResponseDTO> createTeacher(@Valid @RequestBody TeacherRequestDTO dto) {

    return new ApiResponse<>(
        201,
        "Teacher created successfully",
        teacherService.createTeacher(dto),
        LocalDateTime.now());
  }

  // UPDATE TEACHER
  @PutMapping("/{id}")
  public ApiResponse<TeacherResponseDTO> updateTeacher(
      @PathVariable long id, @Valid @RequestBody TeacherRequestDTO dto) {

    return new ApiResponse<>(
        200,
        "Teacher updated successfully",
        teacherService.updateTeacher(id, dto),
        LocalDateTime.now());
  }

  // GET TEACHER BY ID
  @GetMapping("/{id}")
  public ApiResponse<TeacherResponseDTO> getTeacherById(@PathVariable long id) {

    return new ApiResponse<>(
        200,
        "Teacher fetched successfully",
        teacherService.getTeacherById(id),
        LocalDateTime.now());
  }

  // GET ALL TEACHERS
  @GetMapping
  public ApiResponse<Object> getAllTeachers(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id,asc") String sort) {

    String[] sortParams = sort.split(",");
    Sort.Direction direction = Sort.Direction.fromString(sortParams[1].toUpperCase());
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    Page<TeacherResponseDTO> response = teacherService.getAllTeachers(pageable);

    return new ApiResponse<>(200, "Teachers fetched successfully", response, LocalDateTime.now());
  }

  // SEARCH TEACHER BY NAME
  @GetMapping("/search")
  public ApiResponse<Object> searchTeacher(
      @RequestParam String name,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id,asc") String sort) {

    String[] sortParams = sort.split(",");
    Sort.Direction direction = Sort.Direction.fromString(sortParams[1].toUpperCase());
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    Page<TeacherResponseDTO> response = teacherService.searchTeacherByName(name, pageable);

    return new ApiResponse<>(200, "Teachers searched successfully", response, LocalDateTime.now());
  }

  // DELETE TEACHER
  @DeleteMapping("/{id}")
  public ApiResponse<Void> deleteTeacher(@PathVariable long id) {

    teacherService.deleteTeacher(id);

    return new ApiResponse<>(200, "Teacher deleted successfully", null, LocalDateTime.now());
  }
}
