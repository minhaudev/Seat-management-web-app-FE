# Managerment Seat

This is a seat management web application built with **Next.js** for the frontend and **Java Spring Boot** for the backend. The system is designed to help organizations manage and visualize seating arrangements efficiently across multiple rooms, halls, and floors. The application supports real-time updates, user role management, and drag-and-drop UI for seat assignments.

---

## Getting Started

To start the development environment, run the following commands:

```bash
yarn install
yarn dev
```

Make sure the backend Spring Boot server is running and configured to allow requests from the frontend.

---

## Project Description

The Seat Management System provides a comprehensive platform for managing seating arrangements within an organization. It allows administrators to create and customize rooms using drag-and-drop components or by uploading a background image of the actual layout. Seats can be assigned permanently or temporarily to users, with full control depending on the user's role.

There are three roles in the system:

-   **Superuser**: Has full access to all functionalities, including managing users, floors, rooms, halls, and seats. This role can also assign or reassign seats and approve room layouts.
-   **Landlord**: Can manage seats within their own rooms. They can assign and reassign users to seats but have limited access outside their assigned areas.
-   **User**: Has view-only access. They can see seating layouts and view basic information about people seated, including their name, ID, team, and project.

Each seat is color-coded by team or project, and hovering over a seat reveals real-time information about the occupant.

---

## Key Features

-   Drag-and-drop room builder with or without background image
-   Seat assignment and reassignment functionality
-   Permanent and temporary seat types
-   Real-time seat updates using WebSockets
-   Role-based access control with JWT authentication
-   SMTP integration for password reset
-   Admin approval for room layouts
-   Reporting by team or project
-   Tooltip with detailed user information on hover

---

## User Management & Authentication

The system supports full user management through the admin panel. Authentication is handled using JWT tokens. Users are assigned roles that determine their access level.

The password reset system uses SMTP email integration. A reset link is sent to the user’s email when they request a password reset.

---

## Login Credentials

You can use the following test accounts to log into the system:

-   **Superuser**

    -   Email: `superuser@superuser.com`
    -   Password: `superuser123`

-   **Landlord**

    -   Email: `landlord@landlord.com`
    -   Password: `minhhau2803`

-   **User**
    -   Email: `minhaudev@gmail.com`
    -   Password: `internTMA@`

> The SMTP sender email for testing password reset is `minhaudev@gmail.com` with password `internTMA@`.

---

## Technologies Used

-   **Frontend**: Next.js, Tailwind CSS, React DnD
-   **Backend**: Java Spring Boot, Spring Security, WebSockets
-   **Database**: PostgreSQL
-   **Authentication**: JWT
-   **Email Service**: SMTP (Gmail)
-   **Deployment**: (To be added)

---

## Development Timeline

### Phase 1 – Backend (Weeks 1–4)

-   Set up Spring Boot project and database schema
-   Implement authentication and role management
-   Create APIs for rooms, seats, and assignments
-   Add WebSocket support for real-time updates

### Phase 2 – Frontend (Weeks 5–8)

-   Build room layout UI using Next.js
-   Implement drag-and-drop for seats and layout elements
-   Integrate with backend APIs
-   Show seat information on hover

### Phase 3 – Finalization & Deployment (Weeks 9–12)

-   Add admin dashboard and approval flow
-   Generate reports based on seat usage
-   Optimize performance and UI
-   Deploy the project to a cloud platform

---

## Deployment

The project will be deployed soon.

**Live Link:** _Coming Soon_

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions, feedback, or contributions, please contact the development team.
