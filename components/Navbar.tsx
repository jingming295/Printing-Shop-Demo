"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer, Menu, MessageCircle } from "lucide-react";
import
{
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "./mode-toggle";

export function Navbar()
{
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About Us" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center border-b border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
            <nav className="flex items-center justify-between w-full max-w-7xl px-6 h-18">

                {/* Logo Section - 保留原样 */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                        <Printer size={20} />
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                        Bytesphere <span className="text-primary">Demo</span>
                    </span>
                </Link>

                {/* 桌面端导航 */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) =>
                        {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors relative py-1 px-1",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in-50 duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="h-5 w-[1px] bg-border" />

                    {/* 交互区 */}
                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        {/* 优化：使用标准 <a> 标签包裹，对 SEO 更好 */}
                        <a
                            href={siteConfig.contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="sm"
                                className="bg-whatsapp text-white hover:bg-whatsapp/90 rounded-full px-5 font-semibold shadow-sm transition-all active:scale-95"
                            >
                                <MessageCircle size={16} className="mr-2 fill-current" />
                                Contact Us
                            </Button>
                        </a>
                    </div>
                </div>

                {/* 移动端交互区 */}
                <div className="flex items-center gap-2 md:hidden">
                    <ModeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg hover:bg-transparent"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Mobile Drawer */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="right" className="w-[85%] p-0 flex flex-col border-l dark:bg-slate-950/95 backdrop-blur-2xl">
                        <SheetHeader className="p-6 border-b text-left">
                            <SheetTitle className="flex items-center gap-2">
                                <Printer size={18} className="text-primary" />
                                <span className="font-bold tracking-tight">Bytesphere</span>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-1 p-4 flex-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-4 rounded-xl text-sm font-semibold transition-all",
                                        pathname === link.href
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-accent text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
                                </Link>
                            ))}
                        </div>

                        <div className="p-6 border-t bg-accent/20">
                            {/* 移动端跳转也改用标准链接 */}
                            <a
                                href={siteConfig.contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                            >
                                <Button
                                    className="w-full py-7 bg-whatsapp text-white rounded-2xl font-bold shadow-xl shadow-whatsapp/20 active:scale-95 transition-transform"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                                    WhatsApp Inquiry
                                </Button>
                            </a>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}