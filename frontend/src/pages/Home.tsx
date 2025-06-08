import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Home() {
  const { user } = useAuth();
  if (user) return null;

  const features = [
    { step: '1', title: 'Sign Up', description: 'Create your account with your campus email and get verified instantly.', icon: '📝' },
    { step: '2', title: 'List or Find Skills', description: 'Post services you can offer or browse skills you need help with.', icon: '🔍' },
    { step: '3', title: 'Connect & Collaborate', description: 'Match with fellow students and collaborate on campus.', icon: '🤝' },
    { step: '4', title: 'Earn Rewards', description: 'Build your reputation and earn campus points for helping others.', icon: '🏆' }
  ];

  const skillCategories = [
    { name: 'Academic Tutoring', count: '120+ listings', color: 'bg-blue-100 text-blue-800' },
    { name: 'Tech Help', count: '85+ listings', color: 'bg-purple-100 text-purple-800' },
    { name: 'Creative Services', count: '60+ listings', color: 'bg-green-100 text-green-800' },
    { name: 'Language Exchange', count: '45+ listings', color: 'bg-orange-100 text-orange-800' },
    { name: 'Fitness & Sports', count: '30+ listings', color: 'bg-red-100 text-red-800' },
    { name: 'Life Skills', count: '75+ listings', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const testimonials = [
    { name: 'Sarah Chen', major: 'Computer Science', text: 'Found amazing tutoring help for my calculus class. The platform made it so easy to connect with other students!', avatar: 'SC' },
    { name: 'Marcus Williams', major: 'Business', text: "I've been able to earn campus points while helping others with their presentations. Win-win!", avatar: 'MW' },
    { name: 'Emma Rodriguez', major: 'Psychology', text: 'The skill-sharing events are fantastic for meeting like-minded students and learning new things.', avatar: 'ER' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Share Your Skills, <span className="text-primary">Connect Your Campus</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join your university's skill-sharing community. Offer your expertise, learn new skills, and build meaningful connections with fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-6">Get Started Free</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">Sign In</Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">✓ Free to join ✓ Campus verified ✓ Secure platform</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Get started in minutes and join a thriving campus community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  {feature.step}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Skill Categories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover the most in-demand skills on campus</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{cat.name}</CardTitle>
                <Badge className={cat.color}>{cat.count}</Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/skills">
            <Button size="lg" variant="outline">Browse All Skills</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Real experiences from your campus community</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.major}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{t.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Your Campus Community?</h2>
          <p className="text-xl text-white/90 mb-8">Start sharing skills and making connections today</p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Sign Up Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
