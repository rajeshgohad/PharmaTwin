import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ProcessArea, Persona } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { FlaskConical, Users, BarChart3 } from 'lucide-react';

const processAreaData = {
  GDSD: { name: 'Gene & Cell Discovery (Upstream)', icon: FlaskConical, color: 'text-blue-600' },
  GDPD: { name: 'Gene & Drug Product Development (Downstream)', icon: Users, color: 'text-green-600' },
  GAD: { name: 'Global Analytical Development', icon: BarChart3, color: 'text-yellow-600' }
};

export const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    processArea: '' as ProcessArea,
    persona: '' as Persona
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.processArea && formData.persona) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        processArea: formData.processArea,
        persona: formData.persona
      };
      login(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">PharmaTech Platform</CardTitle>
          <CardDescription>Sign in to access your pharmaceutical development workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Process Area</Label>
              <Select
                value={formData.processArea}
                onValueChange={(value) => setFormData({ ...formData, processArea: value as ProcessArea })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your process area" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(processAreaData).map(([key, data]) => {
                    const IconComponent = data.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <IconComponent className={`h-4 w-4 ${data.color}`} />
                          <span>{data.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formData.persona}
                onValueChange={(value) => setFormData({ ...formData, persona: value as Persona })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scientist">Scientist</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};