
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface RoleSelectionProps {
  onNext: (roles: string[]) => void;
  onBack: () => void;
}

const RoleSelection = ({ onNext, onBack }: RoleSelectionProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const roles = [
    { id: 'senior', label: 'Senior', color: 'from-purple-500 to-purple-600' },
    { id: 'c-suite', label: 'C-Suite', color: 'from-blue-500 to-blue-600' },
    { id: 'director', label: 'Director', color: 'from-indigo-500 to-indigo-600' },
    { id: 'founding', label: 'Founding', color: 'from-purple-600 to-pink-600' },
    { id: 'vp', label: 'VP', color: 'from-blue-600 to-cyan-600' },
    { id: 'engineering', label: 'Engineering', color: 'from-green-500 to-green-600' },
    { id: 'sales', label: 'Sales', color: 'from-orange-500 to-red-500' },
    { id: 'marketing', label: 'Marketing', color: 'from-pink-500 to-rose-500' },
    { id: 'gtm-growth', label: 'GTM/Growth', color: 'from-violet-500 to-purple-500' },
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleNext = () => {
    if (selectedRoles.length > 0) {
      onNext(selectedRoles);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step 1 of 3</span>
              <span>33% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What roles are you <span className="gradient-text">hiring for?</span>
            </h1>
            <p className="text-xl text-gray-600">
              Select all that apply to get more targeted recommendations
            </p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 group ${
                  selectedRoles.includes(role.id)
                    ? `border-purple-500 bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                    : 'border-gray-200 bg-white/60 backdrop-blur-sm hover:border-purple-300 hover:shadow-md card-hover'
                }`}
              >
                <div className="text-center">
                  <div className={`text-lg font-semibold ${
                    selectedRoles.includes(role.id) ? 'text-white' : 'text-gray-900'
                  }`}>
                    {role.label}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Count */}
          {selectedRoles.length > 0 && (
            <div className="text-center mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 text-sm font-medium text-purple-700">
                {selectedRoles.length} role{selectedRoles.length !== 1 ? 's' : ''} selected
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
              disabled={selectedRoles.length === 0}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
