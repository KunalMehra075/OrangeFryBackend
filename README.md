# Introducing Orangefry.com

### ProjectCode - tame-ink-7589

Orangefry.com --> Clone of pepperfry.com
Deployed Site Link : https://orangefry.netlify.app/
Deployed Backend Link : https://orangefry.netlify.app/

![Orangefrylogo](https://user-images.githubusercontent.com/112753481/213991299-a2c6fe60-d6e2-4238-b8e2-552d61519352.png)

# What is OrangeFry.com??

Orangefry is an Indian online marketplace for furniture and home décor.A really good company when it comes to benefits, culture, office amenities. The management is very helpful and always available to talk. We have variety of furniture products from all over the world.

This website is fully functional website with all CRUD operations by user .
They need to go through User Authentication middleware, to perform any interactions

And for Admin site there is a special middleware called Admin Authenticator.
The CRUD operations on products can only be done by admin because Admin Authenticator sees it the user who is making request role is Admin or not.

---

# Features :-

- Users interact with it and their data will be safe forever.
- On any product, Users can comment and edit them also.
- Admin can modify the product and manage orders.
- The Admin can manage Products, Users and Comments.
- Google Authentication Login & Signup functionalities

---

# Tech Stack Used: -

## Frontend

| HTML                                                                                                                           | CSS                                                                                                                            | JavaScript                                                                                                                     | BootStrap                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| <img width="75px" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png"> | <img width="70px" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png"> |

## Backend : -

| Node.js                                                                                                                         | Express.js                                                                                                                      | MongoDB                                                                                                       | Passport                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img width="70px" src="https://user-images.githubusercontent.com/112753481/229047696-de3bf177-16a0-4161-a140-dd89e4fe7b22.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/229164589-4e724000-542d-4deb-9e11-cca7739c2b01.png"> | <img width="75px" src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/233825866-91f342c0-f567-4f9f-af03-e9acc86a784d.png"> |

---

# Routes :-

```
Users Routes
GET      /users                   -> Getting All the Users,(Needs Admin's Authentication)
POST     /users/register          -> Register New User (Requires user details in req.body)
POST     /users/login             -> Login existing user (Requires email and passwords, returns token if login success)
DELETE   /users/delete/:id        -> Delete User,(Needs Admin's Authentication)
PATCH    /users/update/:id        -> Update User,(Needs Admin's Authentication)

Products Routes
GET      /products/               -> Getting All the Products,
POST     /products/create         -> Create a new Product(Needs Admin's Authentication)
DELETE   /products/delete/:id     -> Delete Product,(Needs Admin's Authentication)
PATCH    /products/update/:id     -> Update Product,(Needs Admin's Authentication)

Cart Routes
GET      /carts/                  -> Getting All products in cart of a user(Takes UserID)
POST     /carts/create            -> Add a Product to the cart
DELETE   /carts/delete/:id        -> Delete a product from cart
DELETE   /carts/deleteAll/:id     -> Delete All Product in Cart
PATCH    /carts/update/:id        -> Update Product,(example quantity)

Favorites Routes
GET      /favorites/              -> Getting All Favorites of a user,(Takes UserID)
POST     /favorites/post          -> Add a Product to the Favorites
DELETE   /favorites/delete/:id    -> Remove a product from Favorites
DELETE   /favorites/deleteAll/:id -> Remove All Product in Cart

Reviews Routes
GET      /favorites/              -> Getting All Reviews of a Product,(Takes ProductID)
POST     /favorites/post          -> Add A review to a product
DELETE   /favorites/delete/:id    -> Delete the review,
DELETE   /favorites/update/:id    -> Edit the review,
Note:- (The person who wrote the review can edit/delete a review)

Google Routes
GET     /google                   -> Initiating Google Auth
GET     /google/callback          -> Redirect URI
GET     /google/login             -> Getting User Data after Google Authentication
GET     /google/logout            -> Logging out from the session


```

## Here are some screenshots of website.

### 🍊 Home Page :-

![home1](https://user-images.githubusercontent.com/112753481/213990182-6f5288f8-30e3-472f-a453-a271c138334e.jpg)

### 🍊 Home Page MegaMenu :-

![home2](https://user-images.githubusercontent.com/112753481/213990270-1494ad27-18a0-4cf0-bca6-28942ff2b9e8.jpg)

### 🍊 Home Page Offcanvas :-

![home3](https://user-images.githubusercontent.com/112753481/213990333-f401dc57-b91f-47f3-97b8-f104091af258.jpg)

### 🍊 AllProducts Page :-

![Allproducts2](https://user-images.githubusercontent.com/112753481/213993221-766f7f69-e258-4074-9114-5bdc476bc411.jpg)

### 🍊 OneProduct Page :-

![Oneproduct2](https://user-images.githubusercontent.com/112753481/213993265-6bb7a67f-ae6e-4cab-842e-14531cbbabda.jpg)

### 🍊 Review & Questions Section :-

![Review and feedback](https://user-images.githubusercontent.com/112753481/213990478-29c481d9-51c3-447c-ac94-b1e2b5708b9d.jpg)

### 🍊 Checkout Page :-

![checkout](https://user-images.githubusercontent.com/112753481/213990509-38ddfede-59c1-411b-884b-dfb83473ce04.jpg)

### 🍊 Order Summary Page :-

![order summary](https://user-images.githubusercontent.com/112753481/213990553-87debb1c-9fd8-4e0e-b6dd-2fdb4e533c11.jpg)

### 🍊 Admin Page :-

![Admin Page](https://user-images.githubusercontent.com/112753481/213990597-75e9630e-ac2f-4f2c-9683-01849960d780.jpg)

### 🍊 Admin Page Edit Product :-

![Edit product](https://user-images.githubusercontent.com/112753481/213990656-ddddba9a-fa49-4148-ade6-ba958d0c3adf.jpg)

### 🍊 About Website and Techstack Used :-

![About website and techstack](https://user-images.githubusercontent.com/112753481/213990703-87e08992-e1ed-4b2e-8850-1e3466217063.jpg)

## Thankyou for your time 💝
