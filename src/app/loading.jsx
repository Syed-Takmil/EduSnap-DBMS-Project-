



export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        
        {/* Decorative background pulse glow */}
        <div className="absolute w-40 h-40 bg-sky-200/50 rounded-full blur-2xl animate-pulse" />
        
        {/* Curvy/Wavy External Accents Around the Circumference */}
        {/* Top-Right Curve */}
        <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-sky-300 opacity-60 animate-spin" style={{ animationDuration: '12s' }} />
        
        {/* Bottom-Left Wave Asset */}
        <div className="absolute w-44 h-44 rounded-full border border-indigo-200/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

        {/* The Main Big Hollow Blue/Indigo Spinner Circle */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-indigo-600 border-r-indigo-600 animate-spin" />

        {/* Center core point */}
        <div className="absolute w-3 h-3 bg-sky-400 rounded-full animate-ping" />
      </div>

      {/* Loading Text */}
        <p className="mt-8 text-center text-xs text-indigo-500 font-medium tracking-widest uppercase animate-pulse">
          Loading ...
        </p>
    </div>
  );
}