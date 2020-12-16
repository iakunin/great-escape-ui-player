import {combineReducers, configureStore} from '@reduxjs/toolkit';
import questListRequestReducer from 'redux/questListRequest.slice';

const rootReducer = combineReducers({
  questListRequest: questListRequestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
