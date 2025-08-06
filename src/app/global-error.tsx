'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-red-400 text-3xl">🚫</span>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              시스템 오류
            </h1>
            
            <p className="text-gray-300 mb-8">
              심각한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                다시 시도
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                홈으로 돌아가기
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 text-gray-400 font-medium rounded-lg hover:text-white transition-colors duration-300"
              >
                페이지 새로고침
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="text-gray-400 text-sm cursor-pointer hover:text-white mb-3">
                  오류 상세 정보 (개발 모드)
                </summary>
                <div className="bg-black/40 p-4 rounded-lg">
                  <p className="text-red-300 text-sm mb-2">
                    <strong>Error:</strong> {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-orange-300 text-sm mb-2">
                      <strong>Digest:</strong> {error.digest}
                    </p>
                  )}
                  {error.stack && (
                    <pre className="text-xs text-gray-400 overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}