package com.example.StudentMangamentBackEnd.Controllers;

import com.example.StudentMangamentBackEnd.DTO.admin.AdminLoginDTO;
import com.example.StudentMangamentBackEnd.DTO.admin.AdminLoginResponseDTO;
import com.example.StudentMangamentBackEnd.DTO.admin.AdminRequestDTO;
import com.example.StudentMangamentBackEnd.DTO.admin.AdminResponseDTO;
import com.example.StudentMangamentBackEnd.DTO.admin.AdminUpdateDTO;
import com.example.StudentMangamentBackEnd.Services.admin.AdminService;
import com.example.StudentMangamentBackEnd.response.ApiResponse;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

  private final AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  // Api response is used for better presentation and front end mostly reads objects "data "
  @PostMapping
  public ApiResponse<AdminResponseDTO> createAdmin(@Valid @RequestBody AdminRequestDTO dto) {

    return new ApiResponse<>(
        201, "Admin created successfully", adminService.createAdmin(dto), LocalDateTime.now());
  }

  @PostMapping("/login")
  public ApiResponse<AdminLoginResponseDTO> loginAdmin(@Valid @RequestBody AdminLoginDTO dto) {

    AdminLoginResponseDTO response = adminService.loginAdmin(dto);

    return new ApiResponse<>(200, "Login successful", response, LocalDateTime.now());
  }

  @GetMapping
  public ApiResponse<Object> getAllAdmins(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id,asc") String sort) {

    String[] sortParams = sort.split(",");
    Sort.Direction direction = Sort.Direction.fromString(sortParams[1].toUpperCase());
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    Page<AdminResponseDTO> response = adminService.getAllAdmins(pageable);

    return new ApiResponse<>(200, "Admins fetched successfully", response, LocalDateTime.now());
  }

  @GetMapping("/{id}")
  public ApiResponse<AdminResponseDTO> getAdminById(@PathVariable Long id) {

    return new ApiResponse<>(
        200, "Admin fetched successfully", adminService.getAdminById(id), LocalDateTime.now());
  }

  @PutMapping("/{id}")
  public ApiResponse<AdminResponseDTO> updateAdmin(
      @PathVariable Long id, @Valid @RequestBody AdminUpdateDTO dto) {

    return new ApiResponse<>(
        200, "Admin updated successfully", adminService.updateAdmin(id, dto), LocalDateTime.now());
  }

  @DeleteMapping("/{id}")
  public ApiResponse<Void> deleteAdmin(@PathVariable Long id) {

    adminService.deleteAdmin(id);

    return new ApiResponse<>(200, "Admin deleted successfully", null, LocalDateTime.now());
  }
}
