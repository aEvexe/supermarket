import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the customer',
  })
  @IsString()
  @Length(1, 100)
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the customer',
  })
  @IsString()
  @Length(7, 20)
  phone: string;

  @ApiProperty({
    example: 'customer@example.com',
    description: 'Email of the customer',
  })
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    example: 'SecurePassword456',
    description: 'Customer password',
  })
  @IsString()
  @Length(6, 100)
  password: string;

  activation_link?: string;

  @ApiProperty({
    example: true,
    required: false,
    description: 'Account active status',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({
    example: '123 Main St, Tashkent',
    description: 'Customer address',
  })
  @IsString()
  @Length(1, 200)
  address: string;
}
