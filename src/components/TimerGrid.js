import { useContext } from "react";
import { Segment, Grid } from "semantic-ui-react";
import { TimerContext } from "../context/timer-context";
import { TimerCard } from "./TimerCard";

import { DragItem } from "./DragItem";
import { GridItem } from "./GridItem";

export const TimerGrid = () => {
  const [state, dispatch] = useContext(TimerContext);

  // Pass this function to DragItem component so it can be called when moved
  function moveItem(sourceId, destinationId) {
    const sourceIndex = state.timers.findIndex((item) => item.id === sourceId);
    const destinationIndex = state.timers.findIndex(
      (item) => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    dispatch({
      type: "MOVE_ITEM",
      payload: {
        sourceIndex,
        offset,
      },
    });
  }

  const cards = state.timers.map((timer) => (
    <DragItem key={timer.createdAt} id={timer.createdAt} onMoveItem={moveItem}>
      <GridItem>
        <TimerCard
          id={timer.createdAt}
          createdAt={timer.createdAt}
          name={timer.name}
          duration={timer.duration}
          paused={timer.paused}
        />
      </GridItem>
    </DragItem>
  ));

  return (
    <Segment>
      <Grid container columns={3}>
        {cards}
      </Grid>
    </Segment>
  );
};
