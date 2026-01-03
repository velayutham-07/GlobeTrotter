import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, DollarSign, Star, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price?: number;
  duration?: string;
  location?: string;
  category: string;
  type: "city" | "activity";
}

const SearchPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("activities");
  const [groupBy, setGroupBy] = useState("default");
  const [sortBy, setSortBy] = useState("popular");

  // Mock search results
  const activities: SearchResult[] = [
    {
      id: "1",
      name: "Paragliding Adventure",
      description: "Experience the thrill of paragliding over stunning landscapes with professional instructors.",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400",
      rating: 4.8,
      price: 150,
      duration: "3 hours",
      location: "Interlaken, Switzerland",
      category: "Adventure",
      type: "activity",
    },
    {
      id: "2",
      name: "Cooking Class - Italian Cuisine",
      description: "Learn to make authentic Italian pasta and tiramisu from local chefs.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
      rating: 4.9,
      price: 85,
      duration: "4 hours",
      location: "Rome, Italy",
      category: "Food & Drink",
      type: "activity",
    },
    {
      id: "3",
      name: "Historical Walking Tour",
      description: "Explore ancient ruins and historical landmarks with expert guides.",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
      rating: 4.7,
      price: 45,
      duration: "2.5 hours",
      location: "Athens, Greece",
      category: "Culture",
      type: "activity",
    },
    {
      id: "4",
      name: "Sunset Yacht Cruise",
      description: "Sail along the beautiful coastline while enjoying stunning sunset views.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      rating: 4.6,
      price: 200,
      duration: "3 hours",
      location: "Santorini, Greece",
      category: "Water Activities",
      type: "activity",
    },
    {
      id: "5",
      name: "Safari Adventure",
      description: "Witness incredible wildlife in their natural habitat with experienced guides.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
      rating: 4.9,
      price: 350,
      duration: "Full day",
      location: "Masai Mara, Kenya",
      category: "Adventure",
      type: "activity",
    },
  ];

  const cities: SearchResult[] = [
    {
      id: "c1",
      name: "Paris",
      description: "The City of Light - renowned for its culture, art, gastronomy, and fashion.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      rating: 4.8,
      location: "France",
      category: "Europe",
      type: "city",
    },
    {
      id: "c2",
      name: "Tokyo",
      description: "A fascinating blend of traditional temples and ultramodern architecture.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
      rating: 4.9,
      location: "Japan",
      category: "Asia",
      type: "city",
    },
    {
      id: "c3",
      name: "New York City",
      description: "The Big Apple - iconic skyline, Broadway shows, and world-class museums.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
      rating: 4.7,
      location: "USA",
      category: "North America",
      type: "city",
    },
    {
      id: "c4",
      name: "Barcelona",
      description: "Stunning Gaudí architecture, beautiful beaches, and vibrant nightlife.",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
      rating: 4.6,
      location: "Spain",
      category: "Europe",
      type: "city",
    },
    {
      id: "c5",
      name: "Bali",
      description: "Tropical paradise with ancient temples, rice terraces, and pristine beaches.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      rating: 4.8,
      location: "Indonesia",
      category: "Asia",
      type: "city",
    },
  ];

  const currentResults = activeTab === "activities" ? activities : cities;
  
  const filteredResults = currentResults.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTrip = (item: SearchResult) => {
    toast({
      title: `${item.type === "city" ? "City" : "Activity"} added!`,
      description: `${item.name} has been added to your trip.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Search
            </h1>
            <p className="text-muted-foreground font-body">
              Discover amazing cities and activities for your next adventure
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="cities">Cities</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground font-body mb-6">
            {filteredResults.length} results found
          </p>

          {/* Results */}
          <div className="space-y-4">
            {filteredResults.map((item) => (
              <Card key={item.id} variant="interactive">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-48 h-40 md:h-auto relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                      />
                      <Badge className="absolute top-3 left-3">{item.category}</Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-display font-bold text-foreground">
                            {item.name}
                          </h3>
                          {item.location && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {item.price && (
                            <span className="flex items-center gap-1 text-sm text-foreground font-medium">
                              <DollarSign className="h-4 w-4 text-primary" />
                              ${item.price}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {item.duration}
                            </span>
                          )}
                        </div>
                        <Button size="sm" onClick={() => handleAddToTrip(item)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Trip
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body">
                No results found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
