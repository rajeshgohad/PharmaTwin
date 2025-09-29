import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FlaskConical, Beaker, TestTube, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LabOperationsDashboard = () => {
  const navigate = useNavigate();

  const activeTests = [
    {
      id: 'TST-2024-0315',
      name: 'Stability Study - Batch 240315',
      type: 'Stability',
      status: 'running',
      progress: '65%',
      duration: '6 months',
      timeRemaining: '2.1 months',
      analyst: 'Dr. Jennifer Kim'
    },
    {
      id: 'TST-2024-0316',
      name: 'Potency Assay - QC Release',
      type: 'Potency',
      status: 'completed',
      progress: '100%',
      duration: '3 days',
      timeRemaining: 'Complete',
      analyst: 'Dr. Robert Chen'
    },
    {
      id: 'TST-2024-0317',
      name: 'Biocompatibility Testing',
      type: 'Safety',
      status: 'pending',
      progress: '0%',
      duration: '4 weeks',
      timeRemaining: 'Scheduled',
      analyst: 'Dr. Maria Lopez'
    },
    {
      id: 'TST-2024-0318',
      name: 'Method Development - HPLC',
      type: 'Method Dev',
      status: 'running',
      progress: '45%',
      duration: '2 weeks',
      timeRemaining: '1.1 weeks',
      analyst: 'Dr. Alex Thompson'
    }
  ];

  const equipment = [
    { name: 'HPLC System A-1', status: 'available', utilization: '75%', nextMaintenance: '5 days' },
    { name: 'Mass Spec MS-2', status: 'in-use', utilization: '90%', nextMaintenance: '12 days' },
    { name: 'GC System G-3', status: 'maintenance', utilization: '0%', nextMaintenance: 'In progress' },
    { name: 'FTIR Analyzer F-1', status: 'available', utilization: '60%', nextMaintenance: '8 days' },
    { name: 'UV-Vis Spec UV-1', status: 'in-use', utilization: '85%', nextMaintenance: '3 days' },
    { name: 'Karl Fischer KF-1', status: 'available', utilization: '40%', nextMaintenance: '15 days' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': case 'in-use': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': case 'error': return 'bg-red-100 text-red-800 border-red-200';
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
            <h1 className="text-2xl font-bold">Digital Lab Operations Management</h1>
            <p className="text-muted-foreground">Comprehensive laboratory management and operations oversight</p>
          </div>
        </div>

        {/* Lab Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-sm text-muted-foreground">Active Tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <p className="text-sm text-muted-foreground">Completed This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <p className="text-sm text-muted-foreground">Equipment Utilization</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-sm text-muted-foreground">Available Instruments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tests">Active Tests</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="scheduling">Lab Scheduling</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Laboratory Tests</CardTitle>
                    <CardDescription>Current testing and analysis activities</CardDescription>
                  </div>
                  <Button>
                    <TestTube className="h-4 w-4 mr-2" />
                    Schedule Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTests.map((test, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.id} • Type: {test.type}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{test.progress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: test.progress }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{test.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-medium">{test.timeRemaining}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Analyst</p>
                          <p className="font-medium">{test.analyst}</p>
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

          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Status</CardTitle>
                <CardDescription>Laboratory equipment availability and maintenance schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipment.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Utilization</span>
                          <span>{item.utilization}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: item.utilization }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p className="text-muted-foreground">Next Maintenance</p>
                        <p className="font-medium">{item.nextMaintenance}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Reserve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lab Scheduling</CardTitle>
                <CardDescription>Resource scheduling and capacity planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Today's Schedule</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <p className="font-medium">HPLC Analysis - 09:00</p>
                            <p className="text-sm text-muted-foreground">Dr. Kim - Potency Assay</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            In Progress
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <p className="font-medium">Method Development - 14:00</p>
                            <p className="text-sm text-muted-foreground">Dr. Thompson - HPLC Method</p>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Scheduled
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Beaker className="h-5 w-5 text-purple-600" />
                          <div className="flex-1">
                            <p className="font-medium">Stability Testing - 16:00</p>
                            <p className="text-sm text-muted-foreground">Dr. Lopez - Sample Prep</p>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Scheduled
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Capacity Overview</h4>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">HPLC Systems</span>
                            <span className="text-sm text-muted-foreground">3/4 available</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Mass Spectrometers</span>
                            <span className="text-sm text-muted-foreground">1/2 available</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Analytical Staff</span>
                            <span className="text-sm text-muted-foreground">12/15 assigned</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lab Resources</CardTitle>
                <CardDescription>Inventory, reagents, and resource management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Reagent Inventory</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Acetonitrile (HPLC Grade)</p>
                          <p className="text-sm text-muted-foreground">25L remaining</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          In Stock
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Methanol (LC-MS Grade)</p>
                          <p className="text-sm text-muted-foreground">5L remaining</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Low Stock
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Phosphate Buffer</p>
                          <p className="text-sm text-muted-foreground">Out of stock</p>
                        </div>
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Order Required
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Lab Supplies</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">HPLC Vials (2mL)</p>
                          <p className="text-sm text-muted-foreground">500 units</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Adequate
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Pipette Tips (1000μL)</p>
                          <p className="text-sm text-muted-foreground">200 units</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Reorder Soon
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">C18 Columns</p>
                          <p className="text-sm text-muted-foreground">3 units</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Available
                        </Badge>
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