import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MapPin,
  Activity,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for charts
  const tripDistribution = [
    { name: "Europe", value: 35, color: "hsl(183, 58%, 35%)" },
    { name: "Asia", value: 28, color: "hsl(16, 85%, 60%)" },
    { name: "Americas", value: 22, color: "hsl(150, 35%, 40%)" },
    { name: "Other", value: 15, color: "hsl(35, 90%, 55%)" },
  ];

  const monthlyTrips = [
    { month: "Jan", trips: 120 },
    { month: "Feb", trips: 150 },
    { month: "Mar", trips: 180 },
    { month: "Apr", trips: 220 },
    { month: "May", trips: 280 },
    { month: "Jun", trips: 350 },
  ];

  const userGrowth = [
    { month: "Jan", users: 1000 },
    { month: "Feb", users: 1250 },
    { month: "Mar", users: 1580 },
    { month: "Apr", users: 2100 },
    { month: "May", users: 2800 },
    { month: "Jun", users: 3500 },
  ];

  const popularCities = [
    { name: "Paris", trips: 245, country: "France" },
    { name: "Tokyo", trips: 198, country: "Japan" },
    { name: "New York", trips: 176, country: "USA" },
    { name: "London", trips: 165, country: "UK" },
    { name: "Barcelona", trips: 142, country: "Spain" },
  ];

  const popularActivities = [
    { name: "Sightseeing", count: 1250 },
    { name: "Food Tours", count: 980 },
    { name: "Museums", count: 856 },
    { name: "Hiking", count: 720 },
    { name: "Beach", count: 654 },
  ];

  const users = [
    { id: "1", name: "Sarah Chen", email: "sarah@example.com", trips: 12, joined: "Jan 2024", status: "active" },
    { id: "2", name: "Mike Johnson", email: "mike@example.com", trips: 8, joined: "Feb 2024", status: "active" },
    { id: "3", name: "Emma Wilson", email: "emma@example.com", trips: 5, joined: "Mar 2024", status: "active" },
    { id: "4", name: "David Lee", email: "david@example.com", trips: 3, joined: "Mar 2024", status: "inactive" },
    { id: "5", name: "Lisa Brown", email: "lisa@example.com", trips: 7, joined: "Apr 2024", status: "active" },
  ];

  const stats = [
    { label: "Total Users", value: "3,542", icon: Users, change: "+12.5%" },
    { label: "Popular Cities", value: "156", icon: MapPin, change: "+8.2%" },
    { label: "Popular Activities", value: "89", icon: Activity, change: "+15.3%" },
    { label: "Trips Created", value: "1,247", icon: TrendingUp, change: "+22.1%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground font-body">
              Monitor platform activity, manage users, and view analytics
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                      <p className="text-3xl font-display font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <Badge variant="success" className="mt-3">
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="users">Manage Users</TabsTrigger>
              <TabsTrigger value="cities">Popular Cities</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Manage Users</CardTitle>
                      <CardDescription>
                        View and manage all registered users on the platform
                      </CardDescription>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Trips</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.trips}</TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "success" : "secondary"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cities Tab */}
            <TabsContent value="cities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Cities</CardTitle>
                  <CardDescription>
                    Cities where users are visiting the most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Total Trips</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {popularCities.map((city, index) => (
                        <TableRow key={city.name}>
                          <TableCell>
                            <Badge variant={index < 3 ? "default" : "secondary"}>
                              #{index + 1}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{city.name}</TableCell>
                          <TableCell>{city.country}</TableCell>
                          <TableCell>{city.trips}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Activities</CardTitle>
                  <CardDescription>
                    Most frequently added activities across all trips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={popularActivities}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(183, 58%, 35%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trip Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Distribution by Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tripDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {tripDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {tripDistribution.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.name} ({item.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* User Growth */}
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userGrowth}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="users"
                            stroke="hsl(16, 85%, 60%)"
                            strokeWidth={2}
                            dot={{ fill: "hsl(16, 85%, 60%)" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Trips */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly Trips Created</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyTrips}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="trips" fill="hsl(183, 58%, 35%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
