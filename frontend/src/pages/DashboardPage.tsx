import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TripCard, { Trip } from "@/components/trips/TripCard";
import CityCard, { City } from "@/components/cities/CityCard";
import CreateTripModal from "@/components/trips/CreateTripModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data
  const upcomingTrips: Trip[] = [
    {
      id: "1",
      name: "Mediterranean Adventure",
      startDate: "2025-06-15",
      endDate: "2025-06-28",
      destinations: ["Barcelona", "Nice", "Rome", "Athens"],
      coverImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
      estimatedBudget: 4500,
      status: "upcoming",
    },
    {
      id: "2",
      name: "Japan Cherry Blossom",
      startDate: "2025-04-01",
      endDate: "2025-04-14",
      destinations: ["Tokyo", "Kyoto", "Osaka"],
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      estimatedBudget: 5200,
      status: "upcoming",
    },
  ];

  const popularCities: City[] = [
    {
      id: "1",
      name: "Santorini",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
      costIndex: "expensive",
      rating: 4.9,
      popularActivities: ["Sunset viewing", "Wine tasting"],
      description: "Iconic white-washed buildings overlooking the Aegean Sea.",
    },
    {
      id: "2",
      name: "Kyoto",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
      costIndex: "moderate",
      rating: 4.8,
      popularActivities: ["Temple visits", "Tea ceremony"],
      description: "Ancient capital with countless temples and traditional gardens.",
    },
    {
      id: "3",
      name: "Lisbon",
      country: "Portugal",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400",
      costIndex: "budget",
      rating: 4.7,
      popularActivities: ["Tram rides", "Pastel de nata"],
      description: "Colorful hills, historic trams, and amazing seafood.",
    },
  ];

  const handleCreateTrip = async (tripData: { name: string; description: string; startDate: string; endDate: string }) => {
    // In real app, this would save to database
    console.log("Creating trip:", tripData);
    toast({
      title: "Trip created!",
      description: `"${tripData.name}" has been added to your trips.`,
    });
  };

  const stats = [
    { label: "Total Trips", value: "12", icon: MapPin, color: "text-primary" },
    { label: "Days Traveled", value: "87", icon: Calendar, color: "text-accent" },
    { label: "Countries", value: "15", icon: TrendingUp, color: "text-forest" },
    { label: "Total Spent", value: "$24.5k", icon: DollarSign, color: "text-sunset" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />
      
      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Welcome back, Traveler!
            </h1>
            <p className="text-muted-foreground">
              Ready to plan your next adventure?
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="mt-4 md:mt-0"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-1" />
            New Trip
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <Card key={stat.label} variant="elevated">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Trips */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-semibold">Upcoming Trips</h2>
              <Badge variant="ocean">{upcomingTrips.length}</Badge>
            </div>
            <Link to="/trips">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onDelete={(id) => console.log("Delete trip:", id)}
                  onShare={(id) => console.log("Share trip:", id)}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">No trips planned yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start planning your next adventure today!
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Your First Trip
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Explore Destinations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-1">Explore Destinations</h2>
              <p className="text-muted-foreground">Get inspired for your next trip</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" size="sm">
                Explore All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCities.map((city) => (
              <CityCard 
                key={city.id} 
                city={city}
                onAddToTrip={(city) => {
                  toast({
                    title: "Destination added!",
                    description: `${city.name} has been added to your trip.`,
                  });
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <CreateTripModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateTrip={handleCreateTrip}
      />
    </div>
  );
};

export default DashboardPage;
