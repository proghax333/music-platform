import { Abstract, ModuleMetadata, Type } from "@nestjs/common";
import { KyselyConfig } from "kysely";

type InjectType = (
  | string
  | symbol
  | Type<any>
  | Abstract<any>
  | (() => void)
)[];

export type KyselyModuleOptions = {
  global?: boolean;
};

export type KyselyModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
  global?: boolean;
  inject?: InjectType;
  useFactory?: (...args: any[]) => Promise<KyselyConfig> | KyselyConfig;
};
