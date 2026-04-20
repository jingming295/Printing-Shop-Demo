import { ImageResponse } from 'next/og'

// 1. 图标元数据设置
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// 2. 使用代码画出你的蓝色打印机图标
export default function Icon()
{
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#2563eb', // 蓝色的蓝色 (blue-600)
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px', // 圆角效果
                }}
            >
                {/* 这里用一个简单的 SVG 打印机形状，或者一个字符 */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9V2h12v7" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <path d="M6 14h12v8H6z" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}