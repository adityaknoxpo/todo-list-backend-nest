import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { DayjsProvider } from './lib/providers/dayjs.provider';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TodosModule],
  providers: [DayjsProvider],
})
export class AppModule {}
