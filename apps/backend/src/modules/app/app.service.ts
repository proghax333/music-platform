import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/services/prisma.service";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<string> {
    const items = await this.prisma.account.findMany({
      where: {},
    });

    if (items.length > 0) {
      return `${items[0].id}`;
    }

    return "No name!";
  }
}
