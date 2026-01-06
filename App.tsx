import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Terminal, 
  Layers, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X, 
  Globe, 
  User as UserIcon, 
  LayoutDashboard,
  LogOut,
  BrainCircuit,
  Box,
  Code2,
  Activity,
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BOOK_MODULES } from './constants';
import { User, Chapter } from './types';

// --- Shared Components ---

const GlassButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}> = ({ children, onClick, variant = 'primary', className = '', type='button' }) => {
  const baseStyles = "relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-primary to-blue-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] border border-brand-primary/50",
    secondary: "bg-brand-glass hover:bg-brand-glassHover text-white backdrop-blur-md border border-white/10 hover:border-brand-secondary/50",
    outline: "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary/10"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-panel rounded-2xl p-6 relative overflow-hidden group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

const Navbar: React.FC<{ isAuthenticated: boolean; onLogout: () => void }> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            PHY<span className="text-brand-primary">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white transition-colors">Log In</button>
              <GlassButton onClick={() => navigate('/signup')} variant="primary" className="!py-2 !px-4 text-sm">
                Get Started
              </GlassButton>
            </>
          ) : (
             <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-300 hover:text-brand-primary transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Pages ---

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium animate-float">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Learning Platform v1.0</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Physical AI & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-brand-secondary">
              Humanoid Robotics
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Master the art of embodied intelligence. Learn how AI systems think, move, and act in the physical world through simulation and real-world controls.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <GlassButton onClick={() => navigate('/signup')} className="w-full sm:w-auto">
              Start Reading
              <ChevronRight className="w-4 h-4" />
            </GlassButton>
            <GlassButton variant="secondary" onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth'})} className="w-full sm:w-auto">
              View Curriculum
            </GlassButton>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center perspective-1000">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-brand-primary/20 animate-float border border-white/10 group">
             {/* Abstract Robot Visual */}
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
             <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Robot Simulation" 
              className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute bottom-10 left-6 z-20 space-y-2">
               <div className="flex gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-yellow-500" />
                 <div className="w-2 h-2 rounded-full bg-green-500" />
               </div>
               <div className="font-mono text-xs text-brand-primary bg-black/50 p-2 rounded backdrop-blur-sm border border-brand-primary/20">
                 {`> initializing_systems...`} <br/>
                 {`> connecting_to_ros2_node...`} <br/>
                 {`> actuators_online [OK]`}
               </div>
             </div>
          </div>
        </div>
      </header>

      {/* Outcomes Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-3xl font-display font-bold text-center mb-16 text-glow">Learning Outcomes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BrainCircuit, title: "Embodied Intelligence", desc: "Understand how Physical AI differs from LLMs and digital-only AI." },
            { icon: Terminal, title: "Master ROS 2", desc: "Control robots using the industry-standard Robot Operating System." },
            { icon: Layers, title: "Simulation", desc: "Build high-fidelity digital twins in Gazebo and NVIDIA Isaac Sim." },
            { icon: Activity, title: "Perception & Nav", desc: "Implement SLAM, path planning, and obstacle avoidance." },
            { icon: Code2, title: "Capstone Project", desc: "Create a fully autonomous humanoid robot from scratch." },
            { icon: Zap, title: "Real World Deployment", desc: "Bridge the Sim2Real gap and deploy code to hardware." },
          ].map((item, i) => (
            <GlassCard key={i} className="hover:border-brand-primary/30 transition-colors">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4 text-brand-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Target Audience */}
      <section className="relative z-10 py-20 bg-brand-dark/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-display font-bold mb-8">Who This Book Is For</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["AI Beginners", "CS Students", "Robotics Engineers", "Python Developers", "Hardware Enthusiasts"].map((tag) => (
              <span key={tag} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-brand-secondary backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Preview */}
      <section id="preview" className="relative z-10 container mx-auto px-6 py-32">
        <div className="glass-panel rounded-3xl overflow-hidden border border-brand-primary/20">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center space-y-8 bg-gradient-to-br from-brand-primary/5 to-transparent">
              <div>
                <span className="text-brand-secondary font-mono tracking-widest text-sm">CAPSTONE PROJECT</span>
                <h2 className="text-4xl font-display font-bold mt-2 mb-4">Build an Autonomous Humanoid</h2>
                <p className="text-gray-400">
                  Combine everything you've learned. You will build a simulated humanoid that can navigate a warehouse, 
                  understand voice commands, identify objects, and manipulate items using a robotic arm.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Voice Command Integration",
                  "Lidar & Vision Navigation",
                  "6-DOF Arm Manipulation",
                  "Reinforcement Learning Gait"
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_#0ea5e9]" />
                    {feat}
                  </li>
                ))}
              </ul>
              <GlassButton onClick={() => navigate('/signup')}>Start Building Now</GlassButton>
            </div>
            <div className="relative h-96 lg:h-auto bg-black">
              {/* Simulated 3D Environment Mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-4 gap-8 opacity-20 transform rotate-12 scale-150">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="w-20 h-20 border border-brand-primary/30" />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Overlay UI elements for the "Sim" */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 text-xs rounded font-mono">LIDAR: ON</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs rounded font-mono">SLAM: ACTIVE</span>
                </div>

                <Box className="w-32 h-32 text-brand-primary animate-float drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 container mx-auto px-6 pb-32 text-center">
        <GlassCard className="max-w-3xl mx-auto py-16 px-8 border-brand-primary/30">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Ready to shape the future?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join thousands of developers bridging the gap between digital AI and physical reality.
          </p>
          <GlassButton onClick={() => navigate('/signup')} className="mx-auto text-lg px-8 py-4">
            Begin Your Journey
          </GlassButton>
        </GlassCard>
      </section>

      <Footer />
    </div>
  );
};

