import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, GripVertical, Trash2 } from "lucide-react";

interface ItineraryStop {
  id: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  activities: {
    id: string;
    name: string;
    time: string;
    cost: number;
  }[];
}

interface ItineraryTimelineProps {
  stops: ItineraryStop[];
  onRemoveStop?: (stopId: string) => void;
  onRemoveActivity?: (stopId: string, activityId: string) => void;
  editable?: boolean;
}

const ItineraryTimeline = ({ 
  stops, 
  onRemoveStop, 
  onRemoveActivity,
  editable = true 
}: ItineraryTimelineProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  return (
    <div className="space-y-4">
      {stops.map((stop, index) => (
        <div key={stop.id} className="relative">
          {/* Timeline connector */}
          {index < stops.length - 1 && (
            <div className="absolute left-6 top-full h-4 w-0.5 bg-border" />
          )}
          
          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            
            <div className="p-4 pl-6">
              {/* Stop Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {editable && (
                    <button className="mt-1 text-muted-foreground hover:text-foreground cursor-grab">
                      <GripVertical className="h-4 w-4" />
                    </button>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{stop.city}</h3>
                      <Badge variant="ocean">{getDays(stop.startDate, stop.endDate)} days</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{stop.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(stop.startDate)} – {formatDate(stop.endDate)}
                  </span>
                  {editable && onRemoveStop && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveStop(stop.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Activities */}
              {stop.activities.length > 0 && (
                <div className="space-y-2 mt-4 pl-7">
                  {stop.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{activity.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-primary">
                          <DollarSign className="h-3 w-3" />
                          <span>{activity.cost}</span>
                        </div>
                        {editable && onRemoveActivity && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                            onClick={() => onRemoveActivity(stop.id, activity.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {stop.activities.length === 0 && (
                <p className="text-sm text-muted-foreground italic pl-7 mt-2">
                  No activities planned yet
                </p>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
