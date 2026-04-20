"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom"; // 需要这个来强制同步更新数据

export function ModeToggle()
{
    const { theme, setTheme } = useTheme();

    const toggleTheme = (event: React.MouseEvent) =>
    {
        // 兼容性检查：如果不支持或用户开启了“减少动态效果”，则直接切换
        if (
            !document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
        {
            setTheme(theme === "dark" ? "light" : "dark");
            return;
        }

        const x = event.clientX;
        const y = event.clientY;

        // 计算点击位置到屏幕四个角的最远距离，作为圆圈扩散的终点半径
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // ModeToggle.tsx 里的关键片段
        document.documentElement.classList.add('is-transitioning');

        const transition = document.startViewTransition(() =>
        {
            flushSync(() => setTheme(theme === "dark" ? "light" : "dark"));
        });

        // 动画结束后移除
        transition.finished.finally(() =>
        {
            document.documentElement.classList.remove('is-transitioning');
        });

        transition.ready.then(() =>
        {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    // 动画作用于新视图的伪元素上
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 relative flex items-center justify-center transition-colors cursor-pointer z-[110]"
            onClick={toggleTheme}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyan-400" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}