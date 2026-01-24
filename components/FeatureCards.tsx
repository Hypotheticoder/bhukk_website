
import React from 'react';
import { FEATURES } from '../constants';

const FeatureCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((item, index) => (
        <div 
          key={index}
          className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer zomato-shadow zomato-shadow-hover transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up opacity-0`}
          style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
        >
          {/* Image Container */}
          <div className="h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#E23744] bg-[#FFF1F2] p-2 rounded-lg">
                {item.icon}
              </span>
              <h3 className="text-xl font-medium text-[#1C1C1C]">{item.title}</h3>
            </div>
            <p className="text-[#696969] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Bottom highlight bar */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#E23744] transition-all duration-300 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
