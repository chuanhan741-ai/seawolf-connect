import { useState } from 'react';
import { User, BookOpen, Target, Settings, Save, Camera } from 'lucide-react';
import { currentUser } from '../data/mentors';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    major: currentUser.major,
    year: currentUser.year,
    bio: currentUser.bio,
    goals: currentUser.goals,
    tags: currentUser.tags,
    prefMajor: currentUser.preferences.major,
    prefIndustry: currentUser.preferences.industry,
    prefFormat: currentUser.preferences.format,
  });
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const allTags = ['Course Planning', 'Internship Prep', 'Research', 'Resume Writing',
    'Interview Prep', 'Career Advice', 'Switching Majors', 'Graduate School',
    'Networking', 'Study Groups', 'Leadership', 'Entrepreneurship'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold text-sbu-black">My Profile</h1>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-sbu-red text-white hover:bg-sbu-bright-red'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-sbu-red" /> Personal Information
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <img src={currentUser.avatar} alt="" className="w-20 h-20 rounded-full bg-gray-100" />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-sbu-red text-white rounded-full flex items-center justify-center shadow-md hover:bg-sbu-bright-red">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-sbu-black">{profile.name}</h3>
              <p className="text-sm text-sbu-dark-gray">SBU ID: {currentUser.sbuId}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-sbu-medium-gray"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Major</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => update('major', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Year</label>
              <select
                value={profile.year}
                onChange={(e) => update('year', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Graduate</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red resize-none"
            />
          </div>
        </section>

        {/* Academic Goals */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-sbu-red" /> Academic & Career Goals
          </h2>
          <div className="space-y-3">
            {profile.goals.map((goal, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-sbu-red/10 text-sbu-red rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => {
                    const newGoals = [...profile.goals];
                    newGoals[i] = e.target.value;
                    update('goals', newGoals);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sbu-red" /> Skills & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  const newTags = profile.tags.includes(tag)
                    ? profile.tags.filter(t => t !== tag)
                    : [...profile.tags, tag];
                  update('tags', newTags);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  profile.tags.includes(tag)
                    ? 'bg-sbu-red text-white'
                    : 'bg-gray-100 text-sbu-dark-gray hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Mentor Preferences */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <Settings className="w-5 h-5 text-sbu-red" /> Mentor Preferences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Preferred Major</label>
              <select
                value={profile.prefMajor}
                onChange={(e) => update('prefMajor', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Computer Science</option>
                <option>Biology</option>
                <option>Psychology</option>
                <option>Business Management</option>
                <option>Electrical Engineering</option>
                <option>Information Systems</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Preferred Industry</label>
              <select
                value={profile.prefIndustry}
                onChange={(e) => update('prefIndustry', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Research / Academia</option>
                <option>Healthcare</option>
                <option>Government / Policy</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Meeting Format</label>
              <select
                value={profile.prefFormat}
                onChange={(e) => update('prefFormat', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Virtual</option>
                <option>In-Person</option>
                <option>Either</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
