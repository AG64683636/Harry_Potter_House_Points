# Hogwarts House Points Management System

The Hogwarts House Points Management App is a web-based application that allows users to manage points and students for the four Hogwarts houses: Gryffindor, Hufflepuff, Ravenclaw, and Slytherin. This app provides an interactive and visually appealing interface for tracking house points, managing student lists, and exploring the magical world of Hogwarts. The app is designed to encourage long term engagment of students using gamification.

---

## Features

- **House Points Management**: Add or subtract points for each house.
- **Student Management**: Add and remove students for each house.
- **Search Functionality**: Search for students by name and filter the displayed list.
- **Interactive UI**: Hover effects, snowfall animations, and house-specific styles.
- **Background Music**: Immersive music with a mute/unmute option.
- **Responsive Design**: Works across desktop and mobile devices.

---

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript (Vanilla JS)
  - Bootstrap 5

- **Backend**:
  - Python (Flask Framework)

- **Data Storage**:
  - JSON File

---

## Installation and Setup

### Prerequisites

- Python 3.x installed on your machine.
- A modern web browser.

## Project Structure

```
.
├── harry_potter_app/
│   ├── __init__.py
│   ├── routes.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── audio-control.js
│   │   │   └── snowfall.js
│   │   ├── audio/
│   │   │   └── background-music.mp3
│   │   ├── images/
│   │   │   ├── gryffindor.webp
│   │   │   ├── hufflepuff.webp
│   │   │   ├── ravenclaw.webp
│   │   │   └── slytherin.webp
│   ├── templates/
│   │   └── index.html
│   └── data.json
├── README.md
├── requirements.txt
└── run.py
```

---

## Usage

### Managing Points
- Use the `+` and `-` buttons to add or subtract points for each house.

### Managing Students
- Add a student's name in the input field and click `+` to add them to the house.
- Use the `×` button next to a student's name to remove them.

### Search for Students
- Use the search bar in the top-right corner to filter students by name.

---

## Future Enhancements

- **Database Integration**: Replace JSON with a more robust database like SQLite or PostgreSQL.
- **House-Specific Animations**: Add custom animations or effects for each house.
- **Enhanced Point Tracking**: Keep track of house points gained on a per week, month, or overall basis.

---

## Acknowledgments

- Inspired by the magical world of Harry Potter by J.K. Rowling.
