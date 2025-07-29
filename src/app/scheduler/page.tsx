'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SchedulerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Scheduler</h1>
        </div>

        {/* Coming Soon */}
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            공연 일정 관리
          </h2>
          <p className="text-gray-600 mb-6">
            밴드의 공식 일정을 관리하고 팬들에게 정확한 정보를 제공하는 기능이 곧 출시됩니다.
          </p>
          <div className="text-sm text-gray-500">
            • 공연 일정 등록 및 관리<br />
            • 팬미팅, TV 출연 등 다양한 활동 일정<br />
            • 캘린더 및 리스트 뷰 지원<br />
            • 예매 링크 연동
          </div>
        </Card>
      </main>
    </div>
  );
} 