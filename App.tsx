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
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BOOK_MODULES } from './constants';
import { User, Chapter } from './types';

// --- Content Data ---

const CHAPTER_CONTENT: Record<string, { summary: string; sections: { title: string; content: React.ReactNode }[]; takeaways: string[] }> = {
  // Module 1: Foundations
  'c1': {
    summary: "Physical AI represents the merger of artificial intelligence with physical bodies. This chapter defines embodied intelligence and how it differs from pure digital AI.",
    sections: [
      {
        title: "What is Physical AI?",
        content: <p>Physical AI refers to AI systems that possess a physical form—robots. Unlike chatbots (Digital AI) that live on servers and process text, Physical AI agents must navigate, touch, and manipulate the real world. They deal with gravity, friction, and unpredictable environments.</p>
      },
      {
        title: "Digital vs. Embodied Intelligence",
        content: <p>Digital AI, like a chess engine, operates in a world of perfect information. Embodied AI operates in the real world, where sensors are noisy and motors aren't perfect. A robot learns about the world not just by reading data, but by interacting with it—pushing objects, bumping into walls, and picking things up.</p>
      }
    ],
    takeaways: ["Physical AI acts on the physical world.", "Digital AI processes data; Embodied AI processes reality.", "Physics is the ultimate constraint."]
  },
  'c2': {
    summary: "Robots need to sense the world to interact with it. We explore how sensors act as the eyes and ears of an autonomous machine.",
    sections: [
      {
        title: "Sensors vs. Perception",
        content: <p>A 'sensor' is the hardware (like a camera lens). 'Perception' is the software intelligence that understands what the sensor is seeing. For example, a camera captures pixels (sensing), but an AI model recognizes a 'cat' in those pixels (perception).</p>
      },
      {
        title: "Types of Robot Senses",
        content: <ul className="list-disc pl-5 space-y-2 mt-2"><li><strong>Exteroception:</strong> Sensing the outside world (Cameras, Lidar, Microphones).</li><li><strong>Proprioception:</strong> Sensing the internal state (Motor encoders, IMUs, Battery levels).</li></ul>
      }
    ],
    takeaways: ["Sensors provide raw data; Perception provides meaning.", "Proprioception allows the robot to know its own body position.", "Lidar and Cameras are the primary vision sensors."]
  },

  // Module 2: ROS 2
  'c3': {
    summary: "The Robot Operating System (ROS 2) is the industry standard middleware. It acts as the nervous system, connecting sensors to the brain and actuators.",
    sections: [
      {
        title: "What is ROS 2?",
        content: <p>ROS 2 isn't an actual operating system like Windows; it's a set of software libraries that help different parts of a robot talk to each other. It handles the difficult work of passing messages between a camera driver and a motor controller.</p>
      },
      {
        title: "Nodes and Topics",
        content: <p>Think of <strong>Nodes</strong> as individual brain cells or programs. One node reads the camera, another controls the wheels. They communicate via <strong>Topics</strong>. The camera node 'publishes' images to a topic, and the wheel node 'subscribes' to it to see where to go.</p>
      }
    ],
    takeaways: ["ROS 2 is the 'plumbing' of robotics software.", "Nodes are individual processes.", "Topics allow nodes to share data."]
  },
  'c4': {
    summary: "We can control complex robots using simple Python scripts. This chapter bridges the gap between code and movement.",
    sections: [
      {
        title: "The Control Loop",
        content: <p>Robots run on loops. A typical control script reads sensor data, calculates a decision, and sends a motor command—dozens of times per second. In Python, we use libraries like `rclpy` to interface with ROS 2 seamlessly.</p>
      },
      {
        title: "Sending Velocity Commands",
        content: <p>The most basic command is a `Twist` message. It tells the robot two things: linear velocity (speed forward) and angular velocity (speed of turning). By adjusting these two numbers, we can drive a robot anywhere.</p>
      }
    ],
    takeaways: ["Python is the primary language for high-level robot logic.", "Control loops run continuously.", "Velocity commands drive the robot base."]
  },
  'c5': {
    summary: "Before a robot can move, it must know its own shape. URDF (Unified Robot Description Format) is the XML language used to describe robot bodies.",
    sections: [
      {
        title: "Why Describe a Robot?",
        content: <p>The software needs to know how long the robot's arm is, where the wheels are, and how heavy the chassis is. Without this 'self-model', the robot cannot plan movements without hitting itself.</p>
      },
      {
        title: "Links and Joints",
        content: <p>A robot description is made of <strong>Links</strong> (the rigid parts, like bones) and <strong>Joints</strong> (the moving parts, like motors). These are defined in a tree structure, starting from the base of the robot.</p>
      }
    ],
    takeaways: ["URDF is an XML file describing the robot.", "Links are rigid bodies; Joints are movable connections.", "The TF (Transform) tree tracks where every part is in 3D space."]
  },

  // Module 3: Simulation
  'c6': {
    summary: "A Digital Twin is a virtual replica of a physical system. It allows us to test, crash, and learn without breaking expensive hardware.",
    sections: [
      {
        title: "The Concept of the Digital Twin",
        content: <p>In robotics, we build the robot in the computer first. This digital twin has the exact same dimensions, sensors, and code interfaces as the real robot. If the code works on the twin, it should work on the real machine.</p>
      },
      {
        title: "Benefits of Simulation",
        content: <p>Simulation allows for rapid testing. You can run a robot for 10,000 hours in a simulation overnight, creating scenarios (like rain or hardware failure) that are dangerous to test in reality.</p>
      }
    ],
    takeaways: ["Digital Twins save money and time.", "We can test dangerous edge cases safely.", "Simulation is a prerequisite for modern robotics."]
  },
  'c7': {
    summary: "Gazebo is the classic simulator for ROS. It provides a physics engine to simulate gravity, collisions, and friction.",
    sections: [
      {
        title: "What is Gazebo?",
        content: <p>Gazebo is a 3D environment that integrates tightly with ROS. It simulates the laws of physics. When you send a motor command in Gazebo, it calculates the torque, friction against the floor, and the resulting movement, just like the real world.</p>
      },
      {
        title: "Simulating Sensors",
        content: <p>Gazebo can also simulate sensors. It generates fake camera feeds and Lidar scans based on the virtual world, feeding them into your robot code as if they were real.</p>
      }
    ],
    takeaways: ["Gazebo simulates physics and sensors.", "It integrates natively with ROS.", "It is the standard tool for testing robot logic."]
  },
  'c8': {
    summary: "For complex human-robot interaction, we need better graphics. Unity provides high-fidelity visuals and advanced physics for next-gen simulation.",
    sections: [
      {
        title: "Why Unity?",
        content: <p>While Gazebo is great for physics, Unity (a game engine) offers photorealistic graphics. This is crucial for training AI vision models, which need to recognize objects that look like the real world.</p>
      },
      {
        title: "The Sim2Real Gap",
        content: <p>The better the simulation looks (High Fidelity), the easier it is to transfer the AI brain to the real robot. Unity helps bridge this gap by providing realistic lighting, textures, and shadows.</p>
      }
    ],
    takeaways: ["Unity offers photorealistic simulation.", "Better visuals help train Computer Vision models.", "Game engines are becoming robotics tools."]
  },

  // Module 4: AI Brain
  'c9': {
    summary: "NVIDIA Isaac is a powerful platform designed for robotics simulation and AI. It leverages GPU power to run massive simulations.",
    sections: [
      {
        title: "The Isaac Ecosystem",
        content: <p>NVIDIA Isaac Sim is built on 'Omniverse', allowing for physically accurate and photorealistic worlds. It can simulate thousands of robots simultaneously to train AI brains faster than real-time.</p>
      },
      {
        title: "GPU Acceleration",
        content: <p>Traditional simulators run on the CPU. Isaac runs on the GPU, which is designed for parallel processing. This allows for complex physics (like deformable objects or fluids) that were previously impossible.</p>
      }
    ],
    takeaways: ["Isaac Sim runs on GPUs for speed.", "It supports massive parallel training.", "It integrates with NVIDIA's AI hardware."]
  },
  'c10': {
    summary: "Perception is the act of making sense of sensor data. Isaac ROS provides hardware-accelerated modules for vision and depth.",
    sections: [
      {
        title: "Robot Vision Pipeline",
        content: <p>The pipeline starts with a raw image. First, we remove noise. Then, we use AI models to detect objects (chairs, people). Finally, we determine where those objects are in 3D space relative to the robot.</p>
      },
      {
        title: "VSLAM (Visual SLAM)",
        content: <p>Visual Simultaneous Localization and Mapping (VSLAM) uses cameras to build a map of the room while simultaneously figuring out where the robot is within that map. It is a critical skill for autonomy.</p>
      }
    ],
    takeaways: ["Perception turns pixels into understanding.", "VSLAM builds maps using eyes (cameras).", "Hardware acceleration is needed for real-time vision."]
  },
  'c11': {
    summary: "Navigation 2 (Nav2) is the standard ROS 2 library for moving mobile robots. It handles path planning and obstacle avoidance.",
    sections: [
      {
        title: "Global vs. Local Planning",
        content: <p>Navigation happens in two layers. The <strong>Global Planner</strong> looks at the full map to find a route from A to B (like Google Maps). The <strong>Local Planner</strong> avoids immediate obstacles (like a walking person) while following that route.</p>
      },
      {
        title: "Costmaps",
        content: <p>A costmap is a grid where every square has a 'safety cost'. Walls have high cost (danger). Open space has low cost. The robot always tries to follow the path of lowest cost.</p>
      }
    ],
    takeaways: ["Nav2 manages movement from A to B.", "Global planners find the route; Local planners avoid crashes.", "Costmaps represent safe and dangerous areas."]
  },
  'c12': {
    summary: "Reinforcement Learning (RL) allows robots to learn skills by trial and error, rather than being explicitly programmed.",
    sections: [
      {
        title: "Learning to Walk",
        content: <p>Programming a humanoid to walk manually is incredibly hard. With RL, we give the robot a 'reward' for moving forward and standing up, and a 'penalty' for falling. After millions of tries in simulation, it figures out how to walk on its own.</p>
      },
      {
        title: "The Agent and Environment",
        content: <p>In RL, the robot is the <strong>Agent</strong>. The world is the <strong>Environment</strong>. The agent takes an <strong>Action</strong>, and the environment returns a new State and a Reward.</p>
      }
    ],
    takeaways: ["RL learns through rewards and penalties.", "It is essential for complex motor skills like walking.", "Training happens in simulation to save time."]
  },

  // Module 5: VLA
  'c13': {
    summary: "Vision-Language-Action (VLA) models represent the cutting edge of robotics. They allow robots to understand natural language and visual inputs simultaneously.",
    sections: [
      {
        title: "Seeing and Understanding",
        content: <p>Traditional robots need strict code. VLA models (like Google's RT-2) can look at a messy table and understand a command like 'Pick up the apple'. They combine the visual recognition of an apple with the language concept of 'picking up'.</p>
      },
      {
        title: "Generalization",
        content: <p>The power of VLA is generalization. If a robot knows how to pick up an apple, a VLA model allows it to try picking up an orange, even if it has never been explicitly programmed for oranges.</p>
      }
    ],
    takeaways: ["VLA combines vision, language, and robot control.", "It allows for natural language commands.", "It enables generalization to new objects."]
  },
  'c14': {
    summary: "Voice-to-Action systems allow us to speak to robots. We convert audio into structured data that the robot's code can execute.",
    sections: [
      {
        title: "The Voice Pipeline",
        content: <p>First, we use a model like Whisper to convert Audio to Text. Then, we use an LLM to extract the 'Intent' (what the user wants) and 'Parameters' (which object, which location). Finally, this is converted to a JSON command for the robot.</p>
      },
      {
        title: "From Speech to JSON",
        content: <p>A user says 'Go to the kitchen'. The system converts this to {`{ action: 'navigate', target: 'kitchen' }`}. The robot's navigation stack then executes this precise command.</p>
      }
    ],
    takeaways: ["We chain multiple AI models to handle voice.", "LLMs act as translators between English and Robot Code.", "Structured output (JSON) is key."]
  },
  'c15': {
    summary: "Conversational Robotics focuses on the social aspect. Robots need context, memory, and personality to interact naturally with humans.",
    sections: [
      {
        title: "Context and Memory",
        content: <p>A smart robot remembers that you like coffee in the morning. This requires a 'memory module' where previous interactions are stored and retrieved when relevant to the current conversation.</p>
      },
      {
        title: "Social Cues",
        content: <p>Robots must understand when to speak and when to listen. They use gaze direction (looking at you) and non-verbal sounds to signal that they are paying attention.</p>
      }
    ],
    takeaways: ["Robots need long-term memory for personalization.", "Context makes conversations feel natural.", "Social cues build trust with humans."]
  },

  // Module 6: Capstone
  'c16': {
    summary: "The Capstone Project brings everything together. You will design and simulate a fully autonomous humanoid robot capable of navigating a warehouse.",
    sections: [
      {
        title: "Project Architecture",
        content: <p>The system combines a ROS 2 Nav2 stack for movement, a MoveIt 2 stack for arm manipulation, and a VLA model for decision making. All of these nodes run simultaneously on the robot's internal computer.</p>
      },
      {
        title: "The Mission",
        content: <p>Your robot must start at a charging dock, receive a voice command ('Fetch the red box'), navigate to the shelf, identify the box, pick it up, and deliver it to the packing station—all autonomously.</p>
      }
    ],
    takeaways: ["Integration is the hardest part of robotics.", "The project combines Navigation, Manipulation, and AI.", "Success is defined by autonomy—no human remote control."]
  },
  'c17': {
    summary: "The final frontier is transferring your code from the simulator to the real world. This describes the challenges of the 'Sim2Real' gap.",
    sections: [
      {
        title: "The Reality Gap",
        content: <p>In simulation, friction is constant and sensors are perfect. In reality, wheels slip, light changes, and sensors have noise. Code that works 100% in Sim might fail in Real Life.</p>
      },
      {
        title: "Domain Randomization",
        content: <p>To fix this, we use Domain Randomization. We train the robot in simulations where gravity, color, and friction change randomly. This forces the AI to learn robust strategies that work even when the world isn't perfect.</p>
      }
    ],
    takeaways: ["Reality is messy and unpredictable.", "Sim2Real transfer requires robust code.", "Domain Randomization helps AI adapt to the real world."]
  }
};

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

  // Get content for the active chapter, or fallback to the first chapter if not found
  const content = CHAPTER_CONTENT[activeChapter.id] || CHAPTER_CONTENT['c1'];

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

          {/* Educational Content */}
          <div className={`space-y-8 text-gray-300 leading-relaxed text-lg ${isUrdu ? 'text-right' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
            
            {/* Summary */}
            <div className={`flex items-center gap-2 text-brand-primary font-medium ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-5 h-5" />
              <span>{isUrdu ? 'AI کا تیار کردہ خلاصہ' : 'AI Generated Summary'}</span>
            </div>
            <div className="p-5 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-sm text-blue-100 font-medium">
              {content.summary}
            </div>

            <hr className="border-white/10 my-8" />

            {/* Sections */}
            {content.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-brand-primary opacity-50">0{idx + 1}.</span> {section.title}
                </h3>
                <div className="text-gray-400 leading-relaxed space-y-4">
                  {section.content}
                </div>
              </div>
            ))}

            <div className="h-8" />

            {/* Takeaways */}
            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
              <h4 className="text-lg font-bold text-brand-secondary mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Key Takeaways
              </h4>
              <ul className="space-y-3">
                {content.takeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            
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