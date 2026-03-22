import { useState, useMemo } from "react";
import { Search, MapPin, Star, Globe, Phone, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data based on the described JSON structure
const MOCK_COMPANIES = [
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
    totalScore: 4.0,
    reviewsCount: 9800,
    street: "Mahindra World City",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 44 4741 1111",
    website: "https://infosys.com",
    categories: ["IT Services"],
    mapUrl: "https://maps.google.com/?cid=102"
  },
  {
    id: "6",
    title: "Chargebee",
    totalScore: 4.6,
    reviewsCount: 450,
    street: "SP Infocity, MGR Main Rd",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 98765 43210",
    website: "https://chargebee.com",
    categories: ["SaaS", "Financial Technology"],
    mapUrl: "https://maps.google.com/?cid=103"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_COMPANIES;
    
    const query = searchQuery.toLowerCase();
    return MOCK_COMPANIES.filter(company => {
      return (
        company.title.toLowerCase().includes(query) ||
        company.categories.some(c => c.toLowerCase().includes(query)) ||
        company.street?.toLowerCase().includes(query) ||
        company.city?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Hero Section */}
      <header className="bg-primary/5 border-b border-primary/10 py-16 px-4 md:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Discover IT Companies in Chennai
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Search through our directory of top tech companies, startups, and IT service providers.
        </p>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search by company name, category, or location..."
            className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary shadow-lg shadow-primary/5 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-companies"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? `Search Results (${filteredCompanies.length})` : "Featured Companies"}
          </h2>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
            <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No companies found</h3>
            <p className="text-muted-foreground">We couldn't find any companies matching "{searchQuery}"</p>
            <Button 
              variant="outline" 
              className="mt-6 border-primary/20 text-primary hover:bg-primary/5"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <Card 
                key={company.id} 
                className="group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 bg-white"
                data-testid={`card-company-${company.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {company.title}
                    </CardTitle>
                    {company.totalScore && (
                      <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-sm font-medium border border-yellow-200">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{company.totalScore}</span>
                      </div>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-1.5 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate" title={`${company.street}, ${company.city}`}>
                      {company.street ? `${company.street}, ` : ''}{company.city}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.categories.map((category, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="bg-primary/5 text-primary hover:bg-primary/10 font-normal border-primary/10"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2.5 text-sm text-muted-foreground">
                    {company.phone ? (
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-primary/70" />
                        <span>{company.phone}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 opacity-50">
                        <Phone className="w-4 h-4" />
                        <span>Not available</span>
                      </div>
                    )}
                    
                    {company.website && (
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-primary/70" />
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {new URL(company.website).hostname.replace('www.', '')}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 border-t border-border/50 gap-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    asChild
                  >
                    <a href={company.website || '#'} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                  {company.mapUrl && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="shrink-0 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
                      title="View on Map"
                      asChild
                    >
                      <a href={company.mapUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
