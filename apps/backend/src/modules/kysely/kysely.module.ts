import { DynamicModule, Module, Provider } from "@nestjs/common";
import { KyselyConfig } from "kysely";
import {
  createAsyncConfigProvider,
  createAsyncProvider,
  createKyselyProvider,
} from "./providers/kysely.provider";
import { KyselyModuleAsyncOptions, KyselyModuleOptions } from "./common";

@Module({})
export class KyselyModule {
  static forRoot(
    config: KyselyConfig,
    moduleConfig?: KyselyModuleOptions,
  ): DynamicModule {
    const providers: Provider[] = createKyselyProvider(config);

    return {
      module: KyselyModule,
      providers: providers,
      exports: providers,
      global: moduleConfig?.global,
    };
  }

  static forRootAsync(
    moduleAsyncOptions: KyselyModuleAsyncOptions,
  ): DynamicModule {
    const provider: Provider = createAsyncProvider();
    const configProvider = createAsyncConfigProvider(moduleAsyncOptions);

    return {
      module: KyselyModule,
      providers: [provider, configProvider],
      exports: [provider],
      global: moduleAsyncOptions.global,
    };
  }
}
