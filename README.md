
# Arithmetic Calculator Frontend

This project is the frontend for the Arithmetic Calculator application. It is built using **React** and communicates with the **Arithmetic Calculator API**.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Run the App Locally](#run-the-app-locally)
3. [Build the Docker Image](#build-the-docker-image)
4. [Run the App with Docker Compose](#run-the-app-with-docker-compose)
5. [Environment Variables](#environment-variables)
6. [Features](#features)

---

## Prerequisites

Ensure you have the following installed on your local environment:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

---

## Run the App Locally

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ignacio-J-Maylin/arithmetic-calculator-react.git
   cd arithmetic-calculator-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if using Yarn:
   ```bash
   yarn install
   ```

### Execution

1. Set the API base URL in the `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   or if using Yarn:
   ```bash
   yarn start
   ```

The app will be available at `http://localhost:3000`.

---

## Build the Docker Image

1. Build the Docker image with a tag:
   ```bash
   docker build -t arithmetic-calculator-frontend:v1 .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:80 --name arithmetic-frontend arithmetic-calculator-frontend:v1
   ```

---

## Run the App with Docker Compose

1. Ensure the `docker-compose.yaml` file is properly configured to connect to the backend API.
2. Start the services:
   ```bash
   docker-compose up -d
   ```

The frontend will be available at `http://localhost:3000`.

---

## Environment Variables

The following environment variables are used in this project:

- `REACT_APP_API_BASE_URL`: The base URL of the backend API (e.g., `http://localhost:8080/api/v1`).

To set these variables, create a `.env` file in the project root or configure them in your CI/CD pipeline.

---

## Features

1. **User Authentication**:
   - Sign up, log in, and log out functionalities.

2. **Arithmetic Operations**:
   - Perform addition, subtraction, multiplication, division, square root, and random string generation.

3. **Credit Management**:
   - Add or remove credits to a user's balance.

4. **History and Records**:
   - View the operation history.
   - Delete specific records.

---

This README should serve as a guide to set up and run the Arithmetic Calculator frontend for development and production.
