import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CityCard, { City } from "@/components/cities/CityCard";
import ActivityCard, { Activity } from "@/components/activities/ActivityCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Compass, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExplorePage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const regions = ["Europe", "Asia", "Americas", "Africa", "Oceania"];
  const activityCategories = ["sightseeing", "food", "adventure", "culture", "relaxation", "shopping"];

  const cities: City[] = [
    {
      id: "1",
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
      costIndex: "expensive",
      rating: 4.9,
      popularActivities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
      description: "The City of Lights, known for its art, fashion, and romantic atmosphere.",
    },
    {
      id: "2",
      name: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
      costIndex: "expensive",
      rating: 4.8,
      popularActivities: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market"],
      description: "A dazzling blend of ultra-modern and traditional Japanese culture.",
    },
    {
      id: "3",
      name: "Barcelona",
      country: "Spain",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600",
      costIndex: "moderate",
      rating: 4.7,
      popularActivities: ["Sagrada Familia", "Park Güell", "Gothic Quarter"],
      description: "Mediterranean vibes with stunning Gaudí architecture and beaches.",
    },
    {
      id: "4",
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      costIndex: "budget",
      rating: 4.7,
      popularActivities: ["Rice Terraces", "Uluwatu Temple", "Beach Clubs"],
      description: "Tropical paradise with spiritual temples and lush landscapes.",
    },
    {
      id: "5",
      name: "New York",
      country: "USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600",
      costIndex: "luxury",
      rating: 4.8,
      popularActivities: ["Central Park", "Broadway Shows", "Statue of Liberty"],
      description: "The city that never sleeps, a global hub of culture and commerce.",
    },
    {
      id: "6",
      name: "Marrakech",
      country: "Morocco",
      image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600",
      costIndex: "budget",
      rating: 4.5,
      popularActivities: ["Medina Souks", "Jardin Majorelle", "Hammam Spa"],
      description: "Vibrant markets, stunning palaces, and rich Moroccan traditions.",
    },
  ];

  const activities: Activity[] = [
    {
      id: "1",
      name: "Eiffel Tower Sunset Visit",
      description: "Skip-the-line access to the top of Paris's iconic landmark at sunset.",
      image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400",
      city: "Paris",
      duration: "2 hours",
      cost: 45,
      category: "sightseeing",
    },
    {
      id: "2",
      name: "Sushi Making Class",
      description: "Learn to make authentic sushi from a master chef in Tsukiji.",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
      city: "Tokyo",
      duration: "3 hours",
      cost: 85,
      category: "food",
    },
    {
      id: "3",
      name: "Bali Sunrise Volcano Hike",
      description: "Trek to the summit of Mount Batur for a breathtaking sunrise view.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
      city: "Bali",
      duration: "6 hours",
      cost: 55,
      category: "adventure",
    },
    {
      id: "4",
      name: "Flamenco Show & Tapas",
      description: "Authentic flamenco performance in the Gothic Quarter with tapas dinner.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
      city: "Barcelona",
      duration: "3 hours",
      cost: 70,
      category: "culture",
    },
    {
      id: "5",
      name: "Central Park Bike Tour",
      description: "Guided bike tour through Manhattan's iconic green oasis.",
      image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400",
      city: "New York",
      duration: "2 hours",
      cost: 40,
      category: "sightseeing",
    },
    {
      id: "6",
      name: "Traditional Hammam Experience",
      description: "Relaxing spa experience with steam bath and traditional massage.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
      city: "Marrakech",
      duration: "2 hours",
      cost: 35,
      category: "relaxation",
    },
  ];

  const filteredCities = cities.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />
      
      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="ocean" className="mb-4">Explore</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Discover Your Next Destination
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse cities and activities from around the world to inspire your travels.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search cities, countries, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cities" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="cities" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Cities
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Activities
            </TabsTrigger>
          </TabsList>

          {/* Cities Tab */}
          <TabsContent value="cities">
            {/* Region Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {regions.map((region) => (
                <Badge
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                >
                  {region}
                </Badge>
              ))}
              {selectedRegion && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)}>
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.map((city) => (
                <CityCard 
                  key={city.id} 
                  city={city}
                  onAddToTrip={(city) => {
                    toast({
                      title: "Added to trip!",
                      description: `${city.name} has been added to your itinerary.`,
                    });
                  }}
                />
              ))}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {activityCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
              {selectedCategory && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredActivities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity}
                  onAdd={(activity) => {
                    toast({
                      title: "Activity added!",
                      description: `${activity.name} has been added to your trip.`,
                    });
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ExplorePage;
