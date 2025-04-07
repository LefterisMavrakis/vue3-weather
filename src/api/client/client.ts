import axios from "axios";

const openMeteoURL = "https://api.open-meteo.com";

const apiClient = axios.create({
  baseURL: openMeteoURL,
  headers: {
    accept: "application/json",
  },
});

export default apiClient;
