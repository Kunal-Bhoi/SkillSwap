
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount] = useState(3); // Mock unread messages

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const NavLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/skills" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Browse Skills
            </Button>
          </Link>
          
          <Link to="/my-services" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              My Requests/Offers
            </Button>
          </Link>
          
          <Link to="/skills/new" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Post a Skill
            </Button>
          </Link>
          
          <Link to="/events" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Events
            </Button>
          </Link>
          
          <Link to="/messages" className="relative" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Messages
              {messageCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {messageCount}
                </Badge>
              )}
            </Button>
          </Link>

          {mobile && (
            <>
              <Link to={`/profile/${user?.id}`} onClick={onLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  View Profile
                </Button>
              </Link>
              <Link to="/leaderboard" onClick={onLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  My Points
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Link to="/skills" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Browse Skills
            </Button>
          </Link>
          <Link to="/login" onClick={onLinkClick}>
            <Button variant="ghost" className={mobile ? "w-full justify-start" : ""}>
              Login
            </Button>
          </Link>
          <Link to="/signup" onClick={onLinkClick}>
            <Button className={mobile ? "w-full" : ""}>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CS</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-primary">CampusConnect</span>
                <span className="text-sm text-muted-foreground ml-1">SkillSwap</span>
              </div>
              <div className="sm:hidden">
                <span className="font-bold text-lg text-primary">CS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <NavLinks />

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-muted-foreground">{user?.points} points</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user?.id}`}>View Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/leaderboard">My Points</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {isAuthenticated && (
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>
                          {user?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{user?.name}</div>
                        <div className="text-muted-foreground text-xs">{user?.points} points</div>
                      </div>
                    </div>
                  )}
                  
                  <NavLinks mobile onLinkClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
