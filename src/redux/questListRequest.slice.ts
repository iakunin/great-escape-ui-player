import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Direction, Request} from "../api/getQuestList";
import {FearLevel, QuestType} from "../enums";
import {RootState} from "../config/store";

const questListRequestSlice = createSlice({
  name: 'questListRequest',
  initialState: {} as Request,
  reducers: {
    setQuestType(state, action: PayloadAction<QuestType | undefined>) {
      return {...state, type: action.payload}
    },
    setFearLevel(state, action: PayloadAction<FearLevel | undefined>) {
      return {...state, fearLevel: action.payload}
    },
    setMinPrice(state, action: PayloadAction<number | undefined>) {
      return {...state, minPrice: action.payload}
    },
    setDiscountInPercentsSort(state, action: PayloadAction<Direction | undefined>) {
      return {
        ...state,
        sort: {
          ...state.sort,
          discountInPercents: action.payload
        }
      }
    },
    setMinPriceSort(state, action: PayloadAction<Direction | undefined>) {
      return {
        ...state,
        sort: {
          ...state.sort,
          minPrice: action.payload
        }
      }
    },
  }
});

export const selectQuestListRequest = (state: RootState) => state.questListRequest;

export const {
  setQuestType,
  setFearLevel,
  setMinPrice,
  setDiscountInPercentsSort,
  setMinPriceSort,
} = questListRequestSlice.actions;

export default questListRequestSlice.reducer;
