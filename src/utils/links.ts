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
  elements: "read:rules",
  games: "delete:tasks",
  tutorial: "read:rules",
  vocabularies: "update:vocabularies"
} as const
