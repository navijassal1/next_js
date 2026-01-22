"use client";

import Header from "@/components/common/Header.component";
import Footer from "@/components/common/footer.component";
import { userContext } from "@/context/user-context";
import { useContext, useEffect } from "react";

export default function UserLayout({ children }) {
  const { loading, fetchUserDetails } = useContext(userContext);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}