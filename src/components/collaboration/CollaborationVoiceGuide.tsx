
import { useEffect } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useVoiceTrainer } from "@/contexts/VoiceTrainerContext";

export const CollaborationVoiceGuide = () => {
  const { speakText } = useVoice();
  const { isTrainerEnabled } = useVoiceTrainer();

  useEffect(() => {
    if (isTrainerEnabled) {
      const welcomeMessage = `Welcome to the Collaboration Hub. This is your central space for team alignment on process improvements. 
      
      Here you can:
      - Start and participate in discussions about process bottlenecks and improvements
      - Review and approve workflow changes with detailed comment systems
      - Schedule process reviews and compliance assessments
      - Manage team collaboration and track all activities
      - Invite new team members and configure collaboration settings
      
      Use the tabs to navigate between discussions, approvals, reviews, and schedule. 
      Each section has comprehensive filtering, search, and interaction capabilities.
      
      The sidebar shows your team members' online status and recent activity feed.
      Click on any notification to get more details or take action.
      
      All actions provide voice feedback to keep you informed of progress and changes.`;

      // Delay the welcome message slightly to allow page to load
      const timer = setTimeout(() => {
        speakText(welcomeMessage);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isTrainerEnabled, speakText]);

  return null; // This component only provides voice guidance
};
