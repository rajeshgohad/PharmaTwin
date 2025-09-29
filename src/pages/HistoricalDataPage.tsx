import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HistoricalDataPage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/root-cause-analysis')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Historical Data</h1>
            <p className="text-muted-foreground">Past occurrences of similar pH deviations with identified root causes</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historical pH Deviations</CardTitle>
            <CardDescription>Comprehensive analysis of past pH deviation events</CardDescription>
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
      </div>
    </div>
  );
};