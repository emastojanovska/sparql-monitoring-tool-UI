import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'sparql-endpoint-component',
    title: 'SPARQL endpoint',
    type: 'item',
    icon: 'heroicons-outline:question-mark-circle',
    url: '/sparql',
  },
  {
    id: 'all-endpoints-component',
    title: 'All endpoints',
    type: 'item',
    icon: 'heroicons-outline:collection',
    url: '/all-endpoints',
  },
  {
    id: 'availability',
    title: 'Availability',
    type: 'item',
    icon: 'heroicons-outline:badge-check',
    url: '/availability',
  },
  {
    id: 'performance',
    title: 'Performance',
    type: 'item',
    icon: 'heroicons-outline:play',
    url: '/performance',
  },
  {
    id: 'discoverability',
    title: 'Discoverability',
    type: 'item',
    icon: 'heroicons-outline:eye',
    url: '/discoverability',
  },

];

export default navigationConfig;
