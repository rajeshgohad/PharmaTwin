import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export const ParameterTrendsPage = () => {
  const navigate = useNavigate();
  const [selectedParameter, setSelectedParameter] = useState('glucose');

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/root-cause-analysis')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Parameter Trends</h1>
            <p className="text-muted-foreground">Critical parameter analysis before pH deviation occurred</p>
          </div>
        </div>

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
              <div className="h-96">
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
      </div>
    </div>
  );
};