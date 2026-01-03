import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BudgetBreakdownProps {
  budget: {
    transport: number;
    accommodation: number;
    activities: number;
    food: number;
    other: number;
  };
  totalBudget?: number;
}

const BudgetBreakdown = ({ budget, totalBudget }: BudgetBreakdownProps) => {
  const total = Object.values(budget).reduce((sum, val) => sum + val, 0);
  const isOverBudget = totalBudget ? total > totalBudget : false;

  const data = [
    { name: "Transport", value: budget.transport, color: "hsl(183, 58%, 35%)" },
    { name: "Accommodation", value: budget.accommodation, color: "hsl(16, 85%, 60%)" },
    { name: "Activities", value: budget.activities, color: "hsl(150, 35%, 40%)" },
    { name: "Food", value: budget.food, color: "hsl(35, 90%, 55%)" },
    { name: "Other", value: budget.other, color: "hsl(220, 15%, 70%)" },
  ].filter((item) => item.value > 0);

  const avgPerDay = 10; // Placeholder - would calculate from trip duration
  const costPerDay = (total / avgPerDay).toFixed(0);

  return (
    <Card variant="elevated">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Budget Breakdown
          </CardTitle>
          {isOverBudget && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Over Budget
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Estimated Total</span>
            <span className="font-display text-xl font-bold text-primary">
              ${total.toLocaleString()}
            </span>
          </div>

          {totalBudget && (
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm font-medium">Your Budget</span>
              <span className="font-display text-lg font-semibold">
                ${totalBudget.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Average ~${costPerDay}/day</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetBreakdown;
