
import { GetServerSideProps } from "next";
import admin from "@/lib/firebaseAdmin";
import { parse } from "cookie";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Parse cookies from the request headers
  const cookies = parse(req.headers.cookie || "");

  if (!cookies.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Verify the auth token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(cookies.authToken);

    // Return the user information as props
    return {
      props: { user : decodedToken },
    };
  } catch (error) {
    console.error("Error verifying token:", error);

    // Redirect to login if token verification fails
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default function DashboardLayout() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>This is your protected area.</p>
    </div>
  );
}
