import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Settings, Play, Pause, RotateCcw, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProcessControlDashboard = () => {
  const navigate = useNavigate();

  const controlSystems = [
    {
      name: 'Reactor Temperature Control',
      status: 'active',
      setpoint: '75°C',
      current: '74.8°C',
      variance: '±0.2°C',
      efficiency: '98.5%'
    },
    {
      name: 'pH Control System',
      status: 'maintenance',
      setpoint: '7.2',
      current: 'Offline',
      variance: 'N/A',
      efficiency: '0%'
    },
    {
      name: 'Flow Rate Controller',
      status: 'active',
      setpoint: '150 L/min',
      current: '149.2 L/min',
      variance: '±2.1%',
      efficiency: '97.8%'
    },
    {
      name: 'Pressure Control',
      status: 'active',
      setpoint: '2.5 bar',
      current: '2.48 bar',
      variance: '±0.8%',
      efficiency: '99.2%'
    }
  ];

  const optimizations = [
    {
      process: 'Batch Cycle Time',
      current: '8.5 hours',
      optimized: '7.2 hours',
      improvement: '15.3%',
      status: 'implemented'
    },
    {
      process: 'Energy Consumption',
      current: '245 kWh',
      optimized: '198 kWh',
      improvement: '19.2%',
      status: 'testing'
    },
    {
      process: 'Raw Material Usage',
      current: '450 kg',
      optimized: '425 kg',
      improvement: '5.6%',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'implemented': return 'bg-green-100 text-green-800 border-green-200';
      case 'testing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
            <h1 className="text-2xl font-bold">Process Control & Optimization</h1>
            <p className="text-muted-foreground">Operational control and optimization tools for process efficiency</p>
          </div>
        </div>

        {/* Control Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-sm text-muted-foreground">Active Controllers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <p className="text-sm text-muted-foreground">In Maintenance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">98.1%</div>
              <p className="text-sm text-muted-foreground">Control Efficiency</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <p className="text-sm text-muted-foreground">Active Optimizations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="control" className="space-y-4">
          <TabsList>
            <TabsTrigger value="control">Process Control</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="control" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Control Systems Status</CardTitle>
                    <CardDescription>Real-time status of process control systems</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Maintenance Mode
                    </Button>
                    <Button size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {controlSystems.map((system, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{system.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>Setpoint: {system.setpoint}</p>
                            <p>Current: {system.current}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Variance</p>
                          <p className="font-medium">{system.variance}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Efficiency</p>
                          <p className="font-medium">{system.efficiency}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {system.status === 'active' ? (
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Optimizations</CardTitle>
                <CardDescription>Current and planned process optimization initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizations.map((opt, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{opt.process}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>Current: {opt.current} → Optimized: {opt.optimized}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getStatusColor(opt.status)}>
                            {opt.status}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {opt.improvement}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
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
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Automated control rules and triggers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Temperature Auto-Adjustment</h4>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatically adjust reactor temperature when deviation exceeds ±1°C
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit Rule</Button>
                      <Button size="sm" variant="outline">Disable</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Emergency Shutdown Protocol</h4>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                        Critical
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Initiate emergency shutdown if pressure exceeds 3.0 bar
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit Rule</Button>
                      <Button size="sm" variant="outline">Test</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Quality Alert System</h4>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        Monitoring
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send alerts when quality parameters drift outside control limits
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit Rule</Button>
                      <Button size="sm" variant="outline">View Logs</Button>
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