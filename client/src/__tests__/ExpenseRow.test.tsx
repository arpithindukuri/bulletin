import React from "react";
import ExpensesRow from "../pages/Expenses/ExpensesRow";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import renderer from "react-test-renderer";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { format, parse } from "date-fns";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    board_id: "g7HGuvfnGe3nhQgAF8qY",
  }),
}));

describe("Testing <ExpenseRow /> Component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ExpensesRow
          name="Test Expense"
          date={parseInt(
            format(parse("2022-03-28", "yyyy-MM-dd", new Date()), "T")
          )}
          assigned="Test User"
          balance={200}
          type="Expense"
          boardId="3289uweihdkaj"
          expenseId="wpqoedwjfsax"
          expenses={[]}
          setExpenses={() => {}}
          budgets={[]}
          setBudgets={() => {}}
        />
      </BrowserRouter>
    </Provider>
  );
  it("should render ExpenseRow properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ExpensesRow
              name="Test Expense"
              date={parseInt(
                format(parse("2022-03-28", "yyyy-MM-dd", new Date()), "T")
              )}
              assigned="Test User"
              balance={200}
              type="Expense"
              boardId="3289uweihdkaj"
              expenseId="wpqoedwjfsax"
              expenses={[]}
              setExpenses={() => {}}
              budgets={[]}
              setBudgets={() => {}}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render BudgetRow properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ExpensesRow
              name="Test Expense"
              date={parseInt(
                format(parse("2022-03-28", "yyyy-MM-dd", new Date()), "T")
              )}
              assigned="Test User"
              balance={200}
              type="Expense"
              boardId="3289uweihdkaj"
              expenseId="wpqoedwjfsax"
              expenses={[]}
              setExpenses={() => {}}
              budgets={[]}
              setBudgets={() => {}}
            />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should open an editable modal", () => {
    wrapper
      .find("button")
      .find("#edit-expense-dialog-button")
      .simulate("click");
    expect(wrapper.find(".overlayBox").exists()).toBeTruthy();
  });

  describe("should have edit modal open", () => {
    beforeAll(() => {
      wrapper
        .find("button")
        .find("#edit-expense-dialog-button")
        .simulate("click");
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
  });

  it("should close modal", () => {
    wrapper
      .find("button")
      .find("#expense-modal-close-button")
      .simulate("click");
    expect(wrapper.find(".overlayBox").exists()).toBeFalsy();
  });
});
