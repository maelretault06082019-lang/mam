import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const contactInfo: Array<{
    icon: any;
    title: string;
    content: string;
    color: string;
    link?: string;
  }> = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "2 rue des Aubrugères, lieu dit La Penchonnière\n86410 Verrières",
      color: "text-sage"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "07.86.72.35.43 ou 06.66.96.63.24",
      color: "text-coral-warm"
    },
    {
      icon: Mail,
      title: "Email",
      content: "mammaisondesptitessourisvertes@gmail.com",
      color: "text-sky-soft"
    },
    {
      icon: Facebook,
      title: "Facebook",
      content: "MAM la maison des p'tites souris vertes",
      color: "text-coral-warm",
      link: "https://www.facebook.com/people/MAM-la-maison-des-ptites-souris-vertes/100075713097641/"
    }
  ];

  const schedules = [
    { day: "Lundi - Vendredi", hours: "7h30 - 18h00" },
    { day: "Samedi", hours: "Fermé" },
    { day: "Dimanche", hours: "Fermé" }
  ];

  return (
    <section className="fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-nunito text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal" data-testid="text-contact-title">
          Contactez-nous
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <Card className="shadow-lg mb-8" data-testid="card-contact-info">
              <CardContent className="p-8">
                <h3 className="font-nunito text-2xl font-bold mb-6 text-charcoal" data-testid="text-contact-info-title">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                      <div className={`text-xl mt-1 ${info.color}`}>
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal" data-testid={`contact-info-title-${index}`}>{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sage hover:text-sage/80 transition-colors" 
                            data-testid={`contact-info-link-${index}`}
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-charcoal/70 whitespace-pre-line" data-testid={`contact-info-content-${index}`}>{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Horaires */}
            <div className="bg-gradient-to-br from-sage/10 to-sky-soft/10 rounded-2xl p-8" data-testid="section-schedule">
              <h3 className="font-nunito text-2xl font-bold mb-6 text-charcoal flex items-center" data-testid="text-schedule-title">
                <Clock className="mr-3 text-sage" />
                Horaires d'ouverture
              </h3>
              <div className="space-y-3">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center" data-testid={`schedule-${index}`}>
                    <span className="font-medium" data-testid={`schedule-day-${index}`}>{schedule.day}</span>
                    <span className="text-charcoal/70" data-testid={`schedule-hours-${index}`}>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div>
            <Card className="shadow-lg" data-testid="card-contact-form">
              <CardContent className="p-8">
                <h3 className="font-nunito text-2xl font-bold mb-6 text-charcoal" data-testid="text-contact-form-title">Envoyez-nous un message</h3>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="lastName" className="text-charcoal">Nom *</Label>
                      <Input 
                        id="lastName"
                        {...form.register("lastName")}
                        placeholder="Votre nom"
                        className="mt-2"
                        data-testid="input-lastname"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-destructive text-sm mt-1">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="firstName" className="text-charcoal">Prénom *</Label>
                      <Input 
                        id="firstName"
                        {...form.register("firstName")}
                        placeholder="Votre prénom"
                        className="mt-2"
                        data-testid="input-firstname"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-destructive text-sm mt-1">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-charcoal">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="votre@email.com"
                      className="mt-2"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-charcoal">Téléphone</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      placeholder="Votre numéro de téléphone"
                      className="mt-2"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-charcoal">Sujet</Label>
                    <Select onValueChange={(value) => form.setValue("subject", value)}>
                      <SelectTrigger className="mt-2" data-testid="select-subject">
                        <SelectValue placeholder="Sélectionnez un sujet..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Demande d'informations">Demande d'informations</SelectItem>
                        <SelectItem value="Prise de rendez-vous">Prise de rendez-vous</SelectItem>
                        <SelectItem value="Question sur les tarifs">Question sur les tarifs</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.subject && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-charcoal">Message *</Label>
                    <Textarea 
                      id="message"
                      {...form.register("message")}
                      placeholder="Votre message..."
                      rows={6}
                      className="mt-2"
                      data-testid="textarea-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full bg-sage hover:bg-sage/90 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <i className="fas fa-paper-plane mr-2"></i>
                    )}
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map placeholder */}
        <div className="mt-12 bg-gray-200 rounded-2xl h-64 flex items-center justify-center" data-testid="section-map">
          <div className="text-center text-charcoal/60">
            <i className="fas fa-map-marked-alt text-4xl mb-4"></i>
            <p data-testid="text-map-placeholder">Carte interactive - Localisation de la MAM</p>
            <p className="text-sm" data-testid="text-map-note">Intégration Google Maps ou OpenStreetMap à venir</p>
          </div>
        </div>
      </div>
    </section>
  );
}
