/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Shield, 
  BarChart3, 
  Hospital, 
  Users, 
  Zap, 
  ChevronRight, 
  Calendar, 
  FileText, 
  Pill, 
  CheckCircle2, 
  Menu, 
  X,
  ArrowRight,
  Star,
  Lock,
  Globe,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface AppointmentData {
  name: string;
  email: string;
  date: string;
  time: string;
  details: string;
}

// --- Components ---

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.05), transparent 80%)`
      }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyan-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Activity className="text-navy-950 w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">PILLAR</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-cyan-accent transition-colors">
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <a href="#contact" className="btn-primary text-sm">Book Appointment</a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] md:hidden"
            >
              <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-xl flex flex-col p-8">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-2">
                    <Activity className="text-cyan-accent w-6 h-6" />
                    <span className="text-xl font-bold text-white">PILLAR</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.a 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={link.name} 
                      href={link.href} 
                      className="text-3xl font-bold text-white hover:text-cyan-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                  <button onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full">Book Appointment</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-royal-blue/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-accent/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 mb-6">
            <Zap className="w-4 h-4 text-cyan-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-accent">Advanced Healthcare Software Solutions</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white">
            Next-Generation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-blue-400">Healthcare Software</span> <br />
            by Pillar
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            Helping hospitals digitize operations with secure, scalable healthcare software. Streamline clinical workflows and enhance patient care quality.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2">
              Request Demo <ChevronRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary">Book Appointment</button>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest mb-2">Trusted by leaders</span>
              <div className="flex gap-6 items-center">
                <span className="font-bold text-xl italic">HEALTHCORP</span>
                <span className="font-bold text-xl italic">BIO-LOGIC</span>
                <span className="font-bold text-xl italic">MED-X</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="glass-card rounded-3xl p-4 aspect-video flex items-center justify-center animate-float">
            {/* Mock Dashboard UI */}
            <div className="w-full h-full rounded-2xl bg-navy-950/50 border border-white/10 p-6 flex flex-col gap-4 overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-white/10 rounded-full" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-accent/20" />
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 glass-card rounded-xl p-3">
                    <div className="h-2 w-12 bg-white/10 rounded mb-2" />
                    <div className="h-4 w-16 bg-cyan-accent/30 rounded" />
                  </div>
                ))}
              </div>
              <div className="flex-1 glass-card rounded-xl bg-gradient-to-br from-cyan-accent/5 to-transparent p-4">
                <div className="h-full w-full border-b border-l border-white/10 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="flex-1 bg-cyan-accent/20 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -left-6 glass-card p-4 rounded-2xl border-l-4 border-cyan-accent"
          >
            <p className="text-cyan-accent text-2xl font-bold">500+</p>
            <p className="text-[10px] uppercase font-bold text-slate-500">Hospitals Served</p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl border-l-4 border-cyan-accent"
          >
            <p className="text-cyan-accent text-2xl font-bold">99.8%</p>
            <p className="text-[10px] uppercase font-bold text-slate-500">Satisfaction Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: "Hospital Management",
      desc: "Centralized ecosystem for managing clinical, administrative, and financial operations.",
      icon: <Hospital className="w-8 h-8" />,
      color: "text-blue-400"
    },
    {
      title: "Patient Record System",
      desc: "HIPAA-compliant Electronic Health Records (EHR) with 360-degree patient views.",
      icon: <FileText className="w-8 h-8" />,
      color: "text-cyan-400"
    },
    {
      title: "Appointment Scheduling",
      desc: "Smart booking engine with automated reminders and multi-location synchronization.",
      icon: <Calendar className="w-8 h-8" />,
      color: "text-indigo-400"
    },
    {
      title: "Pharmacy & Inventory",
      desc: "Real-time tracking of medical supplies with automated reordering and expiry alerts.",
      icon: <Pill className="w-8 h-8" />,
      color: "text-emerald-400"
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Our Solutions</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Comprehensive Software Suite</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tailored digital solutions designed to meet the complex needs of modern healthcare institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-3xl group cursor-pointer"
            >
              <div className={`mb-6 ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{s.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center text-cyan-accent text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Military-Grade Security",
      desc: "End-to-end encryption ensuring sensitive patient data remains protected at rest and in transit.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Real-Time Analytics",
      desc: "Gain immediate insights into hospital performance and patient outcomes with live dashboards.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Cloud Infrastructure",
      desc: "High-availability cloud architecture accessible from anywhere, anytime.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Role-Based Access",
      desc: "Granular permissions ensuring staff only access data necessary for their clinical role.",
      icon: <Lock className="w-6 h-6" />
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Enterprise Features</h2>
            <h3 className="text-4xl font-bold text-white mb-8 leading-tight">
              Built for Clinical Excellence <br /> and Data Integrity
            </h3>
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-royal-blue/20 flex items-center justify-center flex-shrink-0 text-cyan-accent">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{f.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-card rounded-3xl overflow-hidden aspect-square">
              <img 
                src="https://picsum.photos/seed/healthcare-it/800/800" 
                alt="Healthcare Technology" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle2 className="text-cyan-accent w-6 h-6" />
                  <span className="font-bold text-white">HIPAA & GDPR Compliant</span>
                </div>
                <p className="text-xs text-slate-400">Our platform undergoes regular security audits to ensure the highest standards of data protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief of Surgery, Metro General",
      content: "Pillar's analytics transformed how we manage our operating rooms. Efficiency increased by 20% in the first quarter.",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      name: "Dr. Marcus Chen",
      role: "Pediatrician, Children's Health",
      content: "The user interface is incredibly intuitive. My staff spent minimal time training and more time with patients.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Elena Rodriguez",
      role: "IT Director, Regional Health Net",
      content: "Integration was flawless. We managed to unify 15 clinics under one dashboard in record time.",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-navy-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl font-bold text-white mb-6">Trusted by Medical Professionals</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl relative">
              <div className="flex text-yellow-500 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-300 italic mb-8">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-cyan-accent" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-white">{t.name}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState<AppointmentData>({
    name: '',
    email: '',
    date: '',
    time: '',
    details: ''
  });
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        
        // Construct WhatsApp message
        const whatsappNumber = '9876543210'; // Replace with actual WhatsApp number
        const message = `*New Appointment Request - Pillar Healthcare*\n\n` +
          `*Name:* ${formData.name}\n` +
          `*Email:* ${formData.email}\n` +
          `*Date:* ${formData.date}\n` +
          `*Time:* ${formData.time}\n` +
          `*Details:* ${formData.details}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
        
        setFormData({ name: '', email: '', date: '', time: '', details: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      if (res.ok) {
        setContactStatus('success');
        
        // Construct Email message
        const emailAddress = 'support@pillar.com'; // Replace with actual support email
        const subject = encodeURIComponent(`Inquiry: ${contactData.subject}`);
        const body = encodeURIComponent(
          `Name: ${contactData.name}\n` +
          `Email: ${contactData.email}\n\n` +
          `Message:\n${contactData.message}`
        );
        
        const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        
        // Redirect to Email client
        window.location.href = mailtoUrl;
        
        setContactData({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch (err) {
      setContactStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Contact Us</h2>
          <h3 className="text-4xl font-bold text-white mb-6">Get in Touch</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Appointment Form */}
          <div className="glass-card p-8 lg:p-12 rounded-[40px]">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar className="text-cyan-accent" /> Book Appointment
            </h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                    placeholder="Dr. John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                    placeholder="john@hospital.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preferred Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all [color-scheme:dark]"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Time Window</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="" className="bg-navy-950">Select time</option>
                    <option value="morning" className="bg-navy-950">Morning (9AM - 12PM)</option>
                    <option value="afternoon" className="bg-navy-950">Afternoon (1PM - 5PM)</option>
                    <option value="evening" className="bg-navy-950">Evening (After 5PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Inquiry Details</label>
                <textarea 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                  placeholder="Tell us about your needs..."
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Request Sent!' : 'Book Appointment'}
                {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
              </button>
              {status === 'error' && <p className="text-red-400 text-xs text-center">Failed to send. Please try again.</p>}
            </form>
          </div>

          {/* General Inquiry Form */}
          <div className="glass-card p-8 lg:p-12 rounded-[40px]">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MessageSquare className="text-cyan-accent" /> General Inquiry
            </h4>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                    placeholder="Your Name"
                    value={contactData.name}
                    onChange={e => setContactData({...contactData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                    placeholder="your@email.com"
                    value={contactData.email}
                    onChange={e => setContactData({...contactData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                  placeholder="What is this about?"
                  value={contactData.subject}
                  onChange={e => setContactData({...contactData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                <textarea 
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-accent outline-none transition-all"
                  placeholder="Your message..."
                  value={contactData.message}
                  onChange={e => setContactData({...contactData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={contactStatus === 'loading'}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                {contactStatus === 'loading' ? 'Sending...' : contactStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                {contactStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
              </button>
              {contactStatus === 'error' && <p className="text-red-400 text-xs text-center">Failed to send. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-accent w-6 h-6" />
          <span className="text-xl font-bold tracking-tighter text-white">PILLAR</span>
        </div>
        
        <div className="text-slate-500 text-sm">
          © 2026 Pillar Healthcare IT Solutions. All rights reserved.
        </div>

        <div className="flex gap-8 text-sm text-slate-400">
          <a href="#" className="hover:text-cyan-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-accent transition-colors">Trust Center</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Solutions />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
