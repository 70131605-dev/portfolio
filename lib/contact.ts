import { site } from "@/data/site";

/** WhatsApp chat link with a ready-to-send opening message. One source for every button. */
export const whatsappLink = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${site.name.split(" ")[0]}, I came across your portfolio and would like to discuss an opportunity.`,
)}`;
