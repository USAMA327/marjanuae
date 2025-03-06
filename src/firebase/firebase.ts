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
  apiKey: "AIzaSyA5y4pwbqRzHZy2ScBfVmMqvg5qvqQZRyU",
  authDomain: "al-marjan-74559.firebaseapp.com",
  projectId: "al-marjan-74559",
  storageBucket: "al-marjan-74559.firebasestorage.app",
  messagingSenderId: "267411467448",
  appId: "1:267411467448:web:6d7d454a8b05b43781184d"
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
