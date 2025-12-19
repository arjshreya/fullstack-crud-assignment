package com.assignment.backend.repository;

import com.assignment.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByNameContainingIgnoreCase(String name);

    List<Student> findByCourseIgnoreCase(String course);

    List<Student> findByNameContainingIgnoreCaseAndCourseIgnoreCase(
            String name, String course);
}
