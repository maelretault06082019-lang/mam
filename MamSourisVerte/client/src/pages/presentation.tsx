import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Music, Book, Leaf, Home, Users, Eye } from "lucide-react";
import videoSrc from "@assets/file_1755952754148.mp4";

export default function Presentation() {
  const [activeTab, setActiveTab] = useState("histoire");

  const tabs = [
    { id: "histoire", label: "Notre Histoire", icon: Home },
    { id: "visite", label: "Visite de la MAM", icon: Eye },
    { id: "mam", label: "Qu'est-ce qu'une MAM", icon: Users },
    { id: "assistantes", label: "Les assistantes maternelles", icon: Users }
  ];

  const teamMembers = [
    {
      name: "Anne Thomas",
      role: "Assistante maternelle agréée",
      image: "https://static.wixstatic.com/media/3b5e03_61074449a58f4557adaa0824d5b83bda~mv2.jpg/v1/crop/x_0,y_348,w_3087,h_3130/fill/w_216,h_219,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_20220203_180653anne.jpg"
    },
    {
      name: "",
      role: "",
      image: "https://static.wixstatic.com/media/3b5e03_6a6a5f111612409f8055f598e1c57381~mv2.png/v1/fill/w_325,h_310,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png"
    },
    {
      name: "Elodie Deboeuf",
      role: "Assistante maternelle agréée",
      image: "https://static.wixstatic.com/media/3b5e03_b22d7c1ab84a4fd99f36d22412c4ee57~mv2.jpg/v1/crop/x_76,y_0,w_2035,h_1945/fill/w_226,h_216,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/elodie5_edited_edited.jpg"
    }
  ];

  const activities = [
    {
      icon: Palette,
      title: "Activités créatives",
      description: "Peinture, dessin, pâte à modeler",
      color: "text-sage"
    },
    {
      icon: Music,
      title: "Éveil musical",
      description: "Comptines, instruments, chansons",
      color: "text-coral-warm"
    },
    {
      icon: Book,
      title: "Lecture",
      description: "Histoires, albums illustrés",
      color: "text-sky-soft"
    },
    {
      icon: Leaf,
      title: "Activités nature",
      description: "Jardinage, promenades, découvertes",
      color: "text-sage"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "histoire":
        return (
          <div className="space-y-6">
            <h3 className="font-nunito text-2xl font-bold text-charcoal mb-6" data-testid="text-story-title">
              Maison d'Assistantes Maternelles
            </h3>
            <div className="text-charcoal/80 leading-relaxed space-y-4" data-testid="text-story-content">
              <p>
                Notre histoire a commencée en 2022. Après avoir travaillé près de 10 ans ensemble en tant qu'agent spécialisé des écoles maternelles, nous avons souhaité associer nos compétences et nos valeurs en faveur de ce beau projet, la MAM.
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
        );
      case "visite":
        return (
          <div className="space-y-6">
            <h3 className="font-nunito text-2xl font-bold text-charcoal mb-6" data-testid="text-visit-title">
              Visite de la MAM
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <video 
                  src={videoSrc}
                  controls
                  className="rounded-2xl shadow-xl w-full h-auto"
                  data-testid="video-visit"
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              <div className="text-charcoal/80 leading-relaxed space-y-4" data-testid="text-visit-content">
                <p>
                  Notre MAM dispose d'espaces spécialement aménagés pour le bien-être et l'épanouissement des enfants. Chaque zone a été pensée pour répondre aux besoins spécifiques des tout-petits.
                </p>
                <p>
                  Nous proposons des visites de nos locaux sur rendez-vous pour que vous puissiez découvrir notre environnement chaleureux et sécurisé.
                </p>
                <p>
                  Les espaces de jeux, de repos et d'activités sont adaptés à l'âge des enfants accueillis.
                </p>
              </div>
            </div>
          </div>
        );
      case "mam":
        return (
          <div className="space-y-6">
            <h3 className="font-nunito text-2xl font-bold text-charcoal mb-6" data-testid="text-mam-title">
              Qu'est-ce qu'une MAM ?
            </h3>
            <div className="text-charcoal/80 leading-relaxed space-y-4" data-testid="text-mam-content">
              <p>
                Une Maison d'Assistantes Maternelles (MAM) est une alternative à la garde individuelle chez l'assistante maternelle ou à la crèche collective.
              </p>
              <p>
                Dans une MAM, plusieurs assistantes maternelles agréées se regroupent dans un local spécialement aménagé pour accueillir les enfants dont elles ont la garde.
              </p>
              <p>
                Cette formule permet aux enfants de bénéficier d'un accueil personnalisé tout en profitant de la socialisation avec d'autres enfants.
              </p>
              <p>
                La MAM offre une continuité dans l'accueil même en cas d'absence d'une assistante maternelle, grâce à la présence de ses collègues.
              </p>
            </div>
          </div>
        );
      case "assistantes":
        return (
          <div className="space-y-6">
            <h3 className="font-nunito text-2xl font-bold text-charcoal mb-6" data-testid="text-assistantes-title">
              Les assistantes maternelles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm" data-testid={`card-team-member-${index}`}>
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                    data-testid={`img-team-member-${index}`}
                  />
                  <h4 className="font-nunito font-bold text-charcoal" data-testid={`text-team-member-name-${index}`}>{member.name}</h4>
                  <p className="text-sm text-charcoal/70" data-testid={`text-team-member-role-${index}`}>{member.role}</p>
                </div>
              ))}
            </div>
            <div className="text-charcoal/80 leading-relaxed space-y-4" data-testid="text-assistantes-content">
              <p>
                Nos assistantes maternelles sont toutes agréées par le Conseil Départemental et disposent des qualifications nécessaires pour accueillir vos enfants en toute sécurité.
              </p>
              <p>
                Elles bénéficient d'une formation continue et partagent une approche pédagogique commune basée sur la bienveillance et le respect du rythme de chaque enfant.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-nunito text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal" data-testid="text-presentation-title">
          Présentation de la MAM
        </h2>
        
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                activeTab === tab.id ? "active" : ""
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="inline mr-2 h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <Card className="shadow-lg mb-12" data-testid="card-tab-content">
          <CardContent className="p-8">
            {renderTabContent()}
          </CardContent>
        </Card>


        {/* Pédagogie Montessori */}
        <Card className="shadow-lg mb-12 border-sage border-2" data-testid="card-montessori">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/20 rounded-full mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-nunito text-2xl font-bold text-charcoal mb-4" data-testid="text-montessori-section-title">
                Pédagogie Montessori
              </h3>
              <p className="text-charcoal/80 leading-relaxed max-w-3xl mx-auto" data-testid="text-montessori-section-description">
                Notre approche pédagogique s'inspire des principes Montessori pour offrir à chaque enfant 
                un environnement d'apprentissage respectueux de son rythme naturel de développement. 
                Nous privilégions l'autonomie, la découverte sensorielle et l'épanouissement personnel.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4" data-testid="montessori-principle-1">
                <div className="text-3xl mb-3">👶</div>
                <h4 className="font-nunito font-bold text-charcoal mb-2">Respect du rythme</h4>
                <p className="text-sm text-charcoal/70">Chaque enfant évolue à son propre rythme</p>
              </div>
              <div className="text-center p-4" data-testid="montessori-principle-2">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-nunito font-bold text-charcoal mb-2">Matériel adapté</h4>
                <p className="text-sm text-charcoal/70">Environnement préparé avec soin</p>
              </div>
              <div className="text-center p-4" data-testid="montessori-principle-3">
                <div className="text-3xl mb-3">🌟</div>
                <h4 className="font-nunito font-bold text-charcoal mb-2">Autonomie</h4>
                <p className="text-sm text-charcoal/70">Développement de la confiance en soi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nos activités */}
        <div className="bg-gradient-to-br from-sage/10 to-sky-soft/10 rounded-2xl p-8" data-testid="section-activities">
          <h3 className="font-nunito text-2xl font-bold text-center mb-8 text-charcoal" data-testid="text-activities-title">Nos activités</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm" data-testid={`card-activity-${index}`}>
                <div className={`text-2xl ${activity.color}`}>
                  <activity.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-nunito font-bold" data-testid={`text-activity-title-${index}`}>{activity.title}</h4>
                  <p className="text-sm text-charcoal/70" data-testid={`text-activity-description-${index}`}>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
