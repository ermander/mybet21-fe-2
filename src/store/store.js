import { createStore, compose, applyMiddleware } from "redux";
import mainReducer from "../recuders/index";
import thunk from "redux-thunk";

const initialState = {
  isLoading: true,
  odds: [],
  history: [],
  firstBookmaker: "",
  filters: {},
  showFilterModal: false
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
