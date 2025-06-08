
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user } = useAuth();

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening on your campus today
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/skills">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold">Browse Skills</h3>
                  <p className="text-sm text-muted-foreground">Find help you need</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/skills/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">➕</span>
                </div>
                <div>
                  <h3 className="font-semibold">Post a Skill</h3>
                  <p className="text-sm text-muted-foreground">Share your expertise</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/requests/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold">Post a Request</h3>
                  <p className="text-sm text-muted-foreground">Ask for help</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold">Messages</h3>
                  <p className="text-sm text-muted-foreground">Chat with students</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Listings</CardDescription>
              <CardTitle className="text-3xl">{stats.activeListings}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/my-services" className="text-sm text-primary hover:underline">
                View all listings →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Requests</CardDescription>
              <CardTitle className="text-3xl">{stats.activeRequests}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/my-services" className="text-sm text-primary hover:underline">
                View all requests →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Offers</CardDescription>
              <CardTitle className="text-3xl">{stats.pendingOffers}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/my-services" className="text-sm text-primary hover:underline">
                Review offers →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Campus Points</CardDescription>
              <CardTitle className="text-3xl">{user?.points || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/leaderboard" className="text-sm text-primary hover:underline">
                View leaderboard →
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommended Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Skills that match your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{skill.title}</h4>
                      <p className="text-sm text-muted-foreground">by {skill.provider}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm">⭐ {skill.rating}</span>
                        <Badge variant="secondary" className="ml-2">
                          {skill.price}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/skills">
                  <Button variant="outline" className="w-full">
                    Browse All Skills
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Campus Events</CardTitle>
              <CardDescription>Don't miss these skill-sharing opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/events">
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
