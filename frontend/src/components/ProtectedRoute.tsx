"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/auth";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.getMe();
                setUser(userData);
                setLoading(false);
            } catch (error) {
                // Clear session if any error occurs
                router.push("/login");
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <span className="text-white/40 text-sm font-medium uppercase tracking-widest">
                        Verifying Identity...
                    </span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
