import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Zap, Users, ArrowRight, Shield, ChevronRight } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart Match",
      description: "AI-powered matching by major, interests, and career goals. Find the mentor who truly understands your path."
    },
    {
      icon: Zap,
      title: "Flash Mentoring",
      description: "Quick, one-time conversations for immediate guidance. Get answers without long-term commitment."
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Join major-specific groups, attend alumni AMAs, and access shared resources from the Seawolf network."
    }
  ];

  const stats = [
    { value: "27,200+", label: "Students Enrolled" },
    { value: "200K+", label: "Alumni Network" },
    { value: "#59", label: "US News National" },
    { value: "#1", label: "Public University in NY" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-sbu-dark-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-heading text-xl font-bold">
            <GraduationCap className="w-8 h-8" />
            Seawolf Connect
          </div>
          <Link
            to="/dashboard"
            className="bg-white text-sbu-red px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign In with SBU NetID
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sbu-dark-red via-sbu-red to-sbu-dark-red text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4" />
              FERPA Compliant &middot; SBU NetID Secured
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your<br />Seawolf Mentor
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Connect with experienced upperclassmen and alumni who've walked your path at Stony Brook. Get personalized guidance for courses, careers, and campus life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-sbu-red px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                Browse Mentors <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-sbu-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-heading font-bold">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-sbu-black mb-4">
              How Seawolf Connect Works
            </h2>
            <p className="text-sbu-dark-gray text-lg max-w-2xl mx-auto">
              Three powerful ways to find the guidance you need at every stage of your Stony Brook journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-sbu-red/10 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-sbu-red" />
                </div>
                <h3 className="font-heading text-xl font-bold text-sbu-black mb-3">{feature.title}</h3>
                <p className="text-sbu-dark-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-sbu-black mb-4">
            Ready to Connect with Your Seawolf Community?
          </h2>
          <p className="text-sbu-dark-gray text-lg mb-8">
            Join thousands of Stony Brook students already building meaningful mentorship connections.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-sbu-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sbu-bright-red transition-colors shadow-lg"
          >
            Sign In with SBU NetID <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-sbu-medium-gray mt-4">
            Secured with Shibboleth SSO &middot; FERPA Compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sbu-dark-red text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
          <p>&copy; 2026 Stony Brook University. All rights reserved.</p>
          <p className="mt-1 text-white/60">A CSE 300 Group 3 Project</p>
        </div>
      </footer>
    </div>
  );
}
