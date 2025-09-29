import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Activity, AlertTriangle, CheckCircle, TrendingUp, Thermometer, Gauge, Droplets, FlaskConical, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

export const ProcessAnalyticsDashboard = () => {
  const navigate = useNavigate();
  
  // Get batch number from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedBatch = urlParams.get('batch') || 'BATCH-2024-315';

  // State for dropdown selections
  const [selectedProcessParameter, setSelectedProcessParameter] = useState('');
  const [selectedQualityAttribute, setSelectedQualityAttribute] = useState('');
  const [processParametersTimeRange, setProcessParametersTimeRange] = useState([12]);
  const [qualityAttributesTimeRange, setQualityAttributesTimeRange] = useState([12]);

  const kpiData = [
    { 
      name: 'Reactor Temperature', 
      current: 37.2, 
      target: 37.0, 
      previous: 37.1,
      unit: '°C', 
      status: 'normal',
      icon: Thermometer,
      color: 'text-blue-600'
    },
    { 
      name: 'Pressure', 
      current: 2.1, 
      target: 2.0, 
      previous: 1.9,
      unit: 'bar', 
      status: 'high',
      icon: Gauge,
      color: 'text-orange-600'
    },
    { 
      name: 'Flow Rate', 
      current: 45.8, 
      target: 45.0, 
      previous: 44.5,
      unit: 'L/min', 
      status: 'normal',
      icon: Droplets,
      color: 'text-cyan-600'
    },
    { 
      name: 'pH Level', 
      current: 5.8, 
      target: 7.0, 
      previous: 6.8,
      unit: '', 
      status: 'critical',
      icon: FlaskConical,
      color: 'text-red-600',
      highlight: true
    },
    { 
      name: 'Biomass', 
      current: 12.4, 
      target: 12.0, 
      previous: 11.2,
      unit: 'g/L', 
      status: 'normal',
      icon: Zap,
      color: 'text-purple-600',
      highlight: true
    }
  ];

  // Generate chart data based on time range
  const generateChartData = (hours: number) => {
    const data = [];
    const intervalMinutes = hours <= 6 ? 30 : hours <= 12 ? 60 : 120; // 30min, 1hr, or 2hr intervals
    const totalPoints = (hours * 60) / intervalMinutes;
    
    for (let i = 0; i <= totalPoints; i++) {
      const timeInMinutes = i * intervalMinutes;
      const timeHours = Math.floor(timeInMinutes / 60);
      const timeMinutes = timeInMinutes % 60;
      const timeString = `${timeHours.toString().padStart(2, '0')}:${timeMinutes.toString().padStart(2, '0')}`;
      
      // Generate realistic varying data
      const baseTemp = 37.0;
      const basePressure = 2.0;
      const baseFlow = 45.0;
      const basepH = 5.8;
      const baseBiomass = 12.0;
      const baseLactate = 1.2;
      const baseGlucose = 8.5;
      const baseSodium = 95;
      
      data.push({
        time: timeString,
        temperature: baseTemp + (Math.sin(i * 0.3) * 0.3) + (Math.random() - 0.5) * 0.2,
        pressure: basePressure + (Math.sin(i * 0.2) * 0.1) + (Math.random() - 0.5) * 0.05,
        flowRate: baseFlow + (Math.sin(i * 0.4) * 1.0) + (Math.random() - 0.5) * 0.5,
        pH: 6.7 - (i * (0.9 / totalPoints)) + (Math.random() - 0.5) * 0.05,
        biomass: baseBiomass + (i * 0.02) + (Math.random() - 0.5) * 0.3,
        prevpH: 6.8 + (Math.random() - 0.5) * 0.2,
        prevBiomass: baseBiomass - 1 + (i * 0.015) + (Math.random() - 0.5) * 0.2,
        lactate: baseLactate + (Math.sin(i * 0.25) * 0.3) + (Math.random() - 0.5) * 0.2,
        glucose: baseGlucose + (Math.sin(i * 0.35) * 2.0) + (Math.random() - 0.5) * 1.0,
        sodium: baseSodium + (Math.sin(i * 0.15) * 3) + (Math.random() - 0.5) * 2
      });
    }
    return data;
  };

  const processParametersData = generateChartData(processParametersTimeRange[0]);
  const qualityAttributesData = generateChartData(qualityAttributesTimeRange[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
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
            <h1 className="text-2xl font-bold">Real Time Process Monitoring</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-lg font-semibold text-primary">Batch: {selectedBatch}</div>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 21 }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      i + 1 === 8 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Day {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">Live monitoring of critical process parameters</p>
          </div>
        </div>

        {/* Gauge Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Biomass Target Gauge */}
          <Card className="p-3">
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(12.4 / 13) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">12.4</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">Biomass Target</p>
                <p className="text-xs text-muted-foreground">Target: 13%</p>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs px-1 py-0">
                  95%
                </Badge>
              </div>
            </div>
          </Card>

          {/* VVD Target Gauge */}
          <Card className="p-3">
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(1.58 / 1.65) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">1.58</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">VVD Target</p>
                <p className="text-xs text-muted-foreground">Target: 1.65</p>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 text-xs px-1 py-0">
                  96%
                </Badge>
              </div>
            </div>
          </Card>

          {/* T Shift Condition Gauge */}
          <Card className="p-3">
            <div className="flex flex-col items-center space-y-1">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-red-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(35.2 / 34.8) * 100 > 100 ? 100 : (35.2 / 34.8) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">35.2</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">T Shift Condition</p>
                <p className="text-xs text-muted-foreground">Target: 34.8</p>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs px-1 py-0">
                  101%
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Critical Parameters Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Critical Process Parameters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Critical Process Parameters</CardTitle>
                  <CardDescription>Key process monitoring parameters - Updated 5 mins ago</CardDescription>
                </div>
                <Select value={selectedProcessParameter} onValueChange={setSelectedProcessParameter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select parameter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ammonium">Ammonium</SelectItem>
                    <SelectItem value="sodium">Sodium</SelectItem>
                    <SelectItem value="potassium">Potassium</SelectItem>
                    <SelectItem value="osmolality">Osmolality</SelectItem>
                    <SelectItem value="ph-bga">pH BGA</SelectItem>
                    <SelectItem value="pco2">pCO2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Lactate */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Lactate</p>
                      <p className="text-sm text-muted-foreground">g/L</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">2.4 g/L</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">current</Badge>
                  </div>
                </div>

                {/* Glucose */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Glucose</p>
                      <p className="text-sm text-muted-foreground">g/L</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">15.8 g/L</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">current</Badge>
                  </div>
                </div>

                {/* Sodium */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Sodium</p>
                      <p className="text-sm text-muted-foreground">mmol/L</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">140 mmol/L</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">current</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Quality Attributes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Critical Quality Attributes</CardTitle>
                  <CardDescription>Quality control parameters</CardDescription>
                </div>
                <Select value={selectedQualityAttribute} onValueChange={setSelectedQualityAttribute}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select attribute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ph-level">pH Level</SelectItem>
                    <SelectItem value="hmw-out">HMW_Out</SelectItem>
                    <SelectItem value="hmw-in">HMW_In</SelectItem>
                    <SelectItem value="cf-hmw">CF_HMW</SelectItem>
                    <SelectItem value="t-shift">T Shift</SelectItem>
                    <SelectItem value="pressure">Pressure</SelectItem>
                    <SelectItem value="flow-rate">Flow Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Reactor Temperature */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Reactor Temperature</p>
                      <p className="text-sm text-muted-foreground">°C</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">37.2 °C</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">current</Badge>
                  </div>
                </div>

                {/* pH Level */}
                <div className="flex items-center justify-between p-4 border rounded-lg ring-2 ring-red-200">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">pH Level</p>
                      <p className="text-sm text-muted-foreground">pH</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">5.8</p>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">critical</Badge>
                  </div>
                </div>

                {/* cf_hmw */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">cf_hmw</p>
                      <p className="text-sm text-muted-foreground">Quality Attribute</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">4.5</p>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">current</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Parameters Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Process Parameters Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Process Parameters</CardTitle>
                  <CardDescription>Lactate, Glucose & Sodium monitoring</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{processParametersTimeRange[0]}h</span>
                  <Slider
                    value={processParametersTimeRange}
                    onValueChange={setProcessParametersTimeRange}
                    max={24}
                    min={3}
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processParametersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="lactate" domain={[0.5, 1.5]} tickFormatter={(value) => value.toFixed(1)} />
                    <YAxis yAxisId="glucose" domain={[6, 12]} tickFormatter={(value) => value.toFixed(0)} />
                    <YAxis yAxisId="sodium" orientation="right" domain={[90, 100]} tickFormatter={(value) => value.toFixed(0)} />
                    <Tooltip formatter={(value, name) => {
                      const nameStr = String(name);
                      const unit = nameStr.includes('Lactate') ? 'g/L' : 
                                  nameStr.includes('Glucose') ? 'g/L' : 
                                  nameStr.includes('Sodium') ? 'mmol/L' : '';
                      return [`${Number(value).toFixed(2)} ${unit}`, name];
                    }} />
                    <Legend />
                    
                    {/* Tolerance areas */}
                    <ReferenceArea yAxisId="lactate" y1={0.8} y2={1.2} fill="#16a34a" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="glucose" y1={8} y2={10} fill="#ea580c" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="sodium" y1={94} y2={98} fill="#0891b2" fillOpacity={0.1} />
                    
                    {/* Target reference lines */}
                    <ReferenceLine yAxisId="lactate" y={1.0} stroke="#16a34a" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="glucose" y={9.0} stroke="#ea580c" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="sodium" y={95.0} stroke="#0891b2" strokeDasharray="5 5" />
                    
                    {/* Parameter lines */}
                    <Line 
                      yAxisId="lactate" 
                      type="monotone" 
                      dataKey="lactate" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      name="Lactate (g/L)"
                    />
                    <Line 
                      yAxisId="glucose" 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#ea580c" 
                      strokeWidth={2}
                      name="Glucose (g/L)"
                    />
                    <Line 
                      yAxisId="sodium" 
                      type="monotone" 
                      dataKey="sodium" 
                      stroke="#0891b2" 
                      strokeWidth={2}
                      name="Sodium (mmol/L)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* pH and Biomass Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quality Attributes</CardTitle>
                  <CardDescription>pH Level & Biomass monitoring with targets</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{qualityAttributesTimeRange[0]}h</span>
                  <Slider
                    value={qualityAttributesTimeRange}
                    onValueChange={setQualityAttributesTimeRange}
                    max={24}
                    min={3}
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityAttributesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="ph" domain={[6.0, 7.5]} tickFormatter={(value) => value.toFixed(1)} />
                    <YAxis yAxisId="biomass" orientation="right" domain={[10, 13]} tickFormatter={(value) => value.toFixed(1)} />
                    <Tooltip formatter={(value, name) => {
                      const nameStr = String(name);
                      const unit = nameStr.includes('pH') ? '' : 
                                  nameStr.includes('Biomass') ? 'g/L' : '';
                      return [`${Number(value).toFixed(2)} ${unit}`, name];
                    }} />
                    <Legend />
                    
                    {/* Tolerance areas */}
                    <ReferenceArea yAxisId="ph" y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="biomass" y1={11.5} y2={12.5} fill="#9333ea" fillOpacity={0.1} />
                    
                    {/* Target reference lines */}
                    <ReferenceLine yAxisId="ph" y={7.0} stroke="#16a34a" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="biomass" y={12.0} stroke="#9333ea" strokeDasharray="5 5" />
                    
                    {/* Current batch lines */}
                    <Line 
                      yAxisId="ph" 
                      type="monotone" 
                      dataKey="pH" 
                      stroke="#dc2626" 
                      strokeWidth={3}
                      name="pH Level (Current)"
                    />
                    <Line 
                      yAxisId="biomass" 
                      type="monotone" 
                      dataKey="biomass" 
                      stroke="#9333ea" 
                      strokeWidth={3}
                      name="Biomass (g/L)"
                    />
                    
                    {/* Previous batch lines */}
                    <Line 
                      yAxisId="ph" 
                      type="monotone" 
                      dataKey="prevpH" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      name="pH Level (Prev Batch)"
                    />
                    <Line 
                      yAxisId="biomass" 
                      type="monotone" 
                      dataKey="prevBiomass" 
                      stroke="#9333ea" 
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      name="Biomass (Prev Batch)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Deviation Alert */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Critical pH Deviation Alert
            </CardTitle>
            <CardDescription>pH has dropped below acceptable tolerance - Immediate action required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">pH Level</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityAttributesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.0, 7.5]} tickFormatter={(value) => value.toFixed(1)} />
                      <Tooltip />
                      <Legend />
                      {/* Tolerance area */}
                      <ReferenceArea y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                      {/* Critical zone */}
                      <ReferenceArea y1={6.0} y2={6.5} fill="#dc2626" fillOpacity={0.2} />
                      <ReferenceLine y={7.0} stroke="#16a34a" strokeDasharray="5 5" label="Upper set point (7.0)" />
                      <ReferenceLine y={6.5} stroke="#f59e0b" strokeDasharray="3 3" label="Lower set point" />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="#dc2626" 
                        strokeWidth={3}
                        name="Actual pH"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current pH</p>
                    <p className="text-2xl font-bold text-red-600">5.8</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target pH</p>
                    <p className="text-2xl font-bold">7.0</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deviation</p>
                    <p className="text-2xl font-bold text-red-600">-1.2</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Biomass</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '00:00', biomass: 12.0, target: 13.0 },
                      { time: '02:00', biomass: 12.2, target: 13.0 },
                      { time: '04:00', biomass: 12.4, target: 13.0 },
                      { time: '06:00', biomass: 12.6, target: 13.0 },
                      { time: '08:00', biomass: 12.3, target: 13.0 },
                      { time: '10:00', biomass: 12.0, target: 13.0 },
                      { time: '12:00', biomass: 11.8, target: 13.0 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[11, 14]} />
                      <Tooltip />
                      <Legend />
                      {/* Tolerance area */}
                      <ReferenceArea y1={12.5} y2={13.5} fill="#9333ea" fillOpacity={0.1} />
                      <ReferenceLine y={13.0} stroke="#9333ea" strokeDasharray="5 5" label="Target (13%)" />
                      <ReferenceLine y={12.5} stroke="#f59e0b" strokeDasharray="3 3" label="Lower Tolerance" />
                      <Line 
                        type="monotone" 
                        dataKey="biomass" 
                        stroke="#9333ea" 
                        strokeWidth={3}
                        name="Actual Biomass"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current Biomass</p>
                    <p className="text-2xl font-bold text-orange-600">11.8%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target Biomass</p>
                    <p className="text-2xl font-bold">13.0%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deviation</p>
                    <p className="text-2xl font-bold text-orange-600">-1.2%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Critical Deviation Detected</p>
                  <p className="text-sm text-red-700">Set Point = 7.0 +/- 1.0 | Current Value = 5.8</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => navigate('/root-cause-analysis')}
                >
                  Initiate Investigation? (AI Powered)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batch Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Comparison - pH & Biomass</CardTitle>
            <CardDescription>Current batch vs previous batch performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">pH Level Comparison</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityAttributesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.5, 7.5]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceArea y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                      <ReferenceLine y={7.0} stroke="#16a34a" strokeDasharray="5 5" label="Target" />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        name="Current Batch"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prevpH" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        strokeDasharray="8 4"
                        name="Previous Batch"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Biomass Comparison</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qualityAttributesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[10, 13]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceArea y1={11.5} y2={12.5} fill="#9333ea" fillOpacity={0.1} />
                      <ReferenceLine y={12.0} stroke="#9333ea" strokeDasharray="5 5" label="Target" />
                      <Line 
                        type="monotone" 
                        dataKey="biomass" 
                        stroke="#9333ea" 
                        strokeWidth={3}
                        name="Current Batch"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prevBiomass" 
                        stroke="#9333ea" 
                        strokeWidth={2}
                        strokeDasharray="8 4"
                        name="Previous Batch"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Process Alerts</CardTitle>
            <CardDescription>Real-time parameter alerts and system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-900">Pressure Above Target</p>
                  <p className="text-sm text-orange-700">Reactor pressure at 2.1 bar (target: 2.0 bar)</p>
                </div>
                <span className="text-xs text-orange-600">Live</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Flow Rate Variance</p>
                  <p className="text-sm text-blue-700">Flow rate 1.8% above target (45.8 L/min vs 45.0 L/min)</p>
                </div>
                <span className="text-xs text-blue-600">2 min ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">All Parameters Stable</p>
                  <p className="text-sm text-green-700">Temperature and pH levels within acceptable range</p>
                </div>
                <span className="text-xs text-green-600">Ongoing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Time Process Monitoring Box */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real Time Process Monitoring
            </CardTitle>
            <CardDescription>Live monitoring status for {selectedBatch}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background rounded-lg border">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">System Status</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <Activity className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Data Streaming</p>
                <p className="text-xs text-blue-600">Active</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Alerts</p>
                <p className="text-xs text-red-600">1 Critical</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Monitoring</p>
                <p className="text-xs text-purple-600">5 Parameters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};