import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function StudentProfile() {
  const { userId } = useParams();
  const { user } = useAuth();

  // Mock data - TODO: Replace with API call to GET /users/:userId
  const profileData = {
    id: userId,
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    major: 'Computer Science',
    year: 'Junior',
    avatar: null,
    rating: 4.9,
    points: 245,
    skills: [
      {
        id: 1,
        title: 'Python Programming & Debugging Help',
        description: 'Expert help with Python coding, debugging, and data structures.',
        price: '$15/hr',
        category: 'Programming',
        tags: ['Python', 'Debugging', 'Data Structures']
      },
      {
        id: 2,
        title: 'Web Development Tutoring',
        description: 'Learn HTML, CSS, and JavaScript fundamentals.',
        price: '$20/hr',
        category: 'Programming',
        tags: ['Web Development', 'HTML', 'CSS', 'JavaScript']
      }
    ],
    badges: ['Helper', 'Tutor', 'Tech Guru'],
    reviews: [
      {
        id: 1,
        reviewer: 'Mike Johnson',
        rating: 5,
        comment: 'Great tutor! Very patient and knowledgeable.',
        date: '2024-01-15'
      },
      {
        id: 2,
        reviewer: 'Emma Rodriguez',
        rating: 4,
        comment: 'Helped me understand complex concepts easily.',
        date: '2024-01-10'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-muted-foreground">{profileData.major} • {profileData.year}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">⭐ {profileData.rating}</Badge>
                  <Badge variant="outline">{profileData.points} points</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {profileData.badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {user?.id !== userId && (
                <Button>Message</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {skill.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="secondary">{skill.price}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {profileData.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{review.reviewer}</h3>
                      <p className="text-muted-foreground text-sm">{review.date}</p>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                    <Badge variant="secondary">⭐ {review.rating}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 