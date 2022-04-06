import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools(applyMiddleware()))

export type RootState = ReturnType<typeof reducers>

export default  store