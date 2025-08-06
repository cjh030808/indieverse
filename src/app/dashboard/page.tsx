"use client";

import { Header } from "@/components/layout/Header";
import { StoryHeader } from "@/features/stories/components/StoryHeader";
import { MusicStaffFeed } from "@/features/stories/components/MusicStaffFeed";
import { useBandMembers } from "@/features/stories/hooks/useStories";
import { cn } from "@/lib/utils";
import {
  Music,
  Disc3,
  Star,
  Guitar,
  Piano,
  Drum,
  Mic,
  Radio as Bass,
} from "lucide-react";

export default function DashboardPage() {
  const { data: members, isLoading: membersLoading } = useBandMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Band Members Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Meet the Band
                </h1>
                <p className="text-purple-200">
                  함께 음악을 만드는 아티스트들을 만나보세요
                </p>
              </div>
            </div>

            {/* Band Members - Compact Layout */}
            {membersLoading ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 min-w-[80px] animate-pulse"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-xl"></div>
                    <div className="w-12 h-3 bg-gray-600 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-700 rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-4 ${(members || []).length > 8 ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'} ${(members || []).length > 8 ? 'grid-rows-2' : 'grid-rows-1'}`}>
                {(members || []).map((member) => {
                  const getInstrumentIcon = (role: string) => {
                    switch (role.toLowerCase()) {
                      case "vocal":
                        return <Mic className="w-3 h-3" />;
                      case "guitar":
                        return <Guitar className="w-3 h-3" />;
                      case "bass":
                        return <Bass className="w-3 h-3" />;
                      case "drums":
                        return <Drum className="w-3 h-3" />;
                      case "keyboard":
                        return <Piano className="w-3 h-3" />;
                      default:
                        return <Music className="w-3 h-3" />;
                    }
                  };

                  const getInstrumentColor = (role: string) => {
                    switch (role.toLowerCase()) {
                      case "vocal":
                        return "text-pink-400";
                      case "guitar":
                        return "text-orange-400";
                      case "bass":
                        return "text-blue-400";
                      case "drums":
                        return "text-red-400";
                      case "keyboard":
                        return "text-purple-400";
                      default:
                        return "text-gray-400";
                    }
                  };

                  return (
                    <div
                      key={member.id}
                      className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="bg-white/10 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30">
                        <div className="flex flex-col items-center gap-2">
                          {/* Member Photo - Compact */}
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                              <div className="w-full h-full rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden">
                                {member.image ? (
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-xl"
                                  />
                                ) : (
                                  <span className="text-lg font-bold text-white">
                                    {member.name[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Compact Instrument Icon */}
                            <div
                              className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-800 flex items-center justify-center ${getInstrumentColor(
                                member.role
                              )}`}
                            >
                              {getInstrumentIcon(member.role)}
                            </div>
                          </div>

                          {/* Compact Member Info */}
                          <div className="text-center">
                            <h3 className="text-white font-medium text-xs group-hover:text-purple-300 transition-colors leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-gray-400 text-[10px] mt-0.5 font-medium">
                              {member.role}
                            </p>
                          </div>

                          {/* Compact Status indicator */}
                          <div className="flex items-center gap-1 opacity-80">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[9px] text-green-400 font-medium">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Floating Music Animation */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="animate-bounce">
              <Music className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stories Feed with Dark Theme */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Disc3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">최신 소식</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
        </div>

        <div className="space-y-6">
          <MusicStaffFeed />
        </div>
      </main>
    </div>
  );
}
