
import React from 'react';
import { TrendingUp, PieChart, ShieldCheck, Zap } from 'lucide-react';

const B2B_FEATURES = [
  { icon: <Zap className="w-6 h-6" />, title: 'Zero Onboarding', desc: 'Get your store listed in under 24 hours.' },
  { icon: <PieChart className="w-6 h-6" />, title: 'Smart Analytics', desc: 'Track sales, trends, and user behavior.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Fast Settlements', desc: 'T+1 daily settlement directly to your bank.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Full Compliance', desc: 'We handle age checks and legal documentation.' }
];

const B2BSection: React.FC = () => {
  return (
    <div className="bg-[#1C1C1C] rounded-3xl overflow-hidden p-8 md:p-16 text-white animate-scale-in">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Content */}
        <div className="flex-1 space-y-8 animate-fade-in-left delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div>
            <span className="text-[#E23744] font-bold tracking-widest uppercase text-sm">Grow with Bhukk</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              Grow your liquor business with Bhukk
            </h2>
            <p className="text-gray-400 text-lg mt-6 max-w-lg">
              Partner with India's largest alcohol delivery network and reach millions of new customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {B2B_FEATURES.map((item, idx) => (
              <div key={idx} className="space-y-2 group cursor-default">
                <div className="text-[#E23744] transition-transform group-hover:scale-125 duration-300">{item.icon}</div>
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="bg-[#E23744] hover:bg-[#c62833] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-[#E23744]/30 active:scale-95">
            Partner with Bhukk
          </button>
        </div>

        {/* Right Graphic - Dashboard Mockup Style */}
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in-right delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm animate-pulse-slow">
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 w-24 bg-white/20 rounded"></div>
              <div className="h-8 w-8 bg-[#E23744] rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 w-full bg-gradient-to-r from-[#E23744]/20 to-transparent rounded-xl flex items-end p-4 overflow-hidden">
                 <div className="flex gap-2 w-full h-full items-end justify-around">
                   {[40, 70, 45, 90, 65, 85].map((h, i) => (
                     <div 
                        key={i} 
                        className="w-4 bg-[#E23744] rounded-t transition-all duration-1000 ease-out" 
                        style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                      ></div>
                   ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-white/10 rounded-xl p-3">
                  <div className="h-3 w-12 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 w-20 bg-white/40 rounded"></div>
                </div>
                <div className="h-20 bg-white/10 rounded-xl p-3">
                  <div className="h-3 w-12 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 w-20 bg-white/40 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BSection;
