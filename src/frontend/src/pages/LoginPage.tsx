import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Shield, User, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const { mockLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    navigate({ to: "/profile" });
    return null;
  }

  const handleLogin = (e: React.FormEvent, asAdmin = false) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Fill in all fields");
      return;
    }
    mockLogin(asAdmin);
    toast.success(asAdmin ? "Logged in as Admin" : "Welcome back!");
    navigate({ to: "/profile" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-white fill-white" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your Electronic Mart account
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-card">
          <form onSubmit={(e) => handleLogin(e, false)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground h-11 font-semibold"
            >
              <User size={16} className="mr-2" /> Sign In
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative text-center text-xs text-muted-foreground bg-card px-2 mx-auto w-fit">
              or
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full h-11 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
            onClick={(e) => handleLogin(e, true)}
          >
            <Shield size={16} className="mr-2" /> Login as Admin (Demo)
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Demo app — any email/password works. Admin login gives dashboard
            access.
          </p>
        </div>
      </div>
    </div>
  );
}
