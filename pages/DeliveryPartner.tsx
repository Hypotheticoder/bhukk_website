
import React from 'react';
import { 
  Wallet, 
  Calendar, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  Smartphone, 
  CheckCircle2, 
  FileText, 
  Zap, 
  PlayCircle,
  Home as HomeIcon,
  Clock,
  MapPin
} from 'lucide-react';

interface DeliveryPartnerProps {
  onGoHome?: () => void;
}

const DeliveryPartner: React.FC<DeliveryPartnerProps> = ({ onGoHome }) => {
  return (
    <div className="pt-0">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
        {/* Background Image with optimized overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center scale-105"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1626354313200-98308f972044?auto=format&fit=crop&q=80&w=1920")',
          }}
        >
          {/* Multi-layered gradient for text readability and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 mt-20">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#E23744] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              HIRING NOW ACROSS INDIA
            </div>
            
            <h1 className="text-white text-5xl md:text-7xl font-black mb-6 leading-[1.1] drop-shadow-lg">
              Drive Your Growth. <br />
              <span className="text-[#E23744]">Earn With Bhukk.</span>
            </h1>
            
            <p className="text-white/90 text-xl md:text-2xl font-medium mb-10 max-w-xl leading-relaxed drop-shadow-md">
              Join the elite league of delivery partners. Get flexible hours, instant payouts, and comprehensive insurance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="group w-full sm:w-auto bg-[#E23744] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#c62833] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                Register as Partner <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                <Smartphone size={22} /> Download App
              </button>
            </div>

            {/* Micro Stats */}
            <div className="mt-12 flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">Flexible Shifts</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">Daily Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">50+ Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - Zomato Style Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">Perks of riding with us</h2>
            <p className="text-[#696969] text-lg">Designed for your comfort, safety, and financial growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Wallet size={36} />, title: 'Weekly Payouts', desc: 'Secure earnings deposited directly every week without delay.' },
              { icon: <Calendar size={36} />, title: 'Own Your Time', desc: 'Login and logout whenever you want. Be your own boss.' },
              { icon: <ShieldCheck size={36} />, title: 'Health First', desc: 'Complimentary medical and accidental insurance for you and your family.' },
              { icon: <Gift size={36} />, title: 'Incentive Rain', desc: 'Complete daily targets and unlock massive performance bonuses.' }
            ].map((benefit, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-[#F8F8F8] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-gray-100 group">
                <div className="text-[#E23744] mb-8 bg-white w-20 h-20 flex items-center justify-center rounded-3xl shadow-sm group-hover:bg-[#E23744] group-hover:text-white transition-colors duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-[#1C1C1C] mb-4">{benefit.title}</h3>
                <p className="text-[#696969] leading-relaxed text-lg">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#1C1C1C] text-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Onboard in less than <br /><span className="text-[#E23744]">24 Hours</span></h2>
              
              <div className="space-y-12">
                {[
                  { icon: <FileText size={24} />, title: 'Quick Application', desc: 'Upload your documents via the app—Aadhaar, DL, and RC.' },
                  { icon: <Zap size={24} />, title: 'Digital Training', desc: 'Complete our 15-minute interactive safety & delivery training.' },
                  { icon: <CheckCircle2 size={24} />, title: 'Start Riding', desc: 'Activate your profile and accept your first delivery order.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[#E23744] text-2xl group-hover:bg-[#E23744] group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-bold text-white">{step.title}</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute -inset-10 bg-[#E23744]/20 blur-[100px] rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Delivery Partner Support"
                className="relative rounded-[3rem] shadow-2xl border-8 border-white/5 transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner App Mockup Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 order-2 lg:order-1 flex justify-center">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -left-16 top-20 bg-white p-6 rounded-2xl shadow-2xl z-20 animate-bounce-slow hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-full"><Wallet size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Last Payout</p>
                      <p className="text-xl font-black text-gray-800">₹8,450</p>
                    </div>
                  </div>
                </div>

                {/* Device Frame */}
                <div className="relative w-80 h-[640px] bg-[#1C1C1C] rounded-[3.5rem] border-[12px] border-[#1C1C1C] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-[#1C1C1C] rounded-b-3xl z-30"></div>
                  <div className="absolute inset-0 bg-white p-6 pt-12 text-left flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                      <div className="h-10 w-10 bg-[#E23744] rounded-2xl flex items-center justify-center text-white"><Smartphone size={20} /></div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#1C1C1C] to-gray-800 p-6 rounded-3xl text-white mb-8 shadow-xl">
                      <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Current Earnings</p>
                      <h4 className="text-3xl font-black">₹2,840.00</h4>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-[10px] bg-green-500 px-2 py-1 rounded-full font-bold">ACTIVE TRIP</span>
                        <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-sm font-black text-gray-800 uppercase tracking-widest">Performance</p>
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E23744]"><Zap size={20} /></div>
                          <div className="flex-1">
                            <div className="h-3 w-2/3 bg-gray-200 rounded-full mb-2"></div>
                            <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <button className="w-full bg-[#E23744] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-[#E23744]/30">
                        Go Online
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-[#1C1C1C] leading-[1.1]">The App That <br /><span className="text-[#E23744]">Works For You.</span></h2>
              <p className="text-[#696969] text-xl leading-relaxed">
                Smart navigation, real-time earnings tracker, and 24/7 priority support. Everything you need to succeed is right in your pocket.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="flex items-center gap-3 bg-[#1C1C1C] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95">
                  <PlayCircle size={24} /> Google Play
                </button>
                <button className="flex items-center gap-3 bg-white text-[#1C1C1C] border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95">
                  <Smartphone size={24} /> App Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Sell / Home Redirect */}
      <section className="py-24 bg-[#FFFBF7]">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 bg-white p-16 rounded-[4rem] shadow-2xl border border-gray-100">
            <div className="inline-flex p-5 bg-[#FFF1F2] rounded-3xl text-[#E23744] mb-4">
              <HomeIcon size={40} />
            </div>
            <h2 className="text-4xl font-black text-[#1C1C1C]">Not looking to drive?</h2>
            <p className="text-[#696969] text-xl leading-relaxed">
              Experience India's smartest liquor delivery app as a customer. Legal, fast, and secure.
            </p>
            <button 
              onClick={onGoHome}
              className="group inline-flex items-center gap-3 bg-[#E23744] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#c62833] transition-all shadow-xl active:scale-95"
            >
              Order Now <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPartner;
