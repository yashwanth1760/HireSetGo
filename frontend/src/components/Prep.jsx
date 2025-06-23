import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const industries = [
  "Information Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Marketing",
  "Legal",
  "Telecommunications",
  "Retail",
  "Government",
];

const prepData = {
  "Information Technology": [
    {
      title: "Full Stack Developer Roadmap",
      link: "https://roadmap.sh/full-stack",
      description: "Learn frontend + backend dev to crack IT roles",
    },
    {
      title: "Top 100 DSA Interview Questions",
      link: "https://github.com/GFGSC-RTU/All-DSA-Sheets",
      description: "Solve commonly asked FAANG-style DSA problems",
    },
    {
      title: "System Design Simplified",
      link: "https://github.com/topics/system-design-interview",
      description: "Master system design for senior roles",
    },
    {
      title: "Operating System Interview Questions",
      link: "https://github.com/adityapandita97/Operating-Systems",
      description: "Learn OS concepts and Most Asked interview questions",
    },
    {
      title: "DevOps Essentials",
      link: "https://roadmap.sh/devops",
      description: "Master CI/CD, Docker, and Kubernetes for IT infra jobs",
    },
    {
      title: "Cloud Certification (AWS/GCP/Azure)",
      link: "https://www.coursera.org/specializations/aws-fundamentals",
      description: "Get certified in cloud to boost IT job prospects",
    },
  ],
  Finance: [
    {
      title: "Quant + Aptitude Basics",
      link: "https://www.placementpreparation.io/quantitative-aptitude/",
      description: "Practice aptitude tests for banking, IB, etc.",
    },
    {
      title: "Top Finance Interview Qs",
      link: "https://www.wecreateproblems.com/interview-questions/finance-interview-questions",
      description: "Crack interviews with domain-specific prep",
    },
    {
      title: "Financial Modeling Course",
      link: "https://www.wallstreetmojo.com/financial-modeling/",
      description: "Master Excel & modeling skills used in finance",
    },
    {
      title: "Investment Banking Crash Course",
      link: "https://www.investopedia.com/articles/professionals/102215/what-youll-learn-investment-banking-boot-camp.asp",
      description: "Understand core IB functions and valuation techniques",
    },
    {
      title: "Basics of Stock Markets",
      link: "https://zerodha.com/varsity/module/introduction-to-stock-markets/",
      description: "Get foundational stock and trading knowledge",
    },
    {
      title: "CFA Level 1 Free Resources",
      link: "https://www.cfainstitute.org/en/programs/cfa/exam/prep",
      description: "Start CFA prep with official materials",
    },
  ],
  Healthcare: [
    {
      title: "Healthcare Resume Builder",
      link: "/prep/healthcare/resume",
      description: "Structure your resume for hospital/clinic roles",
    },
    {
      title: "Communication + Patient Skills",
      link: "/prep/healthcare/skills",
      description: "Improve soft skills needed for healthcare jobs",
    },
    {
      title: "Medical Terminology Crash Course",
      link: "https://www.youtube.com/watch?v=04Wh2E9oNug",
      description: "Understand key medical terms used in practice",
    },
    {
      title: "HIPAA and Patient Privacy",
      link: "https://www.hhs.gov/hipaa/for-professionals/training/index.html",
      description: "Understand healthcare privacy regulations",
    },
    {
      title: "Basic First Aid & Emergency Training",
      link: "https://www.redcross.org/take-a-class/first-aid",
      description: "Get certified in first response and emergency aid",
    },
    {
      title: "Healthcare Analytics Course",
      link: "https://www.edx.org/course/healthcare-data-analytics",
      description: "Use data science in healthcare decision making",
    },
  ],
  Education: [
    {
      title: "How to Become a Great Teacher",
      link: "https://www.coursera.org/learn/teaching",
      description: "Pedagogical skills for aspiring educators",
    },
    {
      title: "Lesson Planning & Classroom Management",
      link: "https://www.futurelearn.com/courses/lesson-planning",
      description: "Create effective lesson plans and discipline strategies",
    },
    {
      title: "Educational Psychology",
      link: "https://www.udemy.com/course/educational-psychology/",
      description: "Understand student behavior and learning",
    },
    {
      title: "Online Teaching Toolkit",
      link: "https://teachonline.ca/",
      description: "Resources for teaching in online environments",
    },
    {
      title: "Assessment Design in Education",
      link: "https://www.coursera.org/learn/assessment-design",
      description: "Create meaningful formative and summative assessments",
    },
    {
      title: "Inclusive Education Practices",
      link: "https://www.unicef.org/education/inclusive-education",
      description: "Make education accessible to all learners",
    },
  ],
  Manufacturing: [
    {
      title: "Manufacturing Processes Basics",
      link: "https://nptel.ac.in/courses/112/107/112107083/",
      description: "Understand casting, forging, welding, and more",
    },
    {
      title: "Lean Six Sigma White Belt",
      link: "https://www.sixsigmadsi.com/what-is-six-sigma-white-belt/",
      description: "Intro to efficiency and quality in manufacturing",
    },
    {
      title: "AutoCAD for Manufacturing",
      link: "https://www.autodesk.com/education/edu-software/overview",
      description: "Learn to draft machine parts & layouts",
    },
    {
      title: "Safety Standards in Industry",
      link: "https://www.osha.gov/",
      description: "Stay compliant with manufacturing safety norms",
    },
    {
      title: "Production Planning and Control",
      link: "https://www.coursera.org/learn/production-planning",
      description: "Optimize manufacturing operations and workflow",
    },
    {
      title: "Maintenance Engineering Fundamentals",
      link: "https://nptel.ac.in/courses/112/107/112107238/",
      description: "Learn predictive and preventive maintenance",
    },
  ],
  Marketing: [
    {
      title: "Digital Marketing Crash Course",
      link: "https://learndigital.withgoogle.com/digitalgarage",
      description: "SEO, SEM, SMM – all in one certified course",
    },
    {
      title: "Content Marketing Strategies",
      link: "https://www.hubspot.com/resources/courses",
      description: "Craft engaging content to build brands",
    },
    {
      title: "Email Marketing Guide",
      link: "https://mailchimp.com/resources/email-marketing-field-guide/",
      description: "Master email strategies that convert",
    },
    {
      title: "Marketing Analytics Basics",
      link: "https://www.edx.org/course/marketing-analytics",
      description: "Use data to improve marketing decisions",
    },
    {
      title: "Personal Branding for Marketers",
      link: "https://www.udemy.com/course/personal-branding-for-career-success/",
      description: "Market yourself like a pro",
    },
    {
      title: "Neuromarketing & Consumer Behavior",
      link: "https://www.coursera.org/learn/neuromarketing",
      description: "Understand how brains make buying decisions",
    },
  ],
  Legal: [
    {
      title: "Legal Career Roadmap",
      link: "https://www.toplawschools.com/forums/",
      description: "Learn about career paths like corporate law, litigation",
    },
    {
      title: "Basics of Indian Penal Code",
      link: "https://www.indiankanoon.org/",
      description: "Understand criminal law with real examples",
    },
    {
      title: "Contract Law Fundamentals",
      link: "https://www.coursera.org/learn/contract-law",
      description: "Master key principles of contracts",
    },
    {
      title: "Moot Court & Legal Writing",
      link: "https://www.lawctopus.com/",
      description: "Improve legal writing and court skills",
    },
    {
      title: "Legal Tech Tools Guide",
      link: "https://www.legal.io/blog",
      description: "Use modern software in legal practice",
    },
    {
      title: "Ethics & Professional Conduct",
      link: "https://www.americanbar.org/",
      description: "Learn what makes a good lawyer legally & ethically",
    },
  ],
  Telecommunications: [
    {
      title: "Basics of Networking",
      link: "https://www.coursera.org/learn/basic-networking",
      description: "Understand LAN, WAN, TCP/IP, and routers",
    },
    {
      title: "5G and Future Networks",
      link: "https://www.fcc.gov/5G",
      description: "Learn about emerging telecom standards",
    },
    {
      title: "CCNA Certification Guide",
      link: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna/index.html",
      description: "Start your Cisco certification journey",
    },
    {
      title: "Telecom Tower Safety",
      link: "https://www.osha.gov/telecommunications",
      description: "Ensure safety while working in telecom infra",
    },
    {
      title: "VoIP Fundamentals",
      link: "https://www.udemy.com/course/voip-fundamentals/",
      description: "Understand how internet calling works",
    },
    {
      title: "Wireless Communication Systems",
      link: "https://nptel.ac.in/courses/117/102/117102062/",
      description: "Dive deep into mobile and wireless technologies",
    },
  ],
  Retail: [
    {
      title: "Retail Management Basics",
      link: "https://www.udemy.com/course/retail-management-fundamentals/",
      description: "Understand inventory, POS, and store ops",
    },
    {
      title: "Customer Service Training",
      link: "https://www.mindtools.com/pages/article/newLDR_92.htm",
      description: "Deliver excellent service to retain customers",
    },
    {
      title: "E-commerce Essentials",
      link: "https://www.shopify.com/learn",
      description: "Start and run your own online store",
    },
    {
      title: "Merchandising & Display",
      link: "https://www.linkedin.com/learning/visual-merchandising",
      description: "Learn store layout and visual strategy",
    },
    {
      title: "Retail Data Analytics",
      link: "https://www.coursera.org/learn/retail-data-analytics",
      description: "Leverage data for smart retailing",
    },
    {
      title: "Supply Chain Management Basics",
      link: "https://nptel.ac.in/courses/110/107/110107081/",
      description: "Manage logistics and inventory better",
    },
  ],
  Government: [
    {
      title: "UPSC Prep Guide",
      link: "https://iasbaba.com/",
      description: "Crack civil services with daily content & test series",
    },
    {
      title: "SSC + Railway Exam Strategy",
      link: "https://www.sscadda.com/",
      description: "Ace popular central government exams",
    },
    {
      title: "Policy Making 101",
      link: "https://www.coursera.org/learn/policy-making",
      description: "Learn how public policy is created",
    },
    {
      title: "Public Administration Concepts",
      link: "https://nptel.ac.in/courses/109/103/109103122/",
      description: "Understand governance and institutional working",
    },
    {
      title: "Government Job Resume Tips",
      link: "/prep/government/resume",
      description: "Create a govt-sector-specific resume",
    },
    {
      title: "RTI & Citizen Rights",
      link: "https://rti.gov.in/",
      description: "Be aware of legal rights as a citizen or aspirant",
    },
  ],
};

const PrepPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(
    "Information Technology"
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9fafb] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Get Job Ready with Industry-Specific Preparation
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              Curated roadmaps, guides, and practice sets for your career track.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full border ${
                  selectedIndustry === industry
                    ? "bg-[#d32f2f] text-white border-[#d32f2f]"
                    : "bg-white text-gray-800 border-gray-300"
                } transition`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prepData[selectedIndustry]?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-[#38567d] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  className="text-sm text-[#d32f2f] font-medium underline"
                >
                  Start Learning →
                </a>
              </div>
            )) || <p>No data available yet for this industry.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrepPage;
