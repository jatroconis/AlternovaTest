import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { findErrorByStatus } from "./find-error-status";

@Catch(
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  QueryFailedError,
)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | HttpException
      | NotFoundException
      | InternalServerErrorException
      | QueryFailedError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof QueryFailedError
        ? HttpStatus.INTERNAL_SERVER_ERROR
        : exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: findErrorByStatus(status),
      error: exception.message,
      path: request.url,
    });
  }
}
