
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const MyServices = () => {
  // Mock data - TODO: Replace with API calls
  const [myRequests] = useState([
    {
      id: 1,
      title: 'Help with Python debugging',
      status: 'pending',
      datePosted: '2024-01-15',
      offersReceived: 3
    },
    {
      id: 2,
      title: 'Need essay proofreading',
      status: 'accepted',
      datePosted: '2024-01-10',
      offersReceived: 1
    }
  ]);

  const [myOffers] = useState([
    {
      id: 1,
      skillTitle: 'Math Tutoring - Calculus',
      requesterName: 'Sarah Chen',
      proposedTime: 'Tomorrow 3 PM',
      status: 'pending'
    },
    {
      id: 2,
      skillTitle: 'Resume Review Service',
      requesterName: 'Mike Johnson',
      proposedTime: 'Friday 2 PM',
      status: 'accepted'
    }
  ]);

  const [servicesFulfilling] = useState([
    {
      id: 1,
      requestTitle: 'Guitar lesson for beginner',
      requestorName: 'Emma Rodriguez',
      myOffer: 'Available weekends, $20/hr',
      status: 'in_progress'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      pending: 'outline',
      accepted: 'default',
      in_progress: 'secondary',
      done: 'default',
      cancelled: 'destructive'
    };
    
    return <Badge variant={variants[status] || 'outline'}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Services</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Manage your requests, offers, and ongoing services
          </p>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="requests" className="text-xs sm:text-sm">My Requests</TabsTrigger>
            <TabsTrigger value="offers" className="text-xs sm:text-sm">My Offers</TabsTrigger>
            <TabsTrigger value="fulfilling" className="text-xs sm:text-sm">Fulfilling</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">Services I Need</h2>
              <Link to="/requests/new">
                <Button className="w-full sm:w-auto">Post a New Request</Button>
              </Link>
            </div>
            
            <div className="grid gap-4">
              {myRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg">{request.title}</h3>
                        <p className="text-muted-foreground text-sm">Posted on {request.datePosted}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.offersReceived} offers received
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {getStatusBadge(request.status)}
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Requests on My Skills</h2>
            
            <div className="grid gap-4">
              {myOffers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg">{offer.skillTitle}</h3>
                        <p className="text-muted-foreground text-sm">
                          Requested by <Link to={`/profile/${offer.requesterName}`} className="text-primary hover:underline">{offer.requesterName}</Link>
                        </p>
                        <p className="text-sm text-muted-foreground">Proposed: {offer.proposedTime}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {getStatusBadge(offer.status)}
                        {offer.status === 'pending' && (
                          <>
                            <Button size="sm" className="w-full sm:w-auto">Accept</Button>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">Decline</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fulfilling" className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Services I'm Providing</h2>
            
            <div className="grid gap-4">
              {servicesFulfilling.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg">{service.requestTitle}</h3>
                        <p className="text-muted-foreground text-sm">
                          For <Link to={`/profile/${service.requestorName}`} className="text-primary hover:underline">{service.requestorName}</Link>
                        </p>
                        <p className="text-sm text-muted-foreground">My offer: {service.myOffer}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {getStatusBadge(service.status)}
                        {service.status === 'in_progress' && (
                          <Button size="sm" className="w-full sm:w-auto">Mark as Done</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyServices;
