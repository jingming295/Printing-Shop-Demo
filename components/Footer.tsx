import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Tag, ShieldCheck } from "lucide-react"

export function Footer()
{
    // 你的 Google Maps 坐标链接 (基于 layout.tsx 里的经纬度)
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=1.56066,103.77478";

    return (
        <footer className="relative z-10 border-t border-black/5 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* 品牌描述 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                            ByteSphere Printing
                        </h3>
                        <p className="text-slate-600 dark:text-muted-foreground text-sm leading-relaxed">
                            Premium digital printing & 24h express service in Mount Austin. We specialize in high-quality business cards, banners, and custom corporate gift solutions for Johor Bahru businesses.
                        </p>
                        {/* 新增：信任背书 */}
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">
                            <ShieldCheck className="w-3 h-3" />
                            Satisfaction Guaranteed | Professional Artwork Check
                        </div>
                    </div>

                    {/* 快速链接 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Services</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/products" className="text-slate-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors">Business Cards</Link>
                            <Link href="/products" className="text-slate-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors">Roll-up Standee</Link>
                            <Link href="/products" className="text-slate-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors">A4 Flyers</Link>
                            <Link href="/products" className="text-slate-600 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors">Custom Design</Link>
                        </nav>
                    </div>

                    {/* 联系地址 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                                {/* 优化：点击地址直接导航 */}
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    71, Jalan Austin Heights 8/1, <br />
                                    L1-05 (Next to Water Park), <br />
                                    Taman Mount Austin, 81100 JB
                                </a>
                            </li>
                            <li className="flex items-center gap-3 font-medium text-blue-600 dark:text-cyan-400">
                                <Tag className="w-4 h-4 shrink-0" />
                                <span>Price Range: RM 35 — RM 300</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                                {/* 优化：移动端点击拨号 */}
                                <a href="tel:+60147219697" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                                    +60 14-721 9697
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                                <a href="mailto:jingming295@bytespheres.com" className="break-all hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                                    jingming295@bytespheres.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 text-center">
                    <p className="text-xs text-slate-500 dark:text-muted-foreground">
                        © {new Date().getFullYear()} ByteSphere Printing Shop Demo. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}