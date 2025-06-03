import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @IsPublic()
  async createContact(@Body() contactData: CreateContactDto) {
    return await this.contactService.createContact(contactData);
  }
}
