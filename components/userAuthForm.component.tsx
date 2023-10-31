"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
        const response = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        });
        if (!response?.error) {
            toast({
                title: `Welcome back @${username}`,
            });
            router.push("/");
            router.refresh();
        } else {
            toast({
                variant: "destructive",
                title: "Authentication Failed!",
                description: "Username or Password wrong",
            });
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="username"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button variant="default" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}
