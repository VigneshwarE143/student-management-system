package com.example.StudentMangamentBackEnd.Services.student;

import com.example.StudentMangamentBackEnd.DTO.student.*;
import com.example.StudentMangamentBackEnd.exception.ResourceNotFoundException;
import com.example.StudentMangamentBackEnd.model.Student;
import com.example.StudentMangamentBackEnd.model.Teacher;
import com.example.StudentMangamentBackEnd.repository.StudentRepository;
import com.example.StudentMangamentBackEnd.repository.TeacherRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StudentServiceImpl implements StudentService {

  private final StudentRepository studentRepository;
  private final TeacherRepository teacherRepository;

  public StudentServiceImpl(
      StudentRepository studentRepository, TeacherRepository teacherRepository) {

    this.studentRepository = studentRepository;
    this.teacherRepository = teacherRepository;
  }

  @Override
  public StudentResponseDTO createStudent(StudentRequestDTO dto) {
    log.info("Creating student with email: {}", dto.getEmail());

    Student student = mapToEntity(dto);

    if (dto.getTeacherId() != null) {
      Teacher teacher =
          teacherRepository
              .findById(dto.getTeacherId())
              .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
      student.setTeacher(teacher);
    }

    StudentResponseDTO response = mapToResponse(studentRepository.save(student));
    log.info("Student created successfully with ID: {}", response.getId());
    return response;
  }

  @Override
  public StudentResponseDTO updateStudent(Long id, StudentRequestDTO dto) {
    log.info("Updating student with ID: {}", id);

    Student student =
        studentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

    student.setName(dto.getName());
    student.setEmail(dto.getEmail());
    student.setStudentId(dto.getStudentId());
    student.setPhone(dto.getPhone());
    student.setAddress(dto.getAddress());
    student.setDepartment(dto.getDepartment());
    student.setEnrollmentDate(dto.getEnrollmentDate());
    student.setAge(dto.getAge());
    student.setGrade(dto.getGrade());

    if (dto.getTeacherId() != null) {
      Teacher teacher =
          teacherRepository
              .findById(dto.getTeacherId())
              .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
      student.setTeacher(teacher);
    }

    StudentResponseDTO response = mapToResponse(studentRepository.save(student));
    log.info("Student updated successfully with ID: {}", id);
    return response;
  }

  @Override
  public StudentResponseDTO getStudentById(Long id) {
    log.info("Fetching student with ID: {}", id);
    StudentResponseDTO response =
        mapToResponse(
            studentRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found")));
    log.info("Student fetched successfully with ID: {}", id);
    return response;
  }

  @Override
  public List<StudentResponseDTO> getAllStudents() {
    log.info("Fetching all students");
    List<StudentResponseDTO> students =
        studentRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    log.info("Fetched {} students", students.size());
    return students;
  }

  @Override
  public Page<StudentResponseDTO> getAllStudents(Pageable pageable) {
    log.info(
        "Fetching all students with pagination - page: {}, size: {}",
        pageable.getPageNumber(),
        pageable.getPageSize());
    Page<Student> studentPage = studentRepository.findAll(pageable);
    Page<StudentResponseDTO> response = studentPage.map(this::mapToResponse);
    log.info(
        "Fetched {} students from page {} of {}",
        response.getNumberOfElements(),
        pageable.getPageNumber(),
        studentPage.getTotalPages());
    return response;
  }

  @Override
  public List<StudentResponseDTO> searchStudentByName(String name) {

    log.info("Searching students by name: {}", name);

    List<StudentResponseDTO> students =
        studentRepository.findByNameContainingIgnoreCase(name).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());

    log.info("Found {} students matching name: {}", students.size(), name);

    return students;
  }

  @Override
  public Page<StudentResponseDTO> searchStudentByName(String name, Pageable pageable) {
    log.info(
        "Searching students by name: {} with pagination - page: {}, size: {}",
        name,
        pageable.getPageNumber(),
        pageable.getPageSize());
    Page<Student> studentPage = studentRepository.findByNameContainingIgnoreCase(name, pageable);
    Page<StudentResponseDTO> response = studentPage.map(this::mapToResponse);
    log.info(
        "Found {} students matching name: {} on page {} of {}",
        response.getNumberOfElements(),
        name,
        pageable.getPageNumber(),
        studentPage.getTotalPages());
    return response;
  }

  @Override
  public StudentResponseDTO assignTeacher(Long studentId, Long teacherId) {
    log.info("Assigning teacher ID: {} to student ID: {}", teacherId, studentId);

    Student student =
        studentRepository
            .findById(studentId)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

    Teacher teacher =
        teacherRepository
            .findById(teacherId)
            .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

    student.setTeacher(teacher);
    StudentResponseDTO response = mapToResponse(studentRepository.save(student));
    log.info("Teacher assigned successfully to student ID: {}", studentId);
    return response;
  }

  @Override
  public StudentResponseDTO removeTeacher(Long studentId) {
    log.info("Removing teacher from student ID: {}", studentId);

    Student student =
        studentRepository
            .findById(studentId)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

    student.setTeacher(null);
    StudentResponseDTO response = mapToResponse(studentRepository.save(student));
    log.info("Teacher removed successfully from student ID: {}", studentId);
    return response;
  }

  @Override
  public void deleteStudent(Long id) {
    log.info("Deleting student with ID: {}", id);
    Student student =
        studentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    studentRepository.delete(student);
    log.info("Student deleted successfully with ID: {}", id);
  }

  @Override
  public StudentResponseDTO assignTeacherToStudent(Long studentId, Long teacherId) {
    return assignTeacher(studentId, teacherId);
  }

  @Override
  public StudentResponseDTO removeTeacherFromStudent(Long studentId) {
    return removeTeacher(studentId);
  }

  private Student mapToEntity(StudentRequestDTO dto) {
    Student student = new Student();
    student.setName(dto.getName());
    student.setEmail(dto.getEmail());
    student.setStudentId(dto.getStudentId());
    student.setPhone(dto.getPhone());
    student.setAddress(dto.getAddress());
    student.setDepartment(dto.getDepartment());
    student.setEnrollmentDate(dto.getEnrollmentDate());
    student.setAge(dto.getAge());
    student.setGrade(dto.getGrade());
    return student;
  }

  private StudentResponseDTO mapToResponse(Student student) {

    StudentResponseDTO dto = new StudentResponseDTO();
    dto.setId(student.getId());
    dto.setName(student.getName());
    dto.setEmail(student.getEmail());
    dto.setStudentId(student.getStudentId());
    dto.setPhone(student.getPhone());
    dto.setAddress(student.getAddress());
    dto.setDepartment(student.getDepartment());
    dto.setEnrollmentDate(student.getEnrollmentDate());
    dto.setAge(student.getAge());
    dto.setGrade(student.getGrade());

    if (student.getTeacher() != null) {
      dto.setTeacherId(student.getTeacher().getId());
      dto.setTeacherName(student.getTeacher().getName());
    }
    return dto;
  }
}
