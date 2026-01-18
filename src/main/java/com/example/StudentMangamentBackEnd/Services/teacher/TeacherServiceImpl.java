package com.example.StudentMangamentBackEnd.Services.teacher;

import com.example.StudentMangamentBackEnd.DTO.teacher.*;
import com.example.StudentMangamentBackEnd.exception.BadRequestException;
import com.example.StudentMangamentBackEnd.exception.ResourceNotFoundException;
import com.example.StudentMangamentBackEnd.model.Student;
import com.example.StudentMangamentBackEnd.model.Teacher;
import com.example.StudentMangamentBackEnd.repository.TeacherRepository;
import com.example.StudentMangamentBackEnd.security.JwtUtil;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TeacherServiceImpl implements TeacherService {

  private final TeacherRepository teacherRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  public TeacherServiceImpl(
      TeacherRepository teacherRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {

    this.teacherRepository = teacherRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
  }

  @Override
  public TeacherLoginResponseDTO loginTeacher(TeacherLoginDTO dto) {
    log.info("Teacher login attempt for email: {}", dto.getEmail());

    Teacher teacher =
        teacherRepository
            .findByEmail(dto.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid email"));

    if (!passwordEncoder.matches(dto.getPassword(), teacher.getPassword())) {
      log.warn("Failed login attempt for email: {}", dto.getEmail());
      throw new ResourceNotFoundException("Invalid password");
    }

    String token = jwtUtil.generateToken(teacher.getEmail(), "TEACHER");
    log.info("Teacher logged in successfully: {}", dto.getEmail());
    return new TeacherLoginResponseDTO(token);
  }

  @Override
  public TeacherResponseDTO createTeacher(TeacherRequestDTO dto) {
    log.info("Creating teacher with email: {}", dto.getEmail());

    if (dto.getPassword() == null || dto.getPassword().isBlank()) {
      throw new BadRequestException("Password cannot be empty");
    }

    Teacher teacher = mapToEntity(dto);
    teacher.setPassword(passwordEncoder.encode(dto.getPassword()));

    TeacherResponseDTO response = mapToResponse(teacherRepository.save(teacher));
    log.info("Teacher created successfully with ID: {}", response.getId());
    return response;
  }

  @Override
  public TeacherResponseDTO updateTeacher(Long id, TeacherRequestDTO dto) {
    log.info("Updating teacher with ID: {}", id);

    Teacher teacher =
        teacherRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

    teacher.setName(dto.getName());
    teacher.setEmail(dto.getEmail());
    teacher.setSubject(dto.getSubject());
    teacher.setAddress(dto.getAddress());
    teacher.setDepartment(dto.getDepartment());
    teacher.setAge(dto.getAge());
    teacher.setPhone(dto.getPhone());

    if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
      teacher.setPassword(passwordEncoder.encode(dto.getPassword()));
    }

    TeacherResponseDTO response = mapToResponse(teacherRepository.save(teacher));
    log.info("Teacher updated successfully with ID: {}", id);
    return response;
  }

  @Override
  public TeacherResponseDTO getTeacherById(Long id) {
    log.info("Fetching teacher with ID: {}", id);
    TeacherResponseDTO response =
        mapToResponse(
            teacherRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found")));
    log.info("Teacher fetched successfully with ID: {}", id);
    return response;
  }

  @Override
  public List<TeacherResponseDTO> getAllTeachers() {
    log.info("Fetching all teachers");
    List<TeacherResponseDTO> teachers =
        teacherRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    log.info("Fetched {} teachers", teachers.size());
    return teachers;
  }

  @Override
  public Page<TeacherResponseDTO> getAllTeachers(Pageable pageable) {
    log.info(
        "Fetching all teachers with pagination - page: {}, size: {}",
        pageable.getPageNumber(),
        pageable.getPageSize());
    Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
    Page<TeacherResponseDTO> response = teacherPage.map(this::mapToResponse);
    log.info(
        "Fetched {} teachers from page {} of {}",
        response.getNumberOfElements(),
        pageable.getPageNumber(),
        teacherPage.getTotalPages());
    return response;
  }

  @Override
  public List<TeacherResponseDTO> searchTeacherByName(String name) {
    log.info("Searching teachers by name: {}", name);
    List<TeacherResponseDTO> teachers =
        teacherRepository.findByNameContainingIgnoreCase(name).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    log.info("Found {} teachers matching name: {}", teachers.size(), name);
    return teachers;
  }

  @Override
  public Page<TeacherResponseDTO> searchTeacherByName(String name, Pageable pageable) {
    log.info(
        "Searching teachers by name: {} with pagination - page: {}, size: {}",
        name,
        pageable.getPageNumber(),
        pageable.getPageSize());
    Page<Teacher> teacherPage = teacherRepository.findByNameContainingIgnoreCase(name, pageable);
    Page<TeacherResponseDTO> response = teacherPage.map(this::mapToResponse);
    log.info(
        "Found {} teachers matching name: {} on page {} of {}",
        response.getNumberOfElements(),
        name,
        pageable.getPageNumber(),
        teacherPage.getTotalPages());
    return response;
  }

  @Override
  public void deleteTeacher(Long id) {
    log.info("Deleting teacher with ID: {}", id);
    Teacher teacher =
        teacherRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
    teacherRepository.delete(teacher);
    log.info("Teacher deleted successfully with ID: {}", id);
  }

  private Teacher mapToEntity(TeacherRequestDTO dto) {
    Teacher teacher = new Teacher();
    teacher.setName(dto.getName());
    teacher.setEmail(dto.getEmail());
    teacher.setSubject(dto.getSubject());
    teacher.setAddress(dto.getAddress());
    teacher.setDepartment(dto.getDepartment());
    teacher.setAge(dto.getAge());
    teacher.setPhone(dto.getPhone());
    return teacher;
  }

  private TeacherResponseDTO mapToResponse(Teacher teacher) {

    TeacherResponseDTO dto = new TeacherResponseDTO();
    dto.setId(teacher.getId());
    dto.setName(teacher.getName());
    dto.setEmail(teacher.getEmail());
    dto.setSubject(teacher.getSubject());
    dto.setAddress(teacher.getAddress());
    dto.setDepartment(teacher.getDepartment());
    dto.setAge(teacher.getAge());
    dto.setPhone(teacher.getPhone());

    if (teacher.getStudents() != null) {
      dto.setStudentIds(
          teacher.getStudents().stream().map(Student::getId).collect(Collectors.toList()));
    }
    return dto;
  }
}
