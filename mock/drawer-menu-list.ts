import {
  AccountMenuIcon,
  CalendarMenuIcon,
  ContactsMenuIcon,
  DashboardMenuIcon,
  SettingsMenuIcon,
} from "@/assets/svg";

export const MIDDLE_LISTS = [
  {
    Icon: DashboardMenuIcon,
    route: "dashboard",
    title: "Dashboard",
  },
  {
    Icon: ContactsMenuIcon,
    route: "contacts",
    title: "Contacts",
  },
  {
    Icon: CalendarMenuIcon,
    route: "calendar",
    title: "Calendar",
  },
];

export const LAST_LISTS = [
  {
    Icon: AccountMenuIcon,
    route: "/(account)/AccountScreen",
    title: "Account",
  },
  {
    Icon: SettingsMenuIcon,
    route: "/(settings)/SettingsScreen",
    title: "Settings",
  },
];
