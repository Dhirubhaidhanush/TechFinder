import companiesData from './companies.json';

// Ensure all items have a unique ID for React routing/keys
export const MOCK_COMPANIES = companiesData.map((company, index) => ({
  ...company,
  id: String(index + 1)
}));

// Simulated API calls
export const api = {
  getCompanies: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COMPANIES.slice(0, 50)), 300); // Return first 50 by default to prevent UI lag
    });
  },
  
  searchCompanies: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();
        const results = MOCK_COMPANIES.filter(c => {
          const matchTitle = c.title?.toLowerCase().includes(q);
          const matchCity = c.city?.toLowerCase().includes(q);
          const matchCategory = c.categories?.some(cat => cat.toLowerCase().includes(q));
          
          return matchTitle || matchCity || matchCategory;
        });
        resolve(results.slice(0, 50)); // Limit to top 50 results for performance
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