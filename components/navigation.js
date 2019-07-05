import Home from './home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import symptomViews from './cycle-day/symptoms'
import Chart from './chart/chart'
import SettingsMenu from './settings/settings-menu'
import settingsViews from './settings'
import Stats from './stats'

const pages = {
  'Home': {
    icon: 'home',
    component: Home,
    isInMainMenu: true,
  },
  'Calendar': {
    icon: 'calendar-range',
    component: Calendar,
    isInMainMenu: true,
  },
  'Chart': {
    icon: 'chart-line',
    component: Chart,
    isInMainMenu: true,
  },
  'Stats': {
    icon: 'chart-pie',
    component: Stats,
    isInMainMenu: true,
  },
  'Settings': {
    icon: 'settings',
    component: SettingsMenu,
    isInMainMenu: true,
  },
  'Reminders': {
    component: settingsViews.Reminders,
    parentPage: 'Settings',
  },
  'NfpSettings': {
    component: settingsViews.NfpSettings,
    parentPage: 'Settings',
  },
  'DataManagement': {
    component: settingsViews.DataManagement,
    parentPage: 'Settings',
  },
  'Password': {
    component: settingsViews.Password,
    parentPage: 'Settings',
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

const mainMenu = Object.keys(pages)
  .filter(pageKey => {
    const page = pages[pageKey]
    return page.hasOwnProperty('isInMainMenu') && page.isInMainMenu
  })

export { pages, mainMenu }