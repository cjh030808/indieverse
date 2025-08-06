import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
          <span className="text-purple-400 text-4xl">🎵</span>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          페이지를 찾을 수 없어요
        </h2>
        
        <p className="text-gray-300 mb-8">
          찾고 계신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          Indieverse의 다른 음악을 탐험해보세요!
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            홈으로 돌아가기
          </Link>
          
          <Link
            href="/dashboard"
            className="inline-block w-full px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            대시보드로 이동
          </Link>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4 text-sm">
          <Link href="/passport" className="text-purple-300 hover:text-white transition-colors">
            Indie Passport
          </Link>
          <span className="text-gray-500">•</span>
          <Link href="/playground" className="text-purple-300 hover:text-white transition-colors">
            Playground
          </Link>
          <span className="text-gray-500">•</span>
          <Link href="/scheduler" className="text-purple-300 hover:text-white transition-colors">
            Scheduler
          </Link>
        </div>
      </div>
    </div>
  );
}