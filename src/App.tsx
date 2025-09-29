import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ProcessAnalyticsDashboard } from "./pages/ProcessAnalyticsDashboard";
import { RootCauseAnalysis } from "./pages/RootCauseAnalysis";
import { AutomaticReportsDashboard } from "./pages/AutomaticReportsDashboard";
import { DeepInvestigationsDashboard } from "./pages/DeepInvestigationsDashboard";
import { PredictiveAnalyticsDashboard } from "./pages/PredictiveAnalyticsDashboard";
import { ProcessControlDashboard } from "./pages/ProcessControlDashboard";
import { DigitalOperationsDashboard } from "./pages/DigitalOperationsDashboard";
import { LabOperationsDashboard } from "./pages/LabOperationsDashboard";
import { HistoricalDataPage } from "./pages/HistoricalDataPage";
import { ParameterTrendsPage } from "./pages/ParameterTrendsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/process-analytics" element={<ProcessAnalyticsDashboard />} />
            <Route path="/root-cause-analysis" element={<RootCauseAnalysis />} />
            <Route path="/automatic-reports" element={<AutomaticReportsDashboard />} />
            <Route path="/deep-investigations" element={<DeepInvestigationsDashboard />} />
            <Route path="/predictive-analytics" element={<PredictiveAnalyticsDashboard />} />
            <Route path="/process-control" element={<ProcessControlDashboard />} />
            <Route path="/digital-operations" element={<DigitalOperationsDashboard />} />
            <Route path="/lab-operations" element={<LabOperationsDashboard />} />
            <Route path="/historical-data" element={<HistoricalDataPage />} />
            <Route path="/parameter-trends" element={<ParameterTrendsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
