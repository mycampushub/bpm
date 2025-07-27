
import { useEffect } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useVoiceTrainer } from "@/contexts/VoiceTrainerContext";

export const ProcessMiningVoiceGuide = () => {
  const { speakText } = useVoice();
  const { isTrainerEnabled } = useVoiceTrainer();

  useEffect(() => {
    if (isTrainerEnabled) {
      const welcomeMessage = `Welcome to Process Mining! This is your comprehensive platform for discovering, analyzing, and optimizing business processes using real event data.
      
      Here you can:
      - Upload event logs in CSV, XES, or JSON format to analyze your actual process flows
      - Discover process variants and see how your processes are really executed
      - Identify bottlenecks and performance issues with detailed analytics
      - Get AI-powered optimization recommendations for process improvements
      - Check conformance against reference models to ensure compliance
      - Export detailed reports with insights and recommendations
      
      Use the interactive statistics to quickly navigate to different sections.
      The Explorer tab shows your process variants and case analysis.
      Performance analysis identifies bottlenecks and optimization opportunities.
      Conformance checking ensures your processes meet compliance requirements.
      
      All actions provide voice feedback and the system will guide you through each step.
      Click on any statistic or analysis result to get more detailed information.`;

      // Delay the welcome message slightly to allow page to load
      const timer = setTimeout(() => {
        speakText(welcomeMessage);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isTrainerEnabled, speakText]);

  return null; // This component only provides voice guidance
};
