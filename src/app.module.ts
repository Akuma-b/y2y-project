import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CommunityModule } from './modules/community/community.module';
import { RolesGuard } from './guard/roles.guard';
import { OpportunitiesModule } from './modules/opportunity/opportunities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: './config/.env',
    isGlobal: true,
    cache: true
  }),
    MongooseModule.forRoot(process.env.DB_HOST),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    CategoryModule,SubcategoryModule,AuthModule,UserModule,CommunityModule,RolesGuard,OpportunitiesModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