// --- Auth Page ---

const AuthPage: React.FC<{ type: 'login' | 'signup'; onLogin: (user: User) => void }> = ({ type, onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(type === 'login');
  
  useEffect(() => setIsLogin(type === 'login'), [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      email: 'user@example.com',
      name: 'Future Roboticist',
      background: { software: 'Intermediate', hardware: 'Beginner' }
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/20 via-brand-dark to-black pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
           <Cpu className="w-12 h-12 text-brand-primary mx-auto mb-4" />
           <h2 className="text-3xl font-display font-bold">{isLogin ? 'Welcome Back' : 'Join the Lab'}</h2>
           <p className="text-gray-400 mt-2">
             {isLogin ? 'Access your dashboard' : 'Start your journey into Physical AI'}
           </p>
        </div>

        <GlassCard className="backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all" placeholder="John Doe" required />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all" placeholder="name@example.com" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input type="password" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all" placeholder="••••••••" required />
            </div>

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Coding Exp</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-3 text-white text-sm focus:outline-none">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Robotics Exp</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-3 text-white text-sm focus:outline-none">
                      <option>None</option>
                      <option>Hobbyist</option>
                      <option>Pro</option>
                    </select>
                 </div>
              </div>
            )}

            <GlassButton type="submit" className="w-full justify-center mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-brand-primary hover:text-brand-primary/80 font-medium ml-1"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// --- Dashboard ---

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(BOOK_MODULES[0].chapters[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1']);
  const [isUrdu, setIsUrdu] = useState(false);

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="min-h-screen pt-20 flex relative">
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-brand-primary rounded-full shadow-lg text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 
        bg-brand-dark/95 backdrop-blur-xl border-r border-white/5 
        transition-transform duration-300 z-40 overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h2 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">Course Modules</h2>
          <div className="space-y-4">
            {BOOK_MODULES.map((module) => (
              <div key={module.id} className="border border-white/5 rounded-xl overflow-hidden bg-white/5">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-sm text-gray-200">{module.title.split(':')[0]}</span>
                  {expandedModules.includes(module.id) ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
                
                {expandedModules.includes(module.id) && (
                  <div className="bg-black/20 border-t border-white/5">
                    {module.chapters.map(chapter => (
                      <button
                        key={chapter.id}
                        onClick={() => { setActiveChapter(chapter); setSidebarOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-start gap-2 transition-colors border-l-2
                          ${activeChapter.id === chapter.id 
                            ? 'border-brand-primary text-brand-primary bg-brand-primary/10' 
                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}
                        `}
                      >
                         <BookOpen className="w-4 h-4 mt-0.5 shrink-0" />
                         <span className="line-clamp-2">{chapter.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content (Reader) */}
      <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto w-full">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <div className="text-sm text-gray-400 breadcrumbs">
            {isUrdu ? (
               <span className="font-sans">ڈیش بورڈ / مطالعہ</span>
            ) : (
               <>Dashboard <span className="mx-2">/</span> Reader</>
            )}
          </div>
          <div className="flex gap-3">
             <GlassButton variant="secondary" className="!py-2 !px-4 text-xs gap-2">
                <UserIcon className="w-4 h-4" />
                {isUrdu ? 'ذاتی بنائیں' : 'Personalize'}
             </GlassButton>
             <GlassButton 
                variant={isUrdu ? "primary" : "secondary"} 
                onClick={() => setIsUrdu(!isUrdu)}
                className="!py-2 !px-4 text-xs gap-2"
             >
                <Globe className="w-4 h-4" />
                {isUrdu ? 'Translate to English' : 'Translate to Urdu'}
             </GlassButton>
          </div>
        </div>

        {/* Content Area */}
        <GlassCard className="min-h-[60vh] p-8 lg:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-50" />
          
          <h1 className={`text-3xl lg:text-4xl font-display font-bold mb-6 text-white leading-tight ${isUrdu ? 'text-right' : ''}`}>
            {activeChapter.title}
          </h1>

          {/* Placeholder Content */}
          <div className={`space-y-6 text-gray-300 leading-relaxed text-lg ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
            <p className={`flex items-center gap-2 text-brand-primary font-medium ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-5 h-5" />
              {isUrdu ? 'AI کا تیار کردہ خلاصہ' : 'AI Generated Summary'}
            </p>
            <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-sm text-blue-200">
              {isUrdu 
                ? "اس باب میں، ہم نظام کو سمجھنے کے لیے درکار بنیادی تصورات کا جائزہ لیتے ہیں۔ اہم موضوعات میں آغاز، بنیادی لوپس، اور طبعی ہارڈویئر کے لیے حفاظتی پروٹوکول شامل ہیں۔"
                : "In this chapter, we explore the fundamental concepts required to understand the system. Key topics include initialization, core loops, and safety protocols for physical hardware."
              }
            </div>

            <hr className="border-white/10 my-8" />

            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-black/20 text-gray-500">
               <Layers className="w-12 h-12 mb-4 opacity-20" />
               <p>{isUrdu ? "باب کا مواد فی الحال مرتب کیا جا رہا ہے۔" : "Chapter content is currently being compiled."}</p>
               <p className="text-sm opacity-50">{isUrdu ? "انٹرایکٹو سمولیشن ماڈیول لوڈ ہو رہا ہے..." : "Interactive simulation module loading..."}</p>
            </div>
            
            <p>
              {isUrdu 
                ? "یہاں پر مزید تفصیلی مواد شامل کیا جائے گا۔ یہ پلیٹ فارم آپ کو روبوٹکس اور مصنوعی ذہانت کے جدید ترین اصولوں سے روشناس کرانے کے لیے ڈیزائن کیا گیا ہے۔"
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
            </p>
            <p>
              {isUrdu
                ? "جسمانی مصنوعی ذہانت اور ہیومنائیڈ روبوٹکس کا مستقبل اب آپ کے ہاتھ میں ہے۔ مشق اور نقلی ماڈلز کے ذریعے سیکھنا جاری رکھیں۔"
                : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
            </p>
          </div>
        </GlassCard>
      </main>

      <Chatbot />
    </div>
  );
};

// --- Features ---

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hello! I am your AI tutor. Ask me anything about ROS 2, robotic kinematics, or how to set up your simulation environment.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API delay for a realistic feel
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', text: "I'm a simulated AI response. The actual AI connection is disabled to prevent system instability." }]);
        setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] glass-panel rounded-2xl flex flex-col border border-brand-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-float">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-brand-primary/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-display font-bold text-sm">Physical AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30 shrink-0">
                        <Cpu className="w-4 h-4 text-brand-primary" />
                    </div>
                  )}
                  <div className={`
                    max-w-[80%] rounded-lg p-3 text-sm 
                    ${msg.role === 'user' 
                      ? 'bg-brand-primary text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'}
                  `}>
                    {msg.text}
                  </div>
                </div>
             ))}
             {isLoading && (
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30 shrink-0">
                      <Cpu className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg rounded-tl-none p-3 text-sm text-gray-200 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask a question..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full bg-black/30 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-brand-primary/50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:scale-110 transition-transform duration-300"
      >
         <MessageSquare className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-black py-12 border-t border-white/10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-2xl font-display font-bold text-gray-500">
        PHY<span className="text-gray-700">AI</span>
      </div>
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Physical AI & Humanoid Robotics. All rights reserved.
      </div>
      <div className="flex gap-6 text-gray-400">
        <a href="#" className="hover:text-brand-primary transition-colors">GitHub</a>
        <a href="#" className="hover:text-brand-primary transition-colors">Documentation</a>
        <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <HashRouter>
      <div className="min-h-screen bg-brand-dark text-slate-200 font-sans selection:bg-brand-primary/30 selection:text-white">
        <Navbar isAuthenticated={!!user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage type="login" onLogin={setUser} />} />
          <Route path="/signup" element={<AuthPage type="signup" onLogin={setUser} />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <AuthPage type="login" onLogin={setUser} />} 
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;