<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

# Giphy API Project JS
 By Team 1:  Diana, Dimo & Georgi

### 1. Description

Design and implement a Gifs SPA application for searching and sharing funny gifs with your friends. The application should be able to display the top trending gifs, upload gifs and much more! For our purposes we are going to use the Giphy API.

<br>

### 2. Project information

- Language and version: **JavaScript ES2020**
- Platform and version: **Node 14.0+**

<br>

### 3. Step-by-step Guide

1. In order to use the Giphy API, first we need to register. Go here and register to Giphy.
2. After you registered successfully, the next thing we want to do is to create an app. By creating an app, Giphy will provide us with an api_key that we are going to need in our future requests.

3. Select the API product and name your app

4. After you successfully created an app, you should have obtained an api_key for that app. Now we can get to work!
<br>

### 4. Full project view

The finished version of the app has the following views:

- Home page with Display Trending Gifs
- Render the search result
- Individual detailed gif
- Upload gif view
- My uploads view
- Favorite Gif
- About view

<br>

#### Must Requirements

The application must support the following functionalities:

### Display Trending Gifs

The application must have a display trending gifs functionality, that will allow the user to see the top trending gifs. You should use the trending endpoint with your api_key. You can limit the received gifs, by using the limit parameter.

### Search Gifs

The application must have a search gifs functionality, that will allow the user to search gifs by a given query. You should use the search endpoint with your api_key and a search query – q, provided by the user. You can limit the received gifs, by using the limit parameter.

### Display Gif Details

The application must have a display gif details functionality, that will allow the user to see a given gif’s detailed information like uploaded user’s username. You should use the get-gif-by-id endpoint with your api_key and the desired gif’s id – gif_id.

### Upload Gif

The application should have an upload gif functionality, that will allow the user to upload a gif from his file system. You should use the upload endpoint with POST request, containing your api_key and in the request’s body you should send a file object as a form data. You can see the uploaded gifs in your Giphy Channel.

## Should Requirements

This application should support the following functionalities:

### Display Uploaded Gifs

The application should have a display uploaded gifs functionality, that will allow the user to see his uploaded gifs. You can do this by storing the ids of the uploaded gifs in the browser’s local storage and then use the get-gifs-by-id endpoint with your api_key and the desired ids, separated by commas – ids.

### Favorite Gif

The application should have a favorite gif functionality, that will allow the user to make a gif his favorite and display it somewhere in the app. If the user hasn’t chosen a favorite gif yet, he should

be notified, and a random gif will be shown as a favorite. You can do this by storing the chosen favorite gif’s id in the browser’s local storage and then use the get-gif-by-id endpoint and if the user has no favorite gif yet, you can use the random endpoint.


### 5. General Requirements

· You must use Native DOM API for DOM manipulations.

· You must use Git to keep your source code and for team collaboration.

· You must use GitLab’s issue tracking system.

· You must use ESLint to write consistently styled code.

· You must use modules and they should be single-responsible.

· You must document your code explicitly following the JSDoc standard.

· You must use correct naming and write clean, self-documenting code.

· You must have a usable user interface.

· You must use the latest features of ECMAScript.

· You could use external libraries such as Bootstrap, Materialize or other to style your project

· External libraries such as jQuery UI, Kendo UI or others for custom controls are allo

### 6. Setup

You can work in the `template` folder or create your own **solution** folder and keep the `template` intact. To run the app make sure you have `live-server` installed **globally**.

1. Go inside the `template` folder (or your own work directory)
1. At root level (where the `index.html` is) run `live-server`
1. You are good to go

**Important:** Remember `live-server` will refresh the page whenever changes are saved to JavaScript and CSS files. Sometimes updating the CSS might trigger an error in the hot reload script - if that happens just refresh the page in the browser.

<br>

### 6. Project structure

-
- `styles` - contains the CSS files included in the app
- `src` - where the app's JavaScript code lives, inside you can find
  - `common/constants.js` - `common` holds resources used by other files, such resources are the constants in `constants.js`. Take a look at the file - remember the rule about no magic strings and numbers, and no hardcoded values?
  -
    - `favorites.js` - the module responsible for adding and removing gifs from favorites. It is based on the browser feature `localStorage`. Even though the implementation is complete, you can research more about the `localStorage` and how it can be useful for storing an retrieving data
    <!-- - `movies-data.js` - holds the raw movies and categories data. **You do not have direct access to the data**.
    - `movies.js` - this is the public movies data API which exposes controlled access to the movies and categories data. **You need to use it when you implement the data `request` logic**. -->
  - `events` - holds the core app logic. Event listeners in `index.js` use directly functions exposed in the `events` folder files. The role of those functions is to make a bridge between the data and the views, i.e. a function might have to retrieve all movies matching a search condition, create a view rendering the movies and displaying the created view. Inside the folder you can find:
    - `favorites-events.js` is already implemented for you. Its role is to react to the heart icon - switch the **favorite** status of a gif, i.e. add it to favorites or remove it. Its logic is very similar to the heart icon of post in [Telerik Academy Forum](https://forum.telerikacademy.com/)
    - `helpers.js` is already implemented too. It has some helpers methods including aliasing for `document.querySelector` and `document.querySelectorAll`
    - `navigation-events.js` is related to navigation events such as clicking on nav links (Home, Uploads, etc.), buttons to show more of a category or a movie. You will need to complete the implementation of its functions
    - `search-events.js` is related to the searchbox and the search functionality
  - `requests-service.js` is the **service** file (services are another name for file providing some reusable functionality) providing access to the public API of the data layer. While in this template the data layer is inside the app, in the next exercise the data later will be completely moved to a server and the `request` service will be the place to access that data.
  - `views` is the folder containing the view **templates**. **Templates** are partial html files (containing not a whole page, but a small meaningful part of it) which can have placeholders for data as well. Example of a view: `<p>This article has ${article.viewCount} views.</p>`. You can explore the files in the folder - they contain functions mapping data to (and returning) template views:

    - `home-trending-gifs-view.js`
    - `search-view.js`
    - `gifi-view.js`
    - `about-view.js`
    - `upload-view.js`
    - `my-uploads-view.js`
    - `favorites-view.js`
    - `favorites-view.js`
    -
<br>

### 7. App logic flow


The core app logic is very simple

1. User triggers an event by clicking/tapping on a element (link, button, heart icon, etc.)
2. When an event is raised it is handled by an event listener in `index.js`
3. Depending on the event type and the event's target element (or its class, id, etc.) a specific function from the `events` folder is called, i.e. when a nav link is clicked the `loadPage` is called with the value of the `data-page` attribute of the clicked element
4. The appropriate event function from the `events` folder either:
    - updates the view from a template in `views` (Home, About)
    - retrieves data from the `request` service and updates the view from a template in `views` depending on that data (and the template)
5. The view is updated and the user can trigger an new event

You can follow the already implemented navigation event called on elements with the class `nav-link` and specifically how the Home page is loaded. The rest of the events and event handlers follow the same logic.

<br>


### 9. Work requirements


Explicit listing:

1. Templates/views:
2. Event functions:
3. Request service functions:

<br>
