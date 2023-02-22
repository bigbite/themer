import {STORE_NAME} from "../../settings";

import reducer from "./reducer";
import selectors from "./selectors";
import actions from "./actions";

const {registerStore} = wp.data;

registerStore(STORE_NAME, {
  reducer,
  selectors,
  actions,
});
