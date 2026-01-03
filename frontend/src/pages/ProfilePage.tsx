import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TripCard from "@/components/trips/TripCard";
import { Camera, Mail, MapPin, Calendar, Edit, Save, X } from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Wanderer",
    email: "alex@example.com",
    location: "San Francisco, CA",
    bio: "Adventure seeker and travel enthusiast. Always looking for the next destination!",
    joinDate: "January 2024",
  });

  // Mock preplanned trips
  const preplannedTrips = [
    {
      id: "1",
      name: "Summer in Europe",
      destinations: ["Paris", "Rome", "Barcelona"],
      startDate: "2024-06-15",
      endDate: "2024-07-05",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
      status: "upcoming" as const,
      estimatedBudget: 4500,
    },
    {
      id: "2",
      name: "Beach Getaway",
      destinations: ["Maldives"],
      startDate: "2024-08-01",
      endDate: "2024-08-10",
      coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400",
      status: "upcoming" as const,
      estimatedBudget: 3200,
    },
  ];

  // Mock previous trips
  const previousTrips = [
    {
      id: "3",
      name: "Japan Adventure",
      destinations: ["Tokyo", "Kyoto", "Osaka"],
      startDate: "2024-03-10",
      endDate: "2024-03-25",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
      status: "completed" as const,
      estimatedBudget: 5000,
    },
    {
      id: "4",
      name: "NYC Weekend",
      destinations: ["New York City"],
      startDate: "2024-02-14",
      endDate: "2024-02-17",
      coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
      status: "completed" as const,
      estimatedBudget: 1500,
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Profile Header */}
          <Card variant="elevated" className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" />
                    <AvatarFallback className="text-3xl font-display bg-primary/10 text-primary">
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {isEditing ? (
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="text-2xl font-display font-bold mb-2"
                        />
                      ) : (
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                          {profile.name}
                        </h1>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {profile.email}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {profile.location}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {profile.joinDate}
                        </Badge>
                      </div>
                    </div>
                    
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Bio</Label>
                        <Input
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground font-body">{profile.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preplanned Trips */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Upcoming Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preplannedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

          {/* Previous Trips */}
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Previous Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
