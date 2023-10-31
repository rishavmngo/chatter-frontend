"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import UserMenu from "./userMenu.component";

export default function Navbar() {
    const { data: session, status } = useSession();
    console.log(status);
    return (
        <header className="p-2 rounded-lg backdrop-blur-sm flex items-center">
            <Link
                href="/"
                className="text-xl font-bold hover:text-gray-800 mr-auto"
            >
                Chatter
            </Link>
            {session && <UserMenu user={session.user} />}
        </header>
    );
}
