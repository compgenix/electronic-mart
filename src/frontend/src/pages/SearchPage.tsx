import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import { BRANDS, CATEGORIES } from "../data/mockData";

export function SearchPage() {
  const searchParams = useSearch({ from: "/search" });
  const initialQ = (searchParams as { q?: string }).q ?? "";
  const { products } = useProducts();

  const [query, setQuery] = useState(initialQ);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    setQuery(initialQ);
  }, [initialQ]);

  const results = useMemo(() => {
    let list = products.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return (
        matchesQuery &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        (selectedCats.length === 0 || selectedCats.includes(p.categorySlug)) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        p.rating >= minRating
      );
    });
    switch (sort) {
      case "price_asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [
    products,
    query,
    selectedBrands,
    selectedCats,
    priceRange,
    minRating,
    sort,
  ]);

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div
        data-ocid="search.search_input"
        className="relative mb-8 max-w-2xl mx-auto"
      >
        <Search
          size={18}
          className="absolute left-3 top-3 text-muted-foreground"
        />
        <Input
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands, categories..."
          className="pl-10 h-11 text-base"
        />
      </div>

      <div className="flex gap-8">
        <aside
          data-ocid="search.filter_panel"
          className="hidden lg:block w-56 shrink-0"
        >
          <div className="bg-card border rounded-xl p-4 space-y-6 sticky top-24">
            <div>
              <h3 className="font-semibold mb-3 text-sm">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((c) => (
                  <div key={c.slug} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${c.slug}`}
                      checked={selectedCats.includes(c.slug)}
                      onCheckedChange={() =>
                        toggleArr(selectedCats, c.slug, setSelectedCats)
                      }
                    />
                    <label
                      htmlFor={`cat-${c.slug}`}
                      className="text-sm cursor-pointer"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Brands</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {BRANDS.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${b}`}
                      checked={selectedBrands.includes(b)}
                      onCheckedChange={() =>
                        toggleArr(selectedBrands, b, setSelectedBrands)
                      }
                    />
                    <label
                      htmlFor={`brand-${b}`}
                      className="text-sm cursor-pointer"
                    >
                      {b}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
              <Slider
                min={0}
                max={200000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>&#8377;{priceRange[0].toLocaleString()}</span>
                <span>&#8377;{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setSelectedBrands([]);
                setSelectedCats([]);
                setPriceRange([0, 200000]);
                setMinRating(0);
              }}
            >
              Clear All
            </Button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {results.length} results for "{query || "all products"}"
            </p>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">
                  Price: Low &rarr; High
                </SelectItem>
                <SelectItem value="price_desc">
                  Price: High &rarr; Low
                </SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {results.length === 0 ? (
            <div data-ocid="search.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold">No results found</h3>
              <p className="text-muted-foreground text-sm">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
