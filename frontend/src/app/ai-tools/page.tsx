'use client';

import React, { useState } from 'react';
import {
    Calculator,
    FileText,
    Search,
    Lightbulb,
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
    Bot
} from 'lucide-react';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';
import { cn } from '@/lib/utils';

const AI_TOOLS = [
    { id: 'estimator', title: 'AI Cost Estimator', icon: <Calculator size={32} />, desc: 'Get a precise budget and timeline estimate for your AI project.' },
    { id: 'proposal', title: 'Proposal Generator', icon: <FileText size={32} />, desc: 'Generate a professional business proposal in seconds.' },
    { id: 'analyzer', title: 'Requirement Analyzer', icon: <Search size={32} />, desc: 'Upload your docs to find technical gaps and risks.' },
    { id: 'validator', title: 'Project Idea Validator', icon: <Lightbulb size={32} />, desc: 'Validate your startup idea with market data and AI scores.' },
];

const AIToolsPage = () => {
    const [activeTool, setActiveTool] = useState(AI_TOOLS[0].id);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Form States
    const [estimatorData, setEstimatorData] = useState({ features: '', scale: 'Small', platform: 'Web' });
    const [proposalData, setProposalData] = useState({ title: '', goals: '', audience: '' });
    const [analyzerData, setAnalyzerData] = useState({ text: '' });
    const [validatorData, setValidatorData] = useState({ idea: '' });

    const handleToolAction = async (endpoint: string, data: any) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await api.post(endpoint, data);
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'The AI engine is currently processing a high volume of requests. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-32 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
                        AI <span className="text-[var(--accent)]">Tools</span>
                    </h1>
                    <p className="text-[var(--muted)] text-xl max-w-2xl mx-auto">
                        Leverage our proprietary AI models to plan, validate, and accelerate your technical journey.
                    </p>
                </div>

                {/* Tool Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                    {AI_TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => { setActiveTool(tool.id); setResult(null); setError(null); }}
                            className={cn(
                                "p-6 rounded-2xl border text-left transition-all group relative overflow-hidden",
                                activeTool === tool.id
                                    ? "bg-[var(--card)] border-[var(--accent)] shadow-[0_0_30px_rgba(227,0,15,0.2)]"
                                    : "bg-[var(--card)]/50 border-[var(--border)] hover:border-[var(--muted)]"
                            )}
                        >
                            <div className={cn(
                                "mb-4 transition-colors",
                                activeTool === tool.id ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                            )}>
                                {tool.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">{tool.title}</h3>
                            <p className="text-[var(--muted)] text-xs leading-relaxed">{tool.desc}</p>
                            {activeTool === tool.id && (
                                <div className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] w-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tool Workspace */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                        {AI_TOOLS.find(t => t.id === activeTool)?.icon}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                        {/* Form Side */}
                        <div>
                            <div className="mb-10">
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                                    {AI_TOOLS.find(t => t.id === activeTool)?.title}
                                </h2>
                                <p className="text-[var(--muted)]">Enter the project details below to trigger the AI analysis.</p>
                            </div>

                            {activeTool === 'estimator' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Features (Comma separated)</label>
                                        <textarea
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none h-32 resize-none"
                                            placeholder="Auth, Real-time chat, Payment integration, Dashboard..."
                                            value={estimatorData.features}
                                            onChange={(e) => setEstimatorData({ ...estimatorData, features: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Complexity</label>
                                            <select
                                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none"
                                                value={estimatorData.scale}
                                                onChange={(e) => setEstimatorData({ ...estimatorData, scale: e.target.value })}
                                            >
                                                <option>Small</option>
                                                <option>Medium</option>
                                                <option>Enterprise</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Platform</label>
                                            <select
                                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none"
                                                value={estimatorData.platform}
                                                onChange={(e) => setEstimatorData({ ...estimatorData, platform: e.target.value })}
                                            >
                                                <option>Web</option>
                                                <option>Mobile</option>
                                                <option>Desktop</option>
                                                <option>Cross-Platform</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_ESTIMATOR, estimatorData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[var(--accent)] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[var(--accent)]/90 transition-colors"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Generate Estimate</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'proposal' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Project Title</label>
                                        <input
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none"
                                            placeholder="AI Powered CRM"
                                            value={proposalData.title}
                                            onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Core Goals</label>
                                        <textarea
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none h-32 resize-none"
                                            placeholder="Automate client follow-ups using LLM patterns..."
                                            value={proposalData.goals}
                                            onChange={(e) => setProposalData({ ...proposalData, goals: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_PROPOSAL, proposalData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[var(--accent)] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[var(--accent)]/90 transition-colors"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Draft Proposal</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'analyzer' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">Paste Requirements</label>
                                        <textarea
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none h-48 resize-none"
                                            placeholder="The system must support OAuth, multi-tenancy..."
                                            value={analyzerData.text}
                                            onChange={(e) => setAnalyzerData({ ...analyzerData, text: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_ANALYZER, analyzerData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[var(--accent)] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[var(--accent)]/90 transition-colors"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Analyze Docs</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'validator' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] ml-2">The Big Idea</label>
                                        <textarea
                                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-4 px-6 text-[var(--foreground)] focus:border-[var(--accent)] outline-none h-48 resize-none"
                                            placeholder="An Uber for pet groomers with AI routing..."
                                            value={validatorData.idea}
                                            onChange={(e) => setValidatorData({ ...validatorData, idea: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_VALIDATOR, validatorData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[var(--accent)] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[var(--accent)]/90 transition-colors"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Validate Idea</span>}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Result Side */}
                        <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-center min-h-[400px]">
                            {!result && !error && !loading && (
                                <div className="text-center">
                                    <Bot size={48} className="text-[var(--foreground)]/10 mx-auto mb-6" />
                                    <p className="text-[var(--muted)] font-medium">Results will appear here after AI processing.</p>
                                </div>
                            )}

                            {loading && (
                                <div className="text-center space-y-6">
                                    <div className="relative h-16 w-16 mx-auto">
                                        <div className="absolute inset-0 border-4 border-[var(--accent)]/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-[var(--accent)] rounded-full border-t-transparent animate-spin" />
                                    </div>
                                    <p className="text-[var(--foreground)] font-bold animate-pulse uppercase tracking-[0.2em] text-xs">AI is thinking...</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center">
                                    <AlertCircle size={40} className="text-[var(--accent)] mx-auto mb-4" />
                                    <p className="text-[var(--foreground)] font-bold mb-2">Operation Halted</p>
                                    <p className="text-[var(--muted)] text-sm">{error}</p>
                                </div>
                            )}

                            {result && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <CheckCircle size={20} className="text-green-500" />
                                        <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-xs">Analysis Complete</span>
                                    </div>

                                    <div className="space-y-6">
                                        {activeTool === 'estimator' && (
                                            <div className="space-y-4">
                                                 <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                                                    <div className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">Estimated Budget</div>
                                                    <div className="text-3xl font-black text-[var(--accent)]">{result.budget || result.data?.estimatedCost || 'Contact us'}</div>
                                                </div>
                                                <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                                                    <div className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">Timeline</div>
                                                    <div className="text-xl font-bold text-[var(--foreground)]">{result.timeline || result.data?.estimatedTimeline || 'TBD'}</div>
                                                </div>
                                                <p className="text-sm text-[var(--muted)]">{result.analysis || result.raw || 'Based on your feature set, we recommend a phased deployment.'}</p>
                                            </div>
                                        )}

                                        {activeTool === 'proposal' && (
                                            <div className="prose prose-invert prose-sm">
                                                <h4 className="text-[var(--foreground)] font-bold uppercase underline mb-4">Draft Preview</h4>
                                                <div className="p-4 border border-[var(--border)] rounded-xl bg-[var(--background)] max-h-60 overflow-y-auto whitespace-pre-wrap text-[var(--muted)] text-xs leading-relaxed">
                                                    {result.proposal || result.proposalMarkdown || 'AI Generated Proposal Content...'}
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const content = result.proposal || result.proposalMarkdown;
                                                        if (!content) return;
                                                        const blob = new Blob([content], { type: 'text/plain' });
                                                        const url = URL.createObjectURL(blob);
                                                        const a = document.createElement('a');
                                                        a.href = url;
                                                        a.download = `Proposal_${proposalData.title.replace(/\s+/g, '_') || 'Draft'}.txt`;
                                                        a.click();
                                                        URL.revokeObjectURL(url);
                                                    }}
                                                    className="mt-6 w-full py-2 border border-[var(--accent)] text-[var(--accent)] rounded-lg text-xs font-bold uppercase hover:bg-[var(--accent)] hover:text-white transition-all"
                                                >
                                                    Download Proposal Document
                                                </button>
                                            </div>
                                        )}

                                        {(activeTool === 'analyzer' || activeTool === 'validator') && (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">{activeTool === 'analyzer' ? 'Quality Score' : 'Viability Score'}</span>
                                                    <span className="text-lg font-black text-[var(--accent)]">{result.score || result.validation?.viabilityScore || result.analysis?.score || 75}/100</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--accent)]" style={{ width: `${result.score || result.validation?.viabilityScore || result.analysis?.score || 75}%` }} />
                                                </div>
                                                <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl">
                                                    <h5 className="text-[var(--foreground)] font-bold text-xs mb-2 uppercase tracking-widest">Key Insights</h5>
                                                    <p className="text-xs text-[var(--muted)] leading-relaxed">{result.summary || result.raw || 'Strategic overview generated by AI...'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIToolsPage;
