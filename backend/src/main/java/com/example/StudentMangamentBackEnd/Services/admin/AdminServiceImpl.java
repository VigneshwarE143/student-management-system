package com.example.StudentMangamentBackEnd.Services.admin;

import com.example.StudentMangamentBackEnd.DTO.admin.*;
import com.example.StudentMangamentBackEnd.exception.BadRequestException;
import com.example.StudentMangamentBackEnd.exception.ResourceNotFoundException;
import com.example.StudentMangamentBackEnd.model.Admin;
import com.example.StudentMangamentBackEnd.repository.AdminRepository;
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
public class AdminServiceImpl implements AdminService {

  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  public AdminServiceImpl(
      AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {

    this.adminRepository = adminRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
  }

  @Override
  public AdminResponseDTO createAdmin(AdminRequestDTO dto) {
    log.info("Creating admin with email: {}", dto.getEmail());

    adminRepository
        .findByEmail(dto.getEmail())
        .ifPresent(
            a -> {
              throw new BadRequestException("Email already exists");
            });

    Admin admin = new Admin();
    admin.setName(dto.getName());
    admin.setEmail(dto.getEmail());
    admin.setPassword(passwordEncoder.encode(dto.getPassword()));

    AdminResponseDTO response = mapToResponse(adminRepository.save(admin));
    log.info("Admin created successfully with ID: {}", response.getId());
    return response;
  }

  @Override
  public AdminLoginResponseDTO loginAdmin(AdminLoginDTO dto) {
    log.info("Admin login attempt for email: {}", dto.getEmail());

    Admin admin =
        adminRepository
            .findByEmail(dto.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid email"));

    if (!passwordEncoder.matches(dto.getPassword(), admin.getPassword())) {
      log.warn("Failed login attempt for email: {}", dto.getEmail());
      throw new ResourceNotFoundException("Invalid password");
    }

    String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN");
    log.info("Admin logged in successfully: {}", dto.getEmail());
    return new AdminLoginResponseDTO(token);
  }

  @Override
  public List<AdminResponseDTO> getAllAdmins() {
    log.info("Fetching all admins");
    List<AdminResponseDTO> admins =
        adminRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    log.info("Fetched {} admins", admins.size());
    return admins;
  }

  @Override
  public Page<AdminResponseDTO> getAllAdmins(Pageable pageable) {
    log.info(
        "Fetching all admins with pagination - page: {}, size: {}",
        pageable.getPageNumber(),
        pageable.getPageSize());
    Page<Admin> adminPage = adminRepository.findAll(pageable);
    Page<AdminResponseDTO> response = adminPage.map(this::mapToResponse);
    log.info(
        "Fetched {} admins from page {} of {}",
        response.getNumberOfElements(),
        pageable.getPageNumber(),
        adminPage.getTotalPages());
    return response;
  }

  @Override
  public AdminResponseDTO getAdminById(Long id) {
    log.info("Fetching admin with ID: {}", id);
    AdminResponseDTO response =
        mapToResponse(
            adminRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found")));
    log.info("Admin fetched successfully with ID: {}", id);
    return response;
  }

  @Override
  public AdminResponseDTO updateAdmin(Long id, AdminUpdateDTO dto) {
    log.info("Updating admin with ID: {}", id);

    Admin admin =
        adminRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

    if (!admin.getEmail().equalsIgnoreCase(dto.getEmail())) {
      adminRepository
          .findByEmail(dto.getEmail())
          .ifPresent(
              existing -> {
                throw new BadRequestException("Email already exists");
              });
    }

    admin.setName(dto.getName());
    admin.setEmail(dto.getEmail());

    if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
      admin.setPassword(passwordEncoder.encode(dto.getPassword()));
    }

    AdminResponseDTO response = mapToResponse(adminRepository.save(admin));
    log.info("Admin updated successfully with ID: {}", response.getId());
    return response;
  }

  @Override
  public void deleteAdmin(Long id) {
    log.info("Deleting admin with ID: {}", id);
    Admin admin =
        adminRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    adminRepository.delete(admin);
    log.info("Admin deleted successfully with ID: {}", id);
  }

  private AdminResponseDTO mapToResponse(Admin admin) {
    AdminResponseDTO dto = new AdminResponseDTO();
    dto.setId(admin.getId());
    dto.setName(admin.getName());
    dto.setEmail(admin.getEmail());
    return dto;
  }
}
