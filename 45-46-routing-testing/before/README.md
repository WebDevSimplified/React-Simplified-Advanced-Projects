# Before Getting Started

The goal of this project is to practice testing a larger scale project with routing and API requests. The code for this project is nearly identical to the code for our advanced blog project. I did make a few minor modifications, though, so I would recommend downloading this code or just making the same modifications to your own code. Essentially, the only change I made was to change the `router.js` file by renaming it to `routes.js` and making it only return our array of routes instead of calling `createBrowserRouter`. Then in our `main.jsx` file I used those routes and called `createBrowserRouter` on the routes. The main reason I did this was to make it so you can use the `createMemoryRouter` function if you want.

This is a quite large project so don't worry if it takes a lot of trial and error to get it working. I am only going to have you test two of the pages, but if you want you can write tests for the entire app. I just chose the most complex pages for you to test.

Also, we haven't covered how to do router testing yet, so if you want you can watch the very start of the next video as I will cover how to use the `createMemoryRouter` function (as well as `createBrowserRouter`) to test our routes, but I recommend you try to see if you can figure it out on your own first through reading documentation.

Lastly, this section will require you to mock the API we use for this project as well.

_PS: You should create a copy of the `.env.development` file and rename it to `.env.test` so your testing environment has access to your ENV variables._

# Instructions

1. Test that the filtering on the `PostList` page works as expected. This will require quite a bit or API mocking, and is a rather large test. You should make sure you test that it works with no filter, as well as that each of the filter fields work.
2. Test that the `NewPost` page works when creating a post. This again will require lots of API mocking, and will even deal with navigating to new pages.
