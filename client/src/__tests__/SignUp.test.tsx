import React from "react";
import SignUp from "../pages/SignUp/SignUp";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <SignUp /> Component", () => {
  it("should change name field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#signup-name-field")
      .simulate("change", {
        target: { value: "Test User" },
      });
    expect(
      wrapper.find('input[type="text"]').find("#signup-name-field").get(0).props
        .value
    ).toEqual("Test User");
  });

  it("should change email field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="text"]')
      .find("#signup-email-field")
      .simulate("change", {
        target: { value: "test@domain.com" },
      });
    expect(
      wrapper.find('input[type="text"]').find("#signup-email-field").get(0)
        .props.value
    ).toEqual("test@domain.com");
  });

  it("should change password field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="password"]')
      .find("#signup-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });
    expect(
      wrapper
        .find('input[type="password"]')
        .find("#signup-password-field")
        .get(0).props.value
    ).toEqual("12345678");
  });

  it("should change confrim password field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find('input[type="password"]')
      .find("#signup-confirm-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });
    expect(
      wrapper
        .find('input[type="password"]')
        .find("#signup-confirm-password-field")
        .get(0).props.value
    ).toEqual("12345678");
  });

  it("should have name error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find(".signup-button").simulate("click");
    expect(
      wrapper.find("p").find("#signup-name-field-helper-text").text()
    ).toEqual("Please enter your name.");
  });

  it("should have email error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find(".signup-button").simulate("click");
    expect(
      wrapper.find("p").find("#signup-email-field-helper-text").text()
    ).toEqual("Please enter your email.");
  });

  it("should have password error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find(".signup-button").simulate("click");
    expect(
      wrapper.find("p").find("#signup-password-field-helper-text").text()
    ).toEqual("Please enter your password.");
  });

  it("should have confirm password error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find(".signup-button").simulate("click");
    expect(
      wrapper
        .find("p")
        .find("#signup-confirm-password-field-helper-text")
        .text()
    ).toEqual("Please re-enter your password.");
  });

  it("should have confirm password error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    wrapper
      .find('input[type="password"]')
      .find("#signup-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });

    wrapper
      .find('input[type="password"]')
      .find("#signup-confirm-password-field")
      .simulate("change", {
        target: { value: "145678" },
      });

    wrapper.find("button").find(".signup-button").simulate("click");
    expect(
      wrapper
        .find("p")
        .find("#signup-confirm-password-field-helper-text")
        .text()
    ).toEqual("Passwords do not match.");
  });
});
