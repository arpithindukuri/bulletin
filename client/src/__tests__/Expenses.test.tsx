import React from "react";
import Expenses from "../pages/Expenses/Expenses";
import { configure, mount, ReactWrapper } from "enzyme";
import renderer from "react-test-renderer";
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

describe("Testing <Expenses /> Component", () => {
  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Expenses />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should open a modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Expenses />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#add-expense-button").simulate("click");
    expect(wrapper.find(".overlayBox"));
  });

  it("should open a modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Expenses />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#add-budget-button").simulate("click");
    expect(wrapper.find(".overlayBox"));
  });
});
