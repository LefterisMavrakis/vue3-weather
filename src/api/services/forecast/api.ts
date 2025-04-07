import apiClient from "@/api/client";
import { defaultParams } from "./constants/defaultParams";
import { ApiForecastResponse } from "./types";

const forecastEndpoint = "/v1/forecast";

const forecastAPI = {
  getForecast: async () => {
    return apiClient
      .get(forecastEndpoint, {
        params: {
          ...defaultParams,
        },
      })
      .then(({ data }: { data: ApiForecastResponse }) => {
        return data;
      });
  },
};

export default forecastAPI;
