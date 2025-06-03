import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @IsPublic()
  async createContact(
    @Body() contactData: CreateContactDto,
    @Req() req: Request,
  ) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip;
    return await this.contactService.createContact(contactData, ip);
  }
}
