
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const cardMetricVariants = cva("enterprise-card overflow-hidden", {
  variants: {
    variant: {
      default: "bg-card",
      primary: "bg-primary/10",
      success: "bg-status-success/10",
      danger: "bg-status-danger/10",
      warning: "bg-status-warning/10",
      info: "bg-status-info/10",
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface CardMetricProps extends VariantProps<typeof cardMetricVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

export function CardMetric({
  title,
  value,
  icon,
  trend,
  variant,
  className,
  valueClassName,
}: CardMetricProps) {
  return (
    <div className={cn(cardMetricVariants({ variant }), className)}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className={cn("text-2xl font-semibold", valueClassName)}>
            {value}
          </h3>
          {trend && (
            <div
              className={cn(
                "text-xs font-medium flex items-center",
                trend.isPositive
                  ? "text-status-success"
                  : trend.value === 0
                  ? "text-muted-foreground"
                  : "text-status-danger"
              )}
            >
              {trend.value === 0 ? (
                <MinusIcon className="h-3 w-3 mr-1" />
              ) : trend.isUpward ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
