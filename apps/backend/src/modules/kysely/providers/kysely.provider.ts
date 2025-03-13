import {
  KYSELY_MODULE_CONFIG_TOKEN,
  KYSELY_MODULE_CONNECTION_TOKEN,
} from "@/constants";
import { Provider } from "@nestjs/common";
import { Kysely, KyselyConfig } from "kysely";
import { KyselyModuleAsyncOptions } from "../common";

export const createKyselyClient = <DB>(config: KyselyConfig): Kysely<DB> => {
  return new Kysely<DB>(config);
};

export const createKyselyProvider = (config: KyselyConfig): Provider[] => {
  return [
    {
      provide: KYSELY_MODULE_CONNECTION_TOKEN,
      useValue: createKyselyClient(config),
    },
  ];
};

export const createAsyncProvider = (): Provider => {
  const provider: Provider = {
    provide: KYSELY_MODULE_CONNECTION_TOKEN,
    useFactory: (config: KyselyConfig) => {
      return createKyselyClient(config);
    },
    inject: [KYSELY_MODULE_CONFIG_TOKEN],
  };

  return provider;
};

export const createAsyncConfigProvider = (
  options: KyselyModuleAsyncOptions,
): Provider => {
  const { useFactory, inject } = options;

  if (useFactory) {
    return {
      inject: inject,
      provide: KYSELY_MODULE_CONFIG_TOKEN,
      useFactory: useFactory,
    };
  }

  throw new Error("Invalid options");
};
