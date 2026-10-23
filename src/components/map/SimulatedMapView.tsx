import React, { useState } from 'react';
import { Navigation, MapPin, Store, User, Compass, Layers, ChevronRight } from 'lucide-react';
import { StoreInfo, CustomerInfo, GPSState } from '../../types';

interface SimulatedMapViewProps {
  store: StoreInfo;
  customer?: CustomerInfo;
  currentStep: 'GOING_TO_PICKUP' | 'PICKUP_VERIFICATION' | 'GOING_TO_CUSTOMER' | 'DELIVERY_OTP' | string;
  gpsState?: GPSState;
  onArrivedClick?: () => void;
  heightClass?: string;
}

export const SimulatedMapView: React.FC<SimulatedMapViewProps> = ({
  store,
  customer,
  currentStep,
  gpsState = 'NORMAL',
  heightClass = 'h-72 sm:h-96',
}) => {
  const [mapStyle, setMapStyle] = useState<'dark' | 'terrain'>('dark');
  const [isCentered, setIsCentered] = useState(true);

  // Determine active target for navigation instructions
  const isHeadingToCustomer =
    currentStep === 'GOING_TO_CUSTOMER' ||
    currentStep === 'ARRIVED_AT_CUSTOMER' ||
    currentStep === 'DELIVERY_OTP';

  const destinationName = isHeadingToCustomer ? customer?.name || 'Customer Location' : store.name;
  const destinationAddress = isHeadingToCustomer ? customer?.address || '' : store.address;

  const currentNavInstruction = isHeadingToCustomer
    ? 'In 150m, turn right onto 12th Main Rd toward Customer Apt'
    : 'In 300m, take second exit at round-about onto 100 Feet Rd';

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-inner`}>
      {/* SVG Canvas Map Simulation */}
      <svg
        className="w-full h-full object-cover select-none"
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Dark map gradient background */}
          <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0f19" />
            <stop offset="100%" stopColor="#131b2e" />
          </linearGradient>

          {/* Route path dashed animation */}
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Map Background */}
        <rect width="800" height="450" fill="url(#mapBg)" />

        {/* Green Parks & Land Blocks */}
        <path d="M 50 40 Q 180 20 220 120 T 100 240 Z" fill="#052e16" opacity="0.4" />
        <path d="M 550 180 Q 700 120 760 300 T 600 400 Z" fill="#052e16" opacity="0.35" />
        <path d="M 320 10 Q 420 30 400 90 T 280 80 Z" fill="#1e293b" opacity="0.6" />

        {/* River / Lake */}
        <path
          d="M -20 300 Q 150 280 300 360 T 650 340 T 820 420"
          fill="none"
          stroke="#0e3a5d"
          strokeWidth="35"
          opacity="0.6"
        />

        {/* Grid Road Network */}
        <g stroke="#1e293b" strokeWidth="6" strokeLinecap="round">
          {/* Horizontal Main Avenues */}
          <line x1="0" y1="80" x2="800" y2="80" />
          <line x1="0" y1="180" x2="800" y2="180" stroke="#334155" strokeWidth="10" />
          <line x1="0" y1="280" x2="800" y2="280" />
          <line x1="0" y1="380" x2="800" y2="380" />

          {/* Vertical Main Roads */}
          <line x1="120" y1="0" x2="120" y2="450" />
          <line x1="280" y1="0" x2="280" y2="450" stroke="#334155" strokeWidth="12" />
          <line x1="480" y1="0" x2="480" y2="450" />
          <line x1="640" y1="0" x2="640" y2="450" />

          {/* Diagonal Connector Streets */}
          <line x1="120" y1="180" x2="280" y2="80" stroke="#1e293b" strokeWidth="5" />
          <line x1="280" y1="180" x2="480" y2="280" stroke="#334155" strokeWidth="8" />
          <line x1="480" y1="180" x2="640" y2="80" stroke="#1e293b" strokeWidth="5" />
        </g>

        {/* Active Route Line Trajectory */}
        <g filter="url(#glow)">
          <path
            d="M 160 260 L 280 260 L 280 180 L 480 180 L 480 120 L 580 120"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated dashes along route */}
          <path
            d="M 160 260 L 280 260 L 280 180 L 480 180 L 480 120 L 580 120"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="10 15"
            strokeLinecap="round"
            className="animate-[dash_2s_linear_infinite]"
          />
        </g>

        {/* Store Pin (Marker at 280, 180) */}
        <g transform="translate(280, 180)">
          {/* Store Pin Glow Pulse */}
          <circle r="22" fill="#F59E0B" opacity="0.2" className="animate-ping" />
          <circle r="14" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <div className="flex items-center justify-center text-amber-400">
              <Store size={14} />
            </div>
          </foreignObject>
          {/* Store Name Badge Overlay */}
          <foreignObject x="-60" y="-45" width="120" height="26">
            <div className="bg-slate-900/95 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 text-center truncate shadow-md">
              {store.name}
            </div>
          </foreignObject>
        </g>

        {/* Customer Pin (Marker at 580, 120) */}
        {customer && (
          <g transform="translate(580, 120)">
            <circle r="22" fill="#3B82F6" opacity="0.2" className="animate-ping" />
            <circle r="14" fill="#1E293B" stroke="#3B82F6" strokeWidth="3" />
            <foreignObject x="-10" y="-10" width="20" height="20">
              <div className="flex items-center justify-center text-blue-400">
                <User size={14} />
              </div>
            </foreignObject>
            {/* Customer Badge Overlay */}
            <foreignObject x="-60" y="-45" width="120" height="26">
              <div className="bg-slate-900/95 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/40 text-center truncate shadow-md">
                {customer.name}
              </div>
            </foreignObject>
          </g>
        )}

        {/* Live Partner Scooter Marker (Marker at 160, 260) */}
        <g transform="translate(160, 260)">
          {/* Radar pulse rings */}
          <circle r="28" fill="#00E676" opacity="0.25" className="animate-ping" />
          <circle r="16" fill="#00C853" stroke="#ffffff" strokeWidth="3" shadow-lg="true" />
          <foreignObject x="-9" y="-9" width="18" height="18">
            <div className="flex items-center justify-center text-slate-950 font-black">
              <Navigation size={12} className="transform rotate-45" />
            </div>
          </foreignObject>
          {/* You Marker Badge */}
          <foreignObject x="-30" y="20" width="60" height="20">
            <div className="bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md text-center shadow">
              YOU
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* Top Floating Turn-by-Turn Navigation Bar */}
      <div className="absolute top-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 flex items-center justify-between shadow-xl z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Navigation size={18} className="transform rotate-45" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{currentNavInstruction}</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[220px] sm:max-w-md">
              Target: <span className="text-[#00E676] font-semibold">{destinationName}</span> ({destinationAddress})
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-black text-[#00E676]">2.4 km</div>
          <div className="text-[10px] text-slate-400">ETA 8 min</div>
        </div>
      </div>

      {/* Geofence Status Badge if active */}
      {gpsState === 'ARRIVED' && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1.5 animate-bounce z-10">
          <MapPin size={13} />
          <span>GEOFENCE MATCHED — ARRIVED AT LOCATION</span>
        </div>
      )}

      {/* Map Control Buttons (Bottom Right) */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-10">
        <button
          onClick={() => setIsCentered(!isCentered)}
          className={`p-2.5 rounded-xl border backdrop-blur-md shadow-lg transition-colors ${
            isCentered
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
              : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title="Recenter Map"
        >
          <Compass size={18} />
        </button>
        <button
          onClick={() => setMapStyle(mapStyle === 'dark' ? 'terrain' : 'dark')}
          className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-700 hover:text-white backdrop-blur-md shadow-lg"
          title="Toggle Map Layers"
        >
          <Layers size={18} />
        </button>
      </div>

      {/* GPS Accuracy Pill (Bottom Left) */}
      <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
        <span>GPS Accuracy: ±3 meters</span>
      </div>
    </div>
  );
};
