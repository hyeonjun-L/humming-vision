import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ManualValidationBadRequestException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      statusCode: 400,
      message: 'Validation failed',
      errors: ManualValidationBadRequestException.extractErrorsFromList(errors),
    });
  }

  private static extractErrors(
    error: ValidationError,
    parentPath = '',
  ): { field: string; message: string }[] {
    const fieldPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
    const messages: { field: string; message: string }[] = [];
    if (error.constraints) {
      messages.push({
        field: fieldPath,
        message: Object.values(error.constraints).join(', '),
      });
    }
    if (error.children && error.children.length > 0) {
      error.children.forEach((childError) => {
        messages.push(
          ...ManualValidationBadRequestException.extractErrors(
            childError,
            fieldPath,
          ),
        );
      });
    }
    return messages;
  }

  private static extractErrorsFromList(errors: ValidationError[]) {
    return errors.flatMap((error) =>
      ManualValidationBadRequestException.extractErrors(error),
    );
  }
}
