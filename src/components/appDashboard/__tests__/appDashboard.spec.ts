import { mount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import useForecastStore from "@/stores/forecast";
import forecastAPI from "@/api/services/forecast";
import { mockedForecast } from "@/api/services/forecast/__mocks__/forecast";
import AppDashboard from "../AppDashboard.vue";

jest.mock(
  "@/components/weeklyForecastLineChart/WeeklyForecastLineChart.vue",
  () => ({
    __esModule: true,
    default: {
      name: "MockedLineChart",
      template: '<div class="mocked-line-chart">Mocked Line chart</div>',
    },
  })
);

jest.spyOn(forecastAPI, "getForecast").mockResolvedValue(mockedForecast);

describe("AppDashboard.vue", () => {
  let forecastStore: ReturnType<typeof useForecastStore>;
  let wrapper: VueWrapper;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2025-04-14"));
    jest.clearAllMocks();

    wrapper = mount(AppDashboard, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    forecastStore = useForecastStore();
  });

  it("makes call to fetch forecast data", async () => {
    expect(forecastStore.fetchForecast).toHaveBeenCalledWith({
      end_date: "2025-04-14",
      start_date: "2025-04-14",
    });

    expect(forecastAPI.getForecast).toHaveBeenCalled();
  });

  it("renders dashboard widgets", async () => {
    expect(wrapper.find(".temperatureWidgetWrapper").exists()).toBe(true);
    expect(wrapper.find(".weatherConditionsWrapper").exists()).toBe(true);
    expect(wrapper.find(".timePresetSelect").exists()).toBe(true);
    expect(wrapper.find(".mocked-line-chart").exists()).toBe(true);
  });

  describe("when time preset select changes", () => {
    it("makes request to fetch new forecast data", async () => {
      const dateInput = wrapper.find('input[type="date"]');

      // simulate date change
      await dateInput.setValue("2025-05-25");

      expect(forecastStore.fetchForecast).toHaveBeenCalledTimes(2);

      expect(forecastStore.fetchForecast).toHaveBeenNthCalledWith(2, {
        start_date: "2025-05-25",
        end_date: "2025-05-25",
      });

      // simulate today button click
      const todayBtn = wrapper.find(".todayBtn");

      await todayBtn.trigger("click");

      expect(forecastStore.fetchForecast).toHaveBeenCalledTimes(3);

      expect(forecastStore.fetchForecast).toHaveBeenNthCalledWith(3, {
        start_date: "2025-04-14",
        end_date: "2025-04-14",
      });
    });
  });
});
