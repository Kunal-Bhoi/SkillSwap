import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Dashboard() {
  const { user, logout } = useAuth();

  // Mock data - TODO: Replace with API calls
  const stats = {
    activeListings: 3,
    activeRequests: 2,
    pendingOffers: 5,
    completedServices: 12
  };

  const recentActivity = [
    {
      id: 1,
      type: 'request',
      title: 'Help with Python debugging',
      user: 'Sarah Chen',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'offer',
      title: 'Essay editing service',
      user: 'Marcus Williams',
      time: '4 hours ago',
      status: 'accepted'
    },
    {
      id: 3,
      type: 'event',
      title: 'Campus Coding Workshop',
      user: 'Tech Club',
      time: 'Tomorrow 3 PM',
      status: 'upcoming'
    }
  ];

  const recommendedSkills = [
    { title: 'Math Tutoring - Calculus II', provider: 'Emma Rodriguez', price: '$15/hr', rating: 4.9 },
    { title: 'Resume Review & Feedback', provider: 'Alex Johnson', price: 'Free', rating: 4.8 },
    { title: 'Guitar Lessons for Beginners', provider: 'Jake Smith', price: '$20/hr', rating: 4.7 }
  ];

  const upcomingEvents = [
    { title: 'Study Group - Organic Chemistry', date: 'Today 7 PM', location: 'Library Room 204' },
    { title: 'Career Fair Prep Workshop', date: 'Tomorrow 2 PM', location: 'Student Center' },
    { title: 'Language Exchange Meetup', date: 'Friday 6 PM', location: 'Campus Café' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">
              Welcome to your SkillSwap dashboard. This is where you'll be able to manage your skills
              and connect with other users.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
