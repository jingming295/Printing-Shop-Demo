import { Geist, Geist_Mono } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "sonner"
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Bytesphere Printing Shop Demo",
  description: "High-quality printing services in Taman Sri Tebrau, Johor Bahru. We offer digital printing, banners, business cards, and custom design services.",
  keywords: ["printing shop Johor Bahru", "printing service Taman Sri Tebrau", "digital printing JB", "banner printing Johor", "custom printing services"],
  openGraph: {
    title: "Best Printing Shop in Johor Bahru",
    description: "Quality printing services located at Taman Sri Tebrau, Johor Bahru.",
    url: "https://printingdemo.bytespheres.com/", // 替换为你的域名
    siteName: "Bytesphere Printing Shop Demo",
    locale: "en_MY",
    type: "website",
  },
  alternates: {
    canonical: "https://printingdemo.bytespheres.com/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>)
{
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="bg-background">
        {/* --- 1. 背景层：放在最底层，独立于滚动容器 --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* 亮色背景 */}
          <div
            className="absolute inset-0 bg-white transition-opacity duration-700 ease-in-out dark:opacity-0"
            style={{
              backgroundImage: `
          radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
          radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)
        `,
            }}
          />
          {/* 暗色背景 */}
          <div
            className="absolute inset-0 bg-[#020617] opacity-0 transition-opacity duration-700 ease-in-out dark:opacity-100"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(6,182,212,0.15), transparent)`
              }}
            />
          </div>
        </div>

        {/* --- 2. 滚动容器：放在背景之上，确保 z-index 更高 --- */}
        <div className="maindiv relative z-10 h-screen overflow-y-auto">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}