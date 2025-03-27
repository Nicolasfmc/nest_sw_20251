# PokeConsult - Backend

This is the backend of the PokeConsult project, responsible for handling user management, team data, and communication with the PokeAPI. Built with Node.js and NestJS, the backend is designed to provide secure and efficient services for the frontend of the consulting platform.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Management**: APIs for creating, updating, and managing user accounts.
- **Team Management**: Endpoints for saving and retrieving Pokémon teams.
- **Authentication**: JWT-based authentication for secure access.
- **PokeAPI Integration**: Integration with PokeAPI for fetching Pokémon data.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for managing database connections and models.
- **JWT**: JSON Web Tokens for secure user authentication.
- **PokeAPI**: External API used to fetch Pokémon data.

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/).
- **npm**: Comes with Node.js, but make sure you have the latest version:
  ```bash
  npm install -g npm
  ```

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nicolasfmc/poke_api_backend.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## API Endpoints

Below are the current API endpoints available in the backend:

### User Management
- `GET /user/get-user`: Retrieve user details.
- `GET /user/get-all`: Retrieve all users.
- `POST /user/get-user-login`: Authenticate a user and provide a JWT.
- `POST /user/register-user`: Register a new user (currently admin only).
- `PUT /user/update-user`: Update user details.
- `DELETE /user/delete-user`: Delete a user.

### Team Management
- `GET /team/get-team`: Retrieve a user's team.
- `POST /team/save-team`: Save a user's team.
- `DELETE /team/delete-team`: Delete a user's team.

## Roadmap

### 🚧 Features In Progress / To Do
- **Google Login**: Implement login and registration through Google accounts.
- **User Registration API**: Create an API for user self-registration (currently only admins can register new users).

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Nicolasfmc/poke_api_backend/blob/main/LICENSE) file for details.
