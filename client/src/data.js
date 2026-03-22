export const MOCK_COMPANIES = [
  {
    id: "1",
    title: "Freshworks",
    totalScore: 4.8,
    reviewsCount: 1250,
    street: "Global Infocity Park, 40, MGR Main Rd",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 44 6667 8040",
    website: "https://freshworks.com",
    categories: ["Software Company", "IT Consulting"],
    mapUrl: "https://maps.google.com/?cid=123"
  },
  {
    id: "2",
    title: "Zoho Corporation",
    totalScore: 4.7,
    reviewsCount: 3420,
    street: "Estancia IT Park, Plot No. 140 & 151, GST Road",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 44 6744 7070",
    website: "https://zoho.com",
    categories: ["Software Company", "Cloud Provider"],
    mapUrl: "https://maps.google.com/?cid=456"
  },
  {
    id: "3",
    title: "TCS - Tata Consultancy Services",
    totalScore: 4.0,
    reviewsCount: 15400,
    street: "SIPCOT IT Park, Siruseri",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 44 6616 0000",
    website: "https://tcs.com",
    categories: ["IT Services", "Consulting"],
    mapUrl: "https://maps.google.com/?cid=789"
  },
  {
    id: "4",
    title: "Cognizant",
    totalScore: 4.1,
    reviewsCount: 12100,
    street: "MEPZ, Thoraipakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: null,
    website: "https://cognizant.com",
    categories: ["IT Consulting", "Outsourcing"],
    mapUrl: "https://maps.google.com/?cid=101"
  },
  {
    id: "5",
    title: "Infosys",
    totalScore: null,
    reviewsCount: null,
    street: "Mahindra World City",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 44 4741 1111",
    website: "https://infosys.com",
    categories: ["IT Services"],
    mapUrl: "https://maps.google.com/?cid=102"
  }
];

// Simulated API calls
export const api = {
  getCompanies: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COMPANIES), 300);
    });
  },
  
  searchCompanies: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();
        const results = MOCK_COMPANIES.filter(c => 
          c.title.toLowerCase().includes(q) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          c.categories.some(cat => cat.toLowerCase().includes(q))
        );
        resolve(results);
      }, 300);
    });
  },

  getCompany: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMPANIES.find(c => c.id === id));
      }, 300);
    });
  }
};