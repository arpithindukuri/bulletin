import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from "enzyme";
import App from "../App";

configure({ adapter: new Adapter() });

describe("App test", () => {
  it("renders correctly", () => {
    const app = shallow(<App />);
    expect(app.getElements()).toMatchSnapshot();
  });
});
