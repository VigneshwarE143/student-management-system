package com.example.StudentMangamentBackEnd.repository;

import com.example.StudentMangamentBackEnd.model.Admin;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

  Optional<Admin> findByEmail(String email);

  Page<Admin> findAll(Pageable pageable);
}
