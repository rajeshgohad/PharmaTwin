import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Download, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AutomaticReportsDashboard = () => {
  const navigate = useNavigate();

  const reports = [
    { 
      name: 'Monthly Process Summary', 
      type: 'Process', 
      status: 'completed', 
      generated: '2 hours ago',
      size: '2.4 MB'
    },
    { 
      name: 'Quality Control Report', 
      type: 'Quality', 
      status: 'generating', 
      generated: 'In progress',
      size: 'Pending'
    },
    { 
      name: 'Analytical Method Validation', 
      type: 'Validation', 
      status: 'completed', 
      generated: '1 day ago',
      size: '5.2 MB'
    },
    { 
      name: 'Batch Production Report', 
      type: 'Production', 
      status: 'scheduled', 
      generated: 'Tomorrow 9:00 AM',
      size: 'Scheduled'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'generating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
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
            <h1 className="text-2xl font-bold">Automatic Reports</h1>
            <p className="text-muted-foreground">Generate and manage comprehensive compliance reports</p>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-sm text-muted-foreground">Currently Generating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">1,234</div>
              <p className="text-sm text-muted-foreground">Total This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Generate new reports or access templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Custom Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Schedule Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Download className="h-6 w-6" />
                <span>Download Template</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest generated and scheduled reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">Type: {report.type}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{report.generated}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{report.size}</span>
                      </div>
                    </div>
                    
                    {report.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
            <CardDescription>Pre-configured report templates for common analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Process Validation Report',
                'Stability Study Report',
                'Method Transfer Report',
                'Deviation Investigation',
                'Equipment Qualification',
                'Training Record Summary'
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
      </div>
    </div>
  );
};