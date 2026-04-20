"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle()
{
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 relative flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {/* 太阳图标：暗色模式下缩小并旋转隐藏 */}
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            {/* 月亮图标：初始隐藏，暗色模式下旋转并放大显现 */}
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}