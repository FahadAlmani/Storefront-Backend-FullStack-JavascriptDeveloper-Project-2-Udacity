# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: 'product/index' [GET]
- Show route: 'product/show/:id' [GET]
- Create route: 'product/create' [POST] [token required]
- Popular Products route: 'product/popularProducts' [GET]
- Search by category route: 'product/category/:category' [GET]

#### Users

- Index route: 'user/index' [GET] [token required]
- Show route: 'user/show/:id' [GET] [token required]
- Login route: 'product/login' [POST] [token required]
- Create route: 'user/create' [POST] [token required]

#### Orders

- Index route: 'order' [GET] [token required]
- Show completed orders route: 'order/completedOrders' [GET] [token required]

## Database

- users Table (id:searal, firstname:varchar, lastname:varchar, username:varchar, password:text)
- products Table (id:searal, name:varchar, price:int, category:varchar)
- orders Table (id:searal, userId:varchar[foreign key to users table], productId:varchar[foreign key to product table], quantity:int, status:varchar)

## Data Shapes

#### Product

- id
- name
- price
- category

#### User

- id
- firstname
- lastname
- username
- password

#### Orders

- id
- userId
- productId
- quantity
- status (active or complete)
