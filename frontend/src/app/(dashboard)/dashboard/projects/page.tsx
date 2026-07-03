export default function DashboardSubPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Module Under Development</h1>
            <p className="text-white/40">This feature is currently being engineered with AI precision. Stay tuned.</p>
            <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <span className="text-primary text-2xl font-bold animate-pulse">!</span>
                    </div>
                    <p className="text-white/60">Construction in progress...</p>
                </div>
            </div>
        </div>
    );
}
