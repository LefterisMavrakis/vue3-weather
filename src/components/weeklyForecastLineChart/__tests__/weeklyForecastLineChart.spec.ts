import { shallowMount, flushPromises } from "@vue/test-utils";
import forecastAPI from "@/api/services/forecast";
import { mockedForecast } from "@/api/services/forecast/__mocks__/forecast";
import WeeklyForecastLineChart from "../WeeklyForecastLineChart.vue";

describe("WeeklyForecastLineChart.vue", () => {
  jest.spyOn(forecastAPI, "getForecast").mockResolvedValue(mockedForecast);

  describe("when mounted", () => {
    it("makes call to fetch forecast data with the provided forecast_days prop", async () => {
      const wrapper = shallowMount(WeeklyForecastLineChart, {
        props: {
          forecast_days: 10,
        },
      });

      expect(wrapper.find(".skeleton").exists()).toBe(true);

      await flushPromises();

      expect(forecastAPI.getForecast).toHaveBeenCalledWith({
        forecast_days: 10,
      });

      expect(wrapper.find(".skeleton").exists()).toBe(false);
    });

    describe("and the forecast_days prop does not exist", () => {
      it("makes call to fetch forecast data for seven days", () => {
        shallowMount(WeeklyForecastLineChart);

        expect(forecastAPI.getForecast).toHaveBeenCalledWith({
          forecast_days: 7,
        });
      });
    });
  });
});
