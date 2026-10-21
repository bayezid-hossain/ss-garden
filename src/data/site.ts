// Sample values. Replace with the company's real details before launch (see README).
export const site = {
  name: "SS Garden",
  description:
    "SS Garden designs and builds apartments, offices and homes in Dhaka, and develops landowners' plots under joint-venture agreements.",
  address: "House 12, Road 5, Block C, Bashundhara R/A, Dhaka 1229",
  phone: "+880 1712-345678",
  email: "info@ssgarden.example",
  facebook: "",
  // Sample number (international format, digits only). Replace before launch.
  whatsapp: "8801712345678",
  hours: "Saturday to Thursday, 10:00 to 18:00",
  lat: 23.819,
  lng: 90.429,
};

export type MenuItem = { label: string; href: string; children?: { label: string; href: string }[] };

// Shared by the desktop nav and the mobile drawer.
export const menu: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "About us", href: "/about/" },
      { label: "Our team", href: "/about/#team" },
    ],
  },
  { label: "Projects", href: "/projects/" },
  { label: "Expertise", href: "/expertise/" },
  { label: "Landowners", href: "/landowners/" },
  {
    label: "News",
    href: "/news/",
    children: [
      { label: "News", href: "/news/" },
      { label: "Publications", href: "/news/?tab=publications" },
      { label: "Interviews", href: "/news/?tab=interviews" },
      { label: "Blogs", href: "/news/?tab=blogs" },
    ],
  },
  { label: "Career", href: "/career/" },
  { label: "Contact", href: "/contact/" },
];
