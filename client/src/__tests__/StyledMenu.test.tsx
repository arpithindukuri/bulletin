import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Button from "@mui/material/Button";
import StyledMenu from "../components/StyledMenu";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";

configure({ adapter: new Adapter() });

describe("testing <StyledMenu /> component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <StyledMenu />
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <StyledMenu />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render exactly one <Button /> component", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it("should open menu on button click", () => {
    wrapper.find("button").find("#styled-menu-button").simulate("click");
    expect(wrapper.find("#styled-menu-filters-list").exists()).toBeTruthy();
  });
});
