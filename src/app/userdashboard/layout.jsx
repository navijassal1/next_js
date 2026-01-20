"use client";

import Header from "@/components/common/Header.component";
import Footer from "@/components/common/footer.component";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
}