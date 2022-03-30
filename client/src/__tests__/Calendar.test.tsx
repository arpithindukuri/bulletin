import React from "react";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import ShowCalendar from "../components/ShowCalendar";
import Calendar from "../pages/Calendar/Calendar";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    board_id: "g7HGuvfnGe3nhQgAF8qY",
  }),
}));

describe("testing <Calendar /> component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    </Provider>
  );

  it("should render calendar properly", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("should render ShowCalendar properly", () => {
    const showCalendar = mount(
      <ShowCalendar
        events={[
          {
            id: "NWbV0lZqOAo7q8CzwUye",
            title: "My Birthday",
            start: "2022-03-28T01:00:00",
            end: "2022-03-28T02:00:00",
          },
        ]}
        setEvents={() => {}}
      />
    );
    expect(showCalendar.getElements()).toMatchSnapshot();
  });

  it("should show window alert", () => {
    const showCalendar = mount(
      <ShowCalendar
        events={[
          {
            id: "NWbV0lZqOAo7q8CzwUye",
            title: "My Birthday",
            start: "2022-03-28T01:00:00",
            end: "2022-03-28T02:00:00",
          },
        ]}
        setEvents={() => {}}
      />
    );

    showCalendar.find("a").find(".fc-daygrid-event").simulate("click");
    expect(window.confirm).toBeTruthy();
  });

  it("should open a modal", () => {
    wrapper.find("button").find("#calendar-add-event-button").simulate("click");
    expect(wrapper.find("#calendar-add-event-modal").exists()).toBeTruthy();
  });

  describe("should have add event modal open", () => {
    beforeAll(() => {
      wrapper
        .find("button")
        .find("#calendar-add-event-button")
        .simulate("click");
    });

    it("should change event name field value", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-name")
        .simulate("change", {
          target: { value: "Test Event" },
        });
      expect(
        wrapper
          .find("input")
          .find("#calendar-add-event-modal-event-name")
          .get(0).props.value
      ).toEqual("Test Event");
    });

    it("should show event name error", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-name")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper
        .find("button")
        .find("#calendar-add-event-modal-save-button")
        .simulate("click");
      expect(
        wrapper
          .find("p")
          .find("#calendar-add-event-modal-event-name-helper-text")
          .text()
      ).toEqual("Enter an event name.");
    });

    it("should change event date field value", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-date")
        .simulate("change", {
          target: { value: "03,29,2022" },
        });
      expect(
        wrapper
          .find("input")
          .find("#calendar-add-event-modal-event-date")
          .get(0).props.value
      ).toEqual("03,29,2022");
    });

    it("should show event date empty error", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-date")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper
        .find("button")
        .find("#calendar-add-event-modal-save-button")
        .simulate("click");
      expect(
        wrapper
          .find("p")
          .find("#calendar-add-event-modal-event-date-helper-text")
          .text()
      ).toEqual("Enter a date.");
    });

    it("should show invalid event date error", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-date")
        .simulate("change", {
          target: { value: "asdzs" },
        });

      wrapper
        .find("button")
        .find("#calendar-add-event-modal-save-button")
        .simulate("click");
      expect(
        wrapper
          .find("p")
          .find("#calendar-add-event-modal-event-date-helper-text")
          .text()
      ).toEqual("Enter date in the format MM,DD,YYYY");
    });

    it("should change event start time value", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-start-time")
        .simulate("change", {
          target: { value: "01:00:00" },
        });
      expect(
        wrapper
          .find("input")
          .find("#calendar-add-event-modal-event-start-time")
          .get(0).props.value
      ).toEqual("01:00:00");
    });

    it("should show empty event start time error", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-start-time")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper
        .find("button")
        .find("#calendar-add-event-modal-save-button")
        .simulate("click");
      expect(
        wrapper
          .find("p")
          .find("#calendar-add-event-modal-event-start-time-helper-text")
          .text()
      ).toEqual("Enter a start time.");
    });

    it("should show invalid event start time error", () => {
      wrapper
        .find("input")
        .find("#calendar-add-event-modal-event-start-time")
        .simulate("change", {
          target: { value: "invalid" },
        });

      wrapper
        .find("button")
        .find("#calendar-add-event-modal-save-button")
        .simulate("click");
      expect(
        wrapper
          .find("p")
          .find("#calendar-add-event-modal-event-start-time-helper-text")
          .text()
      ).toEqual("Enter time in the format HH:MM:SS");
    });
  });
});
