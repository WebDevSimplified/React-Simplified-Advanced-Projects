# Before Getting Started

The goal of this project is to create a toast library using whatever means you want. This could be with a custom component, custom hooks, a combination of both, etc. I will personally be using a custom context with various functions for adding/removing toast messages.

This project is also unique in that I will have two solutions provided. One solution will use TypeScript and the other solution will use JavaScript. In the walkthrough video I will show you how to build this project with JavaScript, but if you used TypeScript you can view the TypeScript solution which is identical to the JavaScript solution, but with added types.

The starting code for this project is a simple HTML file that shows how to render a toast message in each position as well as a CSS file for styling the toast messages.

# Instructions

1. Create a toast library that has the following abilities:
   - Add a toast message
   - Remove a toast message by id
   - Some way to access all the toast messages
2. When a toast is created it should have the following options that you can configure
   - `autoDismiss`: a boolean that determines if the toast should automatically dismiss itself after a certain amount of time
   - `autoDismissTimeout`: the amount of time in milliseconds that the toast should wait before dismissing itself if `autoDismiss` is true
   - `position`: the position on the screen where the toast should appear (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
3. Toast messages should remove themselves when clicked
