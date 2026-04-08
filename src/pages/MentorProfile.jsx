import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Calendar,
  MessageSquare, Video, Award
} from 'lucide-react';
import { mentors } from '../data/mentors';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function MentorProfile() {
  const { id } = useParams();
  const mentor = mentors.find(m => m.id === Number(id));

  if (!mentor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-sbu-black mb-4">Mentor Not Found</h1>
        <Link to="/explore" className="text-sbu-red hover:text-sbu-bright-red font-medium">
          &larr; Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-sbu-dark-gray hover:text-sbu-red mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-5">
              <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full bg-gray-100" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-heading text-2xl font-bold text-sbu-black">{mentor.name}</h1>
                    <p className="text-sbu-dark-gray">{mentor.role} &middot; {mentor.major}</p>
                    <p className="text-sm text-sbu-medium-gray">{mentor.year}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    mentor.availability === 'Available Now'
                      ? 'bg-green-100 text-green-700'
                      : mentor.availability === 'This Week'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {mentor.availability}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4 fill-current" /> {mentor.rating}
                  </span>
                  <span className="flex items-center gap-1 text-sbu-dark-gray text-sm">
                    <Clock className="w-4 h-4" /> {mentor.sessions} sessions
                  </span>
                  <span className="flex items-center gap-1 text-sbu-dark-gray text-sm">
                    <MapPin className="w-4 h-4" /> Stony Brook, NY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-3">About</h2>
            <p className="text-sbu-dark-gray leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-sbu-red" /> Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-sbu-red/10 text-sbu-red text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sbu-red" /> Weekly Availability
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {DAYS.map(day => (
                <div key={day}>
                  <div className="text-center text-xs font-semibold text-sbu-dark-gray mb-2 pb-2 border-b border-gray-100">
                    {day}
                  </div>
                  <div className="space-y-1.5">
                    {(mentor.weeklySchedule[day] || []).length > 0 ? (
                      mentor.weeklySchedule[day].map(time => (
                        <div
                          key={time}
                          className="text-center text-xs bg-green-50 text-green-700 rounded-md py-1.5 px-1 font-medium border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
                        >
                          {time}
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-xs text-sbu-light-gray py-1.5">—</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-4">
              Reviews ({mentor.reviews.length})
            </h2>
            <div className="space-y-4">
              {mentor.reviews.map((review, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sbu-black text-sm">{review.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star
                            key={j}
                            className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-sbu-medium-gray">{review.date}</span>
                  </div>
                  <p className="text-sm text-sbu-dark-gray">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-heading font-bold text-sbu-black mb-4">Connect with {mentor.name.split(' ')[0]}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-sbu-red text-white py-3 rounded-lg font-semibold hover:bg-sbu-bright-red transition-colors">
                <Video className="w-4 h-4" /> Request Meeting
              </button>
              <Link
                to="/messages"
                className="w-full flex items-center justify-center gap-2 bg-white text-sbu-red py-3 rounded-lg font-semibold border-2 border-sbu-red hover:bg-sbu-red/5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Send Message
              </Link>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Industry</span>
                <span className="font-medium text-sbu-black">{mentor.industry}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Response Time</span>
                <span className="font-medium text-sbu-black">~2 hours</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Meeting Format</span>
                <span className="font-medium text-sbu-black">Virtual / In-Person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
