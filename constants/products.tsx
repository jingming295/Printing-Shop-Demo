import { FileText, Gift, ImageIcon, MoonStar, Presentation, Printer } from "lucide-react";
import imgCards from "@/assets/products/business-card.webp";
import imgRollup from "@/assets/products/rollup-standee.jpg";
import imgFlyers from "@/assets/products/flyers.jpg";
import imgPosters from "@/assets/products/posters.png";
import imgStickers from "@/assets/products/stickers.jpg";
import imgAngpao from "@/assets/products/angpao.webp";
import imgRaya from "@/assets/products/sampul-raya.jpg";
export const PRODUCTS = [
    {
        id: "cards",
        name: "Business Card",
        category: "Cards",
        // 文案描述 - 保留并优化
        desc: "Premium matte or glossy finish. High-quality cards for a lasting first impression.",
        specs: {
            size: "90mm x 54mm",
            material: "260gsm Art Card",
            unit: "Box",        // 单位：盒
            qtyPerUnit: 100,    // 每盒 100 张
            minOrder: 2,        // 最少起订 2 盒
            leadTime: "2-3 Days"
        },
        pricing: {
            unitPrice: 17.50,   // 每盒单价 (假设总价从 35 开始)
            isPerSqft: false
        },
        image: imgCards,
        icon: <Printer className="size-6 text-blue-600" />
    },
    {
        id: "rollup",
        name: "Roll-up Standee",
        category: "Events",
        desc: "Portable aluminum stand with high-res printing. Perfect for roadshows and exhibitions.",
        specs: {
            size: "2.5ft x 6.5ft",
            material: "Synthetic Paper",
            unit: "Set",
            qtyPerUnit: 1,
            minOrder: 1,
            leadTime: "1-2 Days"
        },
        pricing: {
            unitPrice: 85.00,
            isPerSqft: false
        },
        image: imgRollup,
        icon: <Presentation className="size-6 text-cyan-600" />
    },
    {
        id: "a4",
        name: "A4 Flyers",
        category: "Marketing",
        desc: "High-definition Flyers and Brochures with 99% color accuracy for mass distribution.",
        specs: {
            size: "210mm x 297mm",
            material: "128gsm Art Paper",
            unit: "pcs",
            qtyPerUnit: 1,
            minOrder: 500,
            leadTime: "3-5 Days"
        },
        pricing: {
            unitPrice: 0.12,
            isPerSqft: false
        },
        image: imgFlyers,
        icon: <FileText className="size-6 text-orange-600" />
    },
    {
        id: "posters",
        name: "A2 Posters",
        category: "Marketing",
        desc: "Vibrant high-resolution marketing materials to grab attention instantly in design studios.",
        specs: {
            size: "420mm x 594mm",
            material: "180gsm Photo Paper",
            unit: "pcs",
            qtyPerUnit: 1,
            minOrder: 10,
            leadTime: "1-2 Days"
        },
        pricing: {
            unitPrice: 5.50,
            isPerSqft: false
        },
        image: imgPosters,
        icon: <ImageIcon className="size-6 text-emerald-600" />
    },
    {
        id: "stickers",
        name: "Product Labels",
        category: "Stickers",
        desc: "Die-cut stickers in any shape. Waterproof Mirrorcoat or Transparent options available.",
        specs: {
            size: "A3 Sheet Size",
            material: "Waterproof Vinyl",
            unit: "Sheet",
            qtyPerUnit: 1,
            minOrder: 10,
            leadTime: "2-3 Days"
        },
        pricing: {
            unitPrice: 4.50,
            isPerSqft: false
        },
        image: imgStickers,
        icon: <ImageIcon className="size-6 text-pink-600" />
    },
    {
        id: "angpao",
        name: "Custom Angpao",
        category: "Seasonal",
        desc: "Premium Red Packets with gold foil or embossing options. Perfect for corporate branding during CNY.",
        specs: {
            size: "80mm x 155mm (Long)",
            material: "128gsm Matt Art Paper",
            unit: "Pack",        // 单位：包/叠
            qtyPerUnit: 10,      // 每包 10 个
            minOrder: 50,        // 最少起订 50 包
            leadTime: "5-7 Days"
        },
        pricing: {
            unitPrice: 1.20,     // 每包 RM 1.20
            isPerSqft: false
        },
        image: imgAngpao,
        icon: <Gift className="size-6 text-red-600" />
    },
    {
        id: "sampul-raya",
        name: "Sampul Raya",
        category: "Seasonal",
        desc: "Exclusive Raya Packets with custom Islamic patterns. High-quality paper with secure tab lock.",
        specs: {
            size: "79mm x 154mm",
            material: "140gsm Linen Paper",
            unit: "Pack",
            qtyPerUnit: 5,       // 每包 5 个
            minOrder: 100,
            leadTime: "5-7 Days"
        },
        pricing: {
            unitPrice: 0.85,     // 每包 RM 0.85
            isPerSqft: false
        },
        image: imgRaya,
        icon: <MoonStar className="size-6 text-green-600" />
    }
];