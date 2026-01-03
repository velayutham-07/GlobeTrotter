import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TripCard, { Trip } from "@/components/trips/TripCard";
import CreateTripModal from "@/components/trips/CreateTripModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MyTripsPage = () => {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data
  const allTrips: Trip[] = [
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
    {
      id: "3",
      name: "Iceland Northern Lights",
      startDate: "2024-11-10",
      endDate: "2024-11-18",
      destinations: ["Reykjavik", "Golden Circle", "Vik"],
      coverImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
      estimatedBudget: 3800,
      status: "completed",
    },
    {
      id: "4",
      name: "Southeast Asia Backpacking",
      startDate: "2024-08-01",
      endDate: "2024-09-15",
      destinations: ["Bangkok", "Chiang Mai", "Bali", "Hanoi"],
      coverImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      estimatedBudget: 3200,
      status: "completed",
    },
    {
      id: "5",
      name: "Weekend in Paris",
      description: "A romantic getaway",
      startDate: "2025-02-14",
      endDate: "2025-02-16",
      destinations: ["Paris"],
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      estimatedBudget: 1500,
      status: "draft",
    },
  ];

  const filteredTrips = allTrips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTrip = async (tripData: { name: string; description: string; startDate: string; endDate: string }) => {
    console.log("Creating trip:", tripData);
    toast({
      title: "Trip created!",
      description: `"${tripData.name}" has been added to your trips.`,
    });
  };

  const handleDeleteTrip = (id: string) => {
    toast({
      title: "Trip deleted",
      description: "The trip has been removed from your list.",
    });
  };

  const tripCounts = {
    all: allTrips.length,
    upcoming: allTrips.filter(t => t.status === "upcoming").length,
    ongoing: allTrips.filter(t => t.status === "ongoing").length,
    completed: allTrips.filter(t => t.status === "completed").length,
    draft: allTrips.filter(t => t.status === "draft").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />
      
      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              My Trips
            </h1>
            <p className="text-muted-foreground">
              Manage and organize all your travel plans
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

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({tripCounts.all})</SelectItem>
                <SelectItem value="upcoming">Upcoming ({tripCounts.upcoming})</SelectItem>
                <SelectItem value="ongoing">Ongoing ({tripCounts.ongoing})</SelectItem>
                <SelectItem value="completed">Completed ({tripCounts.completed})</SelectItem>
                <SelectItem value="draft">Drafts ({tripCounts.draft})</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Trip Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(tripCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All Trips" : status} ({count})
            </Badge>
          ))}
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip}
                onDelete={handleDeleteTrip}
                onShare={(id) => {
                  toast({
                    title: "Link copied!",
                    description: "Share this link with friends and family.",
                  });
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "No trips match your search" 
                : "No trips in this category"}
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Create a Trip
            </Button>
          </div>
        )}
      </main>

      <CreateTripModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateTrip={handleCreateTrip}
      />
    </div>
  );
};

export default MyTripsPage;
