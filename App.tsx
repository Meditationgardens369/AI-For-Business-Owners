
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MessageSquare, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Zap, 
  Phone, 
  Mail, 
  MapPin, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Users,
  Flower2,
  Activity,
  Sun,
  Sparkles,
  Waves,
  Heart,
  Repeat,
  Bell
} from 'lucide-react';
import { BusinessType, EntryPoint, Intent, UserMetrics, SimulationScenario } from './types';
import { getScenario } from './constants/scenarios';

const App: React.FC = () => {
  // --- UI State ---
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<EntryPoint | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // --- Metrics State ---
  const [metrics, setMetrics] = useState<UserMetrics>({
    avgBookingValue: 125,
    leadsPerWeek: 40,
    missedCallsPerWeek: 12,
    avgSessionsPerClient: 4
  });

  const scenario = useMemo(() => {
    if (!selectedBusiness || !selectedEntry || !selectedIntent) return null;
    return getScenario(selectedBusiness, selectedEntry, selectedIntent);
  }, [selectedBusiness, selectedEntry, selectedIntent]);

  const simulationComplete = useMemo(() => {
    return scenario && simStep >= scenario.conversation.length;
  }, [scenario, simStep]);

  // --- Premium Visual Configs ---
  const businessVisuals: Record<BusinessType, { icon: React.ElementType, gradient: string }> = {
    'Wellness Center': { icon: Flower2, gradient: 'from-emerald-400 to-teal-600' },
    'Chiropractor': { icon: Activity, gradient: 'from-blue-400 to-indigo-600' },
    'Holistic Therapist': { icon: Sun, gradient: 'from-orange-300 to-amber-500' },
    'Yoga Studio': { icon: Sparkles, gradient: 'from-purple-400 to-fuchsia-600' },
    'Spa & MedSpa': { icon: Waves, gradient: 'from-cyan-300 to-blue-500' },
    'Counseling Service': { icon: Heart, gradient: 'from-rose-300 to-pink-500' }
  };

  // --- Handlers ---
  const handleReset = () => {
    setActiveStep(1);
    setSelectedBusiness(null);
    setSelectedEntry(null);
    setSelectedIntent(null);
    setIsSimulating(false);
    setSimStep(0);
    setActiveNotification(null);
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
  };

  // AI Logic Simulation
  useEffect(() => {
    if (isSimulating && scenario && simStep < scenario.conversation.length) {
      const timer = setTimeout(() => {
        setSimStep(prev => prev + 1);
        const notifications = [
          "AI Receptionist is online.",
          "Analyzing client intent...",
          "Checking your live calendar...",
          "Verifying package availability...",
          "Generating secure booking link...",
          "Success! Journey automated."
        ];
        setActiveNotification(notifications[simStep] || "Processing...");
      }, 1600);
      return () => clearTimeout(timer);
    } else if (simulationComplete) {
      const hideTimer = setTimeout(() => setActiveNotification(null), 3000);
      return () => clearTimeout(hideTimer);
    }
  }, [isSimulating, simStep, scenario, simulationComplete]);

  // --- ROI Calculation ---
  const calculatedStats = useMemo(() => {
    const weeklySavingsMinutes = metrics.leadsPerWeek * 15;
    const clientLifetimeValue = metrics.avgBookingValue * metrics.avgSessionsPerClient;
    const weeklyRecovered = metrics.missedCallsPerWeek * 0.4 * clientLifetimeValue;
    const weeklyBoost = metrics.leadsPerWeek * 0.15 * clientLifetimeValue;
    const monthlyRevenueImpact = (weeklyRecovered + weeklyBoost) * 4;
    
    return {
      hoursSaved: Math.round(weeklySavingsMinutes / 60),
      revenueImpact: Math.round(monthlyRevenueImpact)
    };
  }, [metrics]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* FLOATING AI STATUS NOTIFICATION */}
      {activeNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-8 fade-in duration-500">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap size={18} className="text-white animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">AI Assistant</p>
              <p className="text-sm font-bold">{activeNotification}</p>
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8 uppercase tracking-widest">
            <Zap size={16} />
            <span>AI Customer Journey Specialist</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 max-w-5xl leading-[0.95]">
            See how wellness clients find you — and how <span className="text-blue-600">AI handles the entire journey.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
            From first inquiry to booking, payment, and intake — handled 24/7 while you focus on your practice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-5xl text-left">
            {[
              { label: 'Time Saved', value: '15+ hours/week', desc: 'No more admin backlog', icon: Clock },
              { label: 'Growth', value: '25% more bookings', desc: 'Instant speed-to-lead', icon: TrendingUp },
              { label: 'No-Shows', value: '90% fewer no-shows', desc: 'Automated deposit workflow', icon: CheckCircle2 }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                <stat.icon className="text-blue-500 mb-4" size={32} />
                <div className="font-black text-slate-900 text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.desc}</div>
              </div>
            ))}
          </div>

          <a href="#demo" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-blue-200 transition-all flex items-center justify-center transform hover:scale-105 active:scale-95">
            Try the Journey Demo
            <ArrowRight className="ml-3" size={28} />
          </a>
        </div>
      </header>

      {/* 2. INTERACTIVE JOURNEY PLAYGROUND */}
      <section id="demo" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Interactive Simulation</h2>
            <p className="text-slate-500 text-xl font-medium">Choose a scenario to see how AI transforms your business workflow.</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
            {/* Steps Navigation */}
            <div className="bg-slate-50 border-b border-slate-200 flex overflow-x-auto no-scrollbar">
              {[
                { id: 1, label: 'Wellness Type' },
                { id: 2, label: 'Entry Point' },
                { id: 3, label: 'Customer Goal' },
                { id: 4, label: 'Flow Simulation' }
              ].map((step) => (
                <button
                  key={step.id}
                  onClick={() => step.id <= activeStep && setActiveStep(step.id)}
                  disabled={step.id > activeStep && !isSimulating}
                  className={`flex-1 min-w-[200px] py-8 px-6 text-sm font-black border-r border-slate-200 transition-all uppercase tracking-[0.2em] ${
                    activeStep === step.id 
                    ? 'bg-white text-blue-600 border-b-4 border-b-blue-600' 
                    : 'text-slate-400 cursor-default'
                  }`}
                >
                  <span className="opacity-30 mr-2">{step.id}.</span> {step.label}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-12">
              {/* STEP 1: BUSINESS TYPE */}
              {activeStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
                  {Object.entries(businessVisuals).map(([type, visual]) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedBusiness(type as BusinessType);
                        setActiveStep(2);
                      }}
                      className="group relative h-72 rounded-[2.5rem] overflow-hidden shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-90 transition-transform group-hover:scale-110 duration-700`}></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white z-10">
                        <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl mb-4 shadow-xl">
                          {React.createElement(visual.icon, { size: 56, className: "text-white" })}
                        </div>
                        <span className="font-black text-xl md:text-2xl tracking-tighter text-center leading-none">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 2: ENTRY POINT */}
              {activeStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-right duration-500">
                  {[
                    { name: 'Google Maps "Call Now"', icon: MapPin },
                    { name: 'Website Chat', icon: MessageSquare },
                    { name: 'Website Contact Form', icon: Mail },
                    { name: 'WhatsApp Message', icon: Phone },
                    { name: 'Instagram DM', icon: Instagram },
                    { name: 'Referral Call', icon: Users }
                  ].map((entry) => (
                    <button
                      key={entry.name}
                      onClick={() => {
                        setSelectedEntry(entry.name as EntryPoint);
                        setActiveStep(3);
                      }}
                      className="p-8 border-2 border-slate-100 rounded-[2rem] hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-start space-x-6 group shadow-sm hover:shadow-2xl"
                    >
                      <div className="bg-slate-100 p-5 rounded-2xl group-hover:bg-blue-100 flex-shrink-0">
                        <entry.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <span className="font-black block text-lg md:text-xl text-slate-800 mb-1 leading-tight">{entry.name}</span>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Touchpoint</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 3: INTENT */}
              {activeStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 animate-in slide-in-from-right duration-500">
                  {['Book Appointment', 'Ask a Question', 'Get a Quote', 'Pay / Deposit', 'Reschedule / Cancel'].map((intent) => (
                    <button
                      key={intent}
                      onClick={() => {
                        setSelectedIntent(intent as Intent);
                        setActiveStep(4);
                        startSimulation();
                      }}
                      className="p-8 border-2 border-slate-100 rounded-[2rem] hover:border-blue-500 hover:bg-blue-50 transition-all text-center flex flex-col items-center justify-center space-y-4 group shadow-sm hover:shadow-2xl"
                    >
                      <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-white transition-colors flex-shrink-0">
                        <Calendar className="w-8 h-8 md:w-12 md:h-12 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <span className="font-black text-sm text-slate-800 leading-tight uppercase tracking-tight">{intent}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 4: SIMULATION */}
              {activeStep === 4 && scenario && (
                <div className="space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-center bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center space-x-8 mb-8 md:mb-0 relative z-10">
                      <div className="bg-blue-600 p-5 rounded-[2rem] shadow-xl shadow-blue-200">
                         {React.createElement(businessVisuals[selectedBusiness!].icon, { className: 'text-white w-10 h-10' })}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">{selectedBusiness} Journey</h3>
                        <p className="text-sm md:text-xl text-blue-600 font-bold uppercase tracking-[0.2em] mt-1">{selectedEntry} • {selectedIntent}</p>
                      </div>
                    </div>
                    <button onClick={handleReset} className="flex items-center bg-white px-8 py-4 rounded-2xl text-slate-400 hover:text-slate-800 transition-all font-black text-sm uppercase tracking-[0.2em] shadow-md border border-slate-100 relative z-10">
                      <RotateCcw size={18} className="mr-2" />
                      Reset Demo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 h-auto lg:min-h-[900px]">
                    {/* CUSTOMER VIEW */}
                    <div className="flex flex-col min-h-[500px] lg:h-auto bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative">
                      <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-black text-3xl">C</div>
                          <div>
                            <p className="text-white font-black text-2xl tracking-tight">Active Client</p>
                            <div className="flex items-center space-x-2">
                              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Inquiry Active</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar">
                        {scenario.conversation.slice(0, simStep).map((msg, i) => (
                          <div key={i} className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-4 duration-500`}>
                            <div className={`max-w-[88%] px-8 py-6 rounded-[2.5rem] text-base md:text-xl leading-relaxed font-bold ${
                              msg.sender === 'customer' 
                              ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-lg' 
                              : 'bg-blue-600 text-white rounded-tr-none shadow-2xl'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        {isSimulating && simStep < scenario.conversation.length && (
                          <div className="flex justify-start items-center space-x-3 ml-2">
                             <div className="flex space-x-2.5 bg-slate-800 px-6 py-5 rounded-[2rem] border border-slate-700">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI ACTIONS */}
                    <div className="flex flex-col min-h-[400px] lg:h-auto bg-blue-50/50 rounded-[2.5rem] p-8 md:p-12 border border-blue-100 shadow-inner">
                      <div className="flex items-center mb-10 space-x-6">
                        <div className="bg-blue-600 p-5 rounded-2xl shadow-xl shadow-blue-200"><Zap size={28} className="text-white" /></div>
                        <h4 className="font-black text-blue-900 text-2xl uppercase tracking-tighter">AI Assistant</h4>
                      </div>
                      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {scenario.aiActions.map((action, i) => {
                          const isActive = simStep >= (i / scenario.aiActions.length) * scenario.conversation.length;
                          return (
                            <div key={i} className={`flex items-start space-x-6 p-8 rounded-[2.5rem] transition-all duration-1000 border-2 ${isActive ? 'bg-white shadow-2xl border-white scale-100 opacity-100' : 'opacity-20 border-transparent scale-95'}`}>
                              <div className={`mt-1 flex-shrink-0 ${isActive ? 'text-green-500' : 'text-slate-300'}`}>
                                <CheckCircle2 size={32} />
                              </div>
                              <span className={`text-base md:text-lg font-black leading-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{action}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* OWNER EFFORT - ENHANCED LEGIBILITY WITHOUT STRIKETHROUGH */}
                    <div className="flex flex-col min-h-[400px] lg:h-auto bg-red-50/50 rounded-[2.5rem] p-8 md:p-12 border border-red-100 shadow-inner">
                      <div className="flex items-center mb-10 space-x-6">
                        <div className="bg-red-500 p-5 rounded-2xl shadow-xl shadow-red-200"><XCircle size={28} className="text-white" /></div>
                        <h4 className="font-black text-red-900 text-2xl uppercase tracking-tighter">Legacy Effort</h4>
                      </div>
                      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {scenario.manualTasks.map((task, i) => {
                          const isCrossed = simStep >= (i / scenario.manualTasks.length) * scenario.conversation.length;
                          return (
                            <div key={i} className={`flex items-start space-x-6 p-8 rounded-[2.5rem] transition-all duration-1000 border-2 ${isCrossed ? 'bg-red-100/50 border-red-200 shadow-sm' : 'bg-white shadow-2xl border-white'}`}>
                              <div className={`mt-1 flex-shrink-0 ${isCrossed ? 'text-red-600' : 'text-red-500'}`}>
                                <XCircle size={32} />
                              </div>
                              <span className={`text-base md:text-lg font-black leading-tight transition-all duration-1000 ${isCrossed ? 'text-red-900' : 'text-slate-900'}`}>
                                {task}
                              </span>
                            </div>
                          );
                        })}
                        {!simulationComplete && (
                          <div className="p-8 border-2 border-dashed border-red-200 rounded-[2.5rem] bg-white/40 flex items-center justify-center">
                            <p className="text-red-400 text-xs font-black uppercase tracking-widest text-center">Owner currently free to work on clients</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SUCCESS BANNER */}
                  {simulationComplete && (
                    <div className="mt-12 relative overflow-hidden bg-slate-900 text-white p-12 md:p-16 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-3xl border border-slate-800">
                      <div className="text-center lg:text-left relative z-10">
                        <div className="inline-flex items-center space-x-3 bg-green-600 text-[11px] font-black px-5 py-2 rounded-full text-white uppercase tracking-[0.3em] mb-8">
                          <CheckCircle2 size={14} />
                          <span>Journey Fully Handled</span>
                        </div>
                        <h4 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">
                          {scenario.metrics.revenuePotential > 0 ? 'Client Secured.' : 'Task Resolved.'} <br/>
                          <span className="text-blue-500">Zero Effort.</span>
                        </h4>
                        <p className="text-slate-400 text-xl md:text-3xl max-w-2xl leading-relaxed font-bold">
                          {scenario.metrics.revenuePotential > 0 ? (
                            <>AI handled this €{scenario.metrics.revenuePotential} lead instantly while you were busy healing.</>
                          ) : (
                            <>AI handled this {selectedIntent?.toLowerCase()} with ease while you were busy healing.</>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 w-full lg:w-auto relative z-50">
                        <a 
                          href="https://api.whatsapp.com/send?phone=351922102740"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-12 md:px-16 py-8 md:py-10 rounded-3xl font-black shadow-3xl transition-all text-center text-xl md:text-3xl transform hover:-translate-y-2 active:scale-95 shadow-blue-500/30 flex items-center justify-center cursor-pointer"
                        >
                          <MessageSquare className="mr-3 w-6 h-6 md:w-8 md:h-8" />
                          Build this for me
                        </a>
                      </div>
                      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE ROI CALCULATOR */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">Calculate Your Potential ROI</h2>
            <p className="text-slate-500 text-xl md:text-3xl leading-relaxed font-medium">Use the sliders below to see how much time and revenue you could save with AI.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-start">
            <div className="space-y-12">
              <div className="space-y-12">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                  <div className="flex justify-between items-end mb-8">
                    <label className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                      <Phone size={14} className="mr-3 text-red-400" />
                      Missed Calls & DMs (Weekly)
                    </label>
                    <span className="text-4xl font-black text-slate-900">{metrics.missedCallsPerWeek}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="1"
                    value={metrics.missedCallsPerWeek} 
                    onChange={(e) => setMetrics({...metrics, missedCallsPerWeek: Number(e.target.value)})}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                  <div className="flex justify-between items-end mb-8">
                    <label className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                      <Sparkles size={14} className="mr-3 text-blue-400" />
                      Avg. Session Price (€)
                    </label>
                    <span className="text-4xl font-black text-slate-900">€{metrics.avgBookingValue}</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="500" 
                    step="5"
                    value={metrics.avgBookingValue} 
                    onChange={(e) => setMetrics({...metrics, avgBookingValue: Number(e.target.value)})}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                  <div className="flex justify-between items-end mb-8">
                    <label className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                      <Users size={14} className="mr-3 text-green-400" />
                      Total Weekly Inquiries
                    </label>
                    <span className="text-4xl font-black text-slate-900">{metrics.leadsPerWeek}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="150" 
                    step="5"
                    value={metrics.leadsPerWeek} 
                    onChange={(e) => setMetrics({...metrics, leadsPerWeek: Number(e.target.value)})}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                  <div className="flex justify-between items-end mb-8">
                    <label className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                      <Repeat size={14} className="mr-3 text-purple-400" />
                      Sessions Per Client
                    </label>
                    <span className="text-4xl font-black text-slate-900">{metrics.avgSessionsPerClient}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    step="0.5"
                    value={metrics.avgSessionsPerClient} 
                    onChange={(e) => setMetrics({...metrics, avgSessionsPerClient: Number(e.target.value)})}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sticky top-12">
              <div className="bg-blue-600 text-white p-12 rounded-[3rem] flex flex-col justify-between h-80 shadow-3xl shadow-blue-200 transition-all hover:rotate-1 duration-500">
                <Clock className="w-16 h-16 opacity-30 mb-6" />
                <div>
                  <div className="text-7xl font-black mb-2 tracking-tighter leading-none">{calculatedStats.hoursSaved}h</div>
                  <div className="text-blue-100 font-black text-xl uppercase tracking-widest leading-tight">Admin Hours Saved Weekly</div>
                </div>
              </div>
              <div className="bg-slate-900 text-white p-12 rounded-[3rem] flex flex-col justify-between h-80 shadow-3xl shadow-slate-200 transition-all hover:-rotate-1 duration-500">
                <TrendingUp className="w-16 h-16 text-green-400 mb-6" />
                <div>
                  <div className="text-6xl font-black mb-2 tracking-tighter leading-none">€{calculatedStats.revenueImpact.toLocaleString()}</div>
                  <div className="text-slate-400 font-black text-xl uppercase tracking-widest leading-tight">Monthly Revenue Increase</div>
                </div>
              </div>
              <div className="bg-green-500 text-white p-12 rounded-[3.5rem] flex flex-col justify-between h-80 shadow-3xl shadow-green-100 sm:col-span-2 relative overflow-hidden">
                <ShieldCheck className="w-16 h-16 opacity-30 mb-6 relative z-10" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none">The AI Growth Multiplier</div>
                  <div className="text-green-50 text-xl leading-relaxed font-bold max-w-lg">
                    By capturing missed calls and automating follow-ups, you don't just win a session—you win the <span className="underline decoration-white decoration-4 underline-offset-8">lifetime value</span> of every recurring client.
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER & CTA */}
      <section id="contact" className="py-32 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">Claim Your <span className="text-blue-500">Practice Back.</span></h2>
          <p className="text-2xl md:text-3xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Join 150+ wellness specialists who automated their admin so they could get back to healing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-10 relative z-50">
            <a 
              href="https://api.whatsapp.com/send?phone=351922102740"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-8 rounded-[2.5rem] font-black text-2xl md:text-4xl shadow-3xl transition-all transform hover:-translate-y-2 active:scale-95 shadow-blue-500/30 flex items-center justify-center cursor-pointer"
            >
              <MessageSquare className="mr-4 w-8 h-8 md:w-10 md:h-10" />
              Message Me on WhatsApp
            </a>
          </div>
          
          <div className="mt-32 pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 space-y-12 md:space-y-0">
             <div className="flex items-center space-x-5">
               <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
                <Zap className="text-white" size={28} />
               </div>
               <span className="font-black text-white text-3xl tracking-tighter uppercase">JourneyPlayground</span>
             </div>
             <p className="text-center md:text-right font-black uppercase tracking-[0.3em] text-xs">© 2024 Built for Wellness Professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
