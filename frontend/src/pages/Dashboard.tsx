import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure correct path
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = {
    activeListings: 3,
    activeRequests: 2,
    pendingOffers: 5,
    completedServices: 12
  };

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
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <Button onClick={logout}>Sign out</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName || user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening on your campus today
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { to: '/skills', icon: '🔍', title: 'Browse Skills', subtitle: 'Find help you need' },
            { to: '/skills/new', icon: '➕', title: 'Post a Skill', subtitle: 'Share your expertise' },
            { to: '/requests/new', icon: '📝', title: 'Post a Request', subtitle: 'Ask for help' },
            { to: '/messages', icon: '💬', title: 'Messages', subtitle: 'Chat with students' }
          ].map(({ to, icon, title, subtitle }, i) => (
            <Link to={to} key={i}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex items-center p-6">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4 text-2xl">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Listings', value: stats.activeListings, link: '/my-services' },
            { label: 'Active Requests', value: stats.activeRequests, link: '/my-services' },
            { label: 'Pending Offers', value: stats.pendingOffers, link: '/my-services' },
            { label: 'Campus Points', value: user?.points || 0, link: '/leaderboard' }
          ].map((item, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-3xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link to={item.link} className="text-sm text-primary hover:underline">
                  {item.label.includes('Points') ? 'View leaderboard →' : 'View all →'}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Skills & Events */}
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
      </main>
    </div>
  );
};

export default Dashboard;
