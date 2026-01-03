import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, MoreHorizontal, Share2, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Trip {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  coverImage: string;
  estimatedBudget?: number;
  status: "upcoming" | "ongoing" | "completed" | "draft";
}

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

const TripCard = ({ trip, onDelete, onShare }: TripCardProps) => {
  const statusColors = {
    upcoming: "ocean",
    ongoing: "success",
    completed: "secondary",
    draft: "outline",
  } as const;

  const statusLabels = {
    upcoming: "Upcoming",
    ongoing: "In Progress",
    completed: "Completed",
    draft: "Draft",
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? "s" : ""}`;
  };

  return (
    <Card variant="interactive" className="overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={statusColors[trip.status]}>{statusLabels[trip.status]}</Badge>
        </div>
        
        {/* Actions Menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/trips/${trip.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare?.(trip.id)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Trip
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(trip.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Destinations on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">
            {trip.name}
          </h3>
          <div className="flex items-center gap-1 text-primary-foreground/90 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span>{trip.destinations.slice(0, 3).join(" → ")}</span>
            {trip.destinations.length > 3 && (
              <span>+{trip.destinations.length - 3} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <span>{getDuration()}</span>
          </div>
          
          {trip.estimatedBudget && (
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              <DollarSign className="h-4 w-4" />
              <span>{trip.estimatedBudget.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
