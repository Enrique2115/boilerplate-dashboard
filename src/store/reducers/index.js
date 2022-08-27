//reducers
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//reducers
import authReducer from "./auth/auth.slice";
import themeReducer from "./theme/theme.slice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  //other reducers
});

export { rootReducer };
