import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('requests');

  // Mock data - TODO: Replace with API calls
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: 'Python Programming Help',
      provider: {
        id: 1,
        name: 'Sarah Chen',
        avatar: null
      },
      status: 'pending',
      date: '2024-01-15',
      price: '$15/hr'
    },
    {
      id: 2,
      title: 'Calculus II Tutoring',
      provider: {
        id: 2,
        name: 'Marcus Williams',
        avatar: null
      },
      status: 'accepted',
      date: '2024-01-14',
      price: '$20/hr'
    }
  ]);

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'Essay Writing & Editing',
      requester: {
        id: 3,
        name: 'Emma Rodriguez',
        avatar: null
      },
      status: 'pending',
      date: '2024-01-13',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Resume Review',
      requester: {
        id: 4,
        name: 'Alex Johnson',
        avatar: null
      },
      status: 'accepted',
      date: '2024-01-12',
      price: '$10'
    }
  ]);

  const [ongoingServices, setOngoingServices] = useState([
    {
      id: 1,
      title: 'Calculus II Tutoring',
      partner: {
        id: 2,
        name: 'Marcus Williams',
        avatar: null
      },
      type: 'request',
      startDate: '2024-01-14',
      nextSession: '2024-01-20',
      price: '$20/hr'
    },
    {
      id: 2,
      title: 'Resume Review',
      partner: {
        id: 4,
        name: 'Alex Johnson',
        avatar: null
      },
      type: 'offer',
      startDate: '2024-01-12',
      nextSession: '2024-01-19',
      price: '$10'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'accepted':
        return <Badge variant="default">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      // TODO: API call to DELETE /requests/:id
      setRequests(requests.filter(request => request.id !== requestId));
      
      toast({
        title: "Request Deleted",
        description: "Your request has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAcceptOffer = async (offerId: number) => {
    try {
      // TODO: API call to PUT /offers/:id/accept
      setOffers(offers.map(offer => 
        offer.id === offerId 
          ? { ...offer, status: 'accepted' }
          : offer
      ));
      
      toast({
        title: "Offer Accepted",
        description: "You have accepted the service offer.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectOffer = async (offerId: number) => {
    try {
      // TODO: API call to PUT /offers/:id/reject
      setOffers(offers.map(offer => 
        offer.id === offerId 
          ? { ...offer, status: 'rejected' }
          : offer
      ));
      
      toast({
        title: "Offer Rejected",
        description: "You have rejected the service offer.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteService = async (serviceId: number) => {
    try {
      // TODO: API call to PUT /services/:id/complete
      setOngoingServices(ongoingServices.filter(service => service.id !== serviceId));
      
      toast({
        title: "Service Completed",
        description: "The service has been marked as completed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete service. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service requests, offers, and ongoing services
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="offers">Service Offers</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing Services</TabsTrigger>
          </TabsList>

          {/* My Requests */}
          <TabsContent value="requests" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <span className="text-4xl">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Requests Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse skills and request services from other students.
                  </p>
                  <Link to="/skills">
                    <Button>Browse Skills</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{request.title}</CardTitle>
                        <div className="flex items-center mt-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={request.provider.avatar} />
                            <AvatarFallback>
                              {request.provider.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link 
                              to={`/profile/${request.provider.id}`}
                              className="text-sm font-medium hover:text-primary"
                            >
                              {request.provider.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              {new Date(request.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <Badge variant={request.price === 'Free' ? 'secondary' : 'default'}>
                          {request.price}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      {request.status === 'pending' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Delete Request
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this request? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteRequest(request.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      <Link to={`/messages?recipient=${request.provider.id}`}>
                        <Button variant="outline" size="sm">
                          Message Provider
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Service Offers */}
          <TabsContent value="offers" className="space-y-4">
            {offers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Offers Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't received any service offers yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              offers.map((offer) => (
                <Card key={offer.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{offer.title}</CardTitle>
                        <div className="flex items-center mt-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={offer.requester.avatar} />
                            <AvatarFallback>
                              {offer.requester.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link 
                              to={`/profile/${offer.requester.id}`}
                              className="text-sm font-medium hover:text-primary"
                            >
                              {offer.requester.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              {new Date(offer.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(offer.status)}
                        <Badge variant={offer.price === 'Free' ? 'secondary' : 'default'}>
                          {offer.price}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end gap-2">
                      {offer.status === 'pending' && (
                        <>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectOffer(offer.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptOffer(offer.id)}
                          >
                            Accept
                          </Button>
                        </>
                      )}
                      <Link to={`/messages?recipient=${offer.requester.id}`}>
                        <Button variant="outline" size="sm">
                          Message Requester
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Ongoing Services */}
          <TabsContent value="ongoing" className="space-y-4">
            {ongoingServices.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <span className="text-4xl">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Ongoing Services</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any ongoing services at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              ongoingServices.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{service.title}</CardTitle>
                        <div className="flex items-center mt-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={service.partner.avatar} />
                            <AvatarFallback>
                              {service.partner.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link 
                              to={`/profile/${service.partner.id}`}
                              className="text-sm font-medium hover:text-primary"
                            >
                              {service.partner.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              Started {new Date(service.startDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {service.type === 'request' ? 'Requested' : 'Offered'}
                        </Badge>
                        <Badge variant={service.price === 'Free' ? 'secondary' : 'default'}>
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Next session: {new Date(service.nextSession).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/messages?recipient=${service.partner.id}`}>
                          <Button variant="outline" size="sm">
                            Message Partner
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => handleCompleteService(service.id)}
                        >
                          Mark as Completed
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyServices;
