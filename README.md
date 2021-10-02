# Submission Details

In the project directory, run:

### `npm start`

to see the project.

## How long you spent on the assignment.

I spent ~4 hours. Drag-and-drop took more time than expected. Took around an hour and a half. The rest was fairly straightforward.

## What you like about your implementation.

What I like about my implementation was that I managed to implement all of the mentioned potential improvements on top of the basic application. In addition, the components are easy to expand on. For example, if another area of this application needed drag-and-drop, it can also be easily implemented with the DragItem component. Another would be that the ticking timers are managed in their own component so they do not have to constantly update the state in the Timer Context which would be computationally expensive.

## What you would change if you were going to do it again.

If I were to redo this project, I would not use semantic-ui, but a better a more customizable css framework like Tailwind. Semantic seemed faster to prototype with, but ran into issues with implementing drag-and-drop with it. Still not sure exactly what went wrong, but will figure it out later.

## How you made your design decisions. For example, if you looked at other timer apps/webapps for inspiration, please note that.

The application is a simple CRUD application with a twist that each item in the application has a ticking timer, so it seemed appropriate from the start to use react context to manage the state of all the timers. However, due to each timer needing to tick every second, updating that state in context every second would be computationally expensive, so keeping it in its own component and only updating the state in context when it is paused or resumed seemed much more appropriate. Context is preferred over Redux for a small application of this size as it would make it easy to develop with and is less boilerplate and one extra library less to worry about, though it can be useful in the future if the application were to become bigger with more features, or we wanted to switch to a different front-end framework.

## How you would test this if you had more time.

If there was more time, I would probably test the ticking timers to make sure they are ticking correctly. Another important aspect of the application to test would be the state being held. It would be important to make sure that the orders of the different timers would still be in correct order after sorting it with different sorting criterias.
