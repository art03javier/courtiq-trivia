# CourtIQ Trivia

Welcome to **CourtIQ Trivia**, a web-based trivia game featuring NBA-themed questions. Test your basketball knowledge across various difficulty levels.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**
    ```bash
    cd CourtIQ-Trivia
    ```

3. **Start a local server:**
    Use Python's built-in HTTP server to serve HTML, CSS, and JavaScript files.
    ```bash
    python3 -m http.server
    ```

4. **Open your web browser:**
    Visit [http://localhost:8000/](http://localhost:8000/) in your browser.

5. **Play CourtIQ Trivia:**
    Follow on-screen instructions to select difficulty, take trivia, answer questions, and view your final score.

6. **For Developers:**
    - If you want to contribute or modify the code:
        - Open `index.html` file.
        - Find the line `scrollToTopButton.onclick` code.
        - During development (local server), set it to:
            ```javascript
            scrollToTopButton.onclick = () => window.location.href = "http://localhost:8000/";
            ```
        - For GitHub Pages deployment, set it back to:
            ```javascript
            scrollToTopButton.onclick = () => window.location.href = "https://art03javier.github.io/courtiq-trivia/";
            ```


## Features

- NBA-themed trivia questions
- Multiple difficulty levels
- Score tracking
- Responsive design

## Folder Structure and Files

Ensure adherence to good software development practices:

- **Directory Structure and File Naming:**
  Maintain an organized structure with meaningful names.

- **Version Control:**
  Use version control (e.g., Git) to track changes and collaborate.

- **Readme File:**
  Include a comprehensive readme with instructions and project overview.

- **Comments:**
  Add comments to code, especially for external sources. Include URLs for code origins.

## Running the App

After setting up the project, open [http://localhost:8000/](http://localhost:8000/) in your web browser to play CourtIQ Trivia. Follow on-screen instructions to enjoy the game.

## Deployment

Deploy CourtIQ Trivia to an environment supporting necessary server configurations. Use suitable deployment methods based on the hosting platform.

## Author

Arthur Javier  
Email: art03javier@yahoo.com  
GitHub: [arthurjavier](https://github.com/art03javier)

## License

This project is licensed under the [MIT License](LICENSE).



