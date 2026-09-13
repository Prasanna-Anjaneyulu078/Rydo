export const QUICK_PLACES = [
  { id: 'office', name: 'Office (Amphitheatre)', address: '1600 Amphitheatre Pkwy, Mountain View', icon: 'domain' },
  { id: 'home', name: 'Home (742 Evergreen)', address: '742 Evergreen Terrace, Springfield', icon: 'cottage' },
  { id: 'airport', name: 'SFO Airport', address: 'San Francisco International Airport, Terminal 2', icon: 'flight_takeoff' },
  { id: 'station', name: 'Central Station, Platform 2', address: 'Chhatrapati Shivaji Terminus / Central Station', icon: 'train' }
];

export const MOCK_SEARCH_RESULTS = [
  {
    id: 'loc-1',
    title: 'Mission Bay Innovation Hub, 4th St',
    subtitle: '4th & King St, Mission Bay, San Francisco',
    distance: '5.2 km',
    time: '18 mins'
  },
  {
    id: 'loc-2',
    title: 'Central Station, Platform 2',
    subtitle: 'Railway Colony, City Center',
    distance: '4.1 km',
    time: '14 mins'
  },
  {
    id: 'loc-3',
    title: 'Koramangala 5th Block, Sony World Signal',
    subtitle: '100ft Inner Ring Rd, Bengaluru, Karnataka',
    distance: '6.4 km',
    time: '22 mins'
  },
  {
    id: 'loc-4',
    title: 'Indiranagar 100ft Road',
    subtitle: 'Near CMH Metro Station, Bengaluru',
    distance: '1.1 km',
    time: '3 mins'
  },
  {
    id: 'loc-5',
    title: 'SFO International Airport Terminal 2',
    subtitle: 'Departures Level, San Francisco',
    distance: '18.5 km',
    time: '28 mins'
  }
];

export const DEFAULT_LOCATIONS = {
  pickup: {
    title: '452 Market St, Financial Dist',
    subtitle: 'Current Location • Indiranagar / Downtown',
    coords: { x: 280, y: 220 }
  },
  destination: {
    title: 'Mission Bay Innovation Hub, 4th St',
    subtitle: '5.2 km • 18 min estimated drive',
    coords: { x: 720, y: 620 }
  }
};
