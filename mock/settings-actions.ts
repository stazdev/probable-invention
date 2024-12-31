import {
  DarkModeIcon,
  LanguageIcon,
  LocationAccessIcon,
  NotificationIcon,
  PhotoAccessIcon,
  TimeZoneIcon,
} from "@/assets/svg";
import { ClickableInfoCardProps } from "@/components/clickable-info-card/types";

export const SETTING_ACTIONS: {
  title: string;
  LIST: ClickableInfoCardProps[];
}[] = [
  {
    title: "Personalisation",
    LIST: [
      {
        Icon: TimeZoneIcon,
        title: "Time Zone",
        subTitle: "Choose your timezone",
      },
      {
        Icon: LanguageIcon,
        title: "Language",
        subTitle: "Set the app language",
      },
      {
        Icon: DarkModeIcon,
        title: "Dark mode",
        subTitle: "Choose view mode",
      },
    ],
  },
  {
    title: "Access",
    LIST: [
      {
        Icon: LocationAccessIcon,
        title: "Location access",
        subTitle: "Access to your location",
      },
      {
        Icon: PhotoAccessIcon,
        title: "Photo access",
        subTitle: "Access to your media",
      },
    ],
  },
  {
    title: "Notifications",
    LIST: [
      {
        Icon: NotificationIcon,
        title: "App Notifications",
        subTitle: "Get push notifications",
      },
      {
        Icon: NotificationIcon,
        title: "Email Notifications",
        subTitle: "Get regular updates",
      },
    ],
  },
];
