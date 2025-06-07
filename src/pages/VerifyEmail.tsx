
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const VerifyEmail = () => {
  const { user } = useAuth();

  const handleResendVerification = () => {
    // TODO: API call to POST /auth/resend-verification
    console.log('Resending verification email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to your campus email
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please check your email at{' '}
              <span className="font-medium text-foreground">
                {user?.email || 'your-email@university.edu'}
              </span>{' '}
              for a verification link to activate your account.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Don't see the email? Check your spam folder or try resending it.
            </p>

            <div className="space-y-3">
              <Button onClick={handleResendVerification} className="w-full">
                Resend Verification Email
              </Button>
              
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <a href="mailto:support@campusconnect.edu" className="text-primary hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
