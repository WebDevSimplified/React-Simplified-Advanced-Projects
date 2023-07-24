# Before Getting Started

You will recognize this project as the routing project we have used throughout this course. This starting code specifically is exactly the same as the final code from the routing testing project. The goal of this current project is to implement asynchronous routing with `Suspense`, `defer`, and `Await`. The actual implementation of the loading animations is entirely up to you, but there are a few CSS classes already included in the `styles.css` that will help you with adding in animations.

1. `skeleton` - This is the most basic class that will make the element about the same height as a piece of text, full width, and animate the opacity from 0.5 to 1. Also, if you have multiple `skeleton` elements next to each other in a container they will space out from each other and change the width of the last element to look more like a paragraph.
2. `skeleton-btn` - This class, when combined with the `skeleton` class, will size your element to look like a button element.
3. `skeleton-input` - This class, when combined with the `skeleton` class, will size your element to look like an input element.

If you want to see the full CSS code for these classes, you can find it below.

```css
.skeleton {
  background: hsl(200, 20%, 90%);
  border-radius: 0.5rem;
  height: 1em;
  width: 100%;
  animation: skeleton 1s infinite alternate ease-in-out;
}

.skeleton + .skeleton:last-child {
  width: 75%;
}

.skeleton + .skeleton {
  margin-top: 0.5rem;
  width: 100%;
}

.skeleton-btn {
  height: 2em;
  width: 4em;
}

.skeleton-input {
  height: 2em;
  border: 1px solid black;
}

@keyframes skeleton {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
```

# Instructions

1. Remove the global loading animation displayed in the `RootLayout.jsx` file. This will be replaced with a more specific loading animation for each route.
2. Using deferred loaders, add a loading animation to each page in the application that has a loader.

   - An easy way to test your loading animation (without slowing down your network speed which makes debugging slower) is to use the following code in your `api/base.js` file.

   ```js
   if (import.meta.env.VITE_SLOW_API === "true") {
     baseApi.interceptors.response.use(res => {
       return new Promise(resolve => {
         setTimeout(() => {
           resolve(res)
         }, 1000)
       })
     })
   }
   ```

   Then, in your `.env.development` file, add the following line to turn on the slow requests. This will add a 1 second delay to every request you make to the API.

   ```
   VITE_SLOW_API=true
   ```
