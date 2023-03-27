package com.example.demo.integration;

import com.example.demo.student.Gender;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class StudentIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StudentRepository studentRepository;

    private final Faker faker = new Faker();
    @Test
    void canRegisterNewStudent() throws Exception {
        //given
        String name = String.format("%s %s",
                faker.name().firstName(),
                faker.name().lastName()
        );
        String email = faker.name().lastName() + "@google.com";
        Student student = new Student(
                name,
                email,
                Gender.FEMALE
        );
        //when
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(student)));

        //then
        resultActions.andExpect(status().isOk());
        List<Student> students = studentRepository.findAll();

        assertThat(students)
                .usingElementComparatorIgnoringFields("id")
                .contains(student);
    }
    @Test
    void canDeleteStudent() throws Exception {
        //given
        String name = String.format("%s %s",
                faker.name().firstName(),
                faker.name().lastName()
        );
        String email = faker.name().lastName() + "@google.com";
        Student student = new Student(
                name,
                email,
                Gender.FEMALE
        );

        //when
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student)))
                        .andExpect(status().isOk());


        List<Student> students = studentRepository.findAll();

        String IdOfStudent = null;
        for (Student studentInList: students) {
            if (studentInList.getEmail().equals(email)) {
                IdOfStudent = studentInList.getId().toString();
            }
        }

        if (IdOfStudent == null) throw new Exception("ID of student not found");
        ResultActions resultActions1 = mockMvc.perform(delete("/api/v1/students" + "/" + IdOfStudent));
        resultActions1.andExpect(status().isOk());

        //then
        List<Student> studentsAfterDeletion = studentRepository.findAll();

        assertThat(studentsAfterDeletion)
                .usingElementComparatorIgnoringFields("id")
                .doesNotContain(student);
    }
}
