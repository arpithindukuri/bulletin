import React, { useState } from "react";
import Notes from "../pages/Notes/Notes";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
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

describe("Testing <Notes /> Component", () => {
  it("should open a modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Notes />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#add-note-button").simulate("click");
    expect(wrapper.find(".overlayBox").exists()).toBeTruthy();
  });

  describe("Need open modal setup", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Notes />
        </BrowserRouter>
      </Provider>
    );

    beforeEach(() => {
      wrapper.find("button").find("#add-note-button").simulate("click");
    });

    it("should change note title value", () => {
      wrapper
        .find("input")
        .find("#add-note-name-field")
        .simulate("change", {
          target: { value: "Test Note" },
        });
      expect(
        wrapper.find("input").find("#add-note-name-field").get(0).props.value
      ).toEqual("Test Note");
    });

    it("should display note name error", () => {
      wrapper
        .find("input")
        .find("#add-note-name-field")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper.find("button").find("#save-note-button").simulate("click");
      expect(
        wrapper.find("p").find("#add-note-name-field-helper-text").text()
      ).toEqual("Please enter a valid note Name.");
    });

    it("should change note description value", () => {
      wrapper
        .find("textarea")
        .find("#add-note-description-field")
        .simulate("change", {
          target: { value: "Test Description" },
        });
      expect(
        wrapper.find("textarea").find("#add-note-description-field").get(0)
          .props.value
      ).toEqual("Test Description");
    });

    it("should display note description error", () => {
      wrapper
        .find("textarea")
        .find("#add-note-description-field")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper.find("button").find("#save-note-button").simulate("click");
      expect(
        wrapper.find("p").find("#add-note-description-field-helper-text").text()
      ).toEqual("Please enter a valid note content.");
    });

    it("should close modal", () => {
      wrapper.find("button").find("#close-note-modal-button").simulate("click");
      expect(wrapper.find(".overlayBox").exists()).toBeFalsy();
    });
  });

  it("should open a snackbar", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Notes />
        </BrowserRouter>
      </Provider>
    );

    const setValue = (arg: boolean) => {
      return arg;
    };

    jest.mock("react", () => ({
      ...jest.requireActual("react"),
      useState: jest.fn(() => [true, setValue]),
    }));

    expect(wrapper.find(".MuiSnackbar-root").exists()).toBeTruthy();
  });
});
