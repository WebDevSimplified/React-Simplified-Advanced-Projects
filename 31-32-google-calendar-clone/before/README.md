# Before Getting Started

This is a quite complex project and is rather large so do not be surprised if this takes you a few days/weeks to complete. Some of the more complex parts of this project took me many hours to build and I spent nearly a full week on this project so don't worry if it takes you awhile.

Just like all the other projects in this course I have all the starting code you need for this project. The `styles.css` file contains all the styles you need for the project. The `index.html` file has an example calendar with all different types of events included. Make sure you look through each of the CSS classes being applied so you full understand what classes need to be applied in each situation. _Also, you can ignore the `#root` div element that wraps the entire calendar. This is just there so I can emulate how React will render the content inside its own `#root` div and make sure all styles are properly applied._ Lastly, to render the modals you can just uncomment them in the `index.html` to see what they look like.

The main goal of this project is to create a simple calendar application similar to Google Calendar. While this is a vastly simplified version of Google Calendar it is still quite complicated and will require lots of unique and interesting code. This project should also be written entirely in TypeScript if you are familiar with TypeScript as it is really good practice for most of the React specific TypeScript concepts.

# Instructions

1. Create a `Calendar` component that renders the current month by default.
   - This calendar should have buttons for going back/forward a month as well as for jumping to the current month.
2. Add a `+` button that allows you to create a new event for the specific day.
   - This should open a modal form for adding a new event.
   - The form should include a `name`, `allDay`, `startTime`, `endTime`, and `color` field.
   - The `name` field is required.
   - The `allDay` field should be a checkbox that when checked will disable the `startTime` and `endTime` fields.
   - The `startTime` must be before the `endTime` and are required if `allDay` is not checked.
   - The `color` field should have the options `red`, `blue`, and `green`.
3. Render events in the calendar view.
   - Events should be sorted with all day events first and then by start date.
4. Clicking on an event should open an edit modal.
   - This modal should have the same fields as the add event modal but should be pre-populated with the event data.
   - This modal should also have a delete button for removing an event.

## Bonus:

1. Store events in LocalStorage so they persist on page refresh.
2. If the number of events overflows the calendar day then render a `+X More` button at the bottom of the day that shows the number of events that overflow.
   - These overflow events should be rendered in a modal when the `+X More` button is clicked.
   - Clicking on one of the events in this modal should open the edit modal.
   - The overflow events should be hidden and not rendered at all in the DOM (except in the modal).
   - When the calendar day is resized the overflow events should be recalculated and rendered again.
   - When the number of events changes the overflow events should be recalculated and rendered again.
   - This is by far the hardest part of this project and will require a lot of thought and planning to get right so don't feel bad if you struggle here. This took me a full day to get done properly on my own.
3. Add a closing animation to the modals.
   - A `closing` class can be added to the modal to trigger the closing animation.
   - The modal should only be removed from the DOM after the animation finishes to ensure if has a nice smooth transition out.
