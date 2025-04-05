# Firebase Cloud Functions

This directory contains the Cloud Functions for Firebase implementation.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install the Firebase CLI globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init
   ```

## Local Development

1. Start the Firebase emulators:
   ```bash
   npm run serve
   ```

2. For environment configuration during local development:
   - Create a `.runtimeconfig.json` file in the functions directory with your config values:
     ```json
     {
       "someservice": {
         "key": "your-dev-key",
         "url": "https://dev-api.example.com"
       }
     }
     ```

## Structure

- `src/index.ts` - Main entry point for Cloud Functions
- `src/config.ts` - Configuration helpers
- Additional modules can be added under the `src/` directory

## Deployment

Deploy only the functions:
```bash
npm run deploy
```

Or using Firebase CLI directly:
```bash
firebase deploy --only functions
```

## Set Environment Configuration

To set environment configuration values:
```bash
firebase functions:config:set someservice.key="YOUR_API_KEY" someservice.url="https://api.example.com"
```

To view current configuration:
```bash
firebase functions:config:get
```

## Troubleshooting

- If you encounter TypeScript errors during build, ensure all dependencies are properly installed:
  ```bash
  npm install @types/express @types/node --save-dev
  ```

- For Firebase Admin SDK issues, check your Firebase project settings and ensure the service account has appropriate permissions.

- View logs from deployed functions:
  ```bash
  npm run logs
  ``` 