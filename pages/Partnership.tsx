
import React, { useState } from 'react';
import { Warehouse, Building2, Landmark, CheckCircle, ArrowRight, Info, MapPin, Ruler, Phone } from 'lucide-react';

const Partnership: React.FC = () => {
  const [propertyType, setPropertyType] = useState<'warehouse' | 'retail' | null>(null);

  return (
    <div className="pt-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-[#1C1C1C]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl text-center px-6 animate-fade-in-up">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Monetize Your <span className="text-[#E23744]">Space</span>
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Rent or sell your warehouse and retail property to India's fastest-growing liquor delivery network.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                setPropertyType('warehouse');
                document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#E23744] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#E23744] transition-all flex items-center gap-2 shadow-xl"
            >
              List Warehouse <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => {
                setPropertyType('retail');
                document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#1C1C1C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl"
            >
              List Retail Store <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Warehouse Card */}
            <div className="group bg-[#F8F8F8] p-10 rounded-[3rem] border border-transparent hover:border-[#E23744]/20 transition-all hover:shadow-2xl space-y-6">
              <div className="bg-[#E23744] text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Warehouse size={32} />
              </div>
              <h3 className="text-3xl font-black text-[#1C1C1C]">Warehouse / Logistics</h3>
              <p className="text-[#696969] text-lg leading-relaxed">
                Large storage spaces for hub operations. Ideal for 2,000+ sq. ft. properties with high ceilings and logistics access.
              </p>
              <ul className="space-y-3">
                {["Dark Store potential", "Strategic distribution hubs", "Long-term lease options"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1C1C1C]">
                    <CheckCircle size={18} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Retail Card */}
            <div className="group bg-[#F8F8F8] p-10 rounded-[3rem] border border-transparent hover:border-[#E23744]/20 transition-all hover:shadow-2xl space-y-6">
              <div className="bg-[#1C1C1C] text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-3xl font-black text-[#1C1C1C]">Retail / Shop Space</h3>
              <p className="text-[#696969] text-lg leading-relaxed">
                Premium high-street or local market retail properties for authorized Bhukk experience stores.
              </p>
              <ul className="space-y-3">
                {["Brand experience centers", "Local pickup points", "Instant visibility"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1C1C1C]">
                    <CheckCircle size={18} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Form */}
      <section id="partner-form" className="py-24 bg-[#FBFBFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="flex-1 bg-[#1C1C1C] p-12 lg:p-20 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-4xl font-black tracking-tight leading-tight">
                  List your property <br /><span className="text-[#E23744]">in 2 minutes</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Fill in the details and our real estate acquisition team will reach out for a site visit and valuation.
                </p>
              </div>

              <div className="space-y-8 pt-12">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#E23744] border border-white/10">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Premium Valuation</h4>
                    <p className="text-gray-500 text-sm">Competitive lease and sale rates based on market data.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#E23744] border border-white/10">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Pan-India Reach</h4>
                    <p className="text-gray-500 text-sm">Expanding into 50+ tier-1 and tier-2 cities this year.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-[1.2] p-8 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="John Wick" className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                    <div className="flex gap-2">
                      <div className="bg-[#F6F6F6] rounded-xl px-4 py-3.5 font-bold text-sm">+91</div>
                      <input type="tel" placeholder="9876543210" className="flex-1 bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Property Category</label>
                    <select 
                      value={propertyType || ''} 
                      onChange={(e) => setPropertyType(e.target.value as any)}
                      className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option value="warehouse">Warehouse / Cold Storage</option>
                      <option value="retail">Retail / Commercial Shop</option>
                      <option value="land">Commercial Land</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Purpose</label>
                    <select className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium appearance-none">
                      <option>Rent / Lease</option>
                      <option>Sale</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">Property Size (sq. ft.) <Ruler size={12} /></label>
                  <input type="number" placeholder="e.g. 2500" className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">Full Address <MapPin size={12} /></label>
                  <textarea rows={3} placeholder="Complete address with landmark..." className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3.5 transition-all outline-none font-medium resize-none" />
                </div>

                <button className="w-full bg-[#1C1C1C] text-white py-4.5 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                  Submit Property for Review <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
           <div className="text-[#E23744] flex justify-center"><Info size={48} strokeWidth={1} /></div>
           <h2 className="text-3xl font-black text-[#1C1C1C] italic">
             "Our vision is to build the most efficient liquor logistics network in India. Your property could be the next hub of this revolution."
           </h2>
           <div className="space-y-1">
             <p className="font-bold text-[#1C1C1C]">Sameer Bhardwaj</p>
             <p className="text-gray-400 text-sm uppercase tracking-widest">Head of Real Estate, Bhukk</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
