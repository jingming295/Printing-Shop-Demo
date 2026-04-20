"use client";

import React, { useState } from "react";
import
{
    Upload,
    X,
    Info,
    FileText,
    Image as ImageIcon,
    Palette,
    MousePointer2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UploadAreaProps
{
    file: File | null;
    setFile: (file: File | null) => void;
    productSize: string;
    onOpenEditor: () => void;
}

export const UploadArea = ({ file, setFile, productSize, onOpenEditor }: UploadAreaProps) =>
{
    const [mode, setMode] = useState<'upload' | 'design'>('upload');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const selectedFile = e.target.files?.[0] || null;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith("image/"))
        {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        } else
        {
            setPreviewUrl(null);
        }
    };

    const clearFile = () =>
    {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setFile(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">

            {/* 1. 模式切换头 - 适配系统配色 */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                        Step 1: Choose Workflow
                    </Label>
                </div>
                <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
                    {[
                        { id: 'upload' as const, label: 'Upload', icon: <Upload className="size-3" /> },
                        // { id: 'design' as const, label: 'Design', icon: <Palette className="size-3" /> }
                    ].map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => setMode(item.id)}
                            className={cn(
                                "px-4 h-8 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest gap-2",
                                mode === item.id
                                    ? "bg-background shadow-sm text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 2. 核心展示区 - 玻璃拟态 Card */}
            <div className="relative h-[350px] md:h-[420px] w-full group">
                {mode === 'upload' ? (
                    <div className="h-full w-full animate-in fade-in zoom-in-95 duration-300">
                        {!file ? (
                            <label className="block h-full w-full cursor-pointer">
                                <Card className="h-full border-2 border-dashed border-primary/20 bg-card/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
                                    <CardContent className="flex flex-col items-center justify-center h-full p-10 text-center">
                                        <div className="p-6 bg-background rounded-[2rem] mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-border shadow-xl shadow-primary/5">
                                            <Upload className="size-10 text-primary" />
                                        </div>
                                        <h3 className="font-black text-2xl tracking-tighter uppercase italic">Drop Artwork</h3>
                                        <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-[0.2em]">
                                            PDF, AI, PSD or High-Res JPG
                                        </p>
                                        <input type="file" className="hidden" accept=".pdf,.ai,.psd,.jpg,.jpeg,.png" onChange={handleFileChange} />
                                    </CardContent>
                                </Card>
                            </label>
                        ) : (
                            /* 文件已上传状态 */
                            <Card className="h-full border-none bg-card/40 rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 shadow-2xl flex flex-col ring-1 ring-primary/20">
                                <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                                    <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-0 p-6">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-xl select-none shadow-2xl" />
                                        ) : (
                                            <div className="flex flex-col items-center text-muted-foreground/30">
                                                <FileText className="size-20 mb-3" />
                                                <p className="text-[10px] font-black uppercase tracking-widest italic">Source File Loaded</p>
                                            </div>
                                        )}
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-6 right-6 rounded-full h-10 w-10 shadow-2xl hover:scale-110 transition-transform z-10"
                                            onClick={clearFile}
                                        >
                                            <X className="size-5" />
                                        </Button>
                                    </div>

                                    {/* 底部文件信息条 - 改为通透色 */}
                                    <div className="h-24 bg-primary text-primary-foreground flex items-center justify-between px-8">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="p-3 bg-white/20 rounded-xl">
                                                {file.type.startsWith("image/") ? <ImageIcon className="size-6" /> : <FileText className="size-6" />}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-black text-lg truncate max-w-[180px] leading-none uppercase italic tracking-tighter">{file.name}</p>
                                                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • READY</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-white/40 text-white font-black italic px-3">
                                            {file.name.split('.').pop()?.toUpperCase()}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    /* DESIGN 模式 - 增加交互感 */
                    <div className="h-full w-full animate-in fade-in zoom-in-95 duration-300">
                        <Card
                            className="h-full border-none bg-gradient-to-br from-primary/10 via-card/50 to-background rounded-[2.5rem] overflow-hidden shadow-none ring-1 ring-primary/20 hover:ring-primary/50 transition-all cursor-pointer group flex flex-col"
                            onClick={onOpenEditor}
                        >
                            <CardContent className="p-0 flex-1 flex flex-col items-center justify-center text-center px-12">
                                <div className="relative mb-8">
                                    <div className="p-8 bg-primary rounded-[2.5rem] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-primary/40 relative z-10">
                                        <Palette className="size-12 text-primary-foreground" />
                                    </div>
                                    <MousePointer2 className="absolute -bottom-2 -right-2 size-8 text-foreground animate-bounce opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="font-black text-3xl tracking-tighter uppercase italic leading-none">Online Editor</h3>
                                <p className="text-[11px] text-muted-foreground mt-4 font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                                    No artwork? Use our pro tools to create one now.
                                </p>
                                <Button variant="outline" className="mt-6 rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground font-black italic uppercase text-xs">
                                    Launch Designer
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* 3. 说明栏 - 改为半透明深色或系统色 */}
            <div className="p-6 bg-foreground text-background rounded-[1rem] space-y-4 shadow-2xl relative overflow-hidden group">
                {/* 背景微光装饰 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors" />

                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em] relative z-10">
                    <Info className="size-4" /> Technical Specifications
                </div>

                <div className="grid grid-cols-2 gap-8 text-xs font-black uppercase tracking-widest italic relative z-10">
                    <div className="border-l-2 border-primary pl-4">
                        <p className="opacity-40 text-[9px] mb-1 leading-none">Document Size</p>
                        <p className="text-lg leading-none mt-1 tracking-tighter">{productSize}</p>
                    </div>
                    <div className="border-l-2 border-muted-foreground/30 pl-4">
                        <p className="opacity-40 text-[9px] mb-1 leading-none">Safe Margin</p>
                        <p className="text-lg leading-none mt-1 tracking-tighter text-muted-foreground">3.0 MM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};