# Before Getting Started

This project is fairly open ended in that there is no specific way that you need to implement the infinite scrolling behavior. You can create a custom hook, custom component, or just do it all in the `App.jsx` file.

The starting code for this project contains both a `client` and an `api` folder. The `api` folder contains the code for the fake API we will be using, while the `client` folder contains the static HTML/CSS files. In order to start the API you need to run `npm run dev` inside the `api` folder (make sure you run `npm i` first to install the dependencies). This should start up an API on `http://localhost:3000`. This API is built on the [json-server](https://www.npmjs.com/package/json-server) package, which is a great tool for quickly building fake APIs. Essentially, whenever you make a request to the API it will read/write to the `db.json` file to get your data. I also included a `db.example.json` file which is the same as the `db.json` file, but it will never be modified so if you want to reset the API data to its original state you can copy the JSON from the `db.example.json` file into the `db.json` file.

The goal of this project is to create an infinitely scrolling grid of photos. Most likely you will need to use the `useCallback` hook as a ref combined with `IntersectionObserver`. _If you are unfamiliar with `IntersectionObserver` I recommend reading my [IntersectionObserver blog article](https://blog.webdevsimplified.com/2022-01/intersection-observer)._

# API Information

The API has the following endpoints:

- `GET /photos?_page=<page>&_limit=<limit>` - Returns up to `<limit>` photos starting at `<page>` page.
- `GET /photos-short-list?_page=<page>&_limit=<limit>` - This is identical to the above endpoint but this endpoint only has 100 photos total so you can more easily test what happens when you reach the end of the list.

This API also uses the `Link` HTTP header to give you back the urls to the `next`, `previous`, `first`, and `last` pages. In our case we really only need the `next` page url. In order to parse this header you can use the `parseLinkHeader` function in the `client` folder. For more details on how the function works check out the comments above the function definition.

# Instructions

1. Create an infinitely scrolling grid of photos using the API.
   - The list should not break if there are no more photos to load.
   - The list should not break if the user scrolls up and down quickly.
   - The list should only load new photos when the user reaches (or gets close to) the bottom of the page.

## Bonus:

1. Add a simple skeleton loading animation for when the photos are loading.
   - The `index.html` file has a demo of what the skeleton loading animation should look like.
