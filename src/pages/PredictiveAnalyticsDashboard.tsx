import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, Brain, BarChart3, Zap, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PredictiveAnalyticsDashboard = () => {
  const navigate = useNavigate();

  const models = [
    {
      name: 'Batch Quality Predictor',
      type: 'Classification',
      accuracy: '94.2%',
      status: 'active',
      lastRun: '2 hours ago',
      predictions: '156'
    },
    {
      name: 'Equipment Failure Prediction',
      type: 'Time Series',
      accuracy: '91.8%',
      status: 'active',
      lastRun: '6 hours ago',
      predictions: '89'
    },
    {
      name: 'Process Optimization Model',
      type: 'Regression',
      accuracy: '88.5%',
      status: 'training',
      lastRun: 'Training...',
      predictions: '0'
    },
    {
      name: 'Yield Forecast Model',
      type: 'Neural Network',
      accuracy: '96.1%',
      status: 'paused',
      lastRun: '1 day ago',
      predictions: '234'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'training': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
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
            <h1 className="text-2xl font-bold">Predictive Analytics</h1>
            <p className="text-muted-foreground">AI-powered predictive modeling and advanced analytics</p>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-sm text-muted-foreground">Active Models</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <p className="text-sm text-muted-foreground">Predictions Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">89%</div>
              <p className="text-sm text-muted-foreground">Model Utilization</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="models" className="space-y-4">
          <TabsList>
            <TabsTrigger value="models">Prediction Models</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Prediction Models</CardTitle>
                    <CardDescription>AI models for process prediction and optimization</CardDescription>
                  </div>
                  <Button>
                    <Brain className="h-4 w-4 mr-2" />
                    Create Model
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models.map((model, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">Type: {model.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                          <Badge variant="secondary">
                            {model.accuracy} accuracy
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>Last run: {model.lastRun}</span>
                          <span>Predictions: {model.predictions}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          {model.status === 'active' ? (
                            <Button size="sm" variant="outline">
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </Button>
                          ) : model.status === 'paused' ? (
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4 mr-1" />
                              Resume
                            </Button>
                          ) : null}
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Key insights and recommendations from predictive analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-blue-900">Process Efficiency Opportunity</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Model predicts 12% efficiency increase by adjusting temperature profile in reactor R-3.
                          Confidence: 94%
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          View Recommendation
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Equipment Maintenance Alert</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          HPLC System A-1 predicted to require maintenance within 72 hours based on performance trends.
                          Confidence: 87%
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          Schedule Maintenance
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-green-900">Quality Improvement Detected</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Recent process adjustments have improved batch quality consistency by 8.5%.
                          Confidence: 96%
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          View Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Optimization</CardTitle>
                <CardDescription>Automated optimization recommendations and simulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Optimization Scenarios</h4>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Yield Maximization</span>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            +15% yield
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Optimize temperature and pH parameters
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Cost Reduction</span>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            -12% cost
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reduce raw material consumption
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Time Optimization</span>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            -8% time
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Accelerate processing steps
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Simulation Tools</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Monte Carlo Simulation
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Process Sensitivity Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Brain className="h-4 w-4 mr-2" />
                        Multi-objective Optimization
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Zap className="h-4 w-4 mr-2" />
                        Real-time Optimization
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