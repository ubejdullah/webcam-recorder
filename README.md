# Webcam Website

## Overview

This is a webcam application designed as a side project to record videos and capture images using a simple and modular approach. The goal was to experiment with React.js and create a user-friendly interface.

## Features

### Key Functionalities
- **Live Video Stream**: Real-time display of the webcam feed.
- **Video Recording**: Record webcam videos in `.webm` format.
- **Image Capture**: Take snapshots from the live video feed.

## Project Structure

### File Organization

#### `src/components`
- **CamVideo.jsx**: Displays the live webcam feed.
- **InfoOverlay.jsx**: Displays overlay information on the video.
- **LightControl.jsx**: Controls lighting settings.
- **MediaLibrary.jsx**: Manages media files (images and videos).
- **MovementControl.jsx**: Controls motion settings.
- **Settings.jsx**: Provides options for personalization.

#### `src/design`
- CSS files for styling each component (e.g., `CamVideo.css`, `LightControl.css`, etc.).

#### `src/UI`
- **Pin.jsx**: Implements the PIN system for basic access control.
- **Pin.css**: Styles for the PIN system.

#### `src/video`
- Sample media files for testing (e.g., `image1.png`, `video.mp4`).

#### `src`
- **App.jsx**: Entry point for the application.
- **index.css**: Global styling.
- **main.jsx**: Main file to render the app.

## Installation and Usage

### Prerequisites
- **Node.js** (v14 or higher)
- **Yarn** or **npm** (Node Package Manager)

### Installation

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ubejdullah/webcam-recorder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd webcam-website
   ```
3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```
4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Usage

1. Launch the application and allow camera access when prompted.
2. Use the control panel to:
   - Record videos or take snapshots.

## Development Notes

- This project is a simple side project for learning and experimenting with React.js.
- Component-based structure ensures modularity and reusability.

## Author
**Ubejdullah Gashi**  
[ubejdullah-gashi.ch](https://ubejdullah-gashi.ch)
