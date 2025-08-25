import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertPreRegistrationSchema, type InsertPreRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Baby, Users, Calendar } from "lucide-react";

export default function PreInscription() {
  const { toast } = useToast();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const form = useForm<InsertPreRegistration>({
    resolver: zodResolver(insertPreRegistrationSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      childBirthDate: "",
      childGender: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      address: "",
      startDate: "",
      careType: "",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      comments: "",
    },
  });

  const preRegistrationMutation = useMutation({
    mutationFn: async (data: InsertPreRegistration) => {
      const response = await apiRequest("POST", "/api/pre-registration", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Pré-inscription envoyée !",
        description: "Nous vous recontacterons rapidement pour confirmer votre demande.",
      });
      form.reset();
      setSelectedDays([]);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPreRegistration) => {
    preRegistrationMutation.mutate(data);
  };

  const handleDayChange = (day: string, checked: boolean) => {
    const updatedDays = checked 
      ? [...selectedDays, day]
      : selectedDays.filter(d => d !== day);
    
    setSelectedDays(updatedDays);
    form.setValue(day as keyof InsertPreRegistration, checked);
  };

  const days = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
  ];

  return (
    <section className="fade-in">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-nunito text-3xl md:text-4xl font-bold text-center mb-8 text-charcoal" data-testid="text-inscription-title">
          Pré-inscription
        </h2>
        <p className="text-center text-charcoal/70 mb-12" data-testid="text-inscription-description">
          Remplissez ce formulaire pour une demande de pré-inscription. Nous vous recontacterons rapidement.
        </p>
        
        <Card className="shadow-lg" data-testid="card-inscription-form">
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Information sur l'enfant */}
              <div>
                <h3 className="font-nunito text-xl font-bold mb-6 text-charcoal flex items-center" data-testid="text-child-info-title">
                  <Baby className="mr-3 text-sage" />
                  Informations sur l'enfant
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="childFirstName" className="text-charcoal">Prénom de l'enfant *</Label>
                    <Input 
                      id="childFirstName"
                      {...form.register("childFirstName")}
                      placeholder="Prénom"
                      className="mt-2"
                      data-testid="input-child-firstname"
                    />
                    {form.formState.errors.childFirstName && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.childFirstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="childLastName" className="text-charcoal">Nom de l'enfant *</Label>
                    <Input 
                      id="childLastName"
                      {...form.register("childLastName")}
                      placeholder="Nom"
                      className="mt-2"
                      data-testid="input-child-lastname"
                    />
                    {form.formState.errors.childLastName && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.childLastName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="childBirthDate" className="text-charcoal">Date de naissance *</Label>
                    <Input 
                      id="childBirthDate"
                      type="date"
                      {...form.register("childBirthDate")}
                      className="mt-2"
                      data-testid="input-child-birthdate"
                    />
                    {form.formState.errors.childBirthDate && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.childBirthDate.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-charcoal">Sexe</Label>
                    <Select onValueChange={(value) => form.setValue("childGender", value)}>
                      <SelectTrigger className="mt-2" data-testid="select-child-gender">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fille">Fille</SelectItem>
                        <SelectItem value="Garçon">Garçon</SelectItem>
                        <SelectItem 
value="Non binaire">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Information sur les parents */}
              <div>
                <h3 className="font-nunito text-xl font-bold mb-6 text-charcoal flex items-center" data-testid="text-parent-info-title">
                  <Users className="mr-3 text-coral-warm" />
                  Informations parentales
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="parentName" className="text-charcoal">Nom du parent 1 *</Label>
                    <Input 
                      id="parentName"
                      {...form.register("parentName")}
                      placeholder="Nom complet"
                      className="mt-2"
                      data-testid="input-parent-name"
                    />
                    {form.formState.errors.parentName && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.parentName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="parentPhone" className="text-charcoal">Téléphone *</Label>
                    <Input 
                      id="parentPhone"
                      type="tel"
                      {...form.register("parentPhone")}
                      placeholder="06 00 00 00 00"
                      className="mt-2"
                      data-testid="input-parent-phone"
                    />
                    {form.formState.errors.parentPhone && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.parentPhone.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="parentEmail" className="text-charcoal">Email *</Label>
                    <Input 
                      id="parentEmail"
                      type="email"
                      {...form.register("parentEmail")}
                      placeholder="votre@email.com"
                      className="mt-2"
                      data-testid="input-parent-email"
                    />
                    {form.formState.errors.parentEmail && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.parentEmail.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-charcoal">Adresse</Label>
                    <Textarea 
                      id="address"
                      {...form.register("address")}
                      placeholder="Adresse complète"
                      rows={3}
                      className="mt-2"
                      data-testid="textarea-address"
                    />
                  </div>
                </div>
              </div>

              {/* Besoins de garde */}
              <div>
                <h3 className="font-nunito text-xl font-bold mb-6 text-charcoal flex items-center" data-testid="text-care-needs-title">
                  <Calendar className="mr-3 text-sky-soft" />
                  Besoins de garde
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate" className="text-charcoal">Date de début souhaitée</Label>
                    <Input 
                      id="startDate"
                      type="date"
                      {...form.register("startDate")}
                      className="mt-2"
                      data-testid="input-start-date"
                    />
                  </div>
                  <div>
                    <Label className="text-charcoal">Type de garde</Label>
                    <Select onValueChange={(value) => form.setValue("careType", value)}>
                      <SelectTrigger className="mt-2" data-testid="select-care-type">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Temps plein">Temps plein</SelectItem>
                        <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                        <SelectItem value="Occasionnel">Occasionnel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-charcoal mb-3 block">Jours souhaités</Label>
                    <div className="flex flex-wrap gap-4">
                      {days.map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2" data-testid={`checkbox-day-${key}`}>
                          <Checkbox 
                            id={key}
                            checked={selectedDays.includes(key)}
                            onCheckedChange={(checked) => handleDayChange(key, !!checked)}
                          />
                          <Label htmlFor={key} className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Commentaires */}
              <div>
                <Label htmlFor="comments" className="text-charcoal">Commentaires ou demandes particulières</Label>
                <Textarea 
                  id="comments"
                  {...form.register("comments")}
                  placeholder="N'hésitez pas à nous faire part de vos questions ou besoins spécifiques..."
                  rows={4}
                  className="mt-2"
                  data-testid="textarea-comments"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={preRegistrationMutation.isPending}
                className="w-full bg-sage hover:bg-sage/90 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                data-testid="button-submit-inscription"
              >
                {preRegistrationMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <i className="fas fa-paper-plane mr-2"></i>
                )}
                Envoyer ma demande de pré-inscription
              </Button>
              
              <p className="text-xs text-charcoal/60 text-center mt-4" data-testid="text-privacy-notice">
                * Champs obligatoires - Vos données sont traitées de manière confidentielle
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
