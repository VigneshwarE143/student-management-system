package com.example.StudentMangamentBackEnd.Services.admin;

import com.example.StudentMangamentBackEnd.DTO.admin.*;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

  AdminResponseDTO createAdmin(AdminRequestDTO dto);

  AdminLoginResponseDTO loginAdmin(AdminLoginDTO dto);

  List<AdminResponseDTO> getAllAdmins();

  Page<AdminResponseDTO> getAllAdmins(Pageable pageable);

  AdminResponseDTO getAdminById(Long id);

  AdminResponseDTO updateAdmin(Long id, AdminUpdateDTO dto);

  void deleteAdmin(Long id);
}
