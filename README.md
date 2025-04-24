# ChadGBD

ChadGBD is a project designed to integrate Firebase Firestore with an AI API (OpenAI or Gemini) to provide intelligent and dynamic responses. This README provides setup instructions, configuration details, and other relevant information.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/jumper9222/ChadGBD
cd ChadGBD
```

### 2. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 3. Firebase Configuration
- Go to the [Firebase Console](https://console.firebase.google.com/).
- Create a new project or use an existing one.
- Enable Firestore in the "Build" section.
- Download the `firebaseConfig` object from the Firebase project settings and replace the placeholder in `firebaseConfig.js`:
```javascript
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: VITE_FIREBSE_DATABASE_URL,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_APP_ID,
    measurementId: VITE_FILEBASE_MEASUREMENT_ID
};
export default firebaseConfig;
```

### 4. Configure the AI API
- **Gemini**:
  - Follow the setup instructions provided by Gemini's API documentation.
  - Add the API key to your `.env` file:
    ```env
    VITE_GENAI_API_KEY=your_gemini_api_key
    ```

### 5. Run Locally
Start the development server:
```bash
npm run dev
```
The application will be available at the link provided in your terminal.

## Configuring Firebase Firestore and AI API

### Firebase Firestore
- Create a Firestore collection named `chatrooms` with a subcollection called `messages` to store user chatrooms and messages.
- Create a separate collection named `users` to store user information.
- Ensure Firestore rules allow read/write access for authenticated users during development:
  ```json
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /messages/{document} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

## Assumptions and Limitations
- **API Key Requirements**: Gemini requires valid API keys. Ensure these are kept secure and not hardcoded.
- **Free-Tier Constraints**: Free-tier usage may have limitations on the number of requests or response quality.
- **Authentication**: Firebase authentication is assumed for user access control.

## Details on the Chosen AI

### Why Gemini?
- **Gemini**: Provides competitive AI capabilities with potential cost advantages. As compared to OpenAI, Gemini has a free tier that allows for a limited number of requests, making it suitable for development and testing.

### Challenges Faced
- **Building ChadGBD from scratch without prior experience in TS and MUI**: Throughout the whole development of the app, I had faced many roadblocks with TS warnings and MUI components not behaving how I expected, I had learned a lot about how to use MUI and TS effectively through thoughtful AI prompts and research. I now have a newfound appreciation for TS and will probably use it in my future projects.
- **Deploying on Firebase Hosting**: The deployment process was not straightforward. Throughout the deployment process, I had initially installed irrelevant Firebase packages that were not needed for the app. I had to go through lots of troubleshooting to correctly deploy the app. 
- **Prioritising implementations**: At the beginning of the development process, I had decided to prioritise completing the business logic of the app first before styling it. This was due to the limited timeframe to complete the app, my lack of prior experience in TS and MUI and also I wanted to make sure I delivered a functional app. In the end, I had to forego certain styling features that I wanted to implement in the app such as responsive design and a more polished UI.

## Conclusion
ChadGBD combines React.ts, MUI, Firebase Firestore, and Gemini to create a ChatGPT clone that performs the basic text generation tasks that are stored in Firestore. It also utilizes redux for offline state management. 
