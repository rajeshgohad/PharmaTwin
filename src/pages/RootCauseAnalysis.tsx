import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, AlertTriangle, TrendingDown, Search, Calendar, BarChart3, FlaskConical, Activity, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea, BarChart, Bar } from 'recharts';

export const RootCauseAnalysis = () => {
  const navigate = useNavigate();
  const [selectedParameter, setSelectedParameter] = useState('glucose');

  const deviationEvent = {
    timestamp: '2024-01-15 14:30:00',
    parameter: 'pH Level',
    actual: 6.4,
    target: 7.0,
    deviation: -0.6,
    tolerance: 0.5,
    severity: 'Critical'
  };

  const probableReasons = [
    {
      id: 1,
      reason: 'Excessive Lactate Accumulation',
      probability: 85,
      description: 'High lactate production due to glucose overflow metabolism',
      indicators: ['Lactate > 4.5 g/L', 'Glucose consumption rate increased', 'Cell viability declining'],
      action: 'Optimize feeding strategy and glucose concentration'
    },
    {
      id: 2,
      reason: 'CO2 Sparging Issues',
      probability: 72,
      description: 'Insufficient CO2 control leading to pH buffering problems',
      indicators: ['CO2 flow rate below setpoint', 'Dissolved CO2 levels low', 'Base addition frequency increased'],
      action: 'Check CO2 supply and sparging system'
    },
    {
      id: 3,
      reason: 'Medium Buffering Capacity',
      probability: 68,
      description: 'Inadequate buffer concentration in culture medium',
      indicators: ['Buffer consumption rate high', 'pH swings during feeding', 'Base addition spikes'],
      action: 'Increase medium buffer concentration'
    },
    {
      id: 4,
      reason: 'Contamination Event',
      probability: 45,
      description: 'Bacterial contamination producing organic acids',
      indicators: ['Cell morphology changes', 'Unexpected metabolite patterns', 'Gram stain positive'],
      action: 'Perform contamination screening and microscopy'
    }
  ];

  const historicalData = [
    {
      date: '2024-01-10',
      batchId: 'B2024-015',
      pH: 6.3,
      biomass: 11.2,
      lactate: 5.2,
      glucose: 2.1,
      viableCells: 85.2,
      rootCause: 'Lactate Accumulation'
    },
    {
      date: '2023-12-22',
      batchId: 'B2023-387',
      pH: 6.5,
      biomass: 10.8,
      lactate: 4.8,
      glucose: 1.8,
      viableCells: 82.1,
      rootCause: 'CO2 Control Issue'
    },
    {
      date: '2023-11-08',
      batchId: 'B2023-312',
      pH: 6.2,
      biomass: 9.5,
      lactate: 6.1,
      glucose: 0.9,
      viableCells: 76.8,
      rootCause: 'Medium Buffer Depletion'
    },
    {
      date: '2023-09-15',
      batchId: 'B2023-258',
      pH: 6.4,
      biomass: 12.1,
      lactate: 4.9,
      glucose: 2.3,
      viableCells: 88.5,
      rootCause: 'Feeding Strategy'
    }
  ];

  const parameterData = {
    glucose: [
      { time: '12:00', current: 3.2, historical: 3.5, target: 3.0 },
      { time: '13:00', current: 2.8, historical: 3.1, target: 3.0 },
      { time: '14:00', current: 2.1, historical: 2.8, target: 3.0 },
      { time: '14:30', current: 1.8, historical: 2.5, target: 3.0 }
    ],
    lactate: [
      { time: '12:00', current: 3.8, historical: 3.2, target: 2.5 },
      { time: '13:00', current: 4.2, historical: 3.6, target: 2.5 },
      { time: '14:00', current: 4.8, historical: 4.1, target: 2.5 },
      { time: '14:30', current: 5.2, historical: 4.3, target: 2.5 }
    ],
    viableCells: [
      { time: '12:00', current: 92.5, historical: 94.2, target: 95.0 },
      { time: '13:00', current: 89.8, historical: 92.1, target: 95.0 },
      { time: '14:00', current: 86.2, historical: 89.5, target: 95.0 },
      { time: '14:30', current: 83.1, historical: 87.2, target: 95.0 }
    ]
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-100 text-red-800 border-red-200';
    if (probability >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/process-analytics')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Root Cause Analysis</h1>
            <p className="text-muted-foreground">pH Deviation Investigation - Critical Alert</p>
          </div>
        </div>

        {/* Deviation Summary */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Critical pH Deviation Detected
            </CardTitle>
            <CardDescription>
              pH level has dropped below acceptable tolerance range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current pH</p>
                <p className="text-2xl font-bold text-red-600">{deviationEvent.actual}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target pH</p>
                <p className="text-2xl font-bold">{deviationEvent.target}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deviation</p>
                <p className="text-2xl font-bold text-red-600">{deviationEvent.deviation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tolerance</p>
                <p className="text-2xl font-bold">±{deviationEvent.tolerance}</p>
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="destructive">
                {deviationEvent.severity} - Immediate Action Required
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analysis">Probable Causes</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
            <TabsTrigger value="parameters">Parameter Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            {/* Probable Reasons */}
            <Card>
              <CardHeader>
                <CardTitle>Probable Root Causes</CardTitle>
                <CardDescription>Ranked by likelihood based on current conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {probableReasons.map((reason) => (
                    <div key={reason.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                        {/* Likelihood Column */}
                        <div className="lg:col-span-2">
                          <Badge className={getProbabilityColor(reason.probability)}>
                            {reason.probability}% likelihood
                          </Badge>
                        </div>
                        
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-3">
                          <div>
                            <h4 className="font-medium">{reason.reason}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Key Indicators:</p>
                              <ul className="text-sm space-y-1">
                                {reason.indicators.map((indicator, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                    {indicator}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">Recommended Action:</p>
                              <p className="text-sm text-primary">{reason.action}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Links Column */}
                        <div className="lg:col-span-2 space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs"
                            onClick={() => navigate('/historical-data')}
                          >
                            Historical Data
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs"
                            onClick={() => navigate('/parameter-trends')}
                          >
                            Parameter Trends
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-4">
            {/* Historical Deviations */}
            <Card>
              <CardHeader>
                <CardTitle>Historical pH Deviations</CardTitle>
                <CardDescription>Past occurrences of similar pH drops with identified root causes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicalData.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date</p>
                          <p className="text-sm">{event.date}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Batch ID</p>
                          <p className="text-sm font-mono">{event.batchId}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">pH Level</p>
                          <p className="text-sm font-bold text-red-600">{event.pH}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Viable Cells</p>
                          <p className="text-sm">{event.viableCells}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Lactate</p>
                          <p className="text-sm">{event.lactate} g/L</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Root Cause</p>
                          <Badge variant="outline">{event.rootCause}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            {/* Parameter Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Critical Parameter Trends</CardTitle>
                <CardDescription>Leading indicators before pH deviation occurred</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {Object.keys(parameterData).map((param) => (
                      <Button
                        key={param}
                        variant={selectedParameter === param ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedParameter(param)}
                      >
                        {param.charAt(0).toUpperCase() + param.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={parameterData[selectedParameter as keyof typeof parameterData]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <ReferenceLine y={parameterData[selectedParameter as keyof typeof parameterData][0]?.target} stroke="#16a34a" strokeDasharray="5 5" label="Target" />
                        <Line 
                          type="monotone" 
                          dataKey="current" 
                          stroke="#dc2626" 
                          strokeWidth={3}
                          name="Current Batch"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="historical" 
                          stroke="#6b7280" 
                          strokeWidth={2}
                          strokeDasharray="8 4"
                          name="Historical Average"
                        />
                      </LineChart>
                    </ResponsiveContainer>
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