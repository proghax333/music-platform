import { Injectable } from "@nestjs/common";
import { DB } from "@/modules/kysely/types";
import { Kysely } from "kysely";
import { InjectKysely } from "../kysely/decorators/kysely.decorator";

@Injectable()
export class AppService {
  constructor(@InjectKysely() private db: Kysely<DB>) {}

  async getHello(): Promise<string> {
    console.log(this.db);

    const result = await this.db
      .insertInto("Test")
      .values({})
      .executeTakeFirstOrThrow();

    const temp = await this.db.selectFrom("Test").select("id").execute();

    console.log(temp);

    return String(result.insertId);
  }
}
