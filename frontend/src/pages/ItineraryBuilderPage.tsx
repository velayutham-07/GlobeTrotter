import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  Calendar,
  DollarSign,
  MapPin,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ItinerarySection {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
  isExpanded: boolean;
}

const ItineraryBuilderPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tripName, setTripName] = useState("");
  const [sections, setSections] = useState<ItinerarySection[]>([
    {
      id: "1",
      title: "Section 1",
      description: "This can be anything like travel section, hotel or any other activity",
      startDate: "",
      endDate: "",
      budget: 0,
      activities: [],
      isExpanded: true,
    },
  ]);

  const addSection = () => {
    const newSection: ItinerarySection = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}`,
      description: "This can be anything like travel section, hotel or any other activity",
      startDate: "",
      endDate: "",
      budget: 0,
      activities: [],
      isExpanded: true,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id));
    }
  };

  const updateSection = (id: string, updates: Partial<ItinerarySection>) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const toggleSection = (id: string) => {
    setSections(
      sections.map((s) =>
        s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
      )
    );
  };

  const handleSave = () => {
    if (!tripName.trim()) {
      toast({
        title: "Trip name required",
        description: "Please enter a name for your trip",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Itinerary saved!",
      description: "Your trip itinerary has been saved successfully.",
    });
    navigate("/trips");
  };

  const totalBudget = sections.reduce((sum, s) => sum + s.budget, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Build Itinerary
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                Create your trip itinerary section by section
              </p>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Itinerary
            </Button>
          </div>

          {/* Trip Name */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="tripName">Trip Name</Label>
                <Input
                  id="tripName"
                  placeholder="Enter your trip name..."
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget Summary */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Total Budget</span>
                <Badge variant="default" className="text-lg px-4 py-1">
                  ${totalBudget.toLocaleString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <Card key={section.id} variant="elevated">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab p-1 text-muted-foreground hover:text-foreground">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${section.budget.toLocaleString()}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSection(section.id)}
                      >
                        {section.isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      {sections.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(section.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {section.isExpanded && (
                  <CardContent className="space-y-4">
                    {/* Description */}
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="All the necessary information about this section..."
                        value={section.description}
                        onChange={(e) =>
                          updateSection(section.id, { description: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Start Date
                        </Label>
                        <Input
                          type="date"
                          value={section.startDate}
                          onChange={(e) =>
                            updateSection(section.id, { startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          End Date
                        </Label>
                        <Input
                          type="date"
                          value={section.endDate}
                          onChange={(e) =>
                            updateSection(section.id, { endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget for this section
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter budget..."
                        value={section.budget || ""}
                        onChange={(e) =>
                          updateSection(section.id, {
                            budget: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>

                    {/* Section Title */}
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        placeholder="e.g., Flight to Paris, Hotel Stay, City Tour..."
                        value={section.title}
                        onChange={(e) =>
                          updateSection(section.id, { title: e.target.value })
                        }
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Add Section Button */}
          <Button
            variant="outline"
            className="w-full mt-6 border-dashed"
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add another Section
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ItineraryBuilderPage;
