import { Resend } from 'resend';
import type { PreRegistration, ContactMessage } from '@shared/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

const formatDate = (date: Date | null) => {
  if (!date) return 'Non spécifiée';
  return new Date(date).toLocaleDateString('fr-FR');
};

const formatBoolean = (value: boolean | null) => {
  return value ? 'Oui' : 'Non';
};

export async function sendPreRegistrationEmail(preRegistration: PreRegistration) {
  const daysSelected = [
    preRegistration.monday && 'Lundi',
    preRegistration.tuesday && 'Mardi', 
    preRegistration.wednesday && 'Mercredi',
    preRegistration.thursday && 'Jeudi',
    preRegistration.friday && 'Vendredi'
  ].filter(Boolean).join(', ') || 'Aucun jour sélectionné';

  const emailContent = `
    <h2>Nouvelle demande de pré-inscription - MAM Maison des p'tites souris vertes</h2>
    
    <h3>Informations sur l'enfant :</h3>
    <ul>
      <li><strong>Prénom :</strong> ${preRegistration.childFirstName}</li>
      <li><strong>Nom :</strong> ${preRegistration.childLastName}</li>
      <li><strong>Date de naissance :</strong> ${preRegistration.childBirthDate || 'Non spécifiée'}</li>
      <li><strong>Sexe :</strong> ${preRegistration.childGender || 'Non spécifié'}</li>
    </ul>
    
    <h3>Informations parentales :</h3>
    <ul>
      <li><strong>Nom du parent :</strong> ${preRegistration.parentName}</li>
      <li><strong>Téléphone :</strong> ${preRegistration.parentPhone}</li>
      <li><strong>Email :</strong> ${preRegistration.parentEmail}</li>
      <li><strong>Adresse :</strong> ${preRegistration.address || 'Non spécifiée'}</li>
    </ul>
    
    <h3>Besoins de garde :</h3>
    <ul>
      <li><strong>Date de début souhaitée :</strong> ${preRegistration.startDate || 'Non spécifiée'}</li>
      <li><strong>Type de garde :</strong> ${preRegistration.careType || 'Non spécifié'}</li>
      <li><strong>Jours souhaités :</strong> ${daysSelected}</li>
    </ul>
    
    ${preRegistration.comments ? `
    <h3>Commentaires :</h3>
    <p>${preRegistration.comments}</p>
    ` : ''}
    
    <hr>
    <p><em>Demande reçue le ${formatDate(preRegistration.createdAt)}</em></p>
  `;

  try {
    console.log('Tentative d\'envoi d\'email de pré-inscription pour:', preRegistration.childFirstName, preRegistration.childLastName);
    const result = await resend.emails.send({
      from: 'MAM Souris Vertes <onboarding@resend.dev>',
      to: ['retault.mael06@gmail.com'],
      subject: `Nouvelle pré-inscription - ${preRegistration.childFirstName} ${preRegistration.childLastName}`,
      html: emailContent,
    });
    console.log('Email de pré-inscription envoyé avec succès:', result);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de pré-inscription:', error);
    throw error;
  }
}

export async function sendContactEmail(contactMessage: ContactMessage) {
  const emailContent = `
    <h2>Nouveau message de contact - MAM Maison des p'tites souris vertes</h2>
    
    <h3>Informations du contact :</h3>
    <ul>
      <li><strong>Nom :</strong> ${contactMessage.lastName}</li>
      <li><strong>Prénom :</strong> ${contactMessage.firstName}</li>
      <li><strong>Email :</strong> ${contactMessage.email}</li>
      <li><strong>Téléphone :</strong> ${contactMessage.phone || 'Non spécifié'}</li>
      <li><strong>Sujet :</strong> ${contactMessage.subject}</li>
    </ul>
    
    <h3>Message :</h3>
    <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #86EFAC;">
      ${contactMessage.message}
    </p>
    
    <hr>
    <p><em>Message reçu le ${formatDate(contactMessage.createdAt)}</em></p>
  `;

  try {
    console.log('Tentative d\'envoi d\'email de contact de:', contactMessage.firstName, contactMessage.lastName);
    const result = await resend.emails.send({
      from: 'MAM Souris Vertes <onboarding@resend.dev>',
      to: ['retault.mael06@gmail.com'],
      subject: `Contact MAM - ${contactMessage.subject}`,
      html: emailContent,
    });
    console.log('Email de contact envoyé avec succès:', result);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de contact:', error);
    throw error;
  }
}