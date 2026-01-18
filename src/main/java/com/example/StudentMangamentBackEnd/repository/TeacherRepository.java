package com.example.StudentMangamentBackEnd.repository;

import com.example.StudentMangamentBackEnd.model.Teacher;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

  Optional<Teacher> findByEmail(String email);

  Page<Teacher> findAll(Pageable pageable);

  Page<Teacher> findByNameContainingIgnoreCase(String name, Pageable pageable);

  Optional<Teacher> findByNameContainingIgnoreCase(String name);
}
