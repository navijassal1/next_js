## Getting Started

First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open http://localhost:3000
 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font
 to automatically optimize and load Geist
, a new font family for Vercel.

# APP ROUTING

- This project uses folder-based routing. The folder structure inside the app directory determines your application’s routes automatically.

### How It Works

- The name of a folder becomes the route path.

The page.js or page.tsx file inside a folder defines what content is displayed at that route.

# Example Folder Structure
- app/
- ├─ page.tsx          // Renders the homepage
- ├─ posts/
- │  └─ page.tsx       // Renders the posts page

# Resulting Routes
- Folder / File	Route Path
- app/page.tsx	/ (Homepage)
- app/posts/page.tsx	/posts
- Notes

### Nested folders create nested routes.

- Simply adding a new folder with a page.tsx file automatically creates a new route.

# Learn More

To learn more about Next.js, take a look at the following resources:

Next.js Documentation
 - learn about Next.js features and API.

Learn Next.js
 - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository
 - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform
 from the creators of Next.js.

Check out our Next.js deployment documentation
 for more details.

If you want, I can also add a small visual diagram showing how app folders map to routes—it makes the README even more beginner-friendly.