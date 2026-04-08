import { useState } from 'react';
import {
  Users, UserPlus, Handshake, CalendarCheck, Star,
  TrendingUp, Download, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  adminStats, engagementData, departmentData,
  userGrowthData, mentorRatioData
} from '../data/stats';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('semester');

  const statCards = [
    { label: 'Active Users', value: adminStats.activeUsers.toLocaleString(), change: '+12.3%', up: true, icon: Users, color: 'bg-sbu-red' },
    { label: 'New Registrations', value: adminStats.newRegistrations, change: '+8.7%', up: true, icon: UserPlus, color: 'bg-sbu-navy' },
    { label: 'Monthly Matches', value: adminStats.monthlyMatches, change: '+15.2%', up: true, icon: Handshake, color: 'bg-sbu-royal-blue' },
    { label: 'Total Sessions', value: adminStats.totalSessions.toLocaleString(), change: '+6.1%', up: true, icon: CalendarCheck, color: 'bg-sbu-dark-red' },
    { label: 'Satisfaction Score', value: `${adminStats.satisfactionScore}/5.0`, change: '+0.2', up: true, icon: Star, color: 'bg-amber-600' },
  ];

  const ratioPercent = Math.min(
    (parseInt(mentorRatioData.ratio) / parseInt(mentorRatioData.target)) * 100,
    100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-sbu-black">Admin Dashboard</h1>
          <p className="text-sbu-dark-gray mt-1">Platform analytics and engagement metrics</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-sbu-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sbu-bright-red transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-sbu-dark-gray">{card.label}</span>
              <div className={`${card.color} p-2 rounded-lg`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-sbu-black font-heading">{card.value}</div>
            <div className={`flex items-center gap-1 mt-1 text-sm ${card.up ? 'text-green-600' : 'text-red-600'}`}>
              {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {card.change} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Engagement Rate Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black">Engagement Rate Trend</h2>
            <TrendingUp className="w-5 h-5 text-sbu-medium-gray" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#990000" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#990000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#4B4B4B' }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [`${value}%`, 'Engagement Rate']}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#990000"
                strokeWidth={2.5}
                fill="url(#engagementGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">Users by Department</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#4B4B4B' }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#4B4B4B' }}
                width={110}
              />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [value, 'Users']}
              />
              <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                name="Students"
                stroke="#990000"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="mentors"
                name="Mentors"
                stroke="#002244"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mentor-to-Student Ratio Gauge */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">Mentor-to-Student Ratio</h2>
          <div className="flex flex-col items-center justify-center h-[260px]">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[
                    { value: ratioPercent },
                    { value: 100 - ratioPercent }
                  ]}
                  cx="50%"
                  cy="80%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#990000" />
                  <Cell fill="#f0f0f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-8">
              <div className="text-3xl font-heading font-bold text-sbu-black">{mentorRatioData.ratio}</div>
              <div className="text-sm text-sbu-dark-gray mt-1">Current Ratio</div>
              <div className="text-xs text-sbu-medium-gray mt-0.5">Target: {mentorRatioData.target}</div>
            </div>
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-sbu-black">{mentorRatioData.mentors}</div>
                <div className="text-xs text-sbu-dark-gray">Mentors</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-sbu-black">{mentorRatioData.students.toLocaleString()}</div>
                <div className="text-xs text-sbu-dark-gray">Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
