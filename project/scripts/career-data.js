/* ==========================================================================
   EduPath Nigeria — Career Path Data
   An array of career path objects used by the Path Finder recommendation
   engine. Each object describes one pathway: who it suits, the steps
   required, estimated timeline, and a typical salary range in Naira.
   ========================================================================== */

const careerPaths = [
  {
    id: "tech-frontend",
    title: "Frontend Web Developer",
    field: "tech",
    levels: ["ssce", "nd", "hnd", "bsc"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "Build websites and web apps using HTML, CSS, and JavaScript — one of the fastest entry points into Nigerian tech.",
    steps: [
      "Complete a foundational HTML/CSS/JavaScript course (3 months)",
      "Build a portfolio of 3-5 small projects",
      "Earn a recognised certification (e.g. freeCodeCamp, ALX, or Meta Front-End)",
      "Apply for internships or junior roles at startups",
      "Continue learning frameworks like React as you work"
    ],
    timeline: "6-12 months to first job",
    salaryRange: "₦120,000 - ₦400,000 / month (entry level)"
  },
  {
    id: "tech-data-analyst",
    title: "Data Analyst",
    field: "tech",
    levels: ["nd", "hnd", "bsc", "msc"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "Turn raw business data into insights using Excel, SQL, and visualisation tools — in high demand across banking, telecoms, and startups.",
    steps: [
      "Master Excel and basic statistics (4-6 weeks)",
      "Learn SQL for querying databases (6-8 weeks)",
      "Learn a visualisation tool such as Power BI or Tableau",
      "Complete a capstone project with real Nigerian datasets",
      "Apply for analyst roles in banks, telecoms, or fintechs"
    ],
    timeline: "4-8 months to first job",
    salaryRange: "₦150,000 - ₦450,000 / month (entry level)"
  },
  {
    id: "business-digital-marketing",
    title: "Digital Marketing Specialist",
    field: "business",
    levels: ["ssce", "nd", "hnd", "bsc"],
    locations: ["lagos", "abuja", "ibadan", "any"],
    summary: "Help businesses grow online through social media, search ads, and content strategy — a path with low barriers to entry and freelance potential.",
    steps: [
      "Take a digital marketing fundamentals course (4-6 weeks)",
      "Get certified in Google Ads and Meta Blueprint",
      "Run a small campaign for a local business as a case study",
      "Build a portfolio site showcasing results",
      "Apply for marketing assistant roles or take freelance clients"
    ],
    timeline: "3-6 months to first paid work",
    salaryRange: "₦80,000 - ₦300,000 / month (entry level)"
  },
  {
    id: "business-accounting",
    title: "Accounting &amp; Bookkeeping",
    field: "business",
    levels: ["ssce", "nd", "hnd", "bsc"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "A stable path into finance roles for SMEs and corporates, with a clear professional certification ladder.",
    steps: [
      "Complete an OND/HND in Accounting or a bookkeeping course",
      "Learn accounting software (QuickBooks, Sage, or Excel-based systems)",
      "Begin ICAN or ATSWA professional examinations",
      "Gain experience through an internship at an audit firm or SME",
      "Progress toward full ICAN chartered accountant status"
    ],
    timeline: "1-3 years to professional qualification",
    salaryRange: "₦100,000 - ₦350,000 / month (entry level)"
  },
  {
    id: "healthcare-nursing",
    title: "Registered Nursing",
    field: "healthcare",
    levels: ["ssce"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "A respected, in-demand profession in Nigeria and abroad, with strong long-term job security.",
    steps: [
      "Obtain SSCE with credits in English, Maths, Biology, and Chemistry",
      "Gain admission to a Schools of Nursing or university nursing programme",
      "Complete the 3-5 year nursing programme and clinical placements",
      "Pass the Nursing and Midwifery Council of Nigeria (NMCN) licensing exam",
      "Register with NMCN and begin practice"
    ],
    timeline: "3-5 years to licensure",
    salaryRange: "₦150,000 - ₦300,000 / month (entry level)"
  },
  {
    id: "healthcare-pharmacy-tech",
    title: "Pharmacy Technician",
    field: "healthcare",
    levels: ["ssce", "nd"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "A faster route into the healthcare sector, supporting pharmacists in hospitals, clinics, and retail pharmacies.",
    steps: [
      "Obtain SSCE with credits in English, Maths, Biology, and Chemistry",
      "Complete an OND in Pharmacy Technology at a recognised polytechnic",
      "Undertake supervised practical training (internship)",
      "Register with the Pharmacists Council of Nigeria (PCN)",
      "Apply for roles in hospital or community pharmacies"
    ],
    timeline: "2-3 years to licensure",
    salaryRange: "₦80,000 - ₦200,000 / month (entry level)"
  },
  {
    id: "agriculture-agribusiness",
    title: "Agribusiness Management",
    field: "agriculture",
    levels: ["ssce", "nd", "hnd", "bsc"],
    locations: ["ibadan", "abuja", "port-harcourt", "any"],
    summary: "Combine farming knowledge with business skills to manage farms, agro-processing, or supply chains.",
    steps: [
      "Complete a course or degree in Agricultural Science or Agribusiness",
      "Gain hands-on experience on a farm or with an agro-processing company",
      "Learn basic business skills: budgeting, supply chain, record-keeping",
      "Apply for roles with agribusinesses, NGOs, or government extension programmes",
      "Consider starting a small agribusiness venture with savings or grants"
    ],
    timeline: "1-4 years depending on entry point",
    salaryRange: "₦90,000 - ₦280,000 / month (entry level)"
  },
  {
    id: "agriculture-extension",
    title: "Agricultural Extension Worker",
    field: "agriculture",
    levels: ["ssce", "nd"],
    locations: ["ibadan", "port-harcourt", "any"],
    summary: "Work directly with farming communities, sharing modern techniques and connecting farmers to resources.",
    steps: [
      "Complete an OND in Agricultural Technology or related field",
      "Undergo extension training with the Agricultural Development Programme (ADP)",
      "Gain field experience working with local farming communities",
      "Apply for roles with state ADPs, NGOs, or agritech companies",
      "Pursue further qualifications (HND/BSc) for advancement"
    ],
    timeline: "1-2 years to first role",
    salaryRange: "₦80,000 - ₦180,000 / month (entry level)"
  },
  {
    id: "creative-graphic-design",
    title: "Graphic Design",
    field: "creative",
    levels: ["ssce", "nd", "hnd", "bsc"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "Create visual content for brands, social media, and print — a flexible path with strong freelance demand.",
    steps: [
      "Learn design fundamentals and tools (Adobe Photoshop, Illustrator, or Canva Pro)",
      "Build a portfolio of 5-10 sample projects across different formats",
      "Take on small freelance jobs to build a client base",
      "Join design communities for feedback and referrals",
      "Apply for in-house roles at agencies or brands once portfolio is strong"
    ],
    timeline: "3-6 months to first paid work",
    salaryRange: "₦70,000 - ₦250,000 / month (entry level)"
  },
  {
    id: "creative-fashion-design",
    title: "Fashion Design &amp; Production",
    field: "creative",
    levels: ["ssce", "nd", "hnd"],
    locations: ["lagos", "abuja", "ibadan", "any"],
    summary: "Turn fabric and pattern-making skills into a fashion brand, from tailoring to ready-to-wear collections.",
    steps: [
      "Complete a vocational fashion design course (6-12 months)",
      "Learn pattern-making, sewing, and basic textile knowledge",
      "Apprentice with an established designer or tailor",
      "Create a small capsule collection and sell through social media",
      "Register a small business and scale production with hired tailors"
    ],
    timeline: "1-2 years to a functioning brand",
    salaryRange: "Varies widely — ₦100,000+ / month with consistent sales"
  },
  {
    id: "trades-electrical",
    title: "Electrical Installation &amp; Maintenance",
    field: "trades",
    levels: ["ssce", "nd"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "A practical, always-in-demand trade covering residential and commercial electrical work.",
    steps: [
      "Complete a vocational training programme in electrical installation (6-12 months)",
      "Apprentice with a licensed electrician for hands-on experience",
      "Obtain relevant trade certification (e.g. NABTEB or ITF)",
      "Build a client base through referrals and local advertising",
      "Consider further training in solar installation for higher-paying work"
    ],
    timeline: "1-2 years to independent practice",
    salaryRange: "₦80,000 - ₦300,000 / month depending on jobs taken"
  },
  {
    id: "trades-automotive",
    title: "Automotive Repair &amp; Maintenance",
    field: "trades",
    levels: ["ssce", "nd"],
    locations: ["lagos", "abuja", "ibadan", "port-harcourt", "any"],
    summary: "Vehicle ownership in Nigeria is rising steadily, keeping demand for skilled mechanics strong.",
    steps: [
      "Complete a vocational automotive technology course (6-12 months)",
      "Apprentice at a workshop to gain practical diagnostic and repair skills",
      "Specialise in an area such as engine repair, electricals, or AC systems",
      "Obtain ITF or NABTEB trade certification",
      "Open or join a workshop, building a reputation for reliable work"
    ],
    timeline: "1-2 years to independent practice",
    salaryRange: "₦70,000 - ₦250,000 / month depending on jobs taken"
  }
];
