export const CHALLENGES = [
  {
    id: 1,
    title: "Financial Aid Refund Notice",
    learningObjective: "Identify lookalike sender domains and mismatched hyperlinked URLs disguised as refund disbursements.",
    category: "Financial Aid & Bursar Scam",
    type: "suspicious",
    difficulty: "Beginner",
    email: {
      senderName: "State University Bursar Office",
      senderEmail: "bursar-refunds@campus-edu-portal-support.com",
      officialEmailEquivalent: "bursar@stateuni.edu",
      recipient: "alex.morgan@stateuni.edu (You)",
      subject: "[URGENT] Fall Semester Tuition Refund Balance: $1,428.50 Ready for Direct Deposit",
      date: "Today at 08:42 AM",
      externalBanner: true,
      body: {
        salutation: "Dear Student,",
        paragraphs: [
          "Our automated end-of-quarter billing audit has processed an unexpected overpayment for your registered credit hours. A direct deposit reimbursement of $1,428.50 has been approved and staged for transfer.",
          "Due to strict federal fiscal compliance regulations, student accounts with unclaimed balances are subject to automated forfeiture back to state reserve accounts if not claimed within 24 hours."
        ],
        callToAction: {
          label: "Verify Direct Deposit Banking Details",
          displayText: "https://bursar.stateuni.edu/student-accounts/direct-deposit-claim",
          actualUrl: "http://login-verify-stateuni.phishingsite.net/portal/auth",
          previewWarning: "Warning: Hover reveals target domain is 'phishingsite.net', not 'stateuni.edu'!"
        },
        signoff: "Office of the Bursar & Student Financial Services\nState University Administration Center",
        disclaimer: "State University automated notification. Do not reply to this email."
      }
    },
    clues: [
      {
        id: "clue-sender",
        label: "Sender Domain Anomaly",
        location: "From: bursar-refunds@campus-edu-portal-support.com",
        isRedFlag: true,
        description: "The sender uses 'campus-edu-portal-support.com'. Legitimate university offices always send from '@stateuni.edu'."
      },
      {
        id: "clue-urgency",
        label: "Artificial Panic & Deadline",
        location: "'...must claim within 24 hours or funds forfeit'",
        isRedFlag: true,
        description: "Scammers create false panic and tight deadlines to push you into acting without thinking."
      },
      {
        id: "clue-link",
        label: "Mismatched Destination URL",
        location: "Link text says 'bursar.stateuni.edu' but points to 'phishingsite.net'",
        isRedFlag: true,
        description: "The link text displays a safe-looking university address, but hovering reveals a shady external credential harvester."
      },
      {
        id: "clue-salutation",
        label: "Generic Greeting",
        location: "'Dear Student,'",
        isRedFlag: true,
        description: "Your official bursar's office knows your full name and student ID. Phishing emails use generic greetings to blast thousands of targets."
      }
    ],
    feedback: {
      summary: "This was a malicious Phishing Scam impersonating the university bursar.",
      detailedExplanation: "Attackers frequently target university students with promises of unexpected tuition refunds, financial aid windfalls, or scholarship credits. The high monetary reward ($1,428.50) combined with high urgency (24-hour deadline) is designed to trigger impulse clicks.",
      keyLessons: [
        "Inspect the full sender email address, not just the display name.",
        "Hover over hyperlinks before clicking to verify the true web address in your browser status bar.",
        "Remember that real university refunds process automatically through your registered student portal without urgent email verification."
      ],
      safeActionSteps: [
        "Do NOT click any links or enter your bank account or university credentials.",
        "Open a fresh browser window and log directly into your official student portal at my.stateuni.edu.",
        "Check your official financial balance directly in the student account center.",
        "Use your webmail client's 'Report Phishing' button or forward the message to security@stateuni.edu."
      ]
    }
  },
  {
    id: 2,
    title: "University IT Multi-Factor Authentication Upgrade",
    learningObjective: "Recognize legitimate campus IT security announcements and verify standard operating procedures.",
    category: "Campus IT Announcement",
    type: "genuine",
    difficulty: "Intermediate",
    email: {
      senderName: "State University IT Services",
      senderEmail: "helpdesk@stateuni.edu",
      officialEmailEquivalent: "helpdesk@stateuni.edu",
      recipient: "alex.morgan@stateuni.edu (You)",
      subject: "Scheduled Maintenance: Duo Mobile Multi-Factor Authentication Upgrade (Nov 12)",
      date: "Yesterday at 02:15 PM",
      externalBanner: false,
      body: {
        salutation: "Hello Alex,",
        paragraphs: [
          "As part of our annual cybersecurity improvement roadmap announced in last month's campus newsletter, University IT will upgrade our Duo Multi-Factor Authentication login interface on Tuesday, November 12, between 2:00 AM and 4:00 AM EST.",
          "What this means for you:\n• No passwords or login credentials are required or requested.\n• Your current Duo Mobile app pushes and security tokens will continue working automatically.\n• You will notice a refreshed university banner on the login screen starting Wednesday morning.",
          "If you experience any difficulties accessing student services after 4:00 AM, our campus Tech Support Center is open at the Central Library (Room 104) or by phone at ext. 4357 (HELP)."
        ],
        callToAction: {
          label: "View Scheduled IT Maintenance Calendar",
          displayText: "https://it.stateuni.edu/maintenance-calendar",
          actualUrl: "https://it.stateuni.edu/maintenance-calendar",
          previewWarning: "Verified: Target matches the official university domain 'it.stateuni.edu'."
        },
        signoff: "State University Information Technology Services\nTech Support Center | Central Library, Rm 104\nPhone: (555) 019-4357 | it.stateuni.edu",
        disclaimer: "Reminder: University IT will NEVER ask for your password, PIN, or Duo passcode via email."
      }
    },
    clues: [
      {
        id: "clue-sender-genuine",
        label: "Verified Campus Domain",
        location: "From: helpdesk@stateuni.edu",
        isRedFlag: false,
        description: "Sent from the official university domain '@stateuni.edu' matching the campus IT directory."
      },
      {
        id: "clue-no-credentials",
        label: "Zero Credential Harvesting",
        location: "'No passwords or credentials required or requested'",
        isRedFlag: false,
        description: "The email explicitly reminds students that IT never asks for credentials, passcodes, or tokens."
      },
      {
        id: "clue-matching-url",
        label: "Authentic Hyperlink",
        location: "Link points to https://it.stateuni.edu/maintenance-calendar",
        isRedFlag: false,
        description: "The displayed link and actual destination match identically and point to the verified .edu infrastructure."
      },
      {
        id: "clue-contact-info",
        label: "Verifiable Campus Location",
        location: "Central Library Room 104 & official phone extension",
        isRedFlag: false,
        description: "Includes verifiable physical campus locations and legitimate campus support extensions."
      }
    ],
    feedback: {
      summary: "This was a Genuine, Legitimate IT Announcement.",
      detailedExplanation: "Security awareness isn't just about spotting scams—it's also about recognizing safe, authentic university communications so you stay informed about critical campus maintenance without unnecessary anxiety.",
      keyLessons: [
        "Legitimate IT notices provide advance schedules and do not demand urgent credentials.",
        "Authentic communications point to publicly verifiable resources and physical offices.",
        "Hovering over links confirms they lead to the authentic '.stateuni.edu' domain."
      ],
      safeActionSteps: [
        "Read the announcement to stay aware of planned maintenance windows.",
        "Bookmark the official IT status page in your browser for future reference.",
        "Remember the cardinal rule: Official IT will never ask for your password or Duo push confirmation over email or phone."
      ]
    }
  },
  {
    id: 3,
    title: "Professor Research Grant Urgent Gift Card Request",
    learningObjective: "Detect spear phishing / Business Email Compromise (BEC) attempting to exploit student authority and urgency.",
    category: "Spear Phishing / Professor Impersonation",
    type: "suspicious",
    difficulty: "Intermediate",
    email: {
      senderName: "Dr. Margaret Hamilton (Dept. Chair)",
      senderEmail: "prof.m.hamilton.stateuni@gmail.com",
      officialEmailEquivalent: "mhamilton@stateuni.edu",
      recipient: "alex.morgan@stateuni.edu (You)",
      subject: "[CONFIDENTIAL] Are you on campus right now? Quick favor needed for department symposium",
      date: "Today at 11:05 AM",
      externalBanner: true,
      body: {
        salutation: "Alex,",
        paragraphs: [
          "Are you currently near campus or the bookstore today? I am chairing an emergency faculty senate review meeting and cannot take incoming phone calls or step out of the hall.",
          "I need a quick favor. We have five distinguished guest speakers arriving for our department research symposium this afternoon, and our committee forgot to purchase the honorarium vouchers. Could you quickly purchase five $100 Apple or Google Play digital gift cards from the bookstore or local store?",
          "Please scratch the back, take clear photos of the redemption codes and PINs, and email them back to me as soon as possible. I will issue an official university department reimbursement check to you first thing tomorrow morning.",
          "Please handle this discreetly as the vouchers are meant to be a surprise. Sent from my iPad."
        ],
        callToAction: {
          label: "Reply Directly with Gift Card PIN Codes",
          displayText: "mailto:prof.m.hamilton.stateuni@gmail.com?subject=Gift%20Card%20Codes",
          actualUrl: "mailto:prof.m.hamilton.stateuni@gmail.com",
          previewWarning: "Warning: Replying sends non-refundable gift card codes to an external personal Gmail account!"
        },
        signoff: "Dr. Margaret Hamilton\nProfessor & Chair of Computer Science\nState University Department of Computing",
        disclaimer: "Sent from Dr. Hamilton's mobile device via external network."
      }
    },
    clues: [
      {
        id: "clue-gmail",
        label: "Personal External Address",
        location: "From: prof.m.hamilton.stateuni@gmail.com",
        isRedFlag: true,
        description: "The sender uses a free public '@gmail.com' address with the professor's name instead of the faculty domain '@stateuni.edu'."
      },
      {
        id: "clue-gift-cards",
        label: "Gift Card Payment Request",
        location: "'...purchase five $100 Apple or Google Play gift cards'",
        isRedFlag: true,
        description: "Gift cards are untraceable and non-refundable. Universities never authorize gift card purchases as official payment."
      },
      {
        id: "clue-isolation",
        label: "Secrecy & Phone Isolation",
        location: "'...cannot take phone calls... handle this discreetly'",
        isRedFlag: true,
        description: "The attacker invents an excuse for why you cannot call or talk to them, isolating you from second opinions."
      },
      {
        id: "clue-authority",
        label: "Exploiting Faculty Hierarchy",
        location: "Posing as Department Chair / Professor",
        isRedFlag: true,
        description: "Scammers research university directories and pose as authority figures hoping students won't dare to question them."
      }
    ],
    feedback: {
      summary: "This was a targeted Spear Phishing / Gift Card Scam.",
      detailedExplanation: "This is one of the most rampant scams targeting university students and junior staff. Attackers scrape professor names from public department faculty web pages and create lookalike Gmail accounts. Once gift card PINs are sent, the funds are drained within seconds and cannot be recovered.",
      keyLessons: [
        "University professors will NEVER ask students to buy gift cards or advance personal money.",
        "Always check if an email from faculty comes from an authentic '@stateuni.edu' address.",
        "Whenever someone insists on secrecy or claims they 'cannot take phone calls', treat it with extreme suspicion."
      ],
      safeActionSteps: [
        "Do NOT purchase any gift cards or send money.",
        "Do NOT reply to the Gmail address.",
        "Verify independently by calling the professor's official campus office number listed in the public university directory.",
        "Report the impersonation attempt to your department administrator and campus security."
      ]
    }
  },
  {
    id: 4,
    title: "Campus Library Overdue Book Fine Notice",
    learningObjective: "Spot lookalike subdomains and high-pressure threats designed to extort payment through suspicious third-party portals.",
    category: "Administrative Fine Extortion",
    type: "suspicious",
    difficulty: "Advanced",
    email: {
      senderName: "Campus Library Circulation Desk",
      senderEmail: "circulation-notice@stateuni-library-desk.com",
      officialEmailEquivalent: "library@stateuni.edu",
      recipient: "alex.morgan@stateuni.edu (You)",
      subject: "Final Notice: Unreturned Loan Item #88419 - Immediate Academic Hold Pending",
      date: "Today at 07:18 AM",
      externalBanner: true,
      body: {
        salutation: "Attention Library Borrower,",
        paragraphs: [
          "Our central circulation database has flagged loan #88419 (Item: Advanced Database Architecture, 3rd Ed.) as 14 days overdue. Accumulated late fees and replacement billing now total $85.00.",
          "Failure to remit settlement via our express online terminal within 12 hours will trigger an immediate administrative hold on your student account. This hold blocks class registration, official transcript requests, and university Wi-Fi privileges."
        ],
        callToAction: {
          label: "Pay Outstanding $85.00 Fine Immediately",
          displayText: "https://library.stateuni.edu/circulation/pay-fines-online",
          actualUrl: "http://secure-payment-gateway-checkout.xyz/stateuni-billing",
          previewWarning: "Warning: Hyperlink target directs to 'secure-payment-gateway-checkout.xyz', a non-university billing portal!"
        },
        signoff: "Circulation & Reserves Department\nState University Central Library\ncirculation@stateuni-library-desk.com",
        disclaimer: "Failure to comply within 12 hours results in irrevocable bursar hold placement."
      }
    },
    clues: [
      {
        id: "clue-lib-domain",
        label: "Spoofed Domain Registration",
        location: "From: circulation-notice@stateuni-library-desk.com",
        isRedFlag: true,
        description: "Uses a hyphenated '.com' domain instead of the university's official '.edu' domain."
      },
      {
        id: "clue-severe-penalty",
        label: "Disproportionate Threat",
        location: "'...blocks registration, transcripts, and Wi-Fi within 12 hours'",
        isRedFlag: true,
        description: "Official campus libraries follow documented, gradual delinquency workflows and do not cancel Wi-Fi within 12 hours."
      },
      {
        id: "clue-xyz-link",
        label: "Suspicious '.xyz' Checkout Link",
        location: "Link redirects to secure-payment-gateway-checkout.xyz",
        isRedFlag: true,
        description: "University payments are never routed to obscure foreign or cheap TLDs like '.xyz'."
      },
      {
        id: "clue-no-student-id",
        label: "Missing Student Identification",
        location: "'Attention Library Borrower,'",
        isRedFlag: true,
        description: "Official library notices always specify your exact Student ID number and the specific library branch you checked it out from."
      }
    ],
    feedback: {
      summary: "This was a Phishing Scam designed to steal your credit card details.",
      detailedExplanation: "By weaponizing student anxiety around academic holds and transcript locks, attackers induce high stress. If you click the fake payment terminal, scammers capture your full credit card number, CVV code, and billing address.",
      keyLessons: [
        "Universities never process fees through random third-party domains like '.xyz'.",
        "Disproportionate threats (e.g., immediate Wi-Fi cutoff in 12 hours) are classic social engineering red flags.",
        "All legitimate student fees and library charges can be reviewed directly in your student bursar dashboard."
      ],
      safeActionSteps: [
        "Do NOT enter debit/credit card information on third-party links.",
        "Check your library account directly by navigating to library.stateuni.edu.",
        "Visit the campus library circulation desk in person with your student ID to verify any overdue items.",
        "Report the deceptive email to campus cybersecurity."
      ]
    }
  },
  {
    id: 5,
    title: "Official Campus Career & Internship Fair Confirmation",
    learningObjective: "Recognize genuine university student services, safe Single Sign-On links, and absence of pressure.",
    category: "Student Services Confirmation",
    type: "genuine",
    difficulty: "Intermediate",
    email: {
      senderName: "Career Development Center",
      senderEmail: "careercenter@stateuni.edu",
      officialEmailEquivalent: "careercenter@stateuni.edu",
      recipient: "alex.morgan@stateuni.edu (You)",
      subject: "Confirmation: Your RSVP for the Fall STEM & Business Career Fair (Oct 24)",
      date: "Yesterday at 04:30 PM",
      externalBanner: false,
      body: {
        salutation: "Hi Alex,",
        paragraphs: [
          "Thank you for registering for the upcoming Fall STEM & Business Career Fair! We are excited to help you connect with top industry recruiters.",
          "Event Details:\n• Date: Thursday, October 24, 2026\n• Time: 10:00 AM – 3:00 PM EST\n• Location: Campus Student Union, Grand Ballroom (2nd Floor)",
          "Preparation Checklist:\n1. Bring your physical student ID card for quick barcode check-in at the registration table.\n2. Business casual attire is recommended.\n3. Bring printed copies of your resume or ensure your digital profile is updated on Handshake."
        ],
        callToAction: {
          label: "View Participating Employers & Floor Map on Handshake",
          displayText: "https://stateuni.joinhandshake.com/career_fairs/fall2026",
          actualUrl: "https://stateuni.joinhandshake.com/career_fairs/fall2026",
          previewWarning: "Verified: Target points to the university's official Handshake partner platform."
        },
        signoff: "The Career Development Team\nState University Student Union, Suite 300\nEmail: careercenter@stateuni.edu | Phone: (555) 019-2273",
        disclaimer: "You received this confirmation because you registered via your campus student account."
      }
    },
    clues: [
      {
        id: "clue-career-domain",
        label: "Official Department Email",
        location: "From: careercenter@stateuni.edu",
        isRedFlag: false,
        description: "Sent from the official university Career Center address with authenticated campus credentials."
      },
      {
        id: "clue-no-threat",
        label: "Supportive, Helpful Tone",
        location: "Event logistics and helpful checklist",
        isRedFlag: false,
        description: "No threats, no urgent countdown timers, and no requests for banking details or passwords."
      },
      {
        id: "clue-handshake-domain",
        label: "Legitimate Campus Partner Portal",
        location: "Link points to stateuni.joinhandshake.com",
        isRedFlag: false,
        description: "Points to the recognized university-affiliated student employment portal (Handshake)."
      },
      {
        id: "clue-physical-location",
        label: "Clear Physical Venue",
        location: "Campus Student Union Grand Ballroom & Suite 300 office",
        isRedFlag: false,
        description: "Contains real physical campus locations, verifiable phone numbers, and legitimate staff contact info."
      }
    ],
    feedback: {
      summary: "This was a Genuine, Safe Campus Email.",
      detailedExplanation: "University student affairs regularly send event confirmations and career opportunities. Recognizing genuine messages ensures you take full advantage of university resources without unnecessary fear.",
      keyLessons: [
        "Look for official campus domain names and matching event details.",
        "Authentic university communications focus on guidance, preparation, and support.",
        "Reputable university partners (like Handshake, Canvas, or Duo) are integrated with campus Single Sign-On."
      ],
      safeActionSteps: [
        "Add the event date and location to your personal calendar.",
        "Prepare your resume and plan which employers to visit.",
        "Keep this confirmation email for quick reference on fair day."
      ]
    }
  }
];

export const BADGE_TIERS = [
  {
    minScore: 5,
    title: "Master Cyber Sentinel",
    tagline: "Flawless Security Instinct",
    color: "from-amber-400 to-yellow-500",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "You caught 100% of phishing threats and verified all authentic emails with textbook precision. University networks are safe in your hands!"
  },
  {
    minScore: 4,
    title: "Eagle Eye Defender",
    tagline: "High Threat Vigilance",
    color: "from-blue-500 to-indigo-600",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Impressive security awareness! You spotted subtle red flags like lookalike domains and mismatched hyperlinks with sharp precision."
  },
  {
    minScore: 3,
    title: "Security Apprentice",
    tagline: "Solid Fundamentals",
    color: "from-teal-400 to-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Good effort! You recognized several major threats, but some sophisticated social engineering cues still slipped past."
  },
  {
    minScore: 0,
    title: "Cyber Cadet",
    tagline: "Training Recommended",
    color: "from-slate-400 to-slate-600",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    description: "A great start to your journey! Phishing scams are becoming increasingly clever. Review the feedback clues to build your defenses."
  }
];
