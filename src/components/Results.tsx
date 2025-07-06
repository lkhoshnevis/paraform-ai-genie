import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, CheckCircle, Clock, Target, Users, Zap, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ResultsProps {
  roles: string[];
  pains: string[];
  sessionId: string;
  onBack: () => void;
  onDemo: () => void;
}

interface AIRecommendation {
  title: string;
  description: string;
}

const Results = ({ roles, pains, sessionId, onBack, onDemo }: ResultsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);

  // Mock data for case studies and metrics
  const caseStudies = {
    'founding': [
      { company: 'Decagon', role: 'Founding Engineer', timeframe: '21 days', recruiter: 'Expert Network' },
      { company: 'Carma', role: 'Founding Engineer', timeframe: '28 days', recruiter: 'Paraform Network' },
      { company: 'Statics', role: 'Founding Engineer', timeframe: '28 days', recruiter: 'Vetted Recruiters' }
    ],
    'engineering': [
      { company: 'Aspire', role: 'Senior Software Engineer', timeframe: '3 weeks', recruiter: 'Cheri Muhle' },
      { company: 'Sailes', role: 'Staff Software Engineer', timeframe: '1 week', recruiter: 'Cheri Muhle' },
      { company: 'Terradot', role: 'Tech Lead', timeframe: '2 weeks', recruiter: 'Marcus Dubois' }
    ],
    'sales': [
      { company: 'Decagon', role: 'Founding Account Executive', timeframe: 'under 1 month', recruiter: 'Sean Hallihan' },
      { company: 'Pylon', role: 'Growth Marketer', timeframe: '10 days', recruiter: 'Anna Malayan' }
    ],
    'marketing': [
      { company: 'Keeper', role: 'Head of Marketing', timeframe: '3 weeks', recruiter: 'Luis Pedemonte' },
      { company: 'Pylon', role: 'Growth Marketer', timeframe: '10 days', recruiter: 'Anna Malayan' }
    ]
  };

  const painSolutions = {
    'long-hiring-periods': {
      title: 'Accelerated Hiring Process',
      solution: 'With Paraform, multiple vetted recruiters work simultaneously via job bounties, reducing average hiring time to 26-28 days. Our streamlined platform eliminates delays with centralized communication and quick feedback loops.',
      metrics: ['26-28 days average time to hire', '50% reduction in hiring time', '70% of candidates get interviewed']
    },
    'recruiters-oversight': {
      title: 'Minimal Oversight Required',
      solution: 'Our platform provides centralized Slack communication, automated feedback loops, and pre-screening processes. Recruiters are vetted and provide activity logs, eliminating the need for constant management.',
      metrics: ['Centralized communication', 'Pre-screened candidates', 'Activity tracking built-in']
    },
    'recruiters-expensive': {
      title: 'Cost-Effective Solution',
      solution: 'Paraform is 35-40% cheaper than traditional recruiting agencies while delivering higher quality results through our competitive marketplace model.',
      metrics: ['35-40% cost reduction', 'No retainer fees', 'Pay for results only']
    },
    'finding-skill-fit': {
      title: 'Precise Skill Matching',
      solution: 'Our network of specialized recruiters understand niche technical requirements. Detailed job specifications and direct hiring manager communication ensure precise skill matching.',
      metrics: ['Specialized recruiter network', 'Technical skill validation', 'Direct communication channels']
    }
  };

  // Generate AI-powered personalized content
  useEffect(() => {
    const generatePersonalizedContent = async () => {
      if (!sessionId || roles.length === 0 || pains.length === 0) return;

      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: {
            sessionId,
            roles,
            pains
          }
        });

        if (error) {
          console.error('Error calling OpenAI function:', error);
          toast.error('Failed to generate personalized recommendations');
          return;
        }

        if (data.recommendations) {
          try {
            const parsedRecommendations = JSON.parse(data.recommendations);
            if (parsedRecommendations.recommendations && Array.isArray(parsedRecommendations.recommendations)) {
              setAiRecommendations(parsedRecommendations.recommendations);
            }
          } catch (parseError) {
            console.error('Error parsing AI recommendations:', parseError);
            // Fallback to showing the raw response
            setAiRecommendations([{
              title: "Personalized Recommendation",
              description: data.recommendations || data.fallback || "We recommend using Paraform to streamline your hiring process."
            }]);
          }
        }
      } catch (error) {
        console.error('Error generating personalized content:', error);
        toast.error('Failed to generate personalized recommendations');
      } finally {
        setIsLoading(false);
      }
    };

    generatePersonalizedContent();
  }, [sessionId, roles, pains]);

  const getRelevantCaseStudies = () => {
    let studies: any[] = [];
    roles.forEach(role => {
      if (caseStudies[role as keyof typeof caseStudies]) {
        studies = [...studies, ...caseStudies[role as keyof typeof caseStudies]];
      }
    });
    return studies.slice(0, 3); // Show max 3 case studies
  };

  const handleDemoClick = () => {
    // Track demo button click
    console.log('Demo button clicked', { sessionId, roles, pains, timestamp: new Date().toISOString() });
    
    toast.success('Redirecting to Paraform demo...');
    onDemo();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Generating Your Personalized Strategy</h2>
          <p className="text-gray-500">Analyzing your needs and creating custom recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step 3 of 3</span>
              <span>100% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Here's Your <span className="gradient-text">AI-Powered</span> Hiring Strategy
            </h1>
            <p className="text-xl text-gray-600">
              Personalized recommendations based on your specific needs
            </p>
          </div>

          {/* Your Selections Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Your Target Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <span key={role} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Your Key Challenges
              </h3>
              <div className="flex flex-wrap gap-2">
                {pains.map(pain => (
                  <span key={pain} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {pain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI-Generated Recommendations */}
          {aiRecommendations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-purple-500" />
                AI-Powered Recommendations for You
              </h3>
              <div className="space-y-6">
                {aiRecommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200 shadow-sm">
                    <h4 className="text-xl font-bold mb-3 text-gray-900">{recommendation.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solutions */}
          <div className="space-y-8 mb-12">
            {pains.map(pain => {
              const solution = painSolutions[pain as keyof typeof painSolutions];
              if (!solution) return null;

              return (
                <div key={pain} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-white/30 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{solution.title}</h3>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{solution.solution}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {solution.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center text-green-700">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        <span className="font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Stories */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-white/30 shadow-lg mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
              Success Stories Like Yours
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {getRelevantCaseStudies().map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                  <div className="font-bold text-lg text-gray-900 mb-2">{study.company}</div>
                  <div className="text-gray-700 mb-2">{study.role}</div>
                  <div className="flex items-center text-green-700 font-semibold">
                    <Clock className="w-4 h-4 mr-1" />
                    Hired in {study.timeframe}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">by {study.recruiter}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-purple-800 text-center font-medium">
                "Paraform helped us reduce hiring time by 50% while improving candidate quality significantly."
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl shadow-lg mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Startups Choose Paraform</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">26 days</div>
                <div className="text-purple-100">Average time to hire</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">35-40%</div>
                <div className="text-purple-100">Cheaper than agencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">70%</div>
                <div className="text-purple-100">Candidates interviewed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-purple-100">Startups helped</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Ready to transform your hiring?</h3>
            <p className="text-gray-600 mb-6">See how Paraform can solve your specific challenges</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleDemoClick}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Book a Demo
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <a 
                href="https://paraform.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium underline"
              >
                Learn more about Paraform
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
