import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Bell, Settings } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  const getProcessAreaColor = (area: string) => {
    switch (area) {
      case 'GDSD': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'GDPD': return 'bg-green-100 text-green-800 border-green-200';
      case 'GAD': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) return null;

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-primary">PharmaTech Platform</h1>
        <Badge variant="outline" className={getProcessAreaColor(user.processArea)}>
          {user.processArea}
        </Badge>
        <Badge variant="secondary">{user.persona}</Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs">{user.email}</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};