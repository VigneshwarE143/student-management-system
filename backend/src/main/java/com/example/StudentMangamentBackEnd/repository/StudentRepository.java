package com.example.StudentMangamentBackEnd.repository;

import com.example.StudentMangamentBackEnd.model.Student;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

  Page<Student> findAll(Pageable pageable);

  Page<Student> findByNameContainingIgnoreCase(String name, Pageable pageable);

  List<Student> findByNameContainingIgnoreCase(String name);
}
