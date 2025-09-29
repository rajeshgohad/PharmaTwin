import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CapabilityCard } from './CapabilityCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Search, 
  TrendingUp, 
  Settings, 
  Monitor, 
  FlaskConical,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const capabilities = [
    {
      title: 'Real Time Process Monitoring',
      description: 'Live monitoring of critical process parameters and system performance',
      icon: Monitor,
      status: 'active' as const,
      batches: {
        running: ['MBE17060-64', 'MBE17060-065', 'MBE17060-066', 'MBE17060-067', 'MBE17060-068'],
        queued: ['MBE17060-110', 'MBE17060-111', 'MBE17060-112', 'MBE17060-113']
      },
      onAccess: (batchId?: string) => navigate(`/process-analytics${batchId ? `?batch=${batchId}` : ''}`)
    },
    {
      title: 'Automatic Reports',
      description: 'Generate comprehensive reports for compliance and analysis',
      icon: FileText,
      status: 'active' as const,
      metrics: [
        { label: 'Reports Today', value: '12' },
        { label: 'Pending', value: '3' }
      ],
      onAccess: () => navigate('/automatic-reports')
    },
    {
      title: 'Deep Investigations',
      description: 'Advanced investigation tools for scientific analysis and troubleshooting',
      icon: Search,
      status: 'active' as const,
      metrics: [
        { label: 'Active Cases', value: '8' },
        { label: 'Resolved', value: '45' }
      ],
      onAccess: () => navigate('/deep-investigations')
    },
    {
      title: 'Predictive Analytics',
      description: 'AI-powered predictive modeling and advanced analytics',
      icon: TrendingUp,
      status: 'active' as const,
      metrics: [
        { label: 'Models', value: '15' },
        { label: 'Accuracy', value: '94.2%' }
      ],
      onAccess: () => navigate('/predictive-analytics')
    },
    {
      title: 'Process Control',
      description: 'Operational control and optimization tools for process efficiency',
      icon: Settings,
      status: 'maintenance' as const,
      metrics: [
        { label: 'Optimizations', value: '6' },
        { label: 'Efficiency', value: '+12%' }
      ],
      onAccess: () => navigate('/process-control')
    },
    {
      title: 'Digital Operations',
      description: 'Business process digitalization and workflow monitoring',
      icon: BarChart3,
      status: 'active' as const,
      metrics: [
        { label: 'Workflows', value: '28' },
        { label: 'Automated', value: '85%' }
      ],
      onAccess: () => navigate('/digital-operations')
    },
    {
      title: 'Lab Operations',
      description: 'Digital laboratory management and operations oversight',
      icon: FlaskConical,
      status: 'active' as const,
      metrics: [
        { label: 'Active Tests', value: '156' },
        { label: 'Completed', value: '1,234' }
      ],
      onAccess: () => navigate('/lab-operations')
    }
  ];

  const getProcessAreaInfo = (area: string) => {
    switch (area) {
      case 'GDSD':
        return {
          fullName: 'Gene & Cell Discovery Sciences',
          focus: 'Upstream Process Development',
          color: 'border-blue-200 bg-blue-50'
        };
      case 'GDPD':
        return {
          fullName: 'Gene & Drug Product Development',
          focus: 'Downstream Process Development',
          color: 'border-green-200 bg-green-50'
        };
      case 'GAD':
        return {
          fullName: 'Global Analytical Development',
          focus: 'Analytical Method Development',
          color: 'border-yellow-200 bg-yellow-50'
        };
      default:
        return {
          fullName: 'Unknown Area',
          focus: 'General',
          color: 'border-gray-200 bg-gray-50'
        };
    }
  };

  const areaInfo = getProcessAreaInfo(user.processArea);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <Card className={`${areaInfo.color} border-2`}>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  Welcome, {user.name}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {areaInfo.fullName} • {user.persona}
                </CardDescription>
                <p className="text-xs text-muted-foreground mt-1">
                  {areaInfo.focus}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Systems Online
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  1 Maintenance
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">Active Systems</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">156</div>
              <p className="text-xs text-muted-foreground">Running Tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-yellow-600">8</div>
              <p className="text-xs text-muted-foreground">Investigations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Capabilities Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Platform Capabilities for {user.persona}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={index}
                {...capability}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your process area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Batch Analysis Completed</p>
                  <p className="text-sm text-muted-foreground">Batch #2024-0315 passed all quality checks</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="font-medium">System Maintenance Scheduled</p>
                  <p className="text-sm text-muted-foreground">Process Control system will be offline for 2 hours</p>
                </div>
                <span className="text-xs text-muted-foreground">4 hours ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Monthly Report Generated</p>
                  <p className="text-sm text-muted-foreground">Process efficiency report for March 2024</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};