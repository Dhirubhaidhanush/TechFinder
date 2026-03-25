import { useState, useEffect } from "react";
import { Search, MapPin, Building, X, Star, Phone, Send } from "lucide-react";
import { api } from "../data";

// Helper component for Star Rating
function StarRating({ score }) {
  if (!score) return null;

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
          <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-400 font-display tracking-tight">
            Tech<span className="text-green-400">Finder</span>
          </span>
        </div>
      </nav>

      {/* Header Section */}
      <div className="pt-16 px-8 pb-12 text-center max-w-3xl mx-auto flex flex-col items-center w-full relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-8 border border-green-100">
          <Building className="w-4 h-4" />
          <span>Corporate Tech Ecosystem</span>
        </div>

        <h1 className="text-5xl md:text-[3.5rem] font-extrabold tracking-tight text-[#111827] leading-[1.1] mb-6 font-display">
          Discover all <span className="text-green-400">IT Companies</span>
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
            placeholder="Search company name"
            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-base py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Search
          </button> */}
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
                onClick={() => setSelectedCompany(company)}
                className="bg-[#F9FAFB] border border-gray-200 rounded-3xl p-6 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                flex flex-col h-full cursor-pointer"
              >
                {/* Top Content */}
                <div className="flex flex-col gap-5">

                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {company.title}
                  </h3>

                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <Building className="w-4 h-4" />
                    <span>{company.categories?.[0] || "Software company"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <StarRating score={company.totalScore} />
                    <span className="text-gray-400 text-sm">
                      ({company.reviewsCount || 0})
                    </span>
                  </div>

                  <span className="bg-green-100 text-green-700 text-sm px-4 py-1 rounded-full w-fit">
                    {company.categories?.[0] || "Software company"}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-auto pt-6">
                  <div className="border-t border-gray-200 mb-4"></div>

                  <div className="flex gap-4">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-center font-medium"
                      >
                        Website
                      </a>
                    )}

                    {company.url && (
                      <a
                        href={company.url}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedCompany(null)}
          ></div>

          <div className="relative bg-white rounded-[24px] w-full max-w-lg shadow-2xl">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                {selectedCompany.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <StarRating score={selectedCompany.totalScore} />
                <span className="text-gray-500">
                  ({selectedCompany.reviewsCount})
                </span>
              </div>

              <div className="flex items-start gap-2 text-gray-600 mb-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>
                  {selectedCompany.street}, {selectedCompany.city}, {selectedCompany.state}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Phone className="w-5 h-5" />
                <span>{selectedCompany.phone || "N/A"}</span>
              </div>

              <div className="flex gap-3">
                {selectedCompany.website && (
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center"
                  >
                    Website
                  </a>
                )}

                {selectedCompany.url && (
                  <a
                    href={selectedCompany.url}
                    target="_blank"
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-center flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Directions
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
