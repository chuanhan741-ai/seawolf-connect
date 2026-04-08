import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mentors';

const MAJORS = [
  'Computer Science', 'Biology', 'Psychology', 'Business Management',
  'Electrical Engineering', 'Applied Mathematics', 'Political Science',
  'Chemistry', 'Economics', 'Information Systems'
];
const SUPPORT_TYPES = ['Resume Review', 'Course Help', 'Interview Prep', 'Career Advice'];
const AVAILABILITY = ['Available Now', 'This Week', 'This Month'];
const INDUSTRIES = ['Technology', 'Software Engineering', 'Finance', 'Research / Academia',
  'Mental Health', 'Entrepreneurship', 'Government / Policy', 'Hardware / Embedded Systems'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSupport, setSelectedSupport] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) &&
          !m.major.toLowerCase().includes(search.toLowerCase()) &&
          !m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      if (selectedMajor && m.major !== selectedMajor) return false;
      if (selectedIndustry && m.industry !== selectedIndustry) return false;
      if (selectedSupport && !m.tags.includes(selectedSupport)) return false;
      if (selectedAvailability && m.availability !== selectedAvailability) return false;
      return true;
    });
  }, [search, selectedMajor, selectedIndustry, selectedSupport, selectedAvailability]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSearch('');
    setSelectedMajor('');
    setSelectedIndustry('');
    setSelectedSupport('');
    setSelectedAvailability('');
    setPage(1);
  };

  const hasFilters = selectedMajor || selectedIndustry || selectedSupport || selectedAvailability;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-sbu-black">Explore Mentors</h1>
        <p className="text-sbu-dark-gray mt-1">Find the perfect mentor for your academic and career goals</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sbu-medium-gray" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, major, or expertise..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
            showFilters ? 'bg-sbu-red text-white border-sbu-red' : 'bg-white text-sbu-dark-gray border-gray-300 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        {showFilters && (
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sbu-black">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-sbu-red hover:text-sbu-bright-red font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Major</label>
                  <select value={selectedMajor} onChange={(e) => { setSelectedMajor(e.target.value); setPage(1); }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red">
                    <option value="">All Majors</option>
                    {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Industry</label>
                  <select value={selectedIndustry} onChange={(e) => { setSelectedIndustry(e.target.value); setPage(1); }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red">
                    <option value="">All Industries</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Support Type</label>
                  <div className="space-y-2">
                    {SUPPORT_TYPES.map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="support"
                          checked={selectedSupport === type}
                          onChange={() => { setSelectedSupport(selectedSupport === type ? '' : type); setPage(1); }}
                          className="accent-sbu-red"
                        />
                        <span className="text-sm text-sbu-dark-gray">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Availability</label>
                  <div className="space-y-2">
                    {AVAILABILITY.map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          checked={selectedAvailability === a}
                          onChange={() => { setSelectedAvailability(selectedAvailability === a ? '' : a); setPage(1); }}
                          className="accent-sbu-red"
                        />
                        <span className="text-sm text-sbu-dark-gray">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentor Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-sbu-dark-gray">
              Showing <span className="font-semibold text-sbu-black">{filtered.length}</span> mentors
            </p>
          </div>

          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <Search className="w-12 h-12 text-sbu-light-gray mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-sbu-black mb-2">No mentors found</h3>
              <p className="text-sbu-dark-gray text-sm">Try adjusting your filters or search terms.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === p
                      ? 'bg-sbu-red text-white'
                      : 'bg-white text-sbu-dark-gray border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
