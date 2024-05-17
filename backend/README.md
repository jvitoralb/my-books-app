# my-books-app APIs Documantation

## Services
- [book](#book)
- [user](#user)
- [auth](#auth)


### book
#### POST
Send a `POST` request to `/api/v1/books`

**Requires**:
1. Authorization header
2. Book title

*Note: The book's `author` and `about` informations are optional.*

Server should answer successfully a status code `201` and a response body equals to:
```
{
    id: ObjectId(),
    title: "Book Title"
}
```

#### GET
Send a `GET` request to `/api/v1/books`

**Requires**:
1. Authorization header

Server should answer successfully a status code `200` and a response body equals to:
```
[
    {
		"id": ObjectId(),
		"user_id": ObjectId(),
		"title": "Book Title",
		"author": null,
		"about": "about this book",
		"section": null,
		"created_at": "2023-11-15T19:49:29.536Z"
	}
]
```

#### PUT

##### Book information
Send a `PUT` request to `/api/v1/books/{id}/info`

**Requires**:
1. Authorization header
2. Book `title`, `author` and `about`

*Note¹: If any of the fields are `undefined` it throws an `400 error`.*  
*Note²: If any of the fields are `null` it updates to `null`.*

Server should answer successfully a status code `204`.

##### Book Section
Send a `PUT` request to `/api/v1/books/{id}/section`

**Requires**:
1. Authorization header
2. Book `section`

*Note¹: If section is `undefined` it throws an `400 error`*  
*Note²: If section is `null` it updates to `null`*

Server should answer successfully a status code `204`.

#### DELETE
Send a `DELETE` request to `/api/v1/books/{id}`

**Requires**:
1. Authorization header

Server should answer successfully a status code `204`.

### user
#### GET
Send a `GET` request to `/api/v1/users`

**Requires**:
1. Authorization header

Server should answer successfully a status code `200` and a response body equals to:
```
{
    name: "user name",
	email: "user email"
}
```

#### PUT

##### Update email
Send a `PUT` request to `/api/v1/users/email`

**Requires**:
1. Authorization header
2. New email

Server should answer successfully a status code `204` and a `access_token` cookie with an authentication token.

##### Update password
Send a `PUT` request to `/api/v1/users/password`

**Requires**:
1. Authorization header
2. New password

Server should answer successfully a status code `204`.

#### DELETE
Send a `DELETE` request to `/api/v1/users`

**Requires**:
1. Authorization header

Server should answer successfully a status code `204`.

### auth
#### POST

##### Register
Send a `POST` request to `/api/v1/auth/register`

**Requires**:
1. User name, email, and password

The server should answer successfully a status code `201`, an `access_token` cookie with an authentication token, and a response body equals to:
```
{
    email: "user@email",
    name: "User name",
}
```

##### Login
Send a `POST` request to `/api/v1/auth/login`

**Requires**:
1. User email and password

The server should answer successfully a status code `204` and a `access_token` cookie with an authentication token.
