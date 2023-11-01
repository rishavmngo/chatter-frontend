"use client";
import Navbar from "@/components/Navbar.component";
import MainChat from "@/components/chatMain.component";

export default function Home() {
    return (
        <main className="flex flex-col  h-[calc(100vh-16px)] bg-white backdrop-blur-md  m-[8px]  rounded-lg overflow-hidden">
            <Navbar />
            <MainChat />
        </main>
    );
}
