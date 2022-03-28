import List from "../pages/List/List";
import { configure, mount, ReactWrapper, shallow } from "enzyme";
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

describe("Testing <Lists /> Component", () => {
  it("should render notes page correctly", () => {
    const app = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </Provider>
    );
    expect(app.getElements()).toMatchSnapshot();
  });

  it("should open a modal", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find("button").find("#add-list-button").simulate("click");
    expect(wrapper.find("#modal-modal-description").exists()).toBeTruthy();
  });

  describe("Need open modal setup", () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </Provider>
    );

    beforeEach(() => {
        wrapper.find("button").find("#add-list-button").simulate("click");
    });

    it("should change list title value", () => {
      wrapper
        .find("input")
        .find("#list-name")
        .simulate("change", {
          target: { value: "Test List" },
        });
        wrapper.find("button").find("#saveListButton").simulate("click");
      expect(
        wrapper.find("input").find("#list-name").get(0).props.value
      ).toEqual("Test List");
    });
    it("should leave list title empty", () => {
        wrapper
          .find("input")
          .find("#list-name")
          .simulate("change", {
            target: { value: "" },
          });
          wrapper.find("button").find("#saveListButton").simulate("click");
        expect(
          wrapper.find("p").find("#list-name-helper-text").at(0).text()
        ).toEqual("Please enter a list name.");
      });
  });
//   describe("Need an existing list setup", () => {
//     const wrapper: ReactWrapper = mount(
//       <Provider store={store}>
//         <BrowserRouter>
//           <List />
//         </BrowserRouter>
//       </Provider>
//     );

//     beforeEach(() => {
//         wrapper.find("button").find("#add-list-button").simulate("click");
//         wrapper
//         .find("input")
//         .find("#list-name")
//         .simulate("change", {
//           target: { value: "Test List" },
//         });
//         wrapper.find("button").find("#saveListButton").simulate("click");
        
//     });

//     it("should have a modal popup", () => {

//         wrapper.find("#addTaskButton").simulate("click");
//         expect(wrapper.find("#modal-modal-description").exists()).toBeTruthy();
//     });
    
});
