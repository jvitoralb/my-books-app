# my-books-app APIs Documantation

## Services
- [book](#book)
- [user](#user)
- [auth](#auth)


### book
#### Create
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

#### Read
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

#### Update

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

#### Delete
Send a `DELETE` request to `/api/v1/books/{id}`

**Requires**:
1. Authorization header

Server should answer successfully a status code `204`.

### user
#### Create
#### Read
#### Update
#### Delete

### auth
#### Create
#### Read
#### Update
#### Delete