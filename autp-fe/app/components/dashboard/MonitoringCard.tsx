import { LucideProps } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface MonitoringCardProps {
  title: string;
  sum: number;
  Icon: React.ComponentType<LucideProps>;
  textColor?: string;
  bgColor?: string;
  iconColor?: string;
}

export function MonitoringCard({
  title,
  sum,
  Icon,
  textColor = "text-foreground",
  bgColor = "bg-primary/10",
  iconColor = "text-primary",
}: MonitoringCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{title}</p>
            <p className={`text-3xl font-bold ${textColor} mt-2`}>{sum}</p>
          </div>
          <div className={`p-3 ${bgColor} rounded-lg`}>
            <Icon size={24} className={iconColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
