import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactModel } from './entity/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactModel)
    private readonly contactRepository: Repository<ContactModel>,
  ) {}

  async createContact(contactData: CreateContactDto) {
    const contact = this.contactRepository.create(contactData);
    return await this.contactRepository.save(contact);
  }
}
