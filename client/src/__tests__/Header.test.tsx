import React from "react";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import Header from "../components/Header";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("testing <Header /> component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render one Header component", () => {
    expect(wrapper.find(AppBar).length).toEqual(1);
  });

  it("should render header with static poistioning", () => {
    expect(wrapper.find(AppBar).prop("position")).toEqual("static");
  });

  it("should render exactly three <Button /> component", () => {
    expect(wrapper.find(Button).length).toEqual(3);
  });

  it("should render exactly 1 <Toolbar /> component", () => {
    expect(wrapper.find(Toolbar).length).toEqual(1);
  });
});
