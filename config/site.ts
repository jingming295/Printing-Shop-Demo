export const siteConfig = {
    // 如果环境变量里有，就用环境变量；没有，就用默认值
    name: process.env.NEXT_PUBLIC_SITE_NAME || "ByteSphere Demo",
    contact: {
        whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/default",
    },
};