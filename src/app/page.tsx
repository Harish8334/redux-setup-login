"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/authSlice";
import { useRouter } from "next/navigation";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());

    // Remove user from cookies
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  return (
    <div>
      <h2>Home</h2>
      {user ? (
        <div>
          <p>Welcome, {user}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please <a href="/login">login</a>.</p>
      )}
    </div>
  );
};

export default Home;
