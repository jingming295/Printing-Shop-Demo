import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer()
{
    return (
        <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* 品牌描述 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            ByteSphere Printing
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Premium digital printing services in Johor Bahru. We specialize in high-quality business cards, banners, and custom corporate gift solutions.
                        </p>
                    </div>

                    {/* 快速链接 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/products" className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors">Business Cards</Link>
                            <Link href="/products" className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors">Roll-up Standee</Link>
                            <Link href="/products" className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors">A4 Flyers</Link>
                            <Link href="/products" className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors">Custom Design</Link>
                        </nav>
                    </div>

                    {/* 联系地址 - 选址 Mount Austin */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>88, Jalan Austin Heights 8/7, <br />Taman Mount Austin, <br />81100 Johor Bahru, Johor</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>+60 14-721 9697</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>jingming295@bytespheres.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} ByteSphere Printing Shop Demo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}