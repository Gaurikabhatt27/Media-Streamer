Streamify 🎵📺

Streamify is a modern, React-based media streaming web application that allows users to explore, watch, and interact with video content seamlessly. Inspired by YouTube, Streamify integrates search, recommendations, user history, and personalized features in a clean, responsive interface.

Table of Contents

Overview

Features

Tech Stack

Project Structure

Future Enhancements

Contributing

Overview

Streamify is designed to deliver a rich media streaming experience entirely on the frontend using React. It consumes the YouTube Data API v3 for video content, allowing users to:

Search for videos and see real-time suggestions

Watch videos with a clean player interface

Explore trending content

Track watch history and favorite videos

All features are implemented without a backend server — everything runs purely in the browser, storing minimal state locally.

Features
Core Features

Home Page

Displays trending videos from YouTube

Grid-based layout for easy browsing

Placeholder shimmer effect for loading states

Search Functionality

Real-time search suggestions

Displays results in a clean grid

Handles loading and empty states

Watch Page

Embedded video player

Video metadata (title, channel, stats)

Recommendations based on the currently playing video

Recommendations

Related videos fetched using the title of the currently playing video

Error handling for unavailable content

Profile Page

User info placeholder (to be enhanced in future versions)

Centralized layout matching website theme

Upload Page

Frontend interface for uploading video information

Currently UI-only, ready for future backend integration

Watch History

Local storage keeps track of watched videos

Easy access to previously watched content

Infinite Scroll

Home page's infinite scrolling like YouTube’s homepage

New videos automatically load as the user scrolls down

Tech Stack

Frontend: React, React Router

Styling: CSS Modules, Tailwind (optional future integration)

API: YouTube Data API v3

State Management: React Hooks

Storage: LocalStorage for search history & watch history

Project Structure
streamify/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ youtube.js          
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ VideoCard.jsx
│  │  ├─ ShimmerCard.jsx
│  │  └─ Recommendations.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Watch.jsx
│  │  ├─ Profile.jsx
│  │  ├─ Upload.jsx
│  │  └─ Search.jsx
│  ├─ styles/
│  │  └─ global.css
│  └─ App.jsx
├─ .env                     
├─ package.json
└─ README.md

Future Enhancements

Profile page integration with user favorites and playlists

Upload page backend support using Firebase or Node.js

Dark/Light mode toggle

Enhanced recommendations using machine learning algorithms

Responsive design improvements for mobile and tablet

Contributing

Contributions are welcome! Feel free to:

Fix bugs and improve UI/UX

Add new features like playlists or comments

Optimize API calls and performance

Steps:

Fork the repository

Create a new branch feature/your-feature

Commit your changes

Create a Pull Request
