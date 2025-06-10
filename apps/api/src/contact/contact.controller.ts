import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { BasePaginateContactDto } from './dto/paginate-contact.dto';

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

  @Get()
  async getContacts(@Query() dto: BasePaginateContactDto) {
    return await this.contactService.paginateContact(dto);
  }

  @Patch(':id')
  async readContact(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.readContact(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return await this.contactService.deleteContact(id);
  }
}
