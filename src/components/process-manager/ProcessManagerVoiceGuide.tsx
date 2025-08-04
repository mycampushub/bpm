import React, { useEffect } from 'react';
import { useVoice } from '@/contexts/VoiceContext';
import { useVoiceTrainer } from '@/contexts/VoiceTrainerContext';
import { useLocation } from 'react-router-dom';

export const ProcessManagerVoiceGuide: React.FC = () => {
  const { speakText } = useVoice();
  const { isTrainerEnabled } = useVoiceTrainer();
  const location = useLocation();

  useEffect(() => {
    if (isTrainerEnabled && location.pathname === '/process-manager') {
      const welcomeMessage = `Welcome to the Process Manager. You are now in the enterprise BPMN process modeling environment. 
        This tool allows you to design, simulate, and optimize business processes. 
        You can switch between the visual editor, process properties, repository, and analytics tabs. 
        Use the element palette to add tasks, gateways, events, and other BPMN elements to your process model. 
        Try the demo processes in the template selector to get started.
        Voice guidance is active to help you navigate and understand the interface.`;
      
      // Delay the welcome message to avoid conflicts with other voice announcements
      setTimeout(() => {
        speakText(welcomeMessage);
      }, 1500);
    }
  }, [isTrainerEnabled, location.pathname, speakText]);

  // This component doesn't render anything visible
  return null;
};