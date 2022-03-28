import React from "react";
import MemberStatus from "../pages/ManageBoard/MemberStatus";
import { configure, mount, ReactWrapper } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <MemberStatus /> Component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <MemberStatus
          userBoardid=""
          name=""
          email=""
          role="Admin"
          id=""
          onDelete={() => {}}
        />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <MemberStatus
              userBoardid=""
              name=""
              email=""
              role="Admin"
              id=""
              onDelete={() => {}}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change member status dropdown", () => {
    wrapper
      .find("input")
      .find(".MuiSelect-nativeInput")
      .at(0)
      .simulate("change", {
        target: { value: "Member", name: "Member" },
      });

    expect(
      wrapper.find("input").find(".MuiSelect-nativeInput").get(0).props.value
    ).toEqual("Member");
  });
});
