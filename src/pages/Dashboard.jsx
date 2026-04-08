import { Link } from 'react-router-dom';
import {
  Search, Calendar, MessageSquare, TrendingUp,
  ArrowRight, Sparkles, Clock, Users
} from 'lucide-react';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mentors';
import { currentUser } from '../data/mentors';
import { appointments, communityTopics } from '../data/stats';

export default function Dashboard() {
  const recommendedMentors = mentors.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sbu-dark-red to-sbu-red rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-white/90">
              {currentUser.major} &middot; {currentUser.year} &middot; Stony Brook University
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Link to="/explore" className="flex items-center gap-2 bg-white text-sbu-red px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
              <Search className="w-4 h-4" /> Find Mentors
            </Link>
            <Link to="/messages" className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors border border-white/30">
              <MessageSquare className="w-4 h-4" /> Messages
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Mentors */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-sbu-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sbu-red" />
                Recommended Mentors
              </h2>
              <Link to="/explore" className="text-sm text-sbu-red hover:text-sbu-bright-red font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section>
            <h2 className="font-heading text-xl font-bold text-sbu-black flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-sbu-red" />
              Upcoming Appointments
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sbu-red/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-sbu-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sbu-black">{apt.topic}</h3>
                      <p className="text-sm text-sbu-dark-gray">with {apt.mentor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-sbu-black">{apt.date}</div>
                    <div className="text-xs text-sbu-medium-gray">{apt.time} &middot; {apt.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-sbu-black mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sbu-red" />
              Your Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Sessions Completed</span>
                <span className="font-bold text-sbu-black">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Mentors Connected</span>
                <span className="font-bold text-sbu-black">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Goals Achieved</span>
                <span className="font-bold text-sbu-black">1 / 3</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-sbu-medium-gray mb-1">
                  <span>Profile Completion</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-sbu-red h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Community Topics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-sbu-black mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-sbu-red" />
              Active Community Topics
            </h3>
            <div className="space-y-3">
              {communityTopics.map((topic) => (
                <div key={topic.id} className="group cursor-pointer">
                  <div className="flex items-start gap-2">
                    {topic.hot && <span className="text-xs bg-sbu-bright-red text-white px-1.5 py-0.5 rounded font-medium mt-0.5">HOT</span>}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sbu-black group-hover:text-sbu-red transition-colors truncate">
                        {topic.title}
                      </p>
                      <p className="text-xs text-sbu-medium-gray">{topic.replies} replies &middot; {topic.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sbu-black flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sbu-red" />
                Recent Messages
              </h3>
              <Link to="/messages" className="text-xs text-sbu-red hover:text-sbu-bright-red font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Priya Patel", msg: "I'll review your resume before our meeting.", time: "2:30 PM", unread: true },
                { name: "David Kim", msg: "Let's discuss system design next session!", time: "Yesterday", unread: false },
                { name: "Ryan Martinez", msg: "See you Thursday for the mock interview!", time: "Monday", unread: true }
              ].map((m) => (
                <Link to="/messages" key={m.name} className="flex items-start gap-3 group">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name.split(' ')[0]}`}
                    alt={m.name}
                    className="w-8 h-8 rounded-full bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-sbu-black">{m.name}</span>
                      {m.unread && <span className="w-2 h-2 bg-sbu-bright-red rounded-full" />}
                    </div>
                    <p className="text-xs text-sbu-dark-gray truncate">{m.msg}</p>
                  </div>
                  <span className="text-xs text-sbu-medium-gray whitespace-nowrap">{m.time}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
