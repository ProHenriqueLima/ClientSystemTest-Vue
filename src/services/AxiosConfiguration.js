import axios from "axios";

export const http = axios.create({
  baseURL: "https://testportfolio01.herokuapp.com/api/",
  JSON: true,
});
