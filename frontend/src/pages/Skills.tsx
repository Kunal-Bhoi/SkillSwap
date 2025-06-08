import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export function Skills() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  // Mock data - TODO: Replace with API call to GET /listings
  const skillListings = [
    {
      id: 1,
      title: 'Python Programming & Debugging Help',
      description: 'Expert help with Python coding, debugging, and data structures. Perfect for CS students!',
      provider: {
        id: 1,
        name: 'Sarah Chen',
        avatar: null,
        rating: 4.9
      },
      price: '$15/hr',
      location: 'North Hall',
      category: 'Programming',
      tags: ['Python', 'Debugging', 'Data Structures'],
      datePosted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Essay Writing & Editing Services',
      description: 'Professional essay editing and writing guidance for all subjects. Improve your grades!',
      provider: {
        id: 2,
        name: 'Marcus Williams',
        avatar: null,
        rating: 4.8
      },
      price: 'Free',
      location: 'Library',
      category: 'Academic Writing',
      tags: ['Essay Writing', 'Editing', 'Grammar'],
      datePosted: '2024-01-14'
    },
    {
      id: 3,
      title: 'Calculus II Tutoring',
      description: 'Struggling with derivatives and integrals? I can help you master Calculus II concepts.',
      provider: {
        id: 3,
        name: 'Emma Rodriguez',
        avatar: null,
        rating: 4.7
      },
      price: '$20/hr',
      location: 'Study Center',
      category: 'Math Tutoring',
      tags: ['Calculus', 'Mathematics', 'Tutoring'],
      datePosted: '2024-01-13'
    },
    {
      id: 4,
      title: 'Resume Review & Career Advice',
      description: 'Get professional feedback on your resume and career guidance from a senior student.',
      provider: {
        id: 4,
        name: 'Alex Johnson',
        avatar: null,
        rating: 4.9
      },
      price: '$10',
      location: 'Career Center',
      category: 'Career Services',
      tags: ['Resume', 'Career', 'Interview Prep'],
      datePosted: '2024-01-12'
    },
    {
      id: 5,
      title: 'Spanish Conversation Practice',
      description: 'Native Spanish speaker offering conversation practice sessions for all levels.',
      provider: {
        id: 5,
        name: 'Diego Martinez',
        avatar: null,
        rating: 4.6
      },
      price: 'Free',
      location: 'Language Lab',
      category: 'Language',
      tags: ['Spanish', 'Conversation', 'Language Exchange'],
      datePosted: '2024-01-11'
    },
    {
      id: 6,
      title: 'Guitar Lessons for Beginners',
      description: 'Learn to play guitar with personalized lessons. Bring your own guitar or borrow mine!',
      provider: {
        id: 6,
        name: 'Jake Smith',
        avatar: null,
        rating: 4.8
      },
      price: '$25/hr',
      location: 'Music Building',
      category: 'Music',
      tags: ['Guitar', 'Music', 'Beginner'],
      datePosted: '2024-01-10'
    }
  ];

  const categories = [
    'Programming',
    'Academic Writing',
    'Math Tutoring',
    'Career Services',
    'Language',
    'Music',
    'Science',
    'Art & Design'
  ];

  const locations = [
    'North Hall',
    'South Hall',
    'Library',
    'Study Center',
    'Career Center',
    'Language Lab',
    'Music Building',
    'Science Building'
  ];

  const filteredListings = skillListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || listing.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'oldest':
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      case 'price-low':
        const aPrice = a.price === 'Free' ? 0 : parseFloat(a.price.replace(/[$\/hr]/g, ''));
        const bPrice = b.price === 'Free' ? 0 : parseFloat(b.price.replace(/[$\/hr]/g, ''));
        return aPrice - bPrice;
      case 'price-high':
        const aPriceHigh = a.price === 'Free' ? 0 : parseFloat(a.price.replace(/[$\/hr]/g, ''));
        const bPriceHigh = b.price === 'Free' ? 0 : parseFloat(b.price.replace(/[$\/hr]/g, ''));
        return bPriceHigh - aPriceHigh;
      case 'rating':
        return b.provider.rating - a.provider.rating;
      default:
        return 0;
    }
  });

  const handleRequestService = async (skillId: number) => {
    try {
      // TODO: API call to POST /requests
      console.log('Requesting service:', skillId);
      
      toast({
        title: "Service Requested",
        description: "Your request has been sent to the provider.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChat = (providerId: number) => {
    navigate('/messages', { state: { recipientId: providerId } });
  };

  const SkillCard = ({ listing }: { listing: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Dialog>
              <DialogTrigger asChild>
                <CardTitle className="text-lg hover:text-primary cursor-pointer">
                  {listing.title}
                </CardTitle>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{listing.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center mt-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={listing.provider.avatar} />
                        <AvatarFallback>
                          {listing.provider.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link 
                          to={`/profile/${listing.provider.id}`} 
                          className="text-sm font-medium hover:text-primary"
                        >
                          {listing.provider.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          ⭐ {listing.provider.rating} rating
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {listing.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>📍 {listing.location}</span>
                    <Badge variant={listing.price === 'Free' ? 'secondary' : 'default'}>
                      {listing.price}
                    </Badge>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => handleChat(listing.provider.id)}
                  >
                    Chat with {listing.provider.name}
                  </Button>
                  <Button onClick={() => handleRequestService(listing.id)}>
                    Request This Service
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={listing.provider.avatar} />
                <AvatarFallback>
                  {listing.provider.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link 
                  to={`/profile/${listing.provider.id}`} 
                  className="text-sm font-medium hover:text-primary"
                >
                  {listing.provider.name}
                </Link>
                <div className="text-xs text-muted-foreground">
                  ⭐ {listing.provider.rating} rating
                </div>
              </div>
            </div>
          </div>
          <Badge variant={listing.price === 'Free' ? 'secondary' : 'default'}>
            {listing.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-3">
          {listing.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>📍 {listing.location}</span>
          <span>{new Date(listing.datePosted).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Browse Skills</h1>
            <p className="text-muted-foreground mt-2">
              Discover amazing skills offered by your fellow students
            </p>
          </div>
          <Link to="/skills/new">
            <Button>Post a Skill</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedListings.length} of {skillListings.length} skills
          </p>
        </div>

        {/* Listings */}
        {viewMode === 'map' ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <span className="text-4xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
              <p className="text-muted-foreground">
                Interactive campus map with skill listings will be available soon.
                {/* TODO: Implement react-leaflet map integration */}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {sortedListings.map((listing) => (
              <SkillCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {sortedListings.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">No skills found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all skills.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
