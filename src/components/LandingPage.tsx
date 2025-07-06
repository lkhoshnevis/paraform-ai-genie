
import { ArrowRight, CheckCircle, Building2, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const logos = [
    "DECAGON",
    "YC PORTFOLIO", 
    "SERIES A+",
    "UNICORN"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">
            Paraform Genie
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm text-muted-foreground">Trusted by 200+ startups</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Demos take long</span>
              <br />
              <span className="text-gray-900">Get your hiring strategy in 60 seconds</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Answer a few quick questions about your startup's hiring needs, and we'll provide you with your 
              <span className="font-semibold text-primary"> Personalized Hiring Strategy</span>
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-12">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Takes less than 1 minute
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No signup required
              </div>
            </div>

            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Your AI Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Get tailored solutions in under 60 seconds based on your specific challenges</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Proven Results</h3>
              <p className="text-gray-600 text-sm">Success stories from 200+ high-growth startups who solved their hiring challenges</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Startup Focused</h3>
              <p className="text-gray-600 text-sm">Solutions designed specifically for startup hiring challenges and constraints</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-6">Trusted by 200+ high-growth startups</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {logos.map((logo, index) => (
                <div key={index} className="px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30">
                  <span className="text-sm font-medium text-gray-700">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
