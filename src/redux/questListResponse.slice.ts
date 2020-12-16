import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {QuestList} from "../models/Quest";
import {getQuestList, Request} from "../api/getQuestList";

export type State = {
  questList: QuestList;
  isLoading: boolean;
  isError: boolean;
};

export const fetchQuestList = createAsyncThunk(
  'questListResponse/fetch',
  async (request: Request) => {
    return await getQuestList(request) as QuestList;
  }
)

const slice = createSlice({
  name: 'questListResponse',
  initialState: {
    questList: [],
    isLoading: false,
    isError: false,
  } as State,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchQuestList.pending,
      (state) => (
        {...state, isLoading: true,}
      )
    ).addCase(
      fetchQuestList.fulfilled,
      (state, action) => (
        {...state, isLoading: false, questList: action.payload}
      )
    ).addCase(
      fetchQuestList.rejected,
      (state) => (
        {...state, isLoading: false, isError: true}
      )
    )
  }
});

export default slice.reducer;
