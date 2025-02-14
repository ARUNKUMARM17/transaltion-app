# Translation App

This is a language translation application built with React and Firebase. The app allows users to translate text between different languages and save their translation history. The application is hosted on Vercel.

## Features

- User authentication (Signup/Login)
- Text translation between multiple languages
- Save translation history
- View translation history

## Technologies Used

- React
- Firebase (Firestore, Authentication)
- Material-UI
- Vercel (Hosting)

## Getting Started

### Prerequisites

- Node.js
- Firebase account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/translation-app.git
    cd translation-app/client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a Firebase project and set up Firestore and Authentication.

4. Create a `.env` file in the root of the project and add your Firebase configuration:

    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

5. Start the development server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Deployment

The application is hosted on Vercel. To deploy your own version:

1. Install Vercel CLI:

    ```bash
    npm install -g vercel
    ```

2. Run the deployment command:

    ```bash
    vercel
    ```

3. Follow the prompts to link your project and deploy.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://mui.com/)

