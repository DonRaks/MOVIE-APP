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

---

## 📁 Project Structure
