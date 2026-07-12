



export default function CustomLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        
        {/* Decorative background pulse glow */}
        <div className="absolute w-40 h-40 bg-sky-200/50 rounded-full blur-2xl animate-pulse" />
        
        

        {/* The Main Big Hollow Blue/Indigo Spinner Circle */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-indigo-600 border-r-indigo-600 animate-spin" />

      </div>
    </div>
  );
}