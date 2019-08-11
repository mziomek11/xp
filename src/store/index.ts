import { createStore } from "redux";
import rootReducer from "./root-reducer";

export const createNewStore = () => createStore(rootReducer);

const store = createNewStore();

export default store;
