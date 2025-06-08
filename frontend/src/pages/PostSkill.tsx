
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface SkillForm {
  title: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  price: number;
  isFree: boolean;
  availability: string;
}

const PostSkill = () => {
  const navigate = useNavigate();
  const [isFree, setIsFree] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SkillForm>();

  const onSubmit = async (data: SkillForm) => {
    try {
      // TODO: API call to POST /listings
      console.log('Creating skill listing:', data);
      
      // Mock success - redirect to skills page
      navigate('/skills');
    } catch (err) {
      console.error('Failed to create skill listing:', err);
    }
  };

  const skillCategories = [
    'Academic Tutoring',
    'Tech Help',
    'Creative Services',
    'Language Exchange',
    'Fitness & Sports',
    'Life Skills',
    'Other'
  ];

  const campusLocations = [
    'Library - Floor 1',
    'Library - Floor 2',
    'Student Center',
    'Dorm A Common Room',
    'Dorm B Common Room',
    'Campus Café',
    'Online/Virtual',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Post a Skill</h1>
          <p className="text-muted-foreground mt-2">
            Share your expertise with the campus community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Skill Listing</CardTitle>
            <CardDescription>
              Fill out the details below to post your skill offering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Skill Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Python Tutoring, Essay Editing, Guitar Lessons"
                  {...register('title', {
                    required: 'Title is required'
                  })}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your skill, experience, and what you can help with..."
                  rows={4}
                  {...register('description', {
                    required: 'Description is required'
                  })}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Campus Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {campusLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 1 hour, 30 minutes, Flexible"
                  {...register('duration')}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFree"
                    checked={isFree}
                    onCheckedChange={(checked) => setIsFree(checked as boolean)}
                  />
                  <Label htmlFor="isFree">This is a free service</Label>
                </div>

                {!isFree && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register('price', {
                          valueAsNumber: true
                        })}
                      />
                      <span className="text-muted-foreground">per session</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Textarea
                  id="availability"
                  placeholder="When are you generally available? e.g., Weekends, Evenings after 6 PM..."
                  rows={2}
                  {...register('availability')}
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Creating...' : 'Post Skill'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/skills')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostSkill;
