import { mount } from "@vue/test-utils";
import WeatherConditionsWidget from "../WeatherConditionsWidget.vue";

describe("WeatherConditionsWidget.vue", () => {
  it("renders all sections with correct labels and values", () => {
    const props = {
      feels_like_temp: "18°C",
      wind_speed: "12 km/h",
      wind_gust: "20 km/h",
      wind_direction: "NW",
      humidity: "60%",
      pressure: "1015 hPa",
    };

    const wrapper = mount(WeatherConditionsWidget, {
      props,
    });

    const expectedLabels = [
      "Feels like",
      "Wind",
      "Wind Gust",
      "Wind Deg",
      "Humidity",
      "Pressure",
    ];

    const expectedValues = Object.values(props);

    const labelEls = wrapper.findAll(".label");
    const valueEls = wrapper.findAll(".value");

    expect(labelEls.length).toBe(6);
    expect(valueEls.length).toBe(6);

    expectedLabels.forEach((label, i) => {
      expect(labelEls[i].text()).toBe(label);
    });

    expectedValues.forEach((value, i) => {
      expect(valueEls[i].text()).toBe(value);
    });
  });
});
