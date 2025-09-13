import { all } from "redux-saga/effects";
import todosSaga from "../features/sagas.js";

export default function* rootSaga() {
    yield all([todosSaga()]);
}
