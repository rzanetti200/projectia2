import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Action} from './actions';

function reducer(state, action) {
  switch (action.type) {
	case Action.BeginEditTrade:
      return {
        ...state,
        trades: state.trades.map(trade=> {
          if (trade.id === action.payload) {
            return {...trade, isEditing: true};
          } else {
            return trade;
          }
        }),
      };
    case Action.StopEditTrade:
      return {
        ...state,
        trades: state.trades.map(trade=> {
          if (trade.id === action.payload) {
            return {...trade, isEditing: false};
          } else {
            return trade;
          }
        }),
      };
    case Action.ShowTrade:
      return {
        ...state,
        trades: action.payload,
      };
	case Action.OverwriteTrade:
      return {
        ...state,
        trades: state.trades.map(trade=> {
          if (trade.id === action.payload.id) {
            return action.payload;
          } else {
            return trade;
          }
        }),
      };
	case Action.AddTrade:
      return {
        ...state,
        trades: [action.payload, ...state.trades],
      };
	case Action.RemoveTrade:
      return {
        ...state,
        trades: state.trades.filter(trade=> trade.id !== action.payload),
      };
    default:
      return state;
  }
}

const initialState = {
  trades: [],
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));