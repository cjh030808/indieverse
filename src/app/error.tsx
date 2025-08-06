'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
          <span className="text-red-400 text-2xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          앗! 문제가 발생했어요
        </h2>
        
        <p className="text-gray-300 mb-6">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해보세요.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            다시 시도
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            홈으로 돌아가기
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-gray-400 text-sm cursor-pointer hover:text-white">
              개발자 정보
            </summary>
            <pre className="mt-2 text-xs bg-black/30 p-3 rounded overflow-auto text-gray-300">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}