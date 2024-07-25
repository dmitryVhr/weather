import Form from "./Form";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import '../../assets/scss/main.scss'
const mockStore = configureStore();

let store = mockStore({});

export default {
  title: "Form",
  component: Form
};

export const Default = ()=> <Provider store={store}><Form /></Provider>
