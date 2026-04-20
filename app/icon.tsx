import { ImageResponse } from 'next/og'

// 1. 提升分辨率到 512x512，确保在任何地方都清晰
export const size = {
    width: 512,
    height: 512,
}
export const contentType = 'image/png'

export default function Icon()
{
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#2563eb', // 纯正的蓝色
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '100px', // 更圆润的圆角，类似现代 App 图标
                    padding: '40px', // 给图标留点呼吸空间
                }}
            >
                <svg
                    width="320"
                    height="320"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* 精致化的打印机形状 */}
                    <path d="M6 9V2h12v7" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}