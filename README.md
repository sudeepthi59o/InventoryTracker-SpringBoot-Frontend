# Inventory Tracker - Frontend

## Overview

This is the **frontend** part of the **Inventory Tracker** application, built using **React** and **Vite**. It provides a user interface for managing and tracking inventory items.

### Features:

- View, add, edit, and delete inventory items for admins.
- View inventory items for normal users.
- Search and filter items.
- Displays inventory data fetched from the backend API.

## Technologies Used:

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool for development and production.
- **Axios**: For making HTTP requests to the backend.

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (e.g., backend API URL):
   Create a `.env` file in the root of the project with the following:

   ```env
   VITE_API_URL=http://<backend-url>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173`. (vite)

### Deployment

- The frontend is hosted on **AWS S3**. After building, it is automatically deployed via a CI/CD pipeline.
