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
        <div className="bg-[#0A0A0A] text-white pt-32 pb-32 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
                        AI <span className="text-[#E3000F]">Tools</span>
                    </h1>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
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
                                    ? "bg-[#111111] border-[#E3000F] shadow-[0_0_30px_rgba(227,0,15,0.2)]"
                                    : "bg-[#111111]/50 border-[#1F1F1F] hover:border-[#333]"
                            )}
                        >
                            <div className={cn(
                                "mb-4 transition-colors",
                                activeTool === tool.id ? "text-[#E3000F]" : "text-white/40 group-hover:text-white"
                            )}>
                                {tool.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                            <p className="text-white/30 text-xs leading-relaxed">{tool.desc}</p>
                            {activeTool === tool.id && (
                                <div className="absolute bottom-0 left-0 h-1 bg-[#E3000F] w-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tool Workspace */}
                <div className="bg-[#111111] border border-[#1F1F1F] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
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
                                <p className="text-white/40">Enter the project details below to trigger the AI analysis.</p>
                            </div>

                            {activeTool === 'estimator' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Features (Comma separated)</label>
                                        <textarea
                                            className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none h-32 resize-none"
                                            placeholder="Auth, Real-time chat, Payment integration, Dashboard..."
                                            value={estimatorData.features}
                                            onChange={(e) => setEstimatorData({ ...estimatorData, features: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Complexity</label>
                                            <select
                                                className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none"
                                                value={estimatorData.scale}
                                                onChange={(e) => setEstimatorData({ ...estimatorData, scale: e.target.value })}
                                            >
                                                <option>Small</option>
                                                <option>Medium</option>
                                                <option>Enterprise</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Platform</label>
                                            <select
                                                className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none"
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
                                        className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Generate Estimate</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'proposal' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Project Title</label>
                                        <input
                                            className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none"
                                            placeholder="AI Powered CRM"
                                            value={proposalData.title}
                                            onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Core Goals</label>
                                        <textarea
                                            className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none h-32 resize-none"
                                            placeholder="Automate client follow-ups using LLM patterns..."
                                            value={proposalData.goals}
                                            onChange={(e) => setProposalData({ ...proposalData, goals: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_PROPOSAL, proposalData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Draft Proposal</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'analyzer' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">Paste Requirements</label>
                                        <textarea
                                            className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none h-48 resize-none"
                                            placeholder="The system must support OAuth, multi-tenancy..."
                                            value={analyzerData.text}
                                            onChange={(e) => setAnalyzerData({ ...analyzerData, text: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_ANALYZER, analyzerData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Analyze Docs</span>}
                                    </button>
                                </div>
                            )}

                            {activeTool === 'validator' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#888] ml-2">The Big Idea</label>
                                        <textarea
                                            className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl py-4 px-6 text-white focus:border-[#E3000F] outline-none h-48 resize-none"
                                            placeholder="An Uber for pet groomers with AI routing..."
                                            value={validatorData.idea}
                                            onChange={(e) => setValidatorData({ ...validatorData, idea: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleToolAction(ENDPOINTS.AI_VALIDATOR, validatorData)}
                                        disabled={loading}
                                        className="w-full py-5 bg-[#E3000F] text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <span>Validate Idea</span>}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Result Side */}
                        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-8 flex flex-col justify-center min-h-[400px]">
                            {!result && !error && !loading && (
                                <div className="text-center">
                                    <Bot size={48} className="text-white/10 mx-auto mb-6" />
                                    <p className="text-white/30 font-medium">Results will appear here after AI processing.</p>
                                </div>
                            )}

                            {loading && (
                                <div className="text-center space-y-6">
                                    <div className="relative h-16 w-16 mx-auto">
                                        <div className="absolute inset-0 border-4 border-[#E3000F]/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-[#E3000F] rounded-full border-t-transparent animate-spin" />
                                    </div>
                                    <p className="text-white font-bold animate-pulse uppercase tracking-[0.2em] text-xs">AI is thinking...</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center">
                                    <AlertCircle size={40} className="text-[#E3000F] mx-auto mb-4" />
                                    <p className="text-white font-bold mb-2">Operation Halted</p>
                                    <p className="text-white/40 text-sm">{error}</p>
                                </div>
                            )}

                            {result && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <CheckCircle size={20} className="text-green-500" />
                                        <span className="text-white font-bold uppercase tracking-widest text-xs">Analysis Complete</span>
                                    </div>

                                    <div className="space-y-6">
                                        {activeTool === 'estimator' && (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-[#111111] rounded-xl border border-[#1F1F1F]">
                                                    <div className="text-xs text-[#888] uppercase tracking-widest mb-1">Estimated Budget</div>
                                                    <div className="text-3xl font-black text-[#E3000F]">{result.budget || '$12,000 - $18,000'}</div>
                                                </div>
                                                <div className="p-4 bg-[#111111] rounded-xl border border-[#1F1F1F]">
                                                    <div className="text-xs text-[#888] uppercase tracking-widest mb-1">Timeline</div>
                                                    <div className="text-xl font-bold">{result.timeline || '8 - 12 Weeks'}</div>
                                                </div>
                                                <p className="text-sm text-white/50">{result.analysis || 'Based on your feature set, we recommend a phased deployment.'}</p>
                                            </div>
                                        )}

                                        {activeTool === 'proposal' && (
                                            <div className="prose prose-invert prose-sm">
                                                <h4 className="text-white font-bold uppercase underline mb-4">Draft Preview</h4>
                                                <div className="p-4 border border-[#1F1F1F] rounded-xl bg-[#111111] max-h-60 overflow-y-auto whitespace-pre-wrap text-white/60 text-xs leading-relaxed">
                                                    {result.proposal || 'AI Generated Proposal Content...'}
                                                </div>
                                                <button className="mt-6 w-full py-2 border border-[#E3000F] text-[#E3000F] rounded-lg text-xs font-bold uppercase hover:bg-[#E3000F] hover:text-white transition-all">
                                                    Download Full PDF
                                                </button>
                                            </div>
                                        )}

                                        {(activeTool === 'analyzer' || activeTool === 'validator') && (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-[#888] uppercase tracking-widest">Viability Score</span>
                                                    <span className="text-lg font-black text-[#E3000F]">{result.score || '85'}/100</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-[#1F1F1F] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#E3000F]" style={{ width: `${result.score || 85}%` }} />
                                                </div>
                                                <div className="p-4 bg-[#111111] border border-[#1F1F1F] rounded-xl">
                                                    <h5 className="text-white font-bold text-xs mb-2 uppercase tracking-widest">Key Insights</h5>
                                                    <p className="text-xs text-white/50 leading-relaxed">{result.summary || 'Strategic overview generated by AI...'}</p>
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
