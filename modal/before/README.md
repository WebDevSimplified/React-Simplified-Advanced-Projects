# Before Getting Started

This project is quite a bit smaller and less complicated than the final projects from the Beginner course, but that is because the main goal of this project is to learn how to work with Portals. This project also introduces working with APIs that weren't designed with React in mind. This is a common scenario that you will encounter in the real world, so it is important to learn how to work with libraries/APIs that weren't designed with React in mind.

As for the starting code, all the styles you need are in the `styles.css` file. This includes styles for the custom modal. In this `index.html` I have included all the HTML you need for the two different types of modals implemented in this project. I also included JS code at the bottom of the file that allows the modals to be interacted with. This code will not translate one-to-one to React, but it should give you an idea of how to work with the `dialog` element since that is an HTML element that is somewhat new.

# Instructions

1. Create a `CustomModal` component that renders a custom modal over the top of the application when opened.
   - This modal should be opened by clicking the open button and closed by clicking the close button.
   - This modal should also close when the `Escape` key is pressed.

## Bonus:

1. Create a `DialogModal` component that renders a `dialog` element over the top of the application when opened.
   - This modal should have the exact same props/behavior as the `CustomModal` component.
   - `dialog` elements automatically close when clicking the `Escape` key, but you will need to be careful about how you implement this since you need to make sure this automatic behavior links up with your React state/logic.
