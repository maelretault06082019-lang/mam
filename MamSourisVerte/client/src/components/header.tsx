import { Home } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-6">
      <h1 className="font-nunito text-3xl md:text-4xl font-bold text-sage mb-2" data-testid="header-title">
        <Home className="inline mr-3 text-coral-warm" />
        M.A.M Maison des p'tites souris vertes
      </h1>
      <p className="text-charcoal/70 text-sm md:text-base mb-3" data-testid="header-subtitle">
        Un environnement bienveillant pour vos tout-petits
      </p>
      <div className="inline-flex items-center bg-sage text-white px-4 py-2 rounded-full text-sm font-medium" data-testid="header-montessori-badge">
        <span className="mr-2">🌱</span>
        Pédagogie Montessori
      </div>
    </div>
  );
}
