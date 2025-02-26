"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

const About = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // Prevents flicker before redirect

  return (
    <div>
      <h2>About</h2>
      <p>Logged in as: {user}</p>
    </div>
  );
};

export default About;
