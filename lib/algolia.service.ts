import { Injectable, Inject } from '@nestjs/common';
import { ALGOLIA_CLIENT } from './algolia.constants';
import { SearchClient, SearchIndex } from 'algoliasearch';
import {
  MultipleQueriesQuery,
  MultipleQueriesOptions,
  MultipleQueriesResponse,
  SearchForFacetValuesQueryParams,
  SearchOptions,
  SearchForFacetValuesResponse,
  DeleteResponse,
  CopyIndexOptions,
  IndexOperationResponse,
  SecuredApiKeyRestrictions,
  MultipleBatchRequest,
  MultipleBatchResponse,
  ListApiKeysResponse,
  ApiKeyACLType,
  AddApiKeyOptions,
  AddApiKeyResponse,
  UpdateApiKeyOptions,
  UpdateApiKeyResponse,
  GetApiKeyResponse,
  DeleteApiKeyResponse,
  GetLogsResponse,
} from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';
import { WaitablePromise } from '@algolia/client-common';

@Injectable()
export class AlgoliaService {
  private index: SearchIndex;
  constructor(
    @Inject(ALGOLIA_CLIENT) private readonly algoliaClient: SearchClient,
  ) {}

  initIndex(indexName: string): SearchIndex {
    this.index = this.algoliaClient.initIndex(indexName);
    return this.index;
  }

  search<T = any>(
    queries: MultipleQueriesQuery[],
    requestOptions?: RequestOptions & MultipleQueriesOptions,
  ): Readonly<Promise<MultipleQueriesResponse<T>>> {
    return this.algoliaClient.search(queries, requestOptions);
  }

  searchForFacetValues(
    queries: {
      indexName: string;
      params: SearchForFacetValuesQueryParams & SearchOptions;
    }[],
    requestOptions?: RequestOptions,
  ): Readonly<Promise<readonly SearchForFacetValuesResponse[]>> {
    return this.algoliaClient.searchForFacetValues(queries, requestOptions);
  }

  clearCache(): Readonly<Promise<void>> {
    return this.algoliaClient.clearCache();
  }

  destroy(): Readonly<Promise<void>> {
    return this.algoliaClient.destroy();
  }

  deleteIndex(
    requestOptions?: RequestOptions,
  ): Readonly<WaitablePromise<DeleteResponse>> {
    return this.index.delete(requestOptions);
  }

  copyIndex(
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions,
  ): Readonly<WaitablePromise<IndexOperationResponse>> {
    return this.algoliaClient.copyIndex(from, to, requestOptions);
  }

  moveIndex(
    from: string,
    to: string,
    requestOptions?: RequestOptions,
  ): Readonly<WaitablePromise<IndexOperationResponse>> {
    return this.algoliaClient.moveIndex(from, to, requestOptions);
  }

  generateSecuredApiKey(
    parentApiKey: string,
    restrictions: SecuredApiKeyRestrictions,
  ): string {
    return this.algoliaClient.generateSecuredApiKey(parentApiKey, restrictions);
  }

  batch(
    requests: MultipleBatchRequest[],
    requestOptions?: RequestOptions,
  ): Readonly<WaitablePromise<MultipleBatchResponse>> {
    return this.algoliaClient.multipleBatch(requests, requestOptions);
  }

  listApiKeys(
    requestOptions?: RequestOptions,
  ): Readonly<Promise<ListApiKeysResponse>> {
    return this.algoliaClient.listApiKeys(requestOptions);
  }

  addApiKey(
    ac1: ApiKeyACLType[],
    requestOptions?: AddApiKeyOptions & Pick<RequestOptions, string | number>,
  ): Readonly<Promise<AddApiKeyResponse>> {
    return this.algoliaClient.addApiKey(ac1, requestOptions);
  }

  updateApiKey(
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions &
      Pick<RequestOptions, string | number>,
  ): Readonly<WaitablePromise<UpdateApiKeyResponse>> {
    return this.algoliaClient.updateApiKey(apiKey, requestOptions);
  }

  getApiKey(
    apiKey: string,
    requestOptions?: RequestOptions,
  ): Readonly<Promise<GetApiKeyResponse>> {
    return this.algoliaClient.getApiKey(apiKey, requestOptions);
  }

  deleteApiKey(
    apiKey: string,
    requestOptions?: RequestOptions,
  ): Readonly<Promise<DeleteApiKeyResponse>> {
    return this.algoliaClient.deleteApiKey(apiKey, requestOptions);
  }

  getLogs(requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> {
    return this.algoliaClient.getLogs(requestOptions);
  }
}
