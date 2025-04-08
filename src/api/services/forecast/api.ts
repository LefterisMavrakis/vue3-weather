import apiClient from "@/api/client";
import { defaultParams } from "./constants/defaultParams";
import {
  ApiForecastAvailableRequestParams,
  ApiForecastResponse,
} from "./types";

const forecastEndpoint = "/v1/forecast";

const forecastAPI = {
  getForecast: async (params?: ApiForecastAvailableRequestParams) => {
    return apiClient
      .get(forecastEndpoint, {
        params: {
          ...defaultParams,
          ...params,
        },
      })
      .then(({ data }: { data: ApiForecastResponse }) => {
        return data;
      });
  },
};

export default forecastAPI;
