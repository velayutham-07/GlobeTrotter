import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface TripEvent {
  id: string;
  title: string;
  startDay: number;
  endDay: number;
  color: string;
}

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Mock trip events
  const tripEvents: TripEvent[] = [
    { id: "1", title: "PARIS TRIP", startDay: 5, endDay: 9, color: "bg-primary" },
    { id: "2", title: "PARIS 10", startDay: 10, endDay: 12, color: "bg-primary" },
    { id: "3", title: "15 - 22", startDay: 15, endDay: 22, color: "bg-accent" },
    { id: "4", title: "NYC - GETAWAY", startDay: 14, endDay: 16, color: "bg-forest" },
    { id: "5", title: "JAPAN ADVENTURE", startDay: 17, endDay: 20, color: "bg-sunset" },
    { id: "6", title: "NYC GETAWAY", startDay: 25, endDay: 28, color: "bg-forest" },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventsForDay = (day: number) => {
    return tripEvents.filter(event => day >= event.startDay && day <= event.endDay);
  };

  const isEventStart = (day: number, event: TripEvent) => day === event.startDay;
  const isEventEnd = (day: number, event: TripEvent) => day === event.endDay;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Calendar View
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                View all your trips in a calendar format
              </p>
            </div>
            <Link to="/trips/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Plan New Trip
              </Button>
            </Link>
          </div>

          {/* Calendar */}
          <Card variant="elevated">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="text-xl md:text-2xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const events = day ? getEventsForDay(day) : [];
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 border border-border/50 rounded-lg ${
                        day ? "bg-card hover:bg-muted/50 transition-colors" : "bg-muted/20"
                      }`}
                    >
                      {day && (
                        <>
                          <span className="text-sm font-medium text-foreground">{day}</span>
                          <div className="mt-1 space-y-1">
                            {events.slice(0, 2).map((event) => (
                              <Link
                                key={event.id}
                                to={`/trips/${event.id}`}
                                className={`block text-[10px] md:text-xs font-medium text-primary-foreground px-1 py-0.5 truncate ${event.color} ${
                                  isEventStart(day, event) ? "rounded-l" : ""
                                } ${isEventEnd(day, event) ? "rounded-r" : ""} hover:opacity-80 transition-opacity`}
                              >
                                {isEventStart(day, event) ? event.title : ""}
                              </Link>
                            ))}
                            {events.length > 2 && (
                              <span className="text-[10px] text-muted-foreground">
                                +{events.length - 2} more
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary" />
                  <span className="text-sm text-muted-foreground">Europe Trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-forest" />
                  <span className="text-sm text-muted-foreground">US Trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-sunset" />
                  <span className="text-sm text-muted-foreground">Asia Trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent" />
                  <span className="text-sm text-muted-foreground">Other</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalendarPage;
