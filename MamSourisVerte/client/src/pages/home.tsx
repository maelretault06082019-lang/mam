import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Baby, Clock, Heart } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <section className="fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-sage/20 to-sky-soft/20 rounded-3xl p-8 md:p-12 mb-12 text-center">
          <img 
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
            alt="Maison d'assistantes maternelles accueillante" 
            className="rounded-2xl shadow-xl w-full h-64 md:h-80 object-cover mb-8"
            data-testid="img-hero"
          />
          
          <h2 className="font-nunito text-3xl md:text-4xl font-bold text-charcoal mb-4" data-testid="text-hero-title">
            Bienvenue dans notre MAM
          </h2>
          <p className="text-lg md:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Un lieu chaleureux où vos enfants grandissent en sécurité, entourés de professionnelles 
            passionnées par la petite enfance.
          </p>
        </div>

        {/* Notre Histoire */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-lg">
          <h3 className="font-nunito text-2xl md:text-3xl font-bold text-charcoal mb-6 text-center" data-testid="text-story-title">
            Notre Histoire
          </h3>
          <div className="max-w-4xl mx-auto text-charcoal/80 leading-relaxed space-y-4" data-testid="text-story-content">
            <p>
              Notre histoire a commencé en 2022. Après avoir travaillé près de 10 ans ensemble en tant qu'agent spécialisé des écoles maternelles, nous avons souhaité associer nos compétences et nos valeurs en faveur de ce beau projet, la MAM.
            </p>
            <p>
              La MAM nous permet d'exercer ensemble, dans un domaine qui nous passionne afin de proposer un accueil innovant dans notre secteur.
            </p>
            <p>
              La structure permet d'accueillir 8 enfants de 0 à 3 ans dans un cadre bienveillant et sécurisant.
            </p>
            <p>
              Nos formations et nos expériences professionnelles communes, nous permettent de faire découvrir la pédagogie Montessori aux enfants.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-shadow" data-testid="card-service-accueil">
            <CardContent className="p-6 text-center">
              <div className="text-4xl text-sage mb-4">
                <Baby className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="font-nunito text-xl font-bold mb-3" data-testid="text-service-accueil-title">Accueil 0-3 ans</h3>
              <p className="text-charcoal/70" data-testid="text-service-accueil-description">
                Nous accueillons vos tout-petits dans un environnement sécurisé et stimulant.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-shadow" data-testid="card-service-horaires">
            <CardContent className="p-6 text-center">
              <div className="text-4xl text-coral-warm mb-4">
                <Clock className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="font-nunito text-xl font-bold mb-3" data-testid="text-service-horaires-title">Horaires flexibles</h3>
              <p className="text-charcoal/70" data-testid="text-service-horaires-description">
                Des horaires adaptés aux besoins des familles travailleuses.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl transition-shadow" data-testid="card-service-equipe">
            <CardContent className="p-6 text-center">
              <div className="text-4xl text-sky-soft mb-4">
                <Heart className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="font-nunito text-xl font-bold mb-3" data-testid="text-service-equipe-title">Équipe qualifiée</h3>
              <p className="text-charcoal/70" data-testid="text-service-equipe-description">
                Des assistantes maternelles expérimentées et diplômées.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center shadow-lg" data-testid="card-cta">
          <CardContent className="p-8">
            <h3 className="font-nunito text-2xl font-bold mb-4" data-testid="text-cta-title">Prêt(e) à nous rencontrer ?</h3>
            <p className="text-charcoal/70 mb-6" data-testid="text-cta-description">Prenez contact avec nous pour une visite ou des renseignements</p>
            <Button 
              onClick={() => setLocation("/contact")} 
              className="bg-sage hover:bg-sage/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-contact"
            >
              Nous contacter
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
