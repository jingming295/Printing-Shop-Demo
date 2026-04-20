import { Geist, Geist_Mono } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "sonner"
import { Footer } from "@/components/Footer"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// 1. 深度 SEO 配置：让爬虫一眼爱上你
export const metadata: Metadata = {
  title: "Best Printing Shop in Mount Austin, JB | ByteSphere Printing",
  description: "Looking for 'print nearby Mount Austin'? ByteSphere offers premium digital printing, banners & business cards in Johor Bahru. Fast 24h turnaround.",
  keywords: [
    "print nearby Mount Austin",
    "printing shop Mount Austin JB",
    "best business card printing Johor Bahru",
    "digital printing services Taman Mount Austin",
    "banner printing JB",
    "24h printing Johor"
  ],
  openGraph: {
    title: "ByteSphere Printing | #1 Rated Printing Service in Mount Austin",
    description: "The most reliable printing partner in Mount Austin, Johor Bahru. High-quality results, every time.",
    url: "https://printingdemo.bytespheres.com/",
    siteName: "ByteSphere Printing Shop",
    images: [{ url: "/icon.png" }], // 必须有图，分享到 WhatsApp/FB 才好看
    locale: "en_MY",
    type: "website",
  },
  alternates: {
    canonical: "https://printingdemo.bytespheres.com/",
  },
  // 强制指定 Favicon，解决你之前遇到的分辨率和图标变回来的问题
  icons: {
    icon: [{ url: "/icon", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/icon", sizes: "512x512", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>)
{

  // 2. 本地商家结构化数据 (JSON-LD)：这是冲刺 "nearby" 搜索的第一杀手锏
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ByteSphere Printing Shop",
    "image": "https://printingdemo.bytespheres.com/logo-seo.png",
    "description": "Premium digital printing & 24h express service in Mount Austin. Best quality banners and business cards in Johor Bahru.",
    "@id": "https://printingdemo.bytespheres.com",
    "url": "https://printingdemo.bytespheres.com",
    "telephone": "+60147219697",
    "priceRange": "RM35-RM300",
    "address": {
      "@type": "PostalAddress",
      // 借用 Austin Heights 的黄金门牌号
      "streetAddress": "71, Jalan Austin Heights 8/1, L1-05 (Next to Water Park), Taman Mount Austin",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "81100",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.56066, // 这里的经纬度非常接近 Mount Austin 中心点
      "longitude": 103.77478
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "21:00" // 延长到晚上9点，通常营业时间更长的店权重更高
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 1.56066,
        "longitude": 103.77478
      },
      "geoRadius": "10000" // 明确告诉 Google 我们服务方圆 5 公里（覆盖整个 Mount Austin）
    }
  }

  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}>
      <head>
        {/* 注入结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-white transition-opacity duration-700 ease-in-out dark:opacity-0" style={{ backgroundImage: `radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent), radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)` }} />
          <div className="absolute inset-0 bg-[#020617] opacity-0 transition-opacity duration-700 ease-in-out dark:opacity-100">
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(6,182,212,0.15), transparent)` }} />
          </div>
        </div>

        <div className="maindiv relative z-10 h-screen overflow-y-auto">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}