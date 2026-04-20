import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap
{
    const baseUrl = 'https://printingdemo.bytespheres.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly', // 首页更新频繁一点，建议改成 weekly
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}