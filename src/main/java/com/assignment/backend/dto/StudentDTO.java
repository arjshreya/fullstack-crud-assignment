package com.assignment.backend.dto;

import jakarta.validation.constraints.*;

public class StudentDTO {
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Course cannot be empty")
    private String course;

    @NotBlank(message = "Mobile number cannot be empty")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Mobile number must be exactly 10 digits"
    )
    private String mobile;



    public StudentDTO() {}

    public StudentDTO(String name, String email, String course, String mobile) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.mobile = mobile;
    }

    public StudentDTO(com.assignment.backend.model.Student student) {
        this.name = student.getName();
        this.email = student.getEmail();
        this.course = student.getCourse();
        this.mobile = student.getMobile();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
}
