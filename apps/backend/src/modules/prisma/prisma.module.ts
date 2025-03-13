import { Module } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/services/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
