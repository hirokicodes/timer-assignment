import { useState, useContext } from "react";
import { Segment, Form, Input, Button, Header } from "semantic-ui-react";
import { TimerContext } from "../context/timer-context";

export const TimerForm = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [_, dispatch] = useContext(TimerContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const onSubmit = () => {
    dispatch({
      type: "ADD_TIMER",
      payload: {
        id: Date.now(),
        createdAt: Date.now(),
        name,
        duration,
        paused: false,
        remainingTime: duration,
        lastTimeChanged: Date.now(),
        type: "TIMER_CARD",
      },
    });
    // Reset Form
    setName("");
    setDuration(60);
  };

  const handleSort = (sortType) => {
    dispatch({
      type: sortType,
    });
  };

  return (
    <Segment basic>
      <Form onSubmit={onSubmit}>
        <Form.Group widths="3">
          <Form.Field width={6}>
            <Input
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form.Field>
          <Form.Field width={6}>
            <Input
              type="number"
              placeholder="Enter Duration"
              value={duration}
              onChange={handleDurationChange}
              required
            />
          </Form.Field>
          <Form.Field width={4}>
            <Button fluid primary>
              New Timer
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <div>
        <Header>Sort by:</Header>
        <Button onClick={() => handleSort("SORT_TIME_REMAINING")}>
          Time Remaining
        </Button>
        <Button onClick={() => handleSort("SORT_TICKING")}>Ticking</Button>
        <Button onClick={() => handleSort("SORT_CREATED")}>Created</Button>
      </div>
    </Segment>
  );
};
