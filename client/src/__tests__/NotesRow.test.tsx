import React, { useState } from "react";
import NoteRow from "../pages/Notes/NoteRow";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
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

describe("Testing <NotesRow /> Component", () => {
  it("should render NotesRow properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <NoteRow
              id="32iwjsdikd09a"
              name="Test Note"
              date="2022-03-28"
              content="test not content"
              onDelete={() => {}}
              onEdit={() => {}}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render NotesRow properly with open modal", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <NoteRow
              id="32iwjsdikd09a"
              name="Test Note"
              date="2022-03-28"
              content="test not content"
              onDelete={() => {}}
              onEdit={() => {}}
              popupOpen={true}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should open a view modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <NoteRow
            id="32iwjsdikd09a"
            name="Test Note"
            date="2022-03-28"
            content="test not content"
            onDelete={() => {}}
            onEdit={() => {}}
            popupOpen={false}
          />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#view-note-dialog-button").simulate("click");
    expect(wrapper.find(".overlayBox").exists()).toBeTruthy();
  });

  it("should open an editable modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <NoteRow
            id="32iwjsdikd09a"
            name="Test Note"
            date="2022-03-28"
            content="test not content"
            onDelete={() => {}}
            onEdit={() => {}}
            popupOpen={false}
          />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#edit-note-dialog-button").simulate("click");
    expect(wrapper.find(".overlayBox").exists()).toBeTruthy();
  });

  describe("should have edit modal open", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <NoteRow
            id="32iwjsdikd09a"
            name="Test Note"
            date="2022-03-28"
            content="test not content"
            onDelete={() => {}}
            onEdit={() => {}}
            popupOpen={false}
          />
        </BrowserRouter>
      </Provider>
    );

    beforeAll(() => {
      wrapper.find("button").find("#edit-note-dialog-button").simulate("click");
    });

    it("should change note title value", () => {
      wrapper
        .find("input")
        .find("#edit-note-modal-name-field")
        .simulate("change", {
          target: { value: "Test Note" },
        });
      expect(
        wrapper.find("input").find("#edit-note-modal-name-field").get(0).props
          .value
      ).toEqual("Test Note");
    });

    it("should change note description value", () => {
      wrapper
        .find("textarea")
        .find("#edit-note-modal-content-field")
        .simulate("change", {
          target: { value: "Test Description" },
        });
      expect(
        wrapper.find("textarea").find("#edit-note-modal-content-field").get(0)
          .props.value
      ).toEqual("Test Description");
    });

    it("should close modal", () => {
        wrapper.find("button").find("#close-note-edit-modal-button").simulate("click");
        expect(wrapper.find(".overlayBox").exists()).toBeFalsy();
      });
  });
});
