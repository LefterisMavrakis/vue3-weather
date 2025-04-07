import apiClient from "@/api/client";

const forecastEndpoint = "/v1/forecast";

const forecastAPI = {
  getForecast: () => {
    return apiClient
      .get(forecastEndpoint, {
        params: {
          latitude: "40.5872",
          longitude: "22.9482",
        },
      })
      .then(({ data }: { data: any }) => {
        return data;
      });
  },
};

export default forecastAPI;
