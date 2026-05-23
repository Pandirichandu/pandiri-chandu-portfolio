# Modern AI-Themed Developer Portfolio

A world-class, premium, AI-themed developer portfolio built with React, Tailwind CSS, and Framer Motion. Features a futuristic glassmorphism UI, smooth scroll-triggered animations, interactive mouse-follow effects, and comprehensive sections.

## Features

- **Cinematic Preloader & Custom Cursor:** High-end AI initialization effect and magnetic cursor.
- **Dynamic Case Studies:** Detailed project modals with architecture and scalability insights.
- **Framer Motion Animations:** Smooth staggered reveals, scroll progress, and fade transitions.
- **Secure Contact Form:** Integrated with EmailJS for direct messaging.
- **Optimized Performance:** Lazy loading, memoized animations, and error boundaries.
- **Vercel Analytics:** Built-in visitor tracking.

## Tech Stack

- React.js 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Icons
- EmailJS
- Vercel Analytics

## Setup & Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your EmailJS credentials (see `.env.example`):

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Deployment Automation (Vercel)

This project is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository.
4. **Environment Variables:** During the import process, expand the "Environment Variables" section and add the three EmailJS variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
5. Click **Deploy**. Vercel will automatically build and deploy your portfolio.
6. (Optional) Enable Vercel Analytics in the Vercel dashboard for this project to start tracking visitors.

## Accessibility

This portfolio is built with accessibility in mind:

- Semantic HTML5 structure
- Keyboard navigable sections and modals
- ARIA labels on interactive elements
- Scalable typography
