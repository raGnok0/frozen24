import * as admin from "firebase-admin";

// Decode the base64-encoded service account key
const serviceAccountKey = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable");
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountKey, "base64").toString("utf-8")
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error:any) {
    console.error("Failed to initialize Firebase Admin:", error.message);
    throw error;
  }
}

export default admin;
