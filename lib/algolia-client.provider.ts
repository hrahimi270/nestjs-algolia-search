import { Provider } from '@nestjs/common';
import algoliasearch, { SearchClient } from 'algoliasearch';
import { ALGOLIA_CLIENT, ALGOLIA_MODULE_OPTIONS } from './algolia.constants';
import { AlgoliaModuleOptions } from './algolia-module-options';

export const createAlgoliaClient = (): Provider => ({
  provide: ALGOLIA_CLIENT,
  useFactory: (options: AlgoliaModuleOptions): SearchClient =>
    algoliasearch(options.applicationId, options.apiKey, options.clientOptions),
  inject: [ALGOLIA_MODULE_OPTIONS],
});
