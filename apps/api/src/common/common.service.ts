import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseModel } from './entity/base.entity';
import { BasePaginationDto } from './dto/base-pagination.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FILTER_MAPPER } from './const/filter-mapper.const';
import { DEFAULT_PAGE, DEFAULT_TAKE } from './const/pagination.cont';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  async paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    defaultWhere: FindOptionsWhere<T> = {},
    defaultOrder: FindOptionsOrder<T> = {},
    customWhereQueryBuilder?: (
      qb: SelectQueryBuilder<T>,
      dto: BasePaginationDto,
    ) => void,
  ) {
    const { take, skip, where, order } = this.composeFindOptions<T>(
      dto,
      defaultWhere,
      defaultOrder,
    );

    if (this.hasCustomQueryFilters(dto) && customWhereQueryBuilder) {
      return this.runWithCustomQueryBuilder(
        dto,
        repository,
        take,
        skip,
        where,
        order,
        overrideFindOptions,
        customWhereQueryBuilder,
      );
    }

    const [data, count] = await repository.findAndCount({
      ...{ where, order, take, skip },
      ...overrideFindOptions,
    });

    return { data, total: count };
  }

  private hasCustomQueryFilters(dto: BasePaginationDto): boolean {
    return Object.entries(dto).some(
      ([key, value]) =>
        key.startsWith('_') && value !== undefined && value !== null,
    );
  }

  private async runWithCustomQueryBuilder<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    take: number,
    skip: number,
    where: FindOptionsWhere<T>,
    order: FindOptionsOrder<T> = {},
    overrideFindOptions: FindManyOptions<T>,
    customWhereQueryBuilder: (
      qb: SelectQueryBuilder<T>,
      dto: BasePaginationDto,
    ) => void,
  ): Promise<{ data: T[]; total: number }> {
    const qb = repository.createQueryBuilder('entity').take(take).skip(skip);

    if (overrideFindOptions.relations) {
      Object.keys(overrideFindOptions.relations).forEach((relation) => {
        qb.leftJoinAndSelect(`entity.${relation}`, relation);
      });
    }

    if (where) {
      qb.andWhere(where);
    }

    if (order) {
      Object.entries(order).forEach(([field, value]) => {
        if (value !== undefined) {
          qb.addOrderBy(`entity.${field}`, value as 'ASC' | 'DESC');
        }
      });
    }

    customWhereQueryBuilder(qb, dto);

    const [data, count] = await qb.getManyAndCount();
    return { data, total: count };
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
    defaultWhere: FindOptionsWhere<T> = {},
    defaultOrder: FindOptionsOrder<T> = {},
  ) {
    let where: FindOptionsWhere<T> = defaultWhere;
    let order: FindOptionsOrder<T> = defaultOrder;

    for (const [key, value] of Object.entries(dto)) {
      if (
        key === 'page' ||
        key === 'take' ||
        value === undefined ||
        value === null
      ) {
        continue;
      }

      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('_')) {
        continue;
      } else {
        const [relation] = key.split('__');
        where = {
          ...where,
          [relation]: {
            ...(typeof where[relation] === 'object' && where[relation] !== null
              ? (where[relation] as Record<string, any>)
              : {}),
            ...this.parseWhereFilter(key, value),
          },
        };
      }
    }

    const take =
      typeof dto.take === 'number' && dto.take > 0 ? dto.take : DEFAULT_TAKE;
    const page = Math.max(DEFAULT_PAGE, Number(dto.page) || DEFAULT_PAGE);
    const skip = take * (page - 1);

    return {
      where,
      order,
      take,
      skip: Math.max(0, skip),
    };
  }

  private parseWhereFilter(key: string, value: unknown): Record<string, any> {
    const options: Record<string, any> = {};
    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split 했을때 길이가 2 또는 3이어야합니다 - 문제되는 키값 : ${key}`,
      );
    }

    if (split.length === 2) {
      const [, field] = split;
      options[field] = value;
      return options;
    }

    const [, field, operatorRaw] = split;
    const operator = operatorRaw as keyof typeof FILTER_MAPPER;
    const arrayOperators = [
      'in',
      'any',
      'array_contains',
      'array_contained_by',
      'array_overlap',
    ];

    switch (operator) {
      case 'i_like':
        options[field] = FILTER_MAPPER[operator](`%${String(value)}%`);
        break;
      case 'between':
        if (Array.isArray(value) && value.length === 2) {
          options[field] = FILTER_MAPPER[operator](value[0], value[1]);
        } else {
          throw new BadRequestException(
            'between 연산자는 [min, max] 배열이 필요합니다.',
          );
        }
        break;
      default:
        if (arrayOperators.includes(operator)) {
          if (!Array.isArray(value)) {
            throw new BadRequestException(
              `${operator} 연산자는 배열 값이 필요합니다.`,
            );
          }
          options[field] = FILTER_MAPPER[operator](value);
        } else {
          options[field] = FILTER_MAPPER[operator](value as any);
        }
    }

    return options;
  }
}
