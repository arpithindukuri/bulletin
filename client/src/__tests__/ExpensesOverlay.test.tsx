import React from "react";
import ExpensesOverlay from "../pages/Expenses/ExpensesOverlay";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Testing <ExpensesOverlay /> Component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ExpensesOverlay
          header=""
          type=""
          dateType=""
          setPopupState={() => {}}
          setExpenses={() => {}}
          setBudgets={() => {}}
          boardId=""
          isEdit={false}
        />
      </BrowserRouter>
    </Provider>
  );

  it("should render overlay properly in edit", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("should render overlay properly in non-edit", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("should change expense name field value", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-name-field")
      .simulate("change", {
        target: { value: "Test Expense" },
      });
    expect(
      wrapper.find("input").find("#expenses-overlay-name-field").get(0).props
        .value
    ).toEqual("Test Expense");
  });

  it("should change expense date field value", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-date-field")
      .simulate("change", {
        target: { value: "2022-03-28" },
      });
    expect(
      wrapper.find("input").find("#expenses-overlay-date-field").get(0).props
        .value
    ).toEqual("2022-03-28");
  });

  it("should change assigned to field value", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-assigned-field")
      .simulate("change", {
        target: { value: "Test User" },
      });
    expect(
      wrapper.find("input").find("#expenses-overlay-assigned-field").get(0)
        .props.value
    ).toEqual("Test User");
  });

  it("should change balance field value", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-balance-field")
      .simulate("change", {
        target: { value: "222.99" },
      });
    expect(
      wrapper.find("input").find("#expenses-overlay-balance-field").get(0).props
        .value
    ).toEqual("222.99");
  });

  it("should have name error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-name-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");
    expect(
      wrapper.find("p").find("#expenses-overlay-name-field-helper-text").text()
    ).toEqual("Please enter a name.");
  });

  it("should have invalid date error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-date-field")
      .simulate("change", {
        target: { value: "invalid" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");
    expect(
      wrapper.find("p").find("#expenses-overlay-date-field-helper-text").text()
    ).toEqual("Please enter a valid date.");
  });

  it("should have date error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-date-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");
    expect(
      wrapper.find("p").find("#expenses-overlay-date-field-helper-text").text()
    ).toEqual("Please enter a date.");
  });

  it("should change have assigned error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-assigned-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");

    expect(
      wrapper
        .find("p")
        .find("#expenses-overlay-assigned-field-helper-text")
        .text()
    ).toEqual("Please select an assignee.");
  });

  it("should change have balance error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-balance-field")
      .simulate("change", {
        target: { value: "" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");

    expect(
      wrapper
        .find("p")
        .find("#expenses-overlay-balance-field-helper-text")
        .text()
    ).toEqual("Please enter an amount.");
  });

  it("should change have invalid balance error", () => {
    wrapper
      .find("input")
      .find("#expenses-overlay-balance-field")
      .simulate("change", {
        target: { value: "sadfc" },
      });

    wrapper
      .find("button")
      .find("#expense-overlay-save-button")
      .simulate("click");

    expect(
      wrapper
        .find("p")
        .find("#expenses-overlay-balance-field-helper-text")
        .text()
    ).toEqual("Please enter a valid number.");
  });
});
