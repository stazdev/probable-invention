import { ActivitiesIcon, HealthCardIcon, NutritionIcon } from "@/assets/svg";

interface MenuCard {
  title: string;
  Icon: any;
  bG: string;
  path: string;
}
export const MENU_CARDS: MenuCard[] = [
  {
    title: "Nutrition",
    Icon: NutritionIcon,
    bG: "#FFEADB",
    path: "/(nutrition)/NutritionScreen"
  },
  {
    title: "Health Card",
    Icon: HealthCardIcon,
    bG: "#E6F3D8",
    path: "/(health)/HealthCardScreen"
  },
  {
    title: "Activities",
    Icon: ActivitiesIcon,
    bG: "#F2E5FF",
    path: "/(activities)/ActivityScreen"
  },
];
