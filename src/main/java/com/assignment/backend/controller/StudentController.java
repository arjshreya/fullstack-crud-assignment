package com.assignment.backend.controller;
import com.assignment.backend.service.StudentService;
import com.assignment.backend.dto.StudentDTO;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/paged")
    public Page<StudentDTO> getStudentsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return service.getStudentsPaged(page, size, sortBy, direction);
    }
    @GetMapping("/search")
    public List<StudentDTO> searchStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String course) {

        return service.searchStudents(name, course);
    }

    // Get all students
    @GetMapping
    public List<StudentDTO> getAllStudents() {

        return service.getAllStudents();
    }

    // Get student by ID
    @GetMapping("/{id}")
    public StudentDTO getStudentById(@PathVariable Long id) {

        return service.getStudentById(id);
    }

    // Add student
    @PostMapping
    public StudentDTO addStudent(@Valid @RequestBody StudentDTO dto) {

        return service.addStudent(dto);
    }

    // Update student
    @PutMapping("/{id}")
    public StudentDTO updateStudent(@PathVariable Long id,
                                 @Valid @RequestBody StudentDTO dto) {
        return service.updateStudent(id, dto);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
    }


}
