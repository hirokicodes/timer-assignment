import { Segment, Header } from "semantic-ui-react";
import { TimerForm } from "./components/TimerForm";
import { TimerGrid } from "./components/TimerGrid";
import { TimerContextProvider } from "./context/timer-context";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TimerContextProvider>
        <Segment basic>
          <Header>Timers</Header>
          <TimerForm />
          <TimerGrid />
        </Segment>
      </TimerContextProvider>
    </DndProvider>
  );
};
