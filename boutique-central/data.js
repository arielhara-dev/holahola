// Datos de las sucursales del prototipo.
// address/hours en null = dato pendiente del cliente (se muestra marcado con ⚑).
// Horario: día 0 = domingo; null = cerrado. Los horarios vienen de Wolt / directorios
// y hay que confirmarlos con el negocio.
window.BC_ZONES = [
  { id: "ta", en: "Tel Aviv", he: "תל אביב" },
  { id: "jer", en: "Jerusalem", he: "ירושלים" },
  { id: "center", en: "Center Area", he: "אזור המרכז" },
  { id: "sharon", en: "Hasharon Area", he: "אזור השרון" },
  { id: "jud", en: "Judean Foothills", he: "השפלה" },
  { id: "south", en: "South", he: "דרום" }
];

const WEEK = (open, close, friClose) => ({
  0: [open, close], 1: [open, close], 2: [open, close], 3: [open, close], 4: [open, close],
  5: [open, friClose], 6: null
});

window.BC_BRANCHES = [
  {
    slug: "raanana", zone: "sharon",
    name: { en: "Ra'anana", he: "רעננה" },
    address: { en: "124 Ahuza St., Ra'anana", he: "אחוזה 124, רעננה" },
    street: { en: "Ahuza Street", he: "רחוב אחוזה" },
    hours: WEEK("07:00", "20:00", "14:00")
  },
  {
    slug: "kfar-saba", zone: "sharon",
    name: { en: "Kfar Saba", he: "כפר סבא" },
    address: { en: "125 Weizmann St., Kfar Saba", he: "ויצמן 125, כפר סבא" },
    street: { en: "Weizmann Street", he: "רחוב ויצמן" },
    hours: WEEK("07:00", "20:00", "14:00")
  },
  {
    slug: "green-kfar-saba", zone: "sharon",
    name: { en: "Green Kfar Saba", he: "כפר סבא הירוקה" },
    address: null, street: null, hours: null
  },
  {
    slug: "herzliya-center", zone: "sharon",
    name: { en: "Herzliya Center", he: "הרצליה מרכז" },
    address: null, street: null, hours: null
  },
  {
    slug: "sheinkin", zone: "ta",
    name: { en: "Sheinkin", he: "שינקין" },
    address: { en: "53 Sheinkin St., Tel Aviv", he: "שינקין 53, תל אביב" },
    street: { en: "Sheinkin Street", he: "רחוב שינקין" },
    hours: WEEK("07:00", "20:00", "15:00")
  },
  {
    slug: "dizengoff", zone: "ta",
    name: { en: "Dizengoff", he: "דיזנגוף" },
    address: null, street: null, hours: null
  },
  {
    slug: "agripas", zone: "jer",
    name: { en: "Agripas", he: "אגריפס" },
    address: null, street: null, hours: null
  }
];
