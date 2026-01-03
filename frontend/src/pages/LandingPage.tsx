import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Compass, 
  BarChart3,
  Share2,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: MapPin,
      title: "Multi-City Itineraries",
      description: "Build complex trips with multiple destinations, stops, and seamless transitions.",
    },
    {
      icon: Calendar,
      title: "Visual Timeline",
      description: "See your journey unfold with an interactive calendar and day-by-day planning.",
    },
    {
      icon: DollarSign,
      title: "Smart Budgeting",
      description: "Track expenses, get cost estimates, and stay within your travel budget.",
    },
    {
      icon: Compass,
      title: "Activity Discovery",
      description: "Explore curated activities, attractions, and hidden gems at each destination.",
    },
    {
      icon: BarChart3,
      title: "Cost Breakdown",
      description: "Detailed analytics showing transport, accommodation, and activity expenses.",
    },
    {
      icon: Share2,
      title: "Share & Collaborate",
      description: "Share your plans with friends or make them public for inspiration.",
    },
  ];

  const destinations = [
    { name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", rating: 4.9 },
    { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400", rating: 4.8 },
    { name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", rating: 4.7 },
    { name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400", rating: 4.8 },
  ];

  const steps = [
    { step: "01", title: "Create Your Trip", description: "Set your travel dates and name your adventure" },
    { step: "02", title: "Add Destinations", description: "Search and add cities to your itinerary" },
    { step: "03", title: "Plan Activities", description: "Discover and schedule things to do" },
    { step: "04", title: "Track Budget", description: "Monitor costs and stay on budget" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Scenic coastal road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 bg-primary-foreground/20 text-primary-foreground border-0">
              ✨ Your journey starts here
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Plan Your Perfect
              <span className="block text-accent">Adventure</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Create personalized multi-city itineraries, discover amazing activities, 
              and manage your travel budget—all in one beautiful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Planning Free
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Explore Destinations
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary-foreground" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-primary-foreground font-medium">10,000+ travelers</p>
                <p className="text-primary-foreground/70 text-sm">planning their adventures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary-foreground/70" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="ocean" className="mb-4">Features</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Plan
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful tools designed to make travel planning effortless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="interactive"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="coral" className="mb-4">How It Works</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Plan in 4 Simple Steps
            </h2>
            <p className="text-muted-foreground text-lg">
              From idea to itinerary in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-display text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge variant="ocean" className="mb-4">Trending</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground text-lg">
                Get inspired by where others are traveling.
              </p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Destinations
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Card key={dest.name} variant="interactive" className="overflow-hidden group">
                <div className="relative h-64">
                  <img 
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-xs text-primary-foreground/80 mb-1">
                      <Star className="h-3 w-3 fill-sunset text-sunset" />
                      <span>{dest.rating}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-primary-foreground">{dest.name}</h3>
                    <p className="text-primary-foreground/70 text-sm">{dest.country}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of travelers who plan smarter and explore more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="xl">
                Get Started — It's Free
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Free forever plan
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
