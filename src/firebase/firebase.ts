import { getFirebaseErrorMessage } from "@/utils/firebaseErrorText";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { 
  getFirestore, 
} from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGE_SEND_ID,
  appId: process.env.NEXT_PUBLIC_FB_MESSAGE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(); // Initialize Firestore

// Set persistence (optional, as 'local' is the default)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword };

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage((error as any).code);
    toast.error(errorMessage);
    console.error("Google Sign-In Error:", (error as Error).message);
    return null;
  }
};

// Sign in with Email/Password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return result.user;
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage((error as any).code);
    toast.error(errorMessage);
    console.error("Email/Password Sign-In Error:", (error as Error).message);
    return null;
  }
};





export const signUpWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage((error as any).code);
    toast.error(errorMessage);
    console.error("Sign-Up Error:", (error as Error).message);
  }
  return null;
};



// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage((error as any).code);
    toast.error(errorMessage);
    console.error("Sign-Out Error:", (error as Error).message);
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
