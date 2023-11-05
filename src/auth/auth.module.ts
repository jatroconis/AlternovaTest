import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/features/user/user.module';
import { AuthController } from './interfaces/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'bDC^$yfQE$4q*z2',
      signOptions: { expiresIn: '8h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
