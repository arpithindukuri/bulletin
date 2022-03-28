import React, { useState } from "react";
import ManageBoard from "../pages/ManageBoard/ManageBoard";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createMemoryHistory } from "history";
import { render as reactRender } from "@testing-library/react";
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

describe("Testing <ManageBoard /> Component", () => {
  it("should render Manage-Board page correctly", () => {
    const app = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <ManageBoard />
        </BrowserRouter>
      </Provider>
    );
    expect(app.getElements()).toMatchSnapshot();
  });
  describe("Need open modal setup", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ManageBoard />
        </BrowserRouter>
      </Provider>
    );

    beforeEach(() => {
      wrapper.find("button").find("#renameButton").simulate("click");
    });

    it("should change board title value", () => {
      wrapper
        .find("input")
        .find("#name-text")
        .simulate("change", {
          target: { value: "Edit Board Name" },
        });
      expect(
        wrapper.find("input").find("#name-text").get(0).props.value
      ).toEqual("Edit Board Name");
    });

    it("should display board name error", () => {
      wrapper
        .find("input")
        .find("#name-text")
        .simulate("change", {
          target: { value: "" },
        });

      wrapper.find("button").find("#saveButton").simulate("click");
      expect(
        wrapper.find("p").find("#name-text-helper-text").text()
      ).toEqual("0/20  Please enter a valid board Name");
    });

    it("should change board description value", () => {
        wrapper
          .find("textarea")
          .find("#description-text")
          .simulate("change", {
            target: { value: "Edit Board description" },
          });
        expect(
          wrapper.find("textarea").find("#description-text").get(0).props.value
        ).toEqual("Edit Board description");
      });
  
      it("should display board description error", () => {
        wrapper
          .find("textarea")
          .find("#description-text")
          .simulate("change", {
            target: { value: "" },
          });
  
        wrapper.find("button").find("#saveButton").simulate("click");
        expect(
          wrapper.find("p").find("#description-text-helper-text").text()
        ).toEqual("0/50  Please enter a valid board description.");
      });

      it("should update board name", () => {
        wrapper
          .find("textarea")
          .find("#description-text")
          .simulate("change", {
            target: { value: "description test" },
          });
        wrapper
        .find("input")
        .find("#name-text")
        .simulate("change", {
        target: { value: "name test" },
        });
  
        wrapper.find("button").find("#saveButton").simulate("click");
        expect(
          wrapper.find("h5").at(0).text()
        ).toEqual("name test");
      });
  });
  describe("Inviation email", () => {
        const wrapper: ReactWrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
            <ManageBoard />
            </BrowserRouter>
        </Provider>
        );
        it("should change invitaton email value", () => {
            wrapper
            .find("input")
            .find("#invitation-email-text")
            .simulate("change", {
                target: { value: "test@mail.com" },
            });
            expect(
            wrapper.find("input").find("#invitation-email-text").get(0).props.value
            ).toEqual("test@mail.com");
        });
    });
    describe("Member Info box", () => {
        const wrapper: ReactWrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
            <ManageBoard />
            </BrowserRouter>
        </Provider>
        );
        
        it("Member box should have three headers/columns", () => {
            expect(wrapper.find("#memberInfoBox").length).toEqual(3);
        });
    });

})