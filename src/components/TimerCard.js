import { useState, useContext, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { TimerContext } from "../context/timer-context";

export const TimerCard = ({ createdAt, name, duration, paused, id }) => {
  const [_, dispatch] = useContext(TimerContext);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [ticking, setTicking] = useState(true);

  useEffect(() => {
    if (remainingTime === 0) {
      handleDelete();
    }
    const timer = setTimeout(
      () => ticking && setRemainingTime(remainingTime - 1),
      1000
    );
    return () => clearTimeout(timer);
  });

  const handlePauseOrPlay = () => {
    setTicking(!ticking);
    updateTimer();
  };

  const handleDelete = () => {
    dispatch({
      type: "DEL_TIMER",
      payload: createdAt,
    });
  };

  const handleReset = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id,
        createdAt,
        name,
        duration,
        paused,
        remainingTime: duration,
        lastTimeChanged: Date.now(),
      },
    });
    setRemainingTime(duration);
  };

  const updateTimer = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id,
        createdAt,
        name,
        duration,
        paused: ticking,
        remainingTime,
        lastTimeChanged: Date.now(),
      },
    });
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {remainingTime} Seconds Remaining {ticking ? "" : "| Paused..."}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui three buttons">
          <Button basic color="blue" onClick={handlePauseOrPlay}>
            {ticking ? "️️⏸️" : "▶️"}
          </Button>
          <Button basic color="red" onClick={handleDelete}>
            x
          </Button>
          <Button basic color="orange" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
