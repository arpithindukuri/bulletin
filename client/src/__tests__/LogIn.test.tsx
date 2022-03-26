import React from "react";
import LogIn from "../pages/LogIn/LogIn";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <LogIn /> Component", () => {
  it("should change email field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#login-username-email-field")
      .simulate("change", {
        target: { value: "test@domain.com" },
      });
    expect(
      wrapper
        .find('input[type="text"]')
        .find("#login-username-email-field")
        .get(0).props.value
    ).toEqual("test@domain.com");
  });

  it("should chnage password field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="password"]')
      .find("#login-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });
    expect(
      wrapper
        .find('input[type="password"]')
        .find("#login-password-field")
        .get(0).props.value
    ).toEqual("12345678");
  });

  it("should have email error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="password"]')
      .find("#login-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });

    wrapper.find("button").find(".login-button").simulate("click");
    expect(
      wrapper.find("p").find("#login-username-email-field-helper-text").text()
    ).toEqual("Please enter an email.");
  });

  it("should have password error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#login-username-email-field")
      .simulate("change", {
        target: { value: "test@domain.com" },
      });

    wrapper.find("button").find(".login-button").simulate("click");
    expect(
      wrapper.find("p").find("#login-password-field-helper-text").text()
    ).toEqual("Please enter a password.");
  });
});
