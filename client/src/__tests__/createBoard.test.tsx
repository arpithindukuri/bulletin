import React from "react";
import CreateNewBoard from "../pages/CreateNewBoard/CreateNewBoard";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <CreateNewBoard /> Component", () => {
  it("should change name field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewBoard />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#name-text")
      .simulate("change", {
        target: { value: "testingBoard" },
      });
    expect(
      wrapper.find('input[type="text"]').find("#name-text").get(0).props.value
    ).toEqual("testingBoard");
  });

  it("should have name error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewBoard />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#name-text")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper.find("button").at(1).simulate("click");
    expect(wrapper.find("p").find("#name-text-helper-text").text()).toEqual(
      "Please enter a board Name."
    );
  });

  it("should change description field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewBoard />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("textarea")
      .find("#description-text")
      .simulate("change", {
        target: { value: "testing description" },
      });
    expect(
      wrapper.find("textarea").find("#description-text").get(0).props.value
    ).toEqual("testing description");
  });

  it("should have a description error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewBoard />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("textarea")
      .find("#description-text")
      .simulate("change", {
        target: { value: "" },
      });
    wrapper.find("button").at(1).simulate("click");
    expect(
      wrapper.find("p").find("#description-text-helper-text").text()
    ).toEqual("Please enter a board description.");
  });

  it("should ask the user if they agree to discard", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateNewBoard />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").at(0).simulate("click");
    expect(wrapper.find("h2").find("#responsive-dialog-title").text()).toEqual(
      "Are you sure you wish to discard this board?"
    );
  });
});
