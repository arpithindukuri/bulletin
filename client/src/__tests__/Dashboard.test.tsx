import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import { configure, mount, ReactWrapper } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <Dashboard /> Component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change overview field value", () => {
    wrapper
      .find("input")
      .find("#dashboard-overview-field")
      .simulate("change", {
        target: { value: "Test Overview....." },
      });
    expect(
      wrapper.find("input").find("#dashboard-overview-field").get(0).props.value
    ).toEqual("Test Overview.....");
  });

  it("should change name field value", () => {
    wrapper
      .find("input")
      .find("#dashboard-name-field")
      .simulate("change", {
        target: { value: "My Name" },
      });
    expect(
      wrapper.find("input").find("#dashboard-name-field").get(0).props.value
    ).toEqual("My Name");
  });
});
