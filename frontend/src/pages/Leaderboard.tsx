
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Leaderboard = () => {
  // Mock data - TODO: Replace with API calls
  const [monthlyLeaders] = useState([
    {
      rank: 1,
      name: 'Sarah Chen',
      points: 245,
      avatar: 'SC',
      servicesCompleted: 12,
      badges: ['Helper', 'Tutor', 'Tech Guru']
    },
    {
      rank: 2,
      name: 'Marcus Williams',
      points: 190,
      avatar: 'MW',
      servicesCompleted: 8,
      badges: ['Writer', 'Helper']
    },
    {
      rank: 3,
      name: 'Emma Rodriguez',
      points: 175,
      avatar: 'ER',
      servicesCompleted: 9,
      badges: ['Study Buddy', 'Language Partner']
    },
    {
      rank: 4,
      name: 'Alex Johnson',
      points: 155,
      avatar: 'AJ',
      servicesCompleted: 7,
      badges: ['Career Coach']
    },
    {
      rank: 5,
      name: 'Jamie Park',
      points: 140,
      avatar: 'JP',
      servicesCompleted: 6,
      badges: ['Creative', 'Helper']
    }
  ]);

  const [allTimeLeaders] = useState([
    {
      rank: 1,
      name: 'Dr. Student (Alumni)',
      points: 890,
      avatar: 'DS',
      servicesCompleted: 45,
      badges: ['Legend', 'Mentor', 'Campus Hero']
    },
    {
      rank: 2,
      name: 'Sarah Chen',
      points: 650,
      avatar: 'SC',
      servicesCompleted: 32,
      badges: ['Helper', 'Tutor', 'Tech Guru', 'Reliable']
    },
    {
      rank: 3,
      name: 'Marcus Williams',
      points: 520,
      avatar: 'MW',
      servicesCompleted: 28,
      badges: ['Writer', 'Helper', 'Mentor']
    }
  ]);

  const availableBadges = [
    {
      name: 'Helper',
      icon: '🤝',
      description: 'Complete 5 services',
      requirement: '5 services completed'
    },
    {
      name: 'Mentor',
      icon: '🎓',
      description: 'Complete 20 services',
      requirement: '20 services completed'
    },
    {
      name: 'Campus Hero',
      icon: '🦸',
      description: 'Complete 50 services',
      requirement: '50 services completed'
    },
    {
      name: 'Tech Guru',
      icon: '💻',
      description: 'Complete 10 tech-related services',
      requirement: '10 tech services'
    },
    {
      name: 'Tutor',
      icon: '📚',
      description: 'Complete 10 tutoring sessions',
      requirement: '10 tutoring sessions'
    },
    {
      name: 'Writer',
      icon: '✍️',
      description: 'Complete 10 writing/editing services',
      requirement: '10 writing services'
    },
    {
      name: 'Study Buddy',
      icon: '📖',
      description: 'Join 5 study groups',
      requirement: '5 study groups'
    },
    {
      name: 'Language Partner',
      icon: '🌐',
      description: 'Complete 5 language exchange sessions',
      requirement: '5 language exchanges'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const LeaderboardTable = ({ leaders }: { leaders: typeof monthlyLeaders }) => (
    <div className="space-y-4">
      {leaders.map((leader) => (
        <Card key={leader.rank} className={`${leader.rank <= 3 ? 'border-primary/50 bg-primary/5' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold w-12 text-center">
                  {getRankIcon(leader.rank)}
                </div>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>{leader.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {leader.servicesCompleted} services completed
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {leader.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{leader.points}</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Campus Points & Leaderboard</h1>
          <p className="text-muted-foreground mt-2">
            See how you rank among the most helpful students on campus
          </p>
        </div>

        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Leaderboard</CardTitle>
                <CardDescription>
                  Top performers this month based on campus points earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable leaders={monthlyLeaders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allTime">
            <Card>
              <CardHeader>
                <CardTitle>All-Time Leaderboard</CardTitle>
                <CardDescription>
                  Hall of fame - students with the most campus points ever
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable leaders={allTimeLeaders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Available Badges</CardTitle>
                <CardDescription>
                  Earn these badges by completing services and helping your campus community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableBadges.map((badge) => (
                    <Card key={badge.name} className="p-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {badge.requirement}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
