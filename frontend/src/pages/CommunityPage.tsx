import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Heart, MessageCircle, Share2, MapPin, Calendar, Copy } from "lucide-react";
import { Link } from "react-router-dom";

interface SharedTrip {
  id: string;
  title: string;
  destination: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  dates: string;
  likes: number;
  comments: number;
  tags: string[];
}

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock shared trips
  const sharedTrips: SharedTrip[] = [
    {
      id: "1",
      title: "Ultimate Japan Adventure",
      destination: "Tokyo, Kyoto, Osaka",
      description: "A 2-week journey through Japan's most iconic cities. From ancient temples to modern skyscrapers, experience the best of Japan.",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
      author: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1" },
      dates: "Mar 10 - Mar 25, 2024",
      likes: 234,
      comments: 45,
      tags: ["Asia", "Culture", "Food"],
    },
    {
      id: "2",
      title: "European Summer Road Trip",
      destination: "Paris, Amsterdam, Berlin",
      description: "Drive through the heart of Europe visiting iconic cities and hidden gems along the way. Perfect for adventurous souls.",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
      author: { name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
      dates: "Jun 15 - Jul 5, 2024",
      likes: 189,
      comments: 32,
      tags: ["Europe", "Road Trip", "Adventure"],
    },
    {
      id: "3",
      title: "Bali Wellness Retreat",
      destination: "Ubud, Seminyak, Canggu",
      description: "A relaxing week in Bali focused on wellness, yoga, and cultural immersion. Perfect for rejuvenation.",
      coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      author: { name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
      dates: "Sep 1 - Sep 8, 2024",
      likes: 312,
      comments: 67,
      tags: ["Asia", "Wellness", "Beach"],
    },
    {
      id: "4",
      title: "NYC Food Tour",
      destination: "New York City",
      description: "A foodie's guide to the best eats in NYC. From pizza to fine dining, explore the culinary capital of the world.",
      coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600",
      author: { name: "David Lee", avatar: "https://i.pravatar.cc/150?img=4" },
      dates: "Apr 5 - Apr 10, 2024",
      likes: 156,
      comments: 28,
      tags: ["USA", "Food", "City"],
    },
    {
      id: "5",
      title: "Greek Islands Hopping",
      destination: "Santorini, Mykonos, Crete",
      description: "Island hop through Greece's most beautiful destinations. Sun, sea, and amazing Greek cuisine await.",
      coverImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600",
      author: { name: "Lisa Brown", avatar: "https://i.pravatar.cc/150?img=5" },
      dates: "Jul 20 - Aug 5, 2024",
      likes: 278,
      comments: 54,
      tags: ["Europe", "Beach", "Islands"],
    },
  ];

  const filteredTrips = sharedTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || trip.tags.some((tag) => tag.toLowerCase() === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Community
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Discover and get inspired by travel itineraries shared by fellow globetrotters. 
              Find your next adventure or share your own experiences.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trips, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Shared Trips Grid */}
          <div className="space-y-6">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} variant="interactive" className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto relative">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={trip.author.avatar} />
                          <AvatarFallback>{trip.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{trip.author.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {trip.dates}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {trip.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                      <MapPin className="h-4 w-4" />
                      {trip.destination}
                    </p>
                    <p className="text-muted-foreground font-body mb-4 line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{trip.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{trip.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Trip
                        </Button>
                        <Link to={`/trips/${trip.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body">
                No trips found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;
