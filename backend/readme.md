# Backend API Documentation

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

### Responses

| Status Code | Description                                 | Response Body Example                |
|-------------|---------------------------------------------|--------------------------------------|
| 201         | User registered successfully                | `{ "token": "...", "user": {...} }`  |
| 400         | Validation error (invalid/missing fields)   | `{ "errors": [ ... ] }`              |
| 500         | Internal server error                       | `{ "error": "..." }`                 |

### Notes

- On success, returns a JWT token and the created user object.
- All fields are required except `lastname`.

---