export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        {/* Animated Music Note */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto">
            {/* Rotating vinyl record */}
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin flex items-center justify-center">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Floating notes */}
            <div className="absolute -top-2 -right-2 text-purple-300 animate-bounce">
              <span className="text-2xl">♪</span>
            </div>
            <div className="absolute -bottom-2 -left-2 text-pink-300 animate-bounce delay-300">
              <span className="text-xl">♫</span>
            </div>
            <div className="absolute top-1/2 -left-4 text-purple-400 animate-bounce delay-150">
              <span className="text-lg">♩</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Indieverse 로딩 중...
        </h2>
        
        <p className="text-purple-200 mb-8">
          음악의 세계를 준비하고 있어요
        </p>
        
        {/* Loading bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          잠시만 기다려주세요...
        </div>
      </div>
    </div>
  );
}