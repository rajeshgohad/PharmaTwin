import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Monitor, Workflow, Clock, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DigitalOperationsDashboard = () => {
  const navigate = useNavigate();

  const workflows = [
    {
      name: 'Batch Release Process',
      status: 'active',
      progress: '85%',
      timeRemaining: '2.5 hours',
      stage: 'Quality Review'
    },
    {
      name: 'Equipment Qualification',
      status: 'pending',
      progress: '45%',
      timeRemaining: '5 days',
      stage: 'IQ Documentation'
    },
    {
      name: 'Change Control Review',
      status: 'completed',
      progress: '100%',
      timeRemaining: 'Completed',
      stage: 'Approved'
    },
    {
      name: 'Deviation Investigation',
      status: 'active',
      progress: '60%',
      timeRemaining: '3 days',
      stage: 'Root Cause Analysis'
    }
  ];

  const automationMetrics = [
    { process: 'Document Routing', automated: '92%', manual: '8%' },
    { process: 'Approval Workflows', automated: '78%', manual: '22%' },
    { process: 'Data Collection', automated: '95%', manual: '5%' },
    { process: 'Report Generation', automated: '88%', manual: '12%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
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
            <h1 className="text-2xl font-bold">Digital Operations Management</h1>
            <p className="text-muted-foreground">Business process digitalization and workflow monitoring</p>
          </div>
        </div>

        {/* Operations Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">28</div>
              <p className="text-sm text-muted-foreground">Active Workflows</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-sm text-muted-foreground">Automation Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">4.2 days</div>
              <p className="text-sm text-muted-foreground">Avg Process Time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workflows" className="space-y-4">
          <TabsList>
            <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="monitoring">Process Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Business Process Workflows</CardTitle>
                    <CardDescription>Current status of digitalized business processes</CardDescription>
                  </div>
                  <Button>
                    <Workflow className="h-4 w-4 mr-2" />
                    New Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{workflow.name}</h3>
                          <p className="text-sm text-muted-foreground">Current stage: {workflow.stage}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{workflow.progress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: workflow.progress }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{workflow.timeRemaining}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Automation Metrics</CardTitle>
                <CardDescription>Digital transformation progress and automation rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {automationMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{metric.process}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {metric.automated} automated
                          </Badge>
                          <Badge variant="outline" className="bg-orange-100 text-orange-800">
                            {metric.manual} manual
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full" 
                          style={{ width: metric.automated }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Automation Opportunities</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Approval workflow automation can be increased to 90%</li>
                    <li>• Manual report generation processes identified for automation</li>
                    <li>• Document routing efficiency can be improved by 5%</li>
                  </ul>
                  <Button size="sm" className="mt-3" variant="outline">
                    View Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Performance Monitoring</CardTitle>
                <CardDescription>Real-time monitoring of business process performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Process Health</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Document Management</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Healthy
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          <span>Approval Workflows</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Delayed
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Quality Control</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Optimal
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Cycle Time</span>
                          <span className="text-sm text-green-600">-12% vs target</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Quality Score</span>
                          <span className="text-sm text-green-600">+8% vs target</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-5/6"></div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Cost Efficiency</span>
                          <span className="text-sm text-blue-600">On target</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
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