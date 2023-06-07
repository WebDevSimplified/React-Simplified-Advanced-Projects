# CSS Modules

This code uses CSS modules to style nearly everything in the application. The main difference you will notice with this project is that nearly every component in the `components` folder now has its own folder which contains a `.module.css` file. This file contains all the CSS for that component. You will also notice that I added multiple new components to this project, such as the `Card`, `PageHeader`, and `FormRow` components. The reason I added these components is because it makes it easier for me to modularize my CSS.

I do still have the `styles.css` file as well. This file is mostly for importing my global CSS, such as styles on the `body`, as well as for importing my utility classes, such as `text-sm`. Even if you use CSS modules there is a good chance you will have some CSS that you want to be global which is why you will often have at least one global CSS file to contain these more global styles.

# How To Run This Code

1. Run `npm i` in each folder to install dependencies for the api/client.
2. Run `npm run dev` in each folder to start the api/client
