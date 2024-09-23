# Employee Management - Frontend

This is the frontend part of the **Employee Management System**, built with **Next.js** and styled using **Tailwind CSS**. The frontend interacts with the backend API to manage employee data, with features like adding, updating, and deleting employee records, sorting employee lists, and server-side validation.

## Demo

You can view a live demo of the application here:

[Live Demo](#) 

### Admin Credentials:
- **Username**: `admin`
- **Password**: `password`

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Contributors](#contributors)
- [License](#license)

## Features

- **Add Employee Details**: Admins can add new employees with details like name, department, and role.
- **Update Employee Details**: Admins can modify existing employee information.
- **Delete Employee**: Admins can delete employee records.
- **Sort Employees**: Users can filter and sort the employee list based on custom filters (like department or role).
- **Server-Side Validations**: Form data is validated before being submitted to the backend to ensure data integrity.
- **Responsive UI**: Designed to be fully responsive with **Tailwind CSS**.
- **Authentication**: Integrated with backend authentication for secured login and admin access.

## Installation

### Prerequisites

- **Node.js** (v14.x or later)
- **Next.js** (latest stable version)
- **Tailwind CSS**

### Steps to Run Locally

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ramtanniru/DealsDray.git
    cd DealsDray
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following variables:

    ```bash
    NEXT_PUBLIC_BACKEND_API_URL="http://localhost:4000"  # Backend API URL
    NEXT_PUBLIC_CLOUDINARY_URL="your_cloudinary_base_url"  # Cloudinary URL for CDN
    ```

4. **Start the Development Server:**
    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:3000`.

## Usage

1. Open `http://localhost:3000` in your browser.
2. Login using the credentials:
   - **Username**: `admin`
   - **Password**: `password`
3. You can now add, update, delete, and sort employees from the admin dashboard.

## Configuration

The project uses the following environment variables:

| Variable                     | Description                                      |
|-------------------------------|--------------------------------------------------|
| `NEXT_PUBLIC_BACKEND_API_URL`  | URL of the backend API                           |
| `NEXT_PUBLIC_CLOUDINARY_URL`   | Cloudinary base URL for CDN content              |

## Dependencies

- **Next.js** - React framework for server-side rendering and static site generation.
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development.
- **Fetch** - HTTP client for API requests.
- **Cloudinary** - CDN for media files.
- **React Hook Form** - Form management with validation.
- **SWR** - Data fetching for seamless UI updates.

## Deployment

The project is deployed on **Vercel**. To deploy the frontend:

1. Connect your GitHub repository to Vercel.
2. Set the following environment variables in the Vercel dashboard:
    - `NEXT_PUBLIC_BACKEND_API_URL`
    - `NEXT_PUBLIC_CLOUDINARY_URL`
3. Vercel will handle the build and deployment.

## Contributors

- **Your Name** - Tanniru Leela Sai Ram

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
