# Utility CSS

This code uses TailwindCSS to style nearly the entire application. The site is not a 100% one-to-one match of the original, but I got it as close as I could using TailwindCSS's built in classes.

There are still a few styles in the `styles.css` file which handle styles that are impossible/annoying to do with TailwindCSS. The form related styles are there since there is no way in TailwindCSS, or any other utility CSS library, to select an HTML element so these selectors needed to stay in our CSS file. I did, however, use Tailwind's `@apply` directive so I could use Tailwind's utility classes in the CSS file. The other styles in the CSS file are there because writing them in TailwindCSS would require tons of classes and would be very hard to read.

You may also notice that I broke down our original project into multiple components. This allows us to use the same utility classes in multiple places without having to write the same classes over and over again. This also makes it easier to update our styles since all the styles for a single component are in one place.

Lastly, you will notice I added a couple classes to the `body` tag inside our `index.html` file. This is to take care of the styles we originally defined in our `styles.css` file that targeted the `body` element.

# How To Run This Code

1. Run `npm i` in each folder to install dependencies for the api/client.
2. Run `npm run dev` in each folder to start the api/client
