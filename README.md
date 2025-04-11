# Moodly

![Screenshot of Moodly](/docs/screenshot.png)

## Description

**Moodly** is a full-stack web application designed to help users track and understand their daily mood patterns over the course of an entire year. The app promotes emotional self-awareness and consistency by providing a simple, intuitive way to record daily moods and visualize long-term emotional trends.

This project addresses the common challenge of staying in touch with one’s emotions and recognizing patterns in mental well-being. With Moodly, users can actively monitor their state of mind, helping them make more informed lifestyle decisions and build healthy habits.

## Features

- **User Authentication**: Secure login and registration system powered by Firebase Auth.
- **Mood Tracking**: Record your mood each day by selecting from 5 predefined emotional states.
- **Interactive Calendar**: Visually explore your mood history with color-coded entries for each day.
- **Dashboard Analytics**:
  - **Day Streak**: Track how consistently you've logged your mood.
  - **Average Mood**: Get insights into your overall emotional well-being.
  - **Time Left to Log Today**: Stay on track with a countdown timer.
- **Beautiful UI**: Clean, modern design with responsive layouts for mobile, tablet, and desktop.
- **Fully Responsive**: Optimized for all screen sizes, with adaptive layouts and navigation.

## Demo

Check out Moodly live at: [moodly](https://mymoodly.vercel.app)

## Technologies

Moodly is built with the following technologies:

- **Next.js** – Full-stack React framework for modern web apps.
- **Tailwind CSS** – Utility-first CSS framework for fast and custom styling.
- **Firebase** – Handles authentication, real-time data storage, and backend logic.
- **JavaScript (ES6+)** – Modern scripting for frontend and backend logic.
- **React** – Component-based architecture for building the UI.

## Installation & Setup

To run Moodly locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/LachorJohnny/moodly.git
   cd moodly
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Why Moodly?

Moodly is more than just a mood tracker — it's a tool for emotional reflection and growth. By encouraging consistent self-check-ins, it helps users:

- Recognize long-term emotional patterns
- Build emotional resilience and self-awareness
- Take proactive steps toward better mental health

From clean visuals to thoughtful analytics, Moodly is designed to be both practical and motivating. It's a great showcase of modern web development practices, including responsive design, component-based architecture, and real-time database integration.
