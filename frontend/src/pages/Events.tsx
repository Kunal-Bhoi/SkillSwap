import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export function Events() {
  // Mock data - TODO: Replace with API calls
  const [events] = useState([
    {
      id: 1,
      title: 'Campus Coding Workshop',
      description: 'Learn the basics of web development with React',
      date: '2024-01-20',
      time: '2:00 PM',
      location: 'Student Center - Room 201',
      organizer: 'Tech Club',
      attendees: 25,
      maxAttendees: 30,
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Study Group - Organic Chemistry',
      description: 'Group study session for upcoming midterm exam',
      date: '2024-01-18',
      time: '7:00 PM',
      location: 'Library - Room 204',
      organizer: 'Sarah Chen',
      attendees: 8,
      maxAttendees: 12,
      category: 'Study Group'
    },
    {
      id: 3,
      title: 'Language Exchange Meetup',
      description: 'Practice speaking different languages with international students',
      date: '2024-01-22',
      time: '6:00 PM',
      location: 'Campus Café',
      organizer: 'International Student Association',
      attendees: 15,
      maxAttendees: 20,
      category: 'Social'
    },
    {
      id: 4,
      title: 'Career Fair Prep Workshop',
      description: 'Resume review and interview tips for upcoming career fair',
      date: '2024-01-19',
      time: '3:00 PM',
      location: 'Career Services Office',
      organizer: 'Career Services',
      attendees: 12,
      maxAttendees: 15,
      category: 'Career'
    }
  ]);

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Workshop': 'bg-blue-100 text-blue-800',
      'Study Group': 'bg-green-100 text-green-800',
      'Social': 'bg-purple-100 text-purple-800',
      'Career': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Campus Events</h1>
              <p className="text-muted-foreground mt-2">
                Discover and join skill-sharing events on campus
              </p>
            </div>
            <Link to="/events/new">
              <Button className="w-full sm:w-auto">Create Event</Button>
            </Link>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'calendar')}>
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="list" className="flex-1 sm:flex-none">List View</TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1 sm:flex-none">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4 sm:gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <CardTitle className="text-lg sm:text-xl">{event.title}</CardTitle>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm sm:text-base">{event.description}</CardDescription>
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">📅 Date & Time:</span>
                        <p className="text-muted-foreground">
                          {formatDate(event.date)} at {event.time}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">📍 Location:</span>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                      <div>
                        <span className="font-medium">👥 Attendees:</span>
                        <p className="text-muted-foreground">
                          {event.attendees}/{event.maxAttendees} joined
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium">Organized by:</span>
                      <Link to={`/profile/${event.organizer}`} className="text-primary hover:underline ml-1">
                        {event.organizer}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold mb-2">Calendar View Coming Soon</h3>
                  <p className="text-sm sm:text-base">We're working on a calendar view for better event visualization.</p>
                  <p className="mt-2 text-sm sm:text-base">For now, please use the list view to browse events.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
