import companiesData from './companies.json';

// Ensure all items have a unique ID
export const MOCK_COMPANIES = companiesData.map((company, index) => ({
  ...company,
  id: String(index + 1)
}));

export const api = {

<<<<<<< HEAD
  // ✅ NEW: Get companies by city (FAST)
  getCompaniesByCity: async (city) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_COMPANIES.filter((c) =>
          c.city?.toLowerCase().includes(city.toLowerCase())
=======
  // ✅ Get companies by STATE
  getCompaniesByState: async (state) => {
    return new Promise((resolve) => {
      setTimeout(() => {

        // If no state selected → return all (limited)
        if (!state) {
          resolve(MOCK_COMPANIES.slice(0, 100));
          return;
        }

        const normalizedState = state.trim().toLowerCase();

        const results = MOCK_COMPANIES.filter((c) =>
          c.state?.trim().toLowerCase() === normalizedState
>>>>>>> 8bf8722 (first commit)
        );

        resolve(results.slice(0, 100)); // limit for performance
      }, 300);
    });
  },

<<<<<<< HEAD
  // 🔍 Search inside selected city
  searchCompanies: async (query, city) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();

        const results = MOCK_COMPANIES.filter((c) => {
          const matchCity = c.city?.toLowerCase().includes(city.toLowerCase());
          const matchTitle = c.title?.toLowerCase().includes(q);
=======
  // 🔍 Search companies WITH state filter
  searchCompanies: async (query, state) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.trim().toLowerCase();
        const normalizedState = state?.trim().toLowerCase();

        const results = MOCK_COMPANIES.filter((c) => {

          const matchState = normalizedState
            ? c.state?.trim().toLowerCase() === normalizedState
            : true;

          const matchTitle = c.title?.toLowerCase().includes(q);

>>>>>>> 8bf8722 (first commit)
          const matchCategory = c.categories?.some((cat) =>
            cat.toLowerCase().includes(q)
          );

<<<<<<< HEAD
          return matchCity && (matchTitle || matchCategory);
=======
          return matchState && (matchTitle || matchCategory);
>>>>>>> 8bf8722 (first commit)
        });

        resolve(results.slice(0, 100));
      }, 300);
    });
  },

<<<<<<< HEAD
  // Get single company
=======
  // ✅ Optional fallback (not required but useful)
  getAllCompanies: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMPANIES);
      }, 300);
    });
  },

  // ✅ Get single company
>>>>>>> 8bf8722 (first commit)
  getCompany: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMPANIES.find((c) => c.id === id));
      }, 300);
    });
  }
};
