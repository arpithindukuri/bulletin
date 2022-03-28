import React from "react";
import AccountInfo from "../pages/AccountInfo/AccountInfo";
import { configure, mount, ReactWrapper } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <AccountInfo /> Component", () => {
  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <AccountInfo />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change password field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("input")
      .find("#account-info-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });
    expect(
      wrapper.find("input").find("#account-info-password-field").get(0).props
        .value
    ).toEqual("12345678");
  });

  it("should change confirm password field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("input")
      .find("#account-info-confirm-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });
    expect(
      wrapper.find("input").find("#account-info-confirm-password-field").get(0)
        .props.value
    ).toEqual("12345678");
  });

  it("should change phone number field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("input")
      .find("#account-info-phone-field")
      .simulate("change", {
        target: { value: "+1 (921) 569-2927" },
      });
    expect(
      wrapper.find("input").find("#account-info-phone-field").get(0).props.value
    ).toEqual("+1 (921) 569-2927");
  });

  it("should change alternative email field value", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );
    wrapper
      .find("input")
      .find("#account-info-alternative-email-field")
      .simulate("change", {
        target: { value: "test@domain.com" },
      });
    expect(
      wrapper.find("input").find("#account-info-alternative-email-field").get(0)
        .props.value
    ).toEqual("test@domain.com");
  });

  it("should have confirm password error", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );

    wrapper
      .find('input[type="password"]')
      .find("#account-info-password-field")
      .simulate("change", {
        target: { value: "12345678" },
      });

    wrapper
      .find('input[type="password"]')
      .find("#account-info-confirm-password-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper.find("button").find(".save-button").simulate("click");
    expect(
      wrapper
        .find("p")
        .find("#account-info-confirm-password-field-helper-text")
        .text()
    ).toEqual("Please re-type your password");
  });

  it("should show side drawer", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AccountInfo />
        </BrowserRouter>
      </Provider>
    );
    wrapper.find("button").find("#side-drawer-button").simulate("click");
    expect(wrapper.find("div").find("#side-drawer-id").exists()).toBeTruthy();
  });
});
