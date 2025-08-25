import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Presentation from "@/pages/presentation";
import PreInscription from "@/pages/pre-inscription";
import Contact from "@/pages/contact";
import Header from "@/components/header";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header with Banner and Navigation */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Header />
          <Navigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/pre-inscription" component={PreInscription} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-nunito text-xl font-bold text-sage mb-2">
                M.A.M Maison des p'tites souris vertes
              </h3>
              <p className="text-white/70">Un environnement bienveillant pour vos tout-petits</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/MAM-la-maison-des-ptites-souris-vertes/100075713097641/" target="_blank" rel="noopener noreferrer" className="text-sage hover:text-sage/80 transition-colors" data-testid="link-facebook">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="mailto:mammaisondesptitessourisvertes@gmail.com" className="text-sage hover:text-sage/80 transition-colors" data-testid="link-email">
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 pt-6">
            <p className="text-white/60 text-sm">© 2024 M.A.M Maison des p'tites souris vertes - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
