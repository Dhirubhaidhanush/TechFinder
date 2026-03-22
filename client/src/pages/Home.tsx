import { useState, useEffect } from "react";
import { Search, MapPin, Building, Globe, X, ExternalLink, Star } from "lucide-react";
import { api } from "../data";

// Helper component for Star Rating
function StarRating({ score }) {
  if (!score) return null;
  
  // Calculate full stars and determine text
  const fullStars = Math.round(score);
  const starsText = `${score} star${score !== 1 ? 's' : ''}`;
  
  return (
    <div className="flex items-center gap-1.5 bg-[#FFFBEB] text-[#D97706] px-3 py-1.5 rounded-lg shrink-0">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
        ))}
      </div>
      <span className="text-xs font-bold whitespace-nowrap">{starsText}</span>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  // Handle closing modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCompany(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <nav className="w-full px-8 py-6 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#111827] font-display tracking-tight">
            Tech<span className="text-[#10B981]">finder</span>
          </span>
        </div>
      </nav>

      {/* Header Section */}
      <div className="pt-16 px-8 pb-12 text-center max-w-3xl mx-auto flex flex-col items-center w-full relative">
        <div className="absolute -left-32 top-10 w-20 h-20 bg-[#2A2E3D] rounded-2xl flex items-center justify-center shadow-lg hidden xl:flex">
          <Globe className="w-10 h-10 text-white" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-8 border border-green-100">
          <Building className="w-4 h-4" />
          <span>Corporate Tech Ecosystem</span>
        </div>

        <h1 className="text-5xl md:text-[3.5rem] font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-6 font-display">
          Discover <span className="text-[#10B981]">IT Companies</span>
          <br />
          in Chennai
        </h1>

        <p className="text-gray-500 text-lg mb-10 max-w-2xl">
          Explore the vibrant tech hub of Tamil Nadu featuring software firms, innovative startups, and top-tier IT services across the city.
        </p>

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
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 font-display">
            {searchQuery ? `Search Results (${companies.length})` : "All Companies"}
          </h2>
          <div className="text-sm text-gray-500 font-medium">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map(company => (
              <div 
                key={company.id}
                className="bg-white border border-gray-200/80 rounded-[20px] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  {/* Green text for company name, clicking opens modal */}
                  <button 
                    onClick={() => setSelectedCompany(company)}
                    className="text-[1.15rem] font-bold text-[#10B981] hover:text-[#059669] transition-colors text-left line-clamp-2 font-display leading-tight"
                  >
                    {company.title}
                  </button>
                  
                  {/* Dynamic Yellow Star Rating Pill */}
                  <StarRating score={company.totalScore} />
                </div>
                
                {/* Location text simply as span since we moved links below */}
                <div className="flex items-start text-gray-500 mb-5 text-[15px] font-medium leading-tight">
                  <MapPin className="w-[18px] h-[18px] mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    {company.city ? `${company.city}, ${company.state || "Tamil Nadu"}` : "Chennai, Tamil Nadu"}
                  </span>
                </div>
                
                {/* Side-by-side action buttons */}
                <div className="flex gap-3 mb-5 pl-1">
                   {company.website && (
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-semibold py-2 px-3 rounded-lg text-center transition-colors"
                      >
                         Visit Website
                      </a>
                    )}

                    {company.url && (
                      <a 
                        href={company.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 bg-white border border-[#10B981] text-[#10B981] hover:bg-green-50 text-[13px] font-semibold py-2 px-3 rounded-lg text-center transition-colors"
                      >
                        Google Maps
                      </a>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100/80 flex flex-wrap gap-2">
                  {company.categories && company.categories.slice(0, 1).map((cat, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 bg-[#F8F9FA] text-[#4B5563] rounded-full text-[13px] font-medium">
                      {cat}
                    </span>
                  ))}
                  {company.categories && company.categories.length > 1 && (
                    <span className="px-3.5 py-1.5 bg-[#F8F9FA] text-[#4B5563] rounded-full text-[13px] font-medium">
                      +{company.categories.length - 1}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCompany(null)}
          ></div>
          
          <div className="relative bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#10B981] font-display pr-12">
                  {selectedCompany.title}
                </h2>
                {selectedCompany.totalScore && (
                  <StarRating score={selectedCompany.totalScore} />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.categories && selectedCompany.categories.length > 0 ? (
                        selectedCompany.categories.map((cat, idx) => (
                          <span key={idx} className="px-3.5 py-1.5 bg-[#F8F9FA] text-[#4B5563] rounded-full text-sm font-medium">
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-600">N/A</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reviews Count</h4>
                    <p className="text-gray-700 font-medium text-lg">{selectedCompany.reviewsCount || "N/A"}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</h4>
                    <p className="text-gray-700 font-medium text-lg">{selectedCompany.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Street Address</h4>
                    <p className="text-gray-700 font-medium text-lg leading-relaxed">{selectedCompany.street || "N/A"}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">City / State</h4>
                    <p className="text-gray-700 font-medium text-lg">
                      {(selectedCompany.city || selectedCompany.state) ? 
                        `${selectedCompany.city || "N/A"}, ${selectedCompany.state || "N/A"}` : 
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                {selectedCompany.website ? (
                  <a 
                    href={selectedCompany.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors shadow-md shadow-green-500/20"
                  >
                    Visit Website
                  </a>
                ) : (
                  <button 
                    disabled
                    className="flex-1 bg-gray-100 text-gray-400 font-semibold py-4 px-6 rounded-xl text-center cursor-not-allowed"
                  >
                    Website N/A
                  </button>
                )}

                {selectedCompany.url && (
                  <a 
                    href={selectedCompany.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-none flex items-center justify-center bg-white border-2 border-[#10B981] text-[#10B981] hover:bg-green-50 font-semibold py-4 px-6 rounded-xl transition-colors"
                  >
                    View on Maps <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
