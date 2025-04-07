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
});
