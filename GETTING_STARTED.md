# Getting Started with Elemes

## Overview

Elemes is an e-learning platform built with Next.js that allows instructors to create and manage courses, chapters, and lessons. The platform includes user authentication, role-based access control, and a comprehensive admin interface for content management.

## Features

- User authentication with email and GitHub OAuth
- Role-based access control (admin/user)
- Course management with different levels and statuses
- Chapter and lesson organization with drag-and-drop reordering
- File uploads for course images, lesson thumbnails, and videos
- Rich text editing for course and lesson descriptions

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [PostgreSQL](https://www.postgresql.org/) database (or use a cloud provider like Neon)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd elemes
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables (replace with your own values):

```
# DATABASE
DATABASE_URL="postgresql://username:password@localhost:5432/elemes?schema=public"

# BETTER AUTH
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# GITHUB OAUTH (optional)
AUTH_GITHUB_CLIENT_ID=your_github_client_id
AUTH_GITHUB_CLIENT_SECRET=your_github_client_secret

# RESEND (for email)
RESEND_API_KEY=your_resend_api_key

# ARCJET (for rate limiting)
ARCJET_KEY=your_arcjet_key

# S3 STORAGE (for file uploads)
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_ENDPOINT_URL_S3=your_s3_endpoint
AWS_ENDPOINT_URL_IAM=your_iam_endpoint
AWS_REGION=your_region
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=your_bucket_name
```

4. Generate Prisma client:

```bash
pnpm prisma generate
```

5. Run database migrations:

```bash
pnpm prisma migrate dev
```

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Project Structure

- `/app` - Next.js application routes and components
  - `/(auth)` - Authentication-related pages
  - `/(root)` - Main application pages
  - `/admin` - Admin dashboard and management pages
  - `/api` - API routes
  - `/data` - Data fetching and state management
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and generated code
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Basic Usage

### Authentication

1. Register a new account or log in with existing credentials
2. Optionally, connect with GitHub for social login

### For Admins

1. Access the admin dashboard at `/admin`
2. Create and manage courses, chapters, and lessons
3. Upload course images, lesson thumbnails, and videos
4. Publish courses when they're ready for users

### For Users

1. Browse available courses on the homepage
2. Enroll in courses of interest
3. Navigate through chapters and lessons
4. Track progress through enrolled courses

## Troubleshooting

### Database Connection Issues

- Ensure your PostgreSQL server is running
- Verify that your DATABASE_URL in the .env file is correct
- Check that your database user has the necessary permissions

### File Upload Problems

- Confirm that your S3 credentials are correct
- Ensure the bucket exists and is properly configured
- Check that the user has appropriate permissions for the bucket

### Authentication Errors

- Verify that BETTER_AUTH_SECRET and BETTER_AUTH_URL are set correctly
- For GitHub OAuth, ensure your client ID and secret are valid
- Check that the callback URLs are properly configured in your OAuth provider

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Please refer to the CONTRIBUTING.md file for guidelines on how to contribute to this project.
