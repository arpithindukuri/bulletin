import React from "react";
import { fireEvent, render as reactRender } from "@testing-library/react";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
import { createMemoryHistory } from "history";
import BoardView from "../pages/BoardViews/BoardsView";
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
        <BoardView />
      </BrowserRouter>
    </Provider>
  );

  it("should render properly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <BoardView />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have add board icon", () => {
    expect(wrapper.find("#add-board-icon").exists()).toBeTruthy();
  });

  it("redirect to create board page", () => {
    const history = createMemoryHistory({
      initialEntries: ["/boardsView"],
    });
    const { getByTestId } = reactRender(
      <Provider store={store}>
        <BrowserRouter>
          <BoardView />
        </BrowserRouter>
      </Provider>
    );
    expect(history.location.pathname).toBe("/boardsView");
    fireEvent.click(getByTestId("add-board-button"));
  });
});
