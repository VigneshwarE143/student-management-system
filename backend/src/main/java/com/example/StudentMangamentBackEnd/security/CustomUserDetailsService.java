package com.example.StudentMangamentBackEnd.security;

import com.example.StudentMangamentBackEnd.model.Admin;
import com.example.StudentMangamentBackEnd.model.Teacher;
import com.example.StudentMangamentBackEnd.repository.AdminRepository;
import com.example.StudentMangamentBackEnd.repository.TeacherRepository;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final AdminRepository adminRepository;
  private final TeacherRepository teacherRepository;

  public CustomUserDetailsService(
      AdminRepository adminRepository, TeacherRepository teacherRepository) {
    this.adminRepository = adminRepository;
    this.teacherRepository = teacherRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    Admin admin = adminRepository.findByEmail(email).orElse(null);
    if (admin != null) {
      return new User(
          admin.getEmail(), admin.getPassword(), List.of(new SimpleGrantedAuthority("ADMIN")));
    }

    Teacher teacher = teacherRepository.findByEmail(email).orElse(null);
    if (teacher != null) {
      return new User(
          teacher.getEmail(),
          teacher.getPassword(),
          List.of(new SimpleGrantedAuthority("TEACHER")));
    }

    throw new UsernameNotFoundException("User not found");
  }
}
