export const createWhatsAppMessage = (
    nameInput: string, phoneInput: string, toCity: string,
    locale: 'en' | 'ro' | 'ru' | 'fr'
  ) => {

    const messages = {
      en: `Hello World Wide Travel Team,
  
  I would like to request a parcel transportation service. Here are the details:
  
  - **Full Name**: ${nameInput}
  - **Phone Number**: ${phoneInput}
  - **Destination City**: ${toCity}
  
  Please let me know the next steps and any additional information you might need.
  
  Thank you!
  
  Best regards,
  ${nameInput}`,
      ro: `Bună echipa World Wide Travel,
  
  Aș dori să solicit un serviciu de transport al coletelor. Iată detaliile:
  
  - **Nume complet**: ${nameInput}
  - **Număr de telefon**: ${phoneInput}
  - **Oraș de destinație**: ${toCity}
  
  Vă rog să-mi spuneți pașii următori și orice informații suplimentare de care ați putea avea nevoie.
  
  Vă mulțumesc!
  
  Cu stimă,
  ${nameInput}`,
      ru: `Здравствуйте, команда World Wide Travel,
  
  Я хотел бы запросить услугу по транспортировке посылок. Вот детали:
  
  - **Полное имя**: ${nameInput}
  - **Номер телефона**: ${phoneInput}
  - **Город назначения**: ${toCity}
  
  Пожалуйста, сообщите мне о следующих шагах и любой дополнительной информации, которая может понадобиться.
  
  Спасибо!
  
  С уважением,
  ${nameInput}`,
      fr: `Bonjour l'équipe de World Wide Travel,
  
  Je souhaite demander un service de transport de colis. Voici les détails :
  
  - **Nom complet** : ${nameInput}
  - **Numéro de téléphone** : ${phoneInput}
  - **Ville de destination** : ${toCity}
  
  Merci de me faire savoir les prochaines étapes et toute information supplémentaire dont vous pourriez avoir besoin.
  
  Merci !
  
  Cordialement,
  ${nameInput}`,
    };
  
    return messages[locale] || messages.en;
  };


  export const createWhatsAppLink = (
    nameInput: string, phoneInput: string, toCity: string,
    locale: 'en' | 'ro' | 'ru' | 'fr',
    phoneNumber: string
  ) => {
    const message = createWhatsAppMessage(nameInput, phoneInput, toCity, locale);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };