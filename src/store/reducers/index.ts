import { combineReducers } from "redux"
import user from "./user"
import collection from "./collection";

export default combineReducers({
    user, collection
})