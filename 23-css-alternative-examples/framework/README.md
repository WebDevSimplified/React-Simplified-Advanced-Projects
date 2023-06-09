# Framework

This code uses Bootstrap for the entire application. You will notice that the site looks quite a bit more zoomed out by default. This is because the original site had a `font-size` of `2rem` and everything was built around that. There is no easy way in Bootstrap to set a larger `font-size` since even if you increase the Bootstrap `font-size` none of the other styles, such as padding/margin, will reflect this change and it doesn't look very good. If you zoom the site in to 150%-200% it will look closer to all the other examples.

Overall swapping to Bootstrap just required changing out our custom CSS/components for Bootstrap's version of those components. We were even able to remove our `FormGroup` component since Bootstrap has its own version of that component.

Lastly, you will notice that we still have our `styles.css` file. This file is mostly there to set our `body` background color as well as to add all the styling for the loading screen as that is not something we can do with Bootstrap alone. There are also a few instances in the code where we needed to add some custom styles to make things look like our other examples since Bootstrap has very limited customization options.

# How To Run This Code

1. Run `npm i` in each folder to install dependencies for the api/client.
2. Run `npm run dev` in each folder to start the api/client
