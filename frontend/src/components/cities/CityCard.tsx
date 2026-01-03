import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp, Plus } from "lucide-react";

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  costIndex: "budget" | "moderate" | "expensive" | "luxury";
  rating: number;
  popularActivities: string[];
  description: string;
}

interface CityCardProps {
  city: City;
  onAddToTrip?: (city: City) => void;
  compact?: boolean;
}

const CityCard = ({ city, onAddToTrip, compact = false }: CityCardProps) => {
  const costColors = {
    budget: "success",
    moderate: "ocean",
    expensive: "coral",
    luxury: "default",
  } as const;

  const costLabels = {
    budget: "$",
    moderate: "$$",
    expensive: "$$$",
    luxury: "$$$$",
  };

  if (compact) {
    return (
      <Card variant="interactive" className="overflow-hidden">
        <div className="flex gap-4 p-3">
          <img
            src={city.image}
            alt={city.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-semibold truncate">{city.name}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{city.country}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={costColors[city.costIndex]} className="text-xs">
                {costLabels[city.costIndex]}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-sunset text-sunset" />
                <span>{city.rating}</span>
              </div>
            </div>
          </div>
          {onAddToTrip && (
            <Button
              variant="soft"
              size="icon"
              className="shrink-0 self-center"
              onClick={() => onAddToTrip(city)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="interactive" className="overflow-hidden group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={costColors[city.costIndex]}>{costLabels[city.costIndex]}</Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-sunset text-sunset" />
            {city.rating}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-lg font-semibold text-primary-foreground">
            {city.name}
          </h3>
          <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span>{city.country}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {city.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span>{city.popularActivities.slice(0, 2).join(", ")}</span>
          </div>
          {onAddToTrip && (
            <Button variant="soft" size="sm" onClick={() => onAddToTrip(city)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CityCard;
