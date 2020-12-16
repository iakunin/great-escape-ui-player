import {combineReducers, configureStore} from '@reduxjs/toolkit';
import questListRequestReducer from '../redux/questListRequest.slice';
import questListResponseReducer from '../redux/questListResponse.slice';

const rootReducer = combineReducers({
  questListRequest: questListRequestReducer,
  questListResponse: questListResponseReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch
