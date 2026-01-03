import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ItineraryTimeline from "@/components/itinerary/ItineraryTimeline";
import BudgetBreakdown from "@/components/budget/BudgetBreakdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Share2, Edit, Plus } from "lucide-react";

const TripDetailPage = () => {
  const { id } = useParams();

  const trip = {
    id: "1",
    name: "Mediterranean Adventure",
    description: "A two-week journey through the beautiful Mediterranean coastline.",
    startDate: "2025-06-15",
    endDate: "2025-06-28",
    coverImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200",
    status: "upcoming" as const,
  };

  const stops = [
    {
      id: "1",
      city: "Barcelona",
      country: "Spain",
      startDate: "2025-06-15",
      endDate: "2025-06-18",
      activities: [
        { id: "1", name: "Sagrada Familia Tour", time: "10:00 AM", cost: 35 },
        { id: "2", name: "Gothic Quarter Walking Tour", time: "3:00 PM", cost: 25 },
      ],
    },
    {
      id: "2",
      city: "Nice",
      country: "France",
      startDate: "2025-06-19",
      endDate: "2025-06-22",
      activities: [
        { id: "3", name: "Promenade des Anglais", time: "9:00 AM", cost: 0 },
      ],
    },
    {
      id: "3",
      city: "Rome",
      country: "Italy",
      startDate: "2025-06-23",
      endDate: "2025-06-28",
      activities: [
        { id: "4", name: "Colosseum Skip-the-Line", time: "10:00 AM", cost: 50 },
        { id: "5", name: "Vatican Museums", time: "2:00 PM", cost: 45 },
      ],
    },
  ];

  const budget = {
    transport: 850,
    accommodation: 1800,
    activities: 420,
    food: 650,
    other: 200,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn />

      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 container mx-auto px-4">
          <Link to="/trips" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-3 text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to trips
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="ocean" className="mb-2">Upcoming</Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{trip.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-primary-foreground/80 text-sm">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Jun 15 - 28, 2025</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> 3 cities</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="hero-outline" size="sm"><Share2 className="h-4 w-4" /></Button>
              <Button variant="hero" size="sm"><Edit className="h-4 w-4 mr-1" /> Edit</Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Itinerary</h2>
              <Button variant="soft" size="sm"><Plus className="h-4 w-4 mr-1" /> Add Stop</Button>
            </div>
            <ItineraryTimeline stops={stops} />
          </div>
          <div className="space-y-6">
            <BudgetBreakdown budget={budget} totalBudget={4500} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripDetailPage;
