import {
  BookMarked,
  Box,
  Briefcase,
  Home,
  Users,
} from "lucide-react";

export const lists = [
  { name: "Home", url: "/admin", icon: <Home size={20} /> },
  { name: "Products", url: "/admin/products", icon: <Box size={20} /> },
  {
    name: "Inventory",
    url: "/admin/inventory",
    icon: <Briefcase size={20} />,
  },
  { name: "Users", url: "/admin/users", icon: <Users size={20} /> },
  {
    name: "Journals",
    url: "/admin/journals",
    icon: <BookMarked size={20} />,
  },
];

export const baseClass = "bg-[#FF6100] text-white border-none flex gap-4";