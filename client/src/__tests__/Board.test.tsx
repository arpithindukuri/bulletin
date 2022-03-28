import React from "react";
import { render as reactRender } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Board from "../pages/Board/Board";
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

describe("Testing <Board /> Component", () => {
  const wrapper: ReactWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Board />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Board />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have exactly one list container", () => {
    expect(wrapper.find("h5").find("#board-list-title").length).toEqual(1);
  });

  it("should have exactly one notes container", () => {
    expect(wrapper.find("h5").find("#board-notes-title").length).toEqual(1);
  });

  it("redirect to notes page", () => {
    const history = createMemoryHistory({
      initialEntries: ["/board/g7HGuvfnGe3nhQgAF8qY"],
    });
    const { getByText } = reactRender(
      <Provider store={store}>
        <BrowserRouter>
          <Board />
        </BrowserRouter>
      </Provider>
    );
    expect(history.location.pathname).toBe("/board/g7HGuvfnGe3nhQgAF8qY");
    expect(getByText("View All notes").href).toEqual(
      "http://localhost/notes/g7HGuvfnGe3nhQgAF8qY"
    );
  });

  it("redirect to lists page", () => {
    const history = createMemoryHistory({
      initialEntries: ["/board/g7HGuvfnGe3nhQgAF8qY"],
    });
    const { getByText } = reactRender(
      <Provider store={store}>
        <BrowserRouter>
          <Board />
        </BrowserRouter>
      </Provider>
    );
    expect(history.location.pathname).toBe("/board/g7HGuvfnGe3nhQgAF8qY");
    expect(getByText("View Lists").href).toEqual(
      "http://localhost/lists/g7HGuvfnGe3nhQgAF8qY"
    );
  });

  it("redirect to expense page", () => {
    const history = createMemoryHistory({
      initialEntries: ["/board/g7HGuvfnGe3nhQgAF8qY"],
    });
    const { getByText } = reactRender(
      <Provider store={store}>
        <BrowserRouter>
          <Board />
        </BrowserRouter>
      </Provider>
    );
    expect(history.location.pathname).toBe("/board/g7HGuvfnGe3nhQgAF8qY");
    expect(getByText("View Expenses").href).toEqual(
      "http://localhost/expenses/g7HGuvfnGe3nhQgAF8qY"
    );
  });
});
