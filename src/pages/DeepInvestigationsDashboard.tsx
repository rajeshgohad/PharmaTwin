import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, AlertTriangle, FileText, TrendingDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DeepInvestigationsDashboard = () => {
  const navigate = useNavigate();

  const investigations = [
    {
      id: 'INV-2024-015',
      title: 'Batch Yield Deviation',
      priority: 'high',
      status: 'active',
      assignee: 'Dr. Sarah Chen',
      created: '2 days ago',
      description: 'Investigating 15% yield decrease in batch production'
    },
    {
      id: 'INV-2024-014',
      title: 'HPLC Method Validation',
      priority: 'medium',
      status: 'review',
      assignee: 'Dr. Mike Rodriguez',
      created: '5 days ago',
      description: 'Method validation for new analytical procedure'
    },
    {
      id: 'INV-2024-013',
      title: 'Temperature Excursion',
      priority: 'low',
      status: 'completed',
      assignee: 'Dr. Lisa Wang',
      created: '1 week ago',
      description: 'Root cause analysis of storage temperature deviation'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-hold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Deep Investigations</h1>
            <p className="text-muted-foreground">Advanced investigation tools for scientific analysis</p>
          </div>
        </div>

        {/* Investigation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-sm text-muted-foreground">Active Cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-sm text-muted-foreground">Resolved This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <p className="text-sm text-muted-foreground">Resolution Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Investigations</TabsTrigger>
            <TabsTrigger value="templates">Investigation Templates</TabsTrigger>
            <TabsTrigger value="tools">Analysis Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Current Investigations</CardTitle>
                    <CardDescription>Ongoing scientific investigations and root cause analyses</CardDescription>
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    New Investigation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investigations.map((investigation, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{investigation.title}</h3>
                          <p className="text-sm text-muted-foreground">{investigation.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getPriorityColor(investigation.priority)}>
                            {investigation.priority}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(investigation.status)}>
                            {investigation.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm">{investigation.description}</p>
                      
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{investigation.assignee}</span>
                        </div>
                        <span>Created {investigation.created}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investigation Templates</CardTitle>
                <CardDescription>Pre-configured templates for common investigation types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Batch Failure Analysis',
                    'Equipment Malfunction',
                    'Analytical OOS Investigation',
                    'Process Deviation',
                    'Method Transfer Issue',
                    'Quality Complaint',
                    'Environmental Monitoring',
                    'Cleaning Validation',
                    'Stability Study Deviation'
                  ].map((template, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">{template}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Tools</CardTitle>
                <CardDescription>Advanced tools for data analysis and investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Statistical Analysis</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Trend Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Control Chart Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Search className="h-4 w-4 mr-2" />
                        Root Cause Analysis
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Mining</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Pattern Recognition
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Search className="h-4 w-4 mr-2" />
                        Correlation Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Regression Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};