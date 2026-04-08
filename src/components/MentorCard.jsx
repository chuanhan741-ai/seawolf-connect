import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function MentorCard({ mentor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-14 h-14 rounded-full bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-sbu-black truncate">{mentor.name}</h3>
          <p className="text-sm text-sbu-dark-gray">{mentor.role} &middot; {mentor.major}</p>
          <p className="text-xs text-sbu-medium-gray">{mentor.year}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 text-sm">
        <span className="flex items-center gap-1 text-amber-600">
          <Star className="w-3.5 h-3.5 fill-current" />
          {mentor.rating}
        </span>
        <span className="flex items-center gap-1 text-sbu-dark-gray">
          <Clock className="w-3.5 h-3.5" />
          {mentor.sessions} sessions
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-sbu-red/10 text-sbu-red text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          mentor.availability === 'Available Now'
            ? 'bg-green-100 text-green-700'
            : mentor.availability === 'This Week'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {mentor.availability}
        </span>
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex items-center gap-1 text-sm font-medium text-sbu-red hover:text-sbu-bright-red transition-colors"
        >
          Connect <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
