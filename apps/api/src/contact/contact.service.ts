import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactModel } from './entity/contact.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ENV_TO_EMAIL_KEY } from 'src/common/const/env-kets.const';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import { BasePaginateContactDto } from './dto/paginate-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactModel)
    private readonly contactRepository: Repository<ContactModel>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}

  private readonly rateLimitMap = new Map<
    string,
    { count: number; date: string }
  >();

  private checkLimit(ipOrEmail: string) {
    const today = new Date().toISOString().slice(0, 10);
    const record = this.rateLimitMap.get(ipOrEmail);

    if (record?.date === today) {
      if (record.count >= 5) throw new ForbiddenException('하루 5회 초과');
      record.count++;
    } else {
      this.rateLimitMap.set(ipOrEmail, { count: 1, date: today });
    }
  }

  async createContact(contactData: CreateContactDto, ip?: string) {
    this.checkLimit(ip || contactData.email);
    const contact = this.contactRepository.create(contactData);

    await this.contactRepository.save(contact);

    await this.sendContactEmail(contactData);

    return {
      message: '문의가 성공적으로 전송되었습니다.',
      contactData,
    };
  }

  async sendContactEmail(contactData: CreateContactDto) {
    await this.mailerService.sendMail({
      to: this.configService.get(ENV_TO_EMAIL_KEY),
      subject: `📩 [허밍비젼 문의] ${contactData.subject || '새로운 문의가 도착했습니다'}`,
      template: './contact',
      context: {
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
      },
      html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); padding: 32px;">
                <h2 style="color: #1a202c; font-size: 20px; margin-bottom: 24px;">📩  새로운 문의가 도착했습니다</h2>

                <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #2d3748;">
                    <tr>
                    <td style="font-weight: bold; padding: 8px 0; width: 90px; color: #4a5568;">이름</td>
                    <td style="padding: 8px 0;">${contactData.name}</td>
                    </tr>
                    <tr>
                    <td style="font-weight: bold; padding: 8px 0; color: #4a5568;">이메일</td>
                    <td style="padding: 8px 0;">${contactData.email}</td>
                    </tr>
                    <tr>
                    <td style="font-weight: bold; padding: 8px 0; color: #4a5568;">회사</td>
                    <td style="padding: 8px 0;">${contactData.company ?? '-'}</td>
                    </tr>
                    <tr>
                    <td style="font-weight: bold; padding: 8px 0; color: #4a5568;">제목</td>
                    <td style="padding: 8px 0;">${contactData.subject ?? '-'}</td>
                    </tr>
                </table>

                <div style="margin-top: 32px;">
                    <div style="font-weight: bold; margin-bottom: 8px; color: #4a5568;">문의 내용</div>
                    <div style="white-space: pre-line; background: #f7fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; line-height: 1.6;">
                    ${contactData.message}
                    </div>
                </div>

                <div style="margin-top: 40px; font-size: 12px; color: #a0aec0; text-align: center;">
                    © ${new Date().getFullYear()} Humming Vision. All rights reserved.
                </div>
                </div>
            </div>
            `,
    });

    return {
      message: '문의가 성공적으로 전송되었습니다.',
      contactData,
    };
  }

  async paginateContact(dto: BasePaginateContactDto) {
    return this.commonService.paginate(dto, this.contactRepository);
  }

  async getContactById(id: number) {
    const contact = await this.contactRepository.findOne({
      where: { id },
    });

    if (!contact) {
      throw new ForbiddenException('Contact not found');
    }

    return contact;
  }

  async readContact(id: number) {
    const contact = await this.getContactById(id);
    contact.isRead = true;
    return this.contactRepository.save(contact);
  }

  async deleteContact(id: number) {
    const contact = await this.getContactById(id);
    await this.contactRepository.remove(contact);
  }
}
