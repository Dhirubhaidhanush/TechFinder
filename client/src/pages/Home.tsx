import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Building, Globe } from "lucide-react";
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
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Outer rounded container mimicking the device frame from the screenshot */}
      <div className="w-full max-w-[1200px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col relative min-h-[85vh]">
        
        {/* Floating globe icon matching the screenshot's dark square floating element */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#2A2E3D] rounded-2xl flex items-center justify-center shadow-lg hidden lg:flex">
          <Globe className="w-10 h-10 text-white" />
        </div>

        {/* Header Section */}
        <div className="pt-20 px-8 pb-12 text-center max-w-3xl mx-auto flex flex-col items-center w-full">
          
          {/* Top Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-8 border border-green-100">
            <Building className="w-4 h-4" />
            <span>Corporate Tech Ecosystem</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-[3.5rem] font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-6 font-display">
            Discover <span className="text-[#10B981]">IT Companies</span>
            <br />
            in Chennai
          </h1>

          {/* Subtitle description */}
          <p className="text-gray-500 text-lg mb-10 max-w-2xl font-sans">
            Explore the vibrant tech hub of Tamil Nadu featuring software firms, innovative startups, and top-tier IT services across the city.
          </p>

          {/* Search Bar Container */}
          <div className="w-full max-w-2xl relative shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full bg-white p-2 flex items-center border border-gray-100">
            <div className="pl-4 pr-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search by name, category, or location..."
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base py-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-3 rounded-full font-medium transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 bg-white px-8 pb-12 w-full max-w-6xl mx-auto z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {searchQuery ? `Search Results (${companies.length})` : "All Companies"}
            </h2>
            <div className="text-sm text-gray-500">
              Showing top {companies.length} results
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-green-500 animate-pulse font-medium">
              Loading companies...
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-gray-500 text-lg">No companies found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {companies.map(company => (
                <div 
                  key={company.id}
                  onClick={() => setLocation(`/company/${company.id}`)}
                  className="bg-white border border-gray-100 rounded-3xl p-6 cursor-pointer hover:border-green-400 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 pr-2 font-display">
                      {company.title}
                    </h3>
                    {company.totalScore && (
                      <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                        <span>★</span> {company.totalScore}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    <span className="truncate">
                      {company.city || "Chennai"}, {company.state || "Tamil Nadu"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                    {company.categories && company.categories.slice(0, 2).map((cat, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">
                        {cat}
                      </span>
                    ))}
                    {company.categories && company.categories.length > 2 && (
                      <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">
                        +{company.categories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
