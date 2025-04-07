import forecastAPI from "../api";
import apiClient from "@/api/client";

jest.mock("@/api/client", () => ({
  get: jest.fn(),
}));

describe("forecastAPI", () => {
  it("should call apiClient.get with correct endpoint and params", async () => {
    const mockData = { temperature: 25 };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await forecastAPI.getForecast();

    expect(apiClient.get).toHaveBeenCalledWith("/v1/forecast", {
      params: {
        latitude: "40.5872",
        longitude: "22.9482",
      },
    });

    expect(result).toEqual(mockData);
  });
});
