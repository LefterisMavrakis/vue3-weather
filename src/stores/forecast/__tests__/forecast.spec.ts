import forecastAPI from "@/api/services/forecast";
import { setActivePinia, createPinia } from "pinia";
import { mockedForecast } from "@/api/services/forecast/__mocks__/forecast";
import useForecastStore from "../forecast";

describe("useForecastStore", () => {
  let store: ReturnType<typeof useForecastStore>;

  beforeEach(async () => {
    jest.spyOn(forecastAPI, "getForecast").mockResolvedValue(mockedForecast);

    setActivePinia(createPinia());
    store = useForecastStore();
  });

  describe("fetchForecast", () => {
    it("makes the correct request and sets state", async () => {
      expect(store.isForecastLoading).toBe(true);

      await store.fetchForecast();

      expect(forecastAPI.getForecast).toHaveBeenCalled();

      expect(store.forecastData).toEqual(mockedForecast);

      expect(store.isForecastLoading).toBe(false);
    });
  });

  describe("computed properties", () => {
    beforeEach(async () => {
      await store.fetchForecast();
    });

    it("computes current temperature correctly", async () => {
      expect(store.currentTemperature).toBe("9.6 °C");
    });

    it("computes current feels like temperature correctly", async () => {
      expect(store.currentFeelsLikeTemperature).toBe("6.3 °C");
    });

    it("computes current humidity correctly", async () => {
      expect(store.currentHumidity).toBe("53 %");
    });

    it("computes average daily temperature correctly", async () => {
      expect(store.averageDailyTemperature).toBe("Not available");
    });

    it("computes dominant wind direction correctly", async () => {
      expect(store.dominantWindDirection).toBe("104 °");
    });
  });
});
