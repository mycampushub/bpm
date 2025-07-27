
import React, { useEffect } from 'react';
import { useVoice } from '@/contexts/VoiceContext';
import { useLocation } from 'react-router-dom';

export const ProcessManagerVoiceGuide: React.FC = () => {
  const { isVoiceEnabled, speakText } = useVoice();
  const location = useLocation();

  useEffect(() => {
    if (isVoiceEnabled && location.pathname === '/') {
      const welcomeMessage = `Welcome to the Process Manager. You are now in the enterprise BPMN process modeling environment. 
        This tool allows you to design, simulate, and optimize business processes. 
        You can switch between the visual editor, process properties, repository, and analytics tabs. 
        Use the element palette to add tasks, gateways, events, and other BPMN elements to your process model. 
        Voice guidance is active to help you navigate and understand the interface.`;
      
      // Delay the welcome message to avoid conflicts with other voice announcements
      setTimeout(() => {
        speakText(welcomeMessage);
      }, 1000);
    }
  }, [isVoiceEnabled, location.pathname, speakText]);

  // This component doesn't render anything visible
  return null;
};
