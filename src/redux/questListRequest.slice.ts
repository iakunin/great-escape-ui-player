import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Direction, Request} from "../api/getQuestList";
import {FearLevel, QuestType} from "../enums";

const slice = createSlice({
  name: 'questListRequest',
  initialState: {} as Request,
  reducers: {
    setQuestType(state, action: PayloadAction<QuestType | undefined>): Request {
      return {...state, type: action.payload};
    },
    setFearLevel(state, action: PayloadAction<FearLevel | undefined>): Request {
      return {...state, fearLevel: action.payload};
    },
    setMinPrice(state, action: PayloadAction<number | undefined>): Request {
      return {...state, minPrice: action.payload};
    },
    setDiscountSort(state, action: PayloadAction<Direction | undefined>): Request {
      return {
        ...state,
        sort: {...state.sort, discount: action.payload}
      };
    },
    setMinPriceSort(state, action: PayloadAction<Direction | undefined>): Request {
      return {
        ...state,
        sort: {...state.sort, minPrice: action.payload}
      };
    },
  }
});

export const {
  setQuestType,
  setFearLevel,
  setMinPrice,
  setDiscountSort,
  setMinPriceSort,
} = slice.actions;

export default slice.reducer;
