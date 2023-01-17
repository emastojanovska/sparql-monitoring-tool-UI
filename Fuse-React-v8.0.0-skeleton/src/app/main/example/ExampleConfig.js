import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import Example from './Example';
import SparqlEndpoint from "../sparql-endpoint/SparqlEndpoint";
import SparqlEndpointDataResult from "../sparql-endpoint/SparqlEndpointDataResult";
import AllEndpoints from "../sparql-endpoint/AllEndpoints";
import Availability from "../statistics/Availability";
import Performance from "../statistics/Performance";
import Discoverability from "../statistics/Discoverability";
import VoidStatistics from "../statistics/VoidStatistics";

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
    {
      path: 'sparql',
      element: <SparqlEndpoint/>,
    },
    {
      path: 'sparql/result-data',
      element: <SparqlEndpointDataResult/>
    },
    {
      path: 'all-endpoints',
      element: <AllEndpoints/>
    },
    {
      path: 'availability',
      element: <Availability/>
    },
    {
      path: 'performance',
      element: <Performance/>
    },
    {
      path: 'discoverability',
      element: <Discoverability/>
    },
    {
      path: 'void-statistics',
      element: <VoidStatistics/>
    },
  ],
};

export default ExampleConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
