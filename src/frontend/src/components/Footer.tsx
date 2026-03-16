import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { CATEGORIES } from "../data/mockData";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">
                  Electronic
                </div>
                <div className="text-accent font-display font-bold text-sm leading-tight -mt-1">
                  Mart
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              India's trusted electronics destination. Quality products, best
              prices, and exceptional service.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>1800-ELECTRO (toll-free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>support@electronicmart.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Pan India Delivery</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    className="text-white/70 hover:text-accent text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "My Orders", to: "/orders" },
                { label: "Wishlist", to: "/wishlist" },
                { label: "Cart", to: "/cart" },
                { label: "Profile", to: "/profile" },
                { label: "Login", to: "/login" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/70 hover:text-accent text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Customer Care</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {[
                "Return Policy",
                "Warranty",
                "Privacy Policy",
                "Terms of Use",
                "EMI Options",
                "Track Order",
              ].map((l) => (
                <li key={l}>
                  <span className="hover:text-accent transition-colors cursor-pointer">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {year} Electronic Mart. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
