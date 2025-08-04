import { IsEmail, IsString, Length, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ahmad Ali', description: 'Full name of the admin' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email of the admin',
  })
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Password for the admin account',
  })
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty({
    example: true,
    description: 'Whether the admin is the creator',
    default: false,
  })
  @IsBoolean()
  is_creator: boolean;
}
