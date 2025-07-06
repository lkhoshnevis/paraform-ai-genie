
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Clock, Users, DollarSign, Target, Wrench, Eye, TrendingUp, Search } from 'lucide-react';

interface PainSelectionProps {
  onNext: (pains: string[]) => void;
  onBack: () => void;
}

const PainSelection = ({ onNext, onBack }: PainSelectionProps) => {
  const [selectedPains, setSelectedPains] = useState<string[]>([]);

  const pains = [
    { 
      id: 'long-hiring-periods', 
      label: 'Long hiring periods', 
      icon: Clock,
      description: 'Hiring takes too long and kills momentum'
    },
    { 
      id: 'finding-skill-fit', 
      label: 'Finding skill fit', 
      icon: Target,
      description: 'Hard to find candidates with the right technical skills'
    },
    { 
      id: 'finding-culture-fit', 
      label: 'Finding culture fit', 
      icon: Users,
      description: 'Candidates don\'t align with company culture'
    },
    { 
      id: 'recruiters-quality', 
      label: 'Recruiters - quality of prospects', 
      icon: TrendingUp,
      description: 'Recruiters send unqualified candidates'
    },
    { 
      id: 'too-much-manual-work', 
      label: 'Too much manual work', 
      icon: Wrench,
      description: 'Hiring process requires too much manual effort'
    },
    { 
      id: 'recruiters-oversight', 
      label: 'Recruiters - too much oversight needed', 
      icon: Eye,
      description: 'Recruiters require constant management and guidance'
    },
    { 
      id: 'recruiters-expensive', 
      label: 'Recruiters - too expensive', 
      icon: DollarSign,
      description: 'Traditional recruiting agencies are costly'
    },
    { 
      id: 'job-boards-sifting', 
      label: 'Job boards - too much sifting', 
      icon: Search,
      description: 'Too many unqualified applicants to review'
    },
  ];

  const togglePain = (painId: string) => {
    setSelectedPains(prev => 
      prev.includes(painId) 
        ? prev.filter(id => id !== painId)
        : [...prev, painId]
    );
  };

  const handleNext = () => {
    if (selectedPains.length > 0) {
      onNext(selectedPains);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step 2 of 3</span>
              <span>66% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '66%' }}></div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Select your top <span className="gradient-text">challenges</span>
            </h1>
            <p className="text-xl text-gray-600">
              So we can provide relevant solutions
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {pains.map((pain) => {
              const IconComponent = pain.icon;
              return (
                <button
                  key={pain.id}
                  onClick={() => togglePain(pain.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                    selectedPains.includes(pain.id)
                      ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'border-gray-200 bg-white/60 backdrop-blur-sm hover:border-purple-300 hover:shadow-md card-hover'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedPains.includes(pain.id)
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        selectedPains.includes(pain.id) ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg mb-2 ${
                        selectedPains.includes(pain.id) ? 'text-white' : 'text-gray-900'
                      }`}>
                        {pain.label}
                      </h3>
                      <p className={`text-sm ${
                        selectedPains.includes(pain.id) ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {pain.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Count */}
          {selectedPains.length > 0 && (
            <div className="text-center mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 text-sm font-medium text-purple-700">
                {selectedPains.length} challenge{selectedPains.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedPains.length === 0}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Results
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainSelection;
