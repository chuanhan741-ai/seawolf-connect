export const conversations = [
  {
    id: 1,
    participant: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      role: "Mentor",
      online: true
    },
    lastMessage: "Sounds great! I'll review your resume before our meeting.",
    timestamp: "2:30 PM",
    unread: 2,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi Priya! I saw you specialize in resume reviews. Could you help me with mine?", time: "1:45 PM", isMe: true },
      { id: 2, sender: "Priya Patel", text: "Of course, Sarah! I'd love to help. Can you send me your current resume?", time: "1:52 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Here it is! I'm mainly looking for feedback on my project descriptions and skills section.", time: "2:10 PM", isMe: true },
      { id: 4, sender: "Priya Patel", text: "Got it! I'll take a detailed look. A few quick things I notice — your bullet points could use more quantifiable metrics.", time: "2:22 PM", isMe: false },
      { id: 5, sender: "Priya Patel", text: "Sounds great! I'll review your resume before our meeting on Thursday.", time: "2:30 PM", isMe: false }
    ]
  },
  {
    id: 2,
    participant: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      role: "Alumni Mentor",
      online: false
    },
    lastMessage: "Let's discuss system design next session!",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi David! I'm a freshman in CS and would love advice on which courses to prioritize.", time: "Mon 4:00 PM", isMe: true },
      { id: 2, sender: "David Kim", text: "Hey Sarah! Great question. Definitely focus on CSE 214 and CSE 220 early — they're foundational.", time: "Mon 6:15 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Thanks! Any tips for 214? I heard it's tough.", time: "Mon 6:30 PM", isMe: true },
      { id: 4, sender: "David Kim", text: "Practice LeetCode easy problems alongside the course. Also, start the projects early — they take longer than you think!", time: "Mon 7:00 PM", isMe: false },
      { id: 5, sender: "David Kim", text: "Let's discuss system design next session! It'll be super useful for internship interviews.", time: "Tue 6:00 PM", isMe: false }
    ]
  },
  {
    id: 3,
    participant: {
      name: "Ryan Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      role: "Alumni Mentor",
      online: true
    },
    lastMessage: "See you Thursday for the mock interview!",
    timestamp: "Monday",
    unread: 1,
    messages: [
      { id: 1, sender: "Ryan Martinez", text: "Hi Sarah! I see you're interested in interview prep. Want to schedule a mock behavioral interview?", time: "Sat 3:00 PM", isMe: false },
      { id: 2, sender: "Sarah Chen", text: "Yes please! I have a Google interview coming up and I'm really nervous.", time: "Sat 4:20 PM", isMe: true },
      { id: 3, sender: "Ryan Martinez", text: "No worries, we'll get you ready! I'll prepare some STAR-method questions focused on tech.", time: "Sun 10:00 AM", isMe: false },
      { id: 4, sender: "Ryan Martinez", text: "See you Thursday for the mock interview! Come prepared with 3 stories about your projects.", time: "Mon 8:00 PM", isMe: false }
    ]
  },
  {
    id: 4,
    participant: {
      name: "Mei Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
      role: "Mentor",
      online: false
    },
    lastMessage: "Let me know if you need help with the lab report!",
    timestamp: "Last week",
    unread: 0,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi Mei! I'm taking ESE 123 and struggling with the circuits homework.", time: "Mar 28 2:00 PM", isMe: true },
      { id: 2, sender: "Mei Chen", text: "Happy to help! Which topics are you stuck on?", time: "Mar 28 3:15 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Mainly Thevenin equivalents and superposition.", time: "Mar 28 3:30 PM", isMe: true },
      { id: 4, sender: "Mei Chen", text: "Those are tricky at first! Let me know if you need help with the lab report too!", time: "Mar 28 4:00 PM", isMe: false }
    ]
  }
];
