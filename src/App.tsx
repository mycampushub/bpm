
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VoiceProvider } from "@/contexts/VoiceContext";
import { VoiceTrainerProvider } from "@/contexts/VoiceTrainerContext";
import { VoiceTrainerToggle } from "@/components/voice/VoiceTrainerToggle";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import ProcessManager from "./pages/ProcessManager";
import Users from "./pages/Users";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Repository from "./pages/Repository";
import ProcessIntelligence from "./pages/ProcessIntelligence";
import JourneyModeler from "./pages/JourneyModeler";
import CollaborationHub from "./pages/CollaborationHub";
import ProcessMining from "./pages/ProcessMining";
import Reports from "./pages/Reports";
import TransformationCockpit from "./pages/TransformationCockpit";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <VoiceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/process-manager" element={<ProtectedRoute><ProcessManager /></ProtectedRoute>} />
              <Route path="/repository" element={<ProtectedRoute><Repository /></ProtectedRoute>} />
              <Route path="/process-intelligence" element={<ProtectedRoute><ProcessIntelligence /></ProtectedRoute>} />
              <Route path="/process-mining" element={<ProtectedRoute><ProcessMining /></ProtectedRoute>} />
              <Route path="/journey-modeler" element={<ProtectedRoute><JourneyModeler /></ProtectedRoute>} />
              <Route path="/collaboration-hub" element={<ProtectedRoute><CollaborationHub /></ProtectedRoute>} />
              <Route path="/transformation-cockpit" element={<ProtectedRoute><TransformationCockpit /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute requiredRole="admin"><Users /></ProtectedRoute>} />
              <Route path="/user-management" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </VoiceProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
