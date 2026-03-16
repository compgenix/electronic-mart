import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link, useParams } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { CATEGORIES } from "../data/mockData";

export function CategoryPage() {
  const { slug } = useParams({ from: "/category/$slug" });
  const { products } = useProducts();
  const category = CATEGORIES.find((c) => c.slug === slug);

  const maxPrice = 200000;
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const PER_PAGE = 8;

  const catProducts = products.filter((p) => p.categorySlug === slug);
  const brandsInCat = [...new Set(catProducts.map((p) => p.brand))];

  const filtered = useMemo(() => {
    let list = catProducts.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        p.rating >= minRating,
    );
    switch (sort) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].reverse();
        break;
    }
    return list;
  }, [catProducts, priceRange, selectedBrands, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
    setPage(1);
  };

  const FilterPanel = () => (
    <aside data-ocid="search.filter_panel" className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Brands</h3>
        <div className="space-y-2">
          {brandsInCat.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-filter-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={`brand-filter-${brand}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <Slider
          min={0}
          max={maxPrice}
          step={1000}
          value={priceRange}
          onValueChange={(v) => {
            setPriceRange(v);
            setPage(1);
          }}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>&#8377;{priceRange[0].toLocaleString()}</span>
          <span>&#8377;{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <div key={r} className="flex items-center gap-2">
              <Checkbox
                id={`rating-filter-${r}`}
                checked={minRating === r}
                onCheckedChange={() => {
                  setMinRating(minRating === r ? 0 : r);
                  setPage(1);
                }}
              />
              <label
                htmlFor={`rating-filter-${r}`}
                className="text-sm cursor-pointer"
              >
                {"⭐".repeat(r)} & above
              </label>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedBrands([]);
          setPriceRange([0, maxPrice]);
          setMinRating(0);
          setPage(1);
        }}
        className="w-full"
      >
        Clear Filters
      </Button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        {" / "}
        <span className="text-foreground font-medium">
          {category?.name ?? slug}
        </span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">
          {category?.icon} {category?.name ?? slug}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filtered.length} products)
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-1 text-sm border rounded-lg px-3 py-1.5"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Sort by:
            </span>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="lg:hidden mb-6 p-4 bg-card border rounded-lg">
          <FilterPanel />
        </div>
      )}

      <div className="flex gap-8">
        <div className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 bg-card rounded-lg border p-4">
            <FilterPanel />
          </div>
        </div>
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div data-ocid="category.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                data-ocid="category.pagination_prev"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(p)}
                  className={
                    p === page ? "bg-primary text-primary-foreground" : ""
                  }
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                data-ocid="category.pagination_next"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
