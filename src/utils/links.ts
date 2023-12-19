export const links = {
  create: "Crea regole",
  rules: "Le mie regole",
  elements: "I miei elementi di gioco",
  games: "I miei giochi",
  tutorial: "Come funziona",
  vocabularies: "Gestisci vocabolari"
} as const;

export const linksPermissions = {
  create: "create:rules",
  rules: "read:rules",
  elements: "read:elements",
  games: "delete:games",
  tutorial: "read:tutorial",
  vocabularies: "update:vocabularies"
} as const
