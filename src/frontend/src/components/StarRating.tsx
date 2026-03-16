import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
}

export function StarRating({ rating, count, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
