import apiClient from "@/api/client";
import forecastAPI from "../api";
import { defaultParams } from "../constants/defaultParams";

jest.mock("@/api/client", () => ({
  get: jest.fn(),
}));

describe("forecastAPI", () => {
  it("should call apiClient.get with correct endpoint and params", async () => {
    const mockData = { temperature: 25 };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await forecastAPI.getForecast();

    expect(apiClient.get).toHaveBeenCalledWith("/v1/forecast", {
      params: defaultParams,
    });

    expect(result).toEqual(mockData);
  });
});
