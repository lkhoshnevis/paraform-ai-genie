
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import RoleSelection from '@/components/RoleSelection';
import PainSelection from '@/components/PainSelection';
import Results from '@/components/Results';

type Step = 'landing' | 'roles' | 'pains' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentStep('roles');
  };

  const handleRoleSelection = (roles: string[]) => {
    setSelectedRoles(roles);
    setCurrentStep('pains');
  };

  const handlePainSelection = (pains: string[]) => {
    setSelectedPains(pains);
    setCurrentStep('results');
  };

  const handleBackToLanding = () => {
    setCurrentStep('landing');
    setSelectedRoles([]);
    setSelectedPains([]);
  };

  const handleBackToRoles = () => {
    setCurrentStep('roles');
  };

  const handleBackToPains = () => {
    setCurrentStep('pains');
  };

  const handleDemo = () => {
    // Track demo conversion
    console.log('Demo conversion tracked', {
      roles: selectedRoles,
      pains: selectedPains,
      timestamp: new Date().toISOString()
    });

    // In a real app, you would redirect to the actual Paraform website
    window.open('https://paraform.com', '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onStart={handleStart} />;
      case 'roles':
        return <RoleSelection onNext={handleRoleSelection} onBack={handleBackToLanding} />;
      case 'pains':
        return <PainSelection onNext={handlePainSelection} onBack={handleBackToRoles} />;
      case 'results':
        return (
          <Results
            roles={selectedRoles}
            pains={selectedPains}
            onBack={handleBackToPains}
            onDemo={handleDemo}
          />
        );
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return renderStep();
};

export default Index;
