'use client';

import { Card } from '@/components/ui/card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { cn } from '@/lib/utils';

export default function SchedulerPage() {
  const handleDateSelect = (selectInfo: any) => {
    console.log('Date selected:', selectInfo);
  };

  const handleEventClick = (clickInfo: any) => {
    console.log('Event clicked:', clickInfo.event);
  };

  const sampleEvents = [
    {
      id: '1',
      title: '밴드 연습',
      date: '2025-08-15',
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6'
    },
    {
      id: '2', 
      title: '공연 준비',
      date: '2025-08-20',
      backgroundColor: '#10B981',
      borderColor: '#10B981'
    },
    {
      id: '3',
      title: '라이브 공연',
      date: '2025-08-25',
      backgroundColor: '#F59E0B',
      borderColor: '#F59E0B'
    }
  ];

  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scheduler</h1>
        <p className="text-gray-600 mt-2">밴드 일정을 관리하고 팬들과 공유하세요</p>
      </div>

      {/* Calendar */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            공연 일정 관리
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            클릭하여 새로운 일정을 추가하거나 기존 일정을 수정할 수 있습니다.
          </p>
        </div>
        
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={sampleEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            locale="ko"
            height="auto"
            eventDisplay="block"
            dayHeaderFormat={{ weekday: 'short' }}
            titleFormat={{ year: 'numeric', month: 'long' }}
          />
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            <p className="font-medium mb-2">기능:</p>
            <ul className="space-y-1">
              <li>• 공연 일정 등록 및 관리</li>
              <li>• 팬미팅, TV 출연 등 다양한 활동 일정</li>
              <li>• 캘린더 및 리스트 뷰 지원</li>
              <li>• 예매 링크 연동</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}