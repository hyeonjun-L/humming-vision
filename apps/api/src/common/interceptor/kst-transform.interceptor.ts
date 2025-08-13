import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class KstTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.transformDates(data);
      }),
    );
  }

  private transformDates(obj: unknown): unknown {
    if (obj === null || obj === undefined) return obj;

    if (obj instanceof Date) {
      return dayjs(obj)
        .add(18, 'hour')
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss');
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformDates(item));
    }

    if (typeof obj === 'object') {
      const transformed: Record<string, unknown> = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          transformed[key] = this.transformDates(
            (obj as Record<string, unknown>)[key],
          );
        }
      }
      return transformed;
    }

    return obj;
  }
}
