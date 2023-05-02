Countries routes

Base URL /countries

| METHOD  | URI Path                                 | Description                                      |
|---------|------------------------------------------|--------------------------------------------------|
| GET     | /countries                               | All countries list                               |
| GET     | /countries/names                         | All country names list                           |
| GET     | /countries/:id                           | Matching ID country details                      |
| PUT     | /countries/:id/edit                      | Matching ID country edit                         |
| DELETE  | /countries/:id/delete                    | Matching ID country deletion                     |



Comments routes

Base URL /comments

| METHOD  | URI Path                                 | Description                                                 |
|---------|------------------------------------------|-------------------------------------------------------------|
| GET     | /:type/:id                               | Get all comments of one contry or post                      |
| POST    | /comments/create/:type/:id               | Create new comment in specific country or post              |
| PUT     | /comments/edit/:id                       | Matching ID comment edition in specific country or post     |
| DELETE  | /comments/delete/:type/:typeId/:id       | Matching ID comment deletion in specific country or post    |



Posts routes

Base URL /posts

| METHOD  | URI Path                                 | Description                                   |
|---------|------------------------------------------|-----------------------------------------------|
| GET     | /posts                                   | All posts list                                |
| GET     | /posts/:id                               | Matching ID post details                      |
| GET     | /posts/owner/:id                         | Get all posts with the same owner             |
| POST    | /posts/create                            | Create a new post                             |
| PUT     | /posts/:id/edit                          | Matching ID post edit                         |
| DELETE  | /posts/:id/:country/delete               | Matching ID post deletion                     |



Users routes

Base URL /users

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| GET     | /users                                   | All users list            |
| GET     | /users/:id                               | Matching ID user details  |
| PUT     | /users/:id/edit                          | Matching ID user edit     |
| DELETE  | /users/:id/delete                        | Matching ID user deletion |



Auth routes

Base URL /auth

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| GET     | /verify                                  | Verify auth token         |
| POST    | /login                                   | Login user                |
| POST    | /signup                                  | Signup user               |
# Queero-server
