"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";

interface NavButtonProps extends ButtonProps
{
    href: string;
    children: React.ReactNode;
}

export function NavButton({ href, children, ...props }: NavButtonProps)
{
    const router = useRouter();
    return (
        <Button {...props} onClick={() => router.push(href)}>
            {children}
        </Button>
    );
}