import { useReducer, createContext } from "react";
import { moveElement } from "../helper/moveElement";

export const TimerContext = createContext();

const initialState = {
  timers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        timers: [...state.timers, action.payload],
      };
    case "DEL_TIMER":
      return {
        timers: state.timers.filter(
          (timer) => timer.createdAt !== action.payload
        ),
      };
    case "UPDATE_TIMER":
      return {
        timers: state.timers.map((timer, i) =>
          timer.createdAt === action.payload.createdAt
            ? { ...action.payload }
            : timer
        ),
      };
    case "SORT_TIME_REMAINING":
      return {
        timers: state.timers.slice().sort((a, b) => {
          const dateNow = Date.now();
          const timeRemainingA =
            a.remainingTime - (dateNow - a.lastTimeChanged) / 1000;
          const timeRemainingB =
            b.remainingTime - (dateNow - b.lastTimeChanged) / 1000;
          return timeRemainingA - timeRemainingB;
        }),
      };
    case "SORT_TICKING":
      return {
        timers: state.timers.slice().sort((a, b) => {
          if (a.paused && !b.paused) {
            return 1;
          } else if (!a.paused && b.paused) {
            return -1;
          } else {
            return 0;
          }
        }),
      };
    case "SORT_CREATED":
      return {
        timers: state.timers.slice().sort((a, b) => {
          return a.createdAt > b.createdAt ? 1 : -1;
        }),
      };
    case "MOVE_ITEM":
      return {
        timers: moveElement(
          state.timers,
          action.payload.sourceIndex,
          action.payload.offset
        ),
      };
    default:
      return state;
  }
};

export const TimerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider value={[state, dispatch]}>
      {props.children}
    </TimerContext.Provider>
  );
};
