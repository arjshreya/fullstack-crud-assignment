import axios from "axios";

const API_URL = "http://localhost:8081/api/students";

export const getStudents = (page = 0, size = 5, sort = "id,asc") => {
  return axios.get(API_URL, {
    params: { page, size, sort }
  });
};
export const updateStudent = (id, student) => {
  return axios.put(`${API_URL}/${id}`, student);
};
export const addStudent = (student) => {
  return axios.post(API_URL, student);
};

export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
