package com.assignment.backend.service;

import com.assignment.backend.model.Student;
import com.assignment.backend.dto.StudentDTO;
import com.assignment.backend.repository.StudentRepository;
import com.assignment.backend.exception.ResourceNotFoundException;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<StudentDTO> getAllStudents() {
        return repository.findAll()
                .stream()
                .map(StudentDTO::new)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long id) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return new StudentDTO(student);
    }

    public StudentDTO addStudent(StudentDTO dto) {
        Student student = new Student(dto.getName(), dto.getEmail(), dto.getCourse(), dto.getMobile());
        Student saved = repository.save(student);
        return new StudentDTO(saved);
    }

    public StudentDTO updateStudent(Long id, StudentDTO dto) {
        Student existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());
        existing.setCourse(dto.getCourse());
        existing.setMobile(dto.getMobile());

        Student updated = repository.save(existing);
        return new StudentDTO(updated);
    }

    public void deleteStudent(Long id) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        repository.delete(student);
    }

    public Page<StudentDTO> getStudentsPaged(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return repository.findAll(pageable)
                .map(StudentDTO::new);
    }

    public List<StudentDTO> searchStudents(String name, String course) {
        List<Student> students;

        if (name != null && course != null) {
            students = repository.findByNameContainingIgnoreCaseAndCourseIgnoreCase(name, course);
        } else if (name != null) {
            students = repository.findByNameContainingIgnoreCase(name);
        } else if (course != null) {
            students = repository.findByCourseIgnoreCase(course);
        } else {
            students = repository.findAll();
        }

        if (students.isEmpty()) {
            throw new ResourceNotFoundException("Student not found with given search criteria");
        }

        return students.stream()
                .map(StudentDTO::new)
                .collect(Collectors.toList());
    }

}
