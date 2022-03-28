import React from "react";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import SupportUs from "../pages/SupportUs/SupportUs";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("testing <SupportUs /> component", () => {
  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <SupportUs />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
