import Home from './home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import symptomViews from './cycle-day/symptoms'
import Chart from './chart/chart'
import SettingsMenu from './settings/settings-menu'
import settingsViews from './settings'
import Stats from './stats'

export const pages = {
  'Home': {
    icon: 'home',
    component: Home,
  },
  'Calendar': {
    icon: 'calendar-range',
    component: Calendar,
  },
  'Chart': {
    icon: 'chart-line',
    component: Chart,
  },
  'Stats': {
    icon: 'chart-pie',
    component: Stats,
  },
  'Settings': {
    icon: 'settings',
    component: SettingsMenu,
  },
  'Reminders': {
    component: settingsViews.Reminders
  },
  'NfpSettings': {
    component: settingsViews.NfpSettings
  },
  'DataManagement': {
    component: settingsViews.DataManagement
  },
  'Password': {
    component: settingsViews.Password
  },
  'About': {
    component: settingsViews.About
  },
  'License': {
    component: settingsViews.License
  },
  'CycleDay': {
    component: CycleDay
  },
  'BleedingEditView': {
    component: symptomViews.BleedingEditView
  }
}