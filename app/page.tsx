"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calculator, Database, Activity, 
  ChevronRight, ShieldCheck, 
  Clock, Target, BarChart, Users,
  Code, Server, Box, Cpu
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('summary');
  const [simulatedScore, setSimulatedScore] = useState(0);

  // Live simulation for the demo tab
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedScore(Math.floor(Math.random() * 15) + 70);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'summary', label: 'Executive Summary', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'framework', label: 'Mathematical Framework', icon: <Calculator className="w-4 h-4" /> },
    { id: 'implementation', label: 'Data & Timeline', icon: <Database className="w-4 h-4" /> },
    { id: 'demo', label: 'Live Simulation', icon: <Activity className="w-4 h-4" /> },
    { id: 'developers', label: 'Developers', icon: <Code className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Formal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/GSV_LOGO_Final.jpg" 
                alt="GSV Logo" 
                className="h-14 w-14 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  The Churn Project
                </h1>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  An Open-Source Product from GSV Vadodara
                </p>
              </div>
            </div>
          </div>

          {/* Multi-page Navigation */}
          <nav className="flex overflow-x-auto gap-1 mt-6 border-b border-slate-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'text-blue-700 bg-blue-50/50' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* PAGE 1: EXECUTIVE SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <KpiCard title="Project Timeline" value="6" suffix=" Months" sub="Academic Sprint" icon={<Clock />} />
              <KpiCard title="Data Source" value="Kaggle" suffix=" Dataset" sub="10k Records" icon={<Database />} />
              <KpiCard title="Primary Model" value="XGBoost" suffix="" sub="Cost-Sensitive" icon={<Target />} />
              <KpiCard title="Target Metric" value="PR-AUC" suffix="" sub="Over Accuracy" icon={<BarChart />} />
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">The Problem Statement</h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  Customer churn prediction in enterprise environments suffers from a fundamental <strong>Signal Fidelity Problem</strong>. Current baseline models treat every customer equally, leading to a high rate of false negatives for rare, high-value churners. 
                </p>
                <p>
                  This project addresses three critical gaps in standard academic churn models:
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                      Class Imbalance
                    </h3>
                    <p className="text-sm">Standard models optimize for global accuracy, ignoring the ~9:1 imbalance ratio where missing a churner is highly costly.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                      Label Noise
                    </h3>
                    <p className="text-sm">Raw data contains "Ghost Signals" (e.g., active status despite zero usage), confusing gradient descent during training.</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                      The Action Gap
                    </h3>
                    <p className="text-sm">Raw probabilities lack business context. A 70% risk for an enterprise is vastly different from a 70% risk for a free user.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: MATHEMATICAL FRAMEWORK */}
        {activeTab === 'framework' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Algorithmic Approach
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">1. Cost-Sensitive Boosting</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Instead of relying on standard log-loss, we explicitly penalize false negatives by modifying the XGBoost objective function. We calculate the optimal scale weight based on class distribution.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm">
                    <p className="text-slate-500 mb-2">/* Objective formulation */</p>
                    <p><span className="text-blue-700">scale_pos_weight</span> = <span className="text-emerald-600">N_negative</span> / <span className="text-rose-600">N_positive</span></p>
                    <p className="mt-2 text-slate-800">Ratio ≈ 8.79</p>
                  </div>
                  <p className="text-sm text-slate-600">
                    This mathematically forces the model to treat the rare minority class (churners) with nearly 9x the importance during gradient updates.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">2. Strategic Value Weighting</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To bridge the gap between pure probability and actionable business intelligence, we introduce a composite risk score function.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm">
                    <p className="text-slate-500 mb-2">/* Composite Risk Score */</p>
                    <p><span className="text-blue-700">Final_Risk</span> = (α × <span className="text-rose-600">P(churn)</span>) + (β × <span className="text-indigo-600">CLV_norm</span>)</p>
                    <p className="mt-2 text-slate-500">Where α + β = 1.0</p>
                  </div>
                  <p className="text-sm text-slate-600">
                    By normalizing Customer Lifetime Value (CLV), the system outputs a unified metric that prioritizes interventions mathematically rather than via ad-hoc rules.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
              <h3 className="text-md font-bold text-blue-900 mb-2">Why PR-AUC over ROC-AUC?</h3>
              <p className="text-sm text-blue-800">
                Given our severe class imbalance (approx. 10% churners), standard Accuracy and ROC-AUC are mathematically deceptive. A model predicting "No Churn" 100% of the time achieves 90% accuracy. We strictly evaluate using <strong>Precision-Recall Area Under Curve (PR-AUC)</strong> and minority-class F1-score to ensure structural rigor.
              </p>
            </div>
          </div>
        )}

        {/* PAGE 3: DATA & TIMELINE */}
        {activeTab === 'implementation' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Left Column: Data & Tech Stack */}
              <div className="space-y-8">
                {/* Data Section */}
                <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Dataset Provenance</h2>
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg mb-6">
                    <p className="text-sm font-semibold text-slate-800">Primary Source: Kaggle Telco Churn Repository</p>
                    <p className="text-xs text-slate-500 mt-1">Simulated 10k enterprise & SME records</p>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Feature Synthesis</h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span><strong>Support Intensity Log:</strong> <code className="bg-slate-100 px-1 rounded text-xs text-slate-800">log(tickets × resolution_time)</code></span>
                    </li>
                    <li className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span><strong>Loyalty Shock Score:</strong> <code className="bg-slate-100 px-1 rounded text-xs text-slate-800">tenure_weight × price_increase_flag</code></span>
                    </li>
                    <li className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span><strong>Ghost Signal Pruning:</strong> Forcing complaint_type to null if ticket_count is 0 to ensure model stability.</span>
                    </li>
                  </ul>
                </div>

                {/* Tech Stack Section */}
                <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Architecture Stack</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase">ML & Data</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Python</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">XGBoost</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Optuna</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">SHAP</span>
                      </div>
                    </div>
                    
                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <Server className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase">Backend</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">FastAPI</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Pydantic</span>
                      </div>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase">Frontend</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">React</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Tailwind CSS</span>
                      </div>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 hover:bg-white transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <Box className="w-4 h-4 text-rose-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase">Deployment</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Docker</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded shadow-sm">Open Source</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Adjusted 6-Month Timeline */}
              <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">6-Month Academic Sprint</h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  
                  <TimelineItem 
                    month="Month 1" 
                    title="Data Foundry & EDA" 
                    desc="Kaggle dataset ingestion, typing, and Ghost Signal resolution."
                    active={true}
                  />
                  <TimelineItem 
                    month="Month 2-3" 
                    title="Feature Eng. & Training" 
                    desc="Implementing Cost-Sensitive XGBoost and Stratified K-Fold CV."
                    active={false}
                  />
                  <TimelineItem 
                    month="Month 4" 
                    title="Model Evaluation" 
                    desc="PR-AUC optimization, SHAP value extraction, and Optuna tuning."
                    active={false}
                  />
                  <TimelineItem 
                    month="Month 5-6" 
                    title="Deployment & Open Source" 
                    desc="Dockerizing the FastAPI inference layer and publishing as an open-source alternative to proprietary corporate solutions, alongside final PRML paper drafting."
                    active={false}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PAGE 4: LIVE SIMULATION */}
        {activeTab === 'demo' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Context Banner to justify the simulation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" />
                Simulation Context: The "Action Gap" Resolution
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                This simulates the end-user interface for a <strong>Customer Success Manager</strong>. While the XGBoost pipeline processes data in the background, this view demonstrates our <em>Strategic Value Weighting</em> equation in real-time. It proves how raw mathematical probabilities are translated into prioritized, human-led retention actions.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
              <div className="bg-slate-800 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-sm tracking-wide">Live CSM Intervention Feed</span>
                </div>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300 font-mono">Entity: ENT-8922</span>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-semibold">Raw Churn Probability P(c)</span>
                      <span className="text-rose-600 font-mono font-bold">{simulatedScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-rose-500 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${simulatedScore}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-semibold">Normalized Customer Value (CLV)</span>
                      <span className="text-indigo-600 font-mono font-bold">94%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Strategic Value Weighting Output</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-start gap-4 transition-all hover:border-blue-300 hover:shadow-sm">
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <Users className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900">Priority Account Manager Intervention</p>
                        <p className="text-sm text-slate-600 mt-1">High-value enterprise client exhibiting temporal disengagement signals. System explicitly overrides standard automated email sequence due to high CLV weight.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: DEVELOPERS SECTION */}
        {activeTab === 'developers' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-6">
                <Code className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Development Team</h2>
              <p className="text-slate-500 mb-8 font-medium">B.Tech Artificial Intelligence and Data Science</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left">
                  <p className="font-bold text-slate-800 text-lg">Aditya Jaiswal</p>
                  <p className="text-xs text-blue-600 font-mono mt-1 font-semibold">24AI007</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left">
                  <p className="font-bold text-slate-800 text-lg">Abhinav Mishra</p>
                  <p className="text-xs text-blue-600 font-mono mt-1 font-semibold">24AI004</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left">
                  <p className="font-bold text-slate-800 text-lg">Abhinav A Mishra</p>
                  <p className="text-xs text-blue-600 font-mono mt-1 font-semibold">24AI005</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left">
                  <p className="font-bold text-slate-800 text-lg">Aman Sharma</p>
                  <p className="text-xs text-blue-600 font-mono mt-1 font-semibold">24AI010</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Reusable Components
function KpiCard({ title, value, suffix, sub, icon }: { title: string; value: string | number; suffix: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">
          {value}<span className="text-sm font-normal text-slate-500 ml-1">{suffix}</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">{sub}</p>
      </div>
    </div>
  );
}

function TimelineItem({ month, title, desc, active }: { month: string; title: string; desc: string; active: boolean }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      {/* Marker */}
      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${active ? 'bg-blue-600 text-white' : 'bg-slate-300'}`}>
        {active && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
      {/* Content */}
      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-bold uppercase ${active ? 'text-blue-600' : 'text-slate-500'}`}>{month}</span>
        </div>
        <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
