import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { api } from "../data";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery.trim()) {
          data = await api.searchCompanies(searchQuery);
        } else {
          data = await api.getCompanies();
        }
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCompanies();
    }, 300); // debounce search

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-green-400">
      <div className="max-w-5xl mx-auto border-2 border-green-400 rounded-3xl p-6 md:p-10 shadow-sm bg-white">
        
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-green-500 mb-4 tracking-tight">
            Company Directory
          </h1>
          
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-green-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, city, or category..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-green-400 text-green-500 placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-green-400 animate-pulse">
            Loading companies...
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-green-300 rounded-xl">
            <p className="text-green-500 text-lg">No companies found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map(company => (
              <div 
                key={company.id}
                onClick={() => setLocation(`/company/${company.id}`)}
                className="border-2 border-green-400 rounded-2xl p-6 cursor-pointer hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
              >
                <h2 className="text-xl font-bold text-green-600 mb-2 truncate" title={company.title}>
                  {company.title}
                </h2>
                
                <div className="text-green-500 mb-3 text-sm">
                  {company.city || "N/A"}, {company.state || "N/A"}
                </div>
                
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-400 text-sm font-medium text-green-600 bg-green-50">
                  Rating: {company.totalScore ? company.totalScore : "N/A"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
