import { mount } from "@vue/test-utils";
import TimeSelect from "../TimeSelect.vue";

describe("TimeSelect.vue", () => {
  it("renders with initial modelValue and highlights correct button", () => {
    const wrapper = mount(TimeSelect, {
      props: {
        modelValue: "now",
      },
    });

    expect(wrapper.find(".nowBtn").classes()).toContain("activeOption");
    expect(wrapper.find(".todayBtn").classes()).not.toContain("activeOption");
    expect(wrapper.find(".dateInput").classes()).not.toContain("activeOption");
  });

  it('emits update:modelValue when "Now" is clicked', async () => {
    const wrapper = mount(TimeSelect, {
      props: {
        modelValue: "today",
      },
    });

    await wrapper.find(".nowBtn").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["now"]);
  });

  it('emits update:modelValue when "Today" is clicked', async () => {
    const wrapper = mount(TimeSelect, {
      props: {
        modelValue: "now",
      },
    });

    await wrapper.find(".todayBtn").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["today"]);
    expect(wrapper.find(".todayBtn").classes()).toContain("activeOption");
    expect(wrapper.find(".nowBtn").classes()).not.toContain("activeOption");
    expect(wrapper.find('input[type="date"]').classes()).not.toContain(
      "activeOption"
    );
  });

  it("emits update:modelValue and sets date active when a date is selected", async () => {
    const wrapper = mount(TimeSelect, {
      props: {
        modelValue: "now",
      },
    });

    const input = wrapper.find('input[type="date"]');
    await input.setValue("2024-12-25");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["2024-12-25"]);
    expect(input.classes()).toContain("activeOption");
    expect(wrapper.find(".nowBtn").classes()).not.toContain("activeOption");
    expect(wrapper.find(".todayBtn").classes()).not.toContain("activeOption");
  });
});
