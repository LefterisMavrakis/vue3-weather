import { mount } from "@vue/test-utils";
import TemperatureWidget from "../TemperatureWidget.vue";

jest.mock("@/api/services/forecast/constants/weatherIconsMapping", () => ({
  weatherIcons: {
    "0": {
      day: {
        description: "Cloudy Sky",
        image: "day-cloudy-sky.png",
      },
      night: {
        description: "Cloudy Night",
        image: "night-cloudy-sky.png",
      },
    },
    "1": {
      day: {
        description: "Clear Sky",
        image: "day-clear-sky.png",
      },
      night: {
        description: "Clear Night",
        image: "night-clear-sky.png",
      },
    },
  },
}));

describe("TemperatureWidget.vue", () => {
  it("renders temperature and label correctly for day", () => {
    const wrapper = mount(TemperatureWidget, {
      props: {
        temperature: 25,
        unit: "°C",
        weather_code: 1,
        is_day: true,
      },
    });

    expect(wrapper.text()).toContain("25 °C");
    expect(wrapper.text()).toContain("Clear Sky");
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("day-clear-sky.png");
  });

  it("renders temperature and label correctly for night", () => {
    const wrapper = mount(TemperatureWidget, {
      props: {
        temperature: 18,
        unit: "°C",
        weather_code: 1,
        is_day: false,
      },
    });

    expect(wrapper.text()).toContain("18 °C");
    expect(wrapper.text()).toContain("Clear Night");
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("night-clear-sky.png");
  });

  it("handles missing weather code gracefully", () => {
    const wrapper = mount(TemperatureWidget, {
      props: {
        temperature: 20,
        unit: "°C",
        weather_code: 999,
        is_day: true,
      },
    });

    expect(wrapper.text()).toContain("20 °C");
    expect(wrapper.text()).toContain("Cloudy Sky");
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("day-cloudy-sky.png");
  });
});
