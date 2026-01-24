
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Send, MessageCircle, Facebook, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-[#FBFBFA]">
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black text-[#1C1C1C] tracking-tight mb-4">
            We're here to <span className="text-[#E23744]">help.</span>
          </h1>
          <p className="text-[#696969] text-xl max-w-2xl mx-auto">
            Have a question about your order, partnership, or just want to say hi? Drop us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Column */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl animate-fade-in-up">
            <h2 className="text-3xl font-black text-[#1C1C1C] mb-8">Send a message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium appearance-none">
                  <option>Order Inquiry</option>
                  <option>Partner Support</option>
                  <option>Property Listing</option>
                  <option>General Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  rows={5} 
                  placeholder="Tell us how we can help..." 
                  className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-2xl px-5 py-4 transition-all outline-none font-medium resize-none"
                />
              </div>

              <button className="w-full bg-[#1C1C1C] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

          {/* Contact Info Column */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Address Card */}
            <div className="bg-[#1C1C1C] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-[#E23744] opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#E23744] flex items-center justify-center text-white mb-8">
                  <MapPin size={32} />
                </div>
                <h3 className="text-3xl font-black">Our Headquarters</h3>
                <div className="space-y-2 text-xl font-medium text-gray-300">
                  <p>1/30 Chittaranjan Colony</p>
                  <p>Baghajatin, Kolkata - 700032</p>
                  <p className="text-[#E23744]">West Bengal, India</p>
                </div>
                <div className="pt-8 flex gap-6">
                  <a href="#" className="flex items-center gap-2 text-sm font-bold hover:text-[#E23744] transition-colors">
                    <MessageCircle size={18} /> Chat with us
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-bold hover:text-[#E23744] transition-colors">
                    <Mail size={18} /> Email Support
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#E23744] flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold text-[#1C1C1C]">+91 33 2412 0032</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-green-600 flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-[#1C1C1C]">hello@bhukk.in</p>
                </div>
              </div>
            </div>

            {/* Social Links - Enhanced Interactive Design */}
            <div className="bg-gradient-to-br from-[#E23744] to-[#c62833] p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white opacity-[0.03] pattern-diagonal-lines pointer-events-none"></div>
              <h4 className="text-2xl font-black relative z-10 text-center md:text-left">Follow our <br className="hidden md:block"/> journey</h4>
              <div className="flex flex-wrap justify-center gap-5 relative z-10">
                {[
                  { Icon: Instagram, color: 'hover:bg-[#E1306C]', name: 'Instagram' },
                  { Icon: Twitter, color: 'hover:bg-[#1DA1F2]', name: 'Twitter' },
                  { Icon: Linkedin, color: 'hover:bg-[#0077B5]', name: 'LinkedIn' },
                  { Icon: Facebook, color: 'hover:bg-[#4267B2]', name: 'Facebook' },
                  { Icon: Youtube, color: 'hover:bg-[#FF0000]', name: 'Youtube' }
                ].map(({ Icon, color, name }, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    title={name}
                    className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 hover:-translate-y-2 hover:bg-white hover:text-[#E23744] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-white/10 hover:border-white/40`}
                  >
                    <Icon size={26} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section - High Fidelity Map Embed */}
        <section className="mt-24 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1C1C1C]">Find us on the map</h2>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white h-[500px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.29177114704!2d88.3734084752988!3d22.49234857954932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271391945a05f%3A0x6b4504269e120173!2sBaghajatin%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-2xl max-w-xs border border-gray-100 hidden md:block">
              <p className="text-sm font-black text-[#1C1C1C] mb-2 uppercase tracking-widest">Office Visit</p>
              <p className="text-[#696969] text-sm leading-relaxed">
                Our doors are open Monday to Friday, 10 AM to 6 PM. Feel free to drop by for a coffee and a chat about the future of spirits delivery.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
