# Instagram Project - Group FE23

Project launch from the root folder using: **npm run dev**

Heroku live: [heroku live application](#)

## Authors of the project:

**Maksym Lobachevskyi** - slackname - **Maksim.L**

**Volodimir Zhukivskyi** - slackname - **Володимир Жуківський**

**Dmytro Zyakun** - slackname - **DmitriyZ**

## Responsibilities

### Maksym Lobachevskyi:

**Backend (root folder):**

1. Server part using Node.js, Express.js, MongoDB Atlas.
2. Routes API, Mongo models, Validation.
3. Cloudinary storage for images

**Front-end (client folder):**

1. Registration + Login components and functionality, AuthContainer component
2. Likes, Follows
3. Components: UserProfile.js, Dashboard.js, Footer.js, Navbar.js, Loader.js(.scss), routes.js, Modal.js
4. Redux files related to above components and functionality

### Volodimir Zhukivskyi:

**Front-end (client folder):**

1. ShowMore, Infinite Scroll and Pagination functionality.
2. Components: showMore.js, Button.js, Pagination.js, Modal.js, Post.js, Users.js, User.js, userProfile.js
3. Likes, Follows
4. Sliding functionality in modal window
5. Styling: scss style files
6. Redux files related to above components and functionality

### Dmytro Zyakun:

**Front-end (client folder):**

1. Comments functionality: Comments.js, Comment.js, Modal.js
2. React unit tests: Button.test.js, Navbar.test.js, User.test.js, Footer.test.js
3. Redux files related to above components and functionality
4. Application deploy: Heroku

## Used technologies and tools

MERN Stack: Node.js, Express.js, React, MongoDB Atlas

**Packages:**
axios - API
bcryptjs - hashing passwords
body-parser - reading data inside HTTP request
concurrently - concurrently start of server and client parts
jsonwebtoken - tokens for login
mongoose - connection to MongoDB
validator - input field validation
nodemon - live monitor and reload of the application
react-redux, redux - redux
react-router-dom, react-dom - routing
react-svg - working with svg files
materialize-css, sass - styling
enzyme - testing
