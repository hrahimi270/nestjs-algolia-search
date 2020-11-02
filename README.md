# nestjs-algoliasearch

The algolia NestJS module based on the official algolia package.

**This repository created upon an [older repo](https://github.com/fvilers/nestjs-algolia) and had some improvements in Typescript and uses the latest version of the algoliasearch package.**

## How to install

```
npm install nestjs-algoliasearch-2
```

or

```
yarn add nestjs-algoliasearch-2
```

## How to use

**Register the module**

```
import { Module } from '@nestjs/common';
import { AlgoliaModule } from 'nestjs-algoliasearch-2';

@Module({
  imports: [
    AlgoliaModule.register({
      applicationId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    }),
  ],
})
export class AppModule {}
```

**Inject the service**

```
import { AlgoliaService } from 'nestjs-algoliasearch-2';

@Injectable()
export class AppService {
  constructor(private readonly algoliaService: AlgoliaService) {}

  async saveObjectToIndex(objectToSave: any) {
    const indexName = 'your_index_name';
    const index = this.algoliaService.initIndex(indexName)

    await index.saveObject(objectToSave, {
        autoGenerateObjectIDIfNotExist: true,
    })
  }
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

### Use factory

```
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlgoliaModule } from 'nestjs-algoliasearch-2';

@Module({
    imports: [
        AlgoliaModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                applicationId: configService.get("ALGOLIA_APP_ID"),
                apiKey: configService.get("ALGOLIA_API_KEY"),
            })
        })
    ],
})
export class AppModule {}

```

### Use class

```
AlgoliaModule.registerAsync({
  useClass: AlgoliaConfigService,
});
```

Above construction will instantiate `AlgoliaConfigService` inside `AlgoliaModule` and will leverage it to create options object.

```
class AlgoliaConfigService implements AlgoliaOptionsFactory {
  createAlgoliaOptions(): AlgoliaModuleOptions {
    return {
      applicationId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    };
  }
}
```

### Use existing

```
AlgoliaModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `AlgoliaModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.
