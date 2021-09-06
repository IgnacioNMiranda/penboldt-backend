import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';

describe('AppController', () => {
  let app: NestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('health', () => {
    it('should return "OK"', async () => {
      await request(app.getHttpServer()).get('/').expect(200).expect({
        data: 'OK',
      });
    });
  });
});
