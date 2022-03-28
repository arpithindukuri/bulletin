import React from "react";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import Homepage from "../pages/Homepage/Homepage";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("testing <HomePage /> component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Homepage />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change email field value", () => {
    wrapper
      .find("input")
      .find("#homepage-email-field")
      .simulate("change", {
        target: { value: "test@domain.com" },
      });
    expect(
      wrapper.find("input").find("#homepage-email-field").get(0).props.value
    ).toEqual("test@domain.com");
  });

  it("should have email error", () => {
    wrapper
      .find("input")
      .find("#homepage-email-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper.find("button").find(".email-signup-button").simulate("click");
    expect(
      wrapper.find("p").find("#homepage-email-field-helper-text").text()
    ).toEqual("Please enter an email.");
  });
});
