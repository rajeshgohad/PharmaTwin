import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'maintenance' | 'offline';
  metrics?: {
    label: string;
    value: string;
    status?: 'critical' | 'warning' | 'normal';
    trend?: 'up' | 'down' | 'stable';
  }[];
  batches?: {
    running: string[];
    queued: string[];
  };
  onAccess: (batchId?: string) => void;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
  title,
  description,
  icon: Icon,
  status,
  metrics = [],
  batches,
  onAccess
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricStatusColor = (status?: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 font-bold';
      case 'warning': return 'text-yellow-600 font-semibold';
      case 'normal': return 'text-foreground';
      default: return 'text-foreground';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {batches ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground mb-2">Running Batches</div>
              <div className="space-y-1">
                {batches.running.map((batch, index) => (
                  <button
                    key={index}
                    onClick={() => onAccess(batch)}
                    className="text-sm text-primary hover:underline block w-full text-left"
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground mb-2">Queued Batches</div>
              <div className="space-y-1">
                {batches.queued.map((batch, index) => (
                  <button
                    key={index}
                    onClick={() => onAccess(batch)}
                    className="text-sm text-muted-foreground hover:text-primary hover:underline block w-full text-left"
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-2 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className={`font-semibold ${getMetricStatusColor(metric.status)}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          )
        )}
        
        <Button 
          onClick={() => onAccess()} 
          className="w-full"
          disabled={status === 'offline'}
        >
          Access {title}
        </Button>
      </CardContent>
    </Card>
  );
};