# Before Getting Started

This project will not actually use Portals. You could create this Date Picker with Portals, but it requires a lot of custom JavaScript and algebra to figure out how to position the calendar correctly, instead we will be using CSS to position the calendar which is much easier (even if it isn't quite as flexible).

Speaking of CSS, all the HTML/CSS you need for the project is included. Make sure you pay attention to all the classes in the HTML to make sure you include them all in your final project.

The only other thing to note about this project is that it is built using `date-fns`. You can use any date library you want (even the built in JS Date API), but I will be using `date-fns` in my walkthrough video as I find it to be one of the best date libraries available.

# Instructions

1. Create a `DatePicker` component that renders a button to open/close a calendar.
   - This component should be a controlled component which means that it should accept an `onChange` and `value` prop (similar to an `input` element).
   - This component should default to the current date when the page loads.
   - When the calendar is opened it should open to the month of the selected date.
