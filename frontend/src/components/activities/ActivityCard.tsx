import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Plus, MapPin } from "lucide-react";

export interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  city: string;
  duration: string;
  cost: number;
  category: "sightseeing" | "food" | "adventure" | "culture" | "relaxation" | "shopping";
}

interface ActivityCardProps {
  activity: Activity;
  onAdd?: (activity: Activity) => void;
  selected?: boolean;
}

const ActivityCard = ({ activity, onAdd, selected = false }: ActivityCardProps) => {
  const categoryColors = {
    sightseeing: "ocean",
    food: "coral",
    adventure: "success",
    culture: "default",
    relaxation: "secondary",
    shopping: "outline",
  } as const;

  const categoryIcons = {
    sightseeing: "🏛️",
    food: "🍽️",
    adventure: "🎿",
    culture: "🎭",
    relaxation: "🧘",
    shopping: "🛍️",
  };

  return (
    <Card 
      variant={selected ? "elevated" : "interactive"} 
      className={`overflow-hidden ${selected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="flex gap-4 p-4">
        <div className="relative shrink-0">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="absolute -bottom-1 -right-1 text-lg">
            {categoryIcons[activity.category]}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-display font-semibold text-base line-clamp-1">
                {activity.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" />
                <span>{activity.city}</span>
              </div>
            </div>
            <Badge variant={categoryColors[activity.category]} className="shrink-0 capitalize">
              {activity.category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {activity.description}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center gap-1 font-medium text-primary">
                <DollarSign className="h-3.5 w-3.5" />
                <span>{activity.cost}</span>
              </div>
            </div>
            
            {onAdd && (
              <Button
                variant={selected ? "default" : "soft"}
                size="sm"
                onClick={() => onAdd(activity)}
              >
                <Plus className="h-4 w-4 mr-1" />
                {selected ? "Added" : "Add"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;
