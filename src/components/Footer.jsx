import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sbu-dark-red text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-heading text-lg font-bold mb-3">
              <GraduationCap className="w-6 h-6" />
              Seawolf Connect
            </div>
            <p className="text-sm leading-relaxed">
              Connecting Stony Brook students with mentors for academic success and career growth.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Seawolf Connect</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy (FERPA)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">SBU Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Career Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academic Advising</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Affairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IT Help Desk (DoIT)</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2026 Stony Brook University. All rights reserved.</p>
          <p className="mt-1 text-white/60">A CSE 300 Group 3 Project — Prototype for Demonstration Purposes</p>
        </div>
      </div>
    </footer>
  );
}
