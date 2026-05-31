# 🎬 Movie App (React)

A simple movie search application built with React.  
The app allows users to search for movies, view results as cards, and manage favorites using Context API.

---

## 🚀 Features Built

### 🔍 Movie Search
 Users can search for movies using a search bar
 Controlled input using React `useState`
 Search query is passed to parent component
 Prevents page refresh on submit

### 🎞️ Movie Display
- Movies are displayed in card format
- Each card shows movie details (title, poster, etc.)
- Grid layout for better UI presentation

### ❤️ Favorites System
- Add movies to favorites
- Remove movies from favorites
- Uses Context API for global state management
- Prevents duplicate favorites

### 🌐 Context API
- Centralized state management
- Shared between components (Search, MovieCard, etc.)
- Avoids prop drilling

### 🎨 UI Structure
- Basic Netflix-style layout idea
- Component-based structure for scalability

---

## 🧠 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Context API
- CSS
- TMDB API (movie data source)

---

## 🐛 Known Issue

### Search Function Not Working Properly
The search feature is currently experiencing issues.

Possible causes:
- Search query not being correctly passed to API function
- Missing or incorrect API request handling
- State not updating before fetch request runs
- Parent component not receiving `onSearch` data correctly

.

📘 Movie App – Development Progress (Day Log)
🗓️ Date:31-06-2026
🎬 Overview

Today’s work focused on building a React-based Movie App using TMDB API and integrating Appwrite as a backend database to track user search behavior and generate trending movies.

The goal was to:

Display normal movies from TMDB
Add search with autocomplete + debounce
Store searches in Appwrite
Generate trending movies from user activity
🚀 Features Implemented
🎥 1. Movie Listing (TMDB API)
Fetches and displays movies from TMDB API
Movies displayed in a responsive grid layout
Hero section displays featured movie
🔍 2. Search System
Built a reusable SearchBar component
Implemented:
Debounced search (500ms delay)
Live autocomplete suggestions
Dropdown preview of movies
Clicking a suggestion triggers search instantly
⚡ 3. Performance Optimization
Added debounce to reduce API calls
Prevented excessive requests during typing
Improved UX responsiveness
🧠 4. Appwrite Integration (Backend)
Connected Appwrite database using environment variables
Stored user searches in a table:
movieId
title
posterPath
count
Functionalities:
Save new search entries
Update existing movie search count
Track popularity of movies
🔥 5. Trending System (In Progress)
Designed system to fetch most searched movies
Intended to display trending movies using:
orderDesc("count")
limit results to top 10
Trending section UI built as horizontal slider (Netflix-style)
🧪 Issues Encountered
❌ 1. Appwrite Schema Mismatch
Error: Attribute not found in schema: movieId
Cause: Table column not created or misnamed in Appwrite dashboard
Fix: Ensured correct schema definition in database
❌ 2. Trending Section Not Displaying
Issue: No data appearing in trending slider
Possible causes:
No data saved in database
Save function failing before writing
Empty table results from Appwrite query
Debugging steps:
Added console logs for API responses
Verified saveSearch execution
Checked Appwrite table entries
❌ 3. Data Flow Confusion
Issue: Mixing TMDB data and Appwrite data formats
Fix: Normalized data structure:
id
title
poster_path
🧠 Key Learnings
Appwrite uses strict schema (case-sensitive fields)
Backend failures silently break frontend data flow
Always validate database writes before UI rendering
Separation of concerns is critical:
TMDB → movie data
Appwrite → analytics/trending data
🛠️ Current Architecture
TMDB API
   ↓
React UI (Movies Grid)

User Search
   ↓
SearchBar (debounced + autocomplete)
   ↓
Appwrite Database (stores searches)
   ↓
Trending System (planned/partial)
   ↓
Home Page Trending Slider
📌 Current Status

✔ Movie grid working
✔ Search + autocomplete working
✔ Debounce implemented
✔ Appwrite connected
⚠ Trending system partially broken (under debugging)

🎯 Next Steps
Fix Appwrite trending data flow completely
Ensure search data is correctly saved
Render trending slider from database
Add:
Smooth carousel animation
“Most searched today” logic
Click → movie details page
Improve UI polish
