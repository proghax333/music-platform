import { KYSELY_MODULE_CONNECTION_TOKEN } from "@/constants";
import { Inject } from "@nestjs/common";

export const InjectKysely = () => Inject(KYSELY_MODULE_CONNECTION_TOKEN);
