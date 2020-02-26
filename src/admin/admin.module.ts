import { mongoose } from '@typegoose/typegoose';
import AdminBroExpress from 'admin-bro-expressjs';
import AdminBroMongoose from 'admin-bro-mongoose';
import AdminBro from 'admin-bro';
import { Express } from 'express';
import { Application } from 'express-serve-static-core';
import config from './admin.config';
import { JiraProjectResource } from '../modules/jira/jira-project.resource';

AdminBro.registerAdapter(AdminBroMongoose);

const getRouterFor = async (
  adminBro: AdminBro,
): Promise<Application> => AdminBroExpress.buildRouter(adminBro);

const setupAdmin = async (app: Express): Promise<void> => {
  const { connection } = mongoose;
  if (!connection) {
    throw new Error('Mongoose connection is not configured');
  }
  const jiraProjectResource = new JiraProjectResource();

  const adminBro = new AdminBro(config([{
    resource: jiraProjectResource,
  }]));
  jiraProjectResource.assignDecorator(adminBro, {});
  const router = await getRouterFor(adminBro);
  app.use(adminBro.options.rootPath, router);
  adminBro.watch();
};

export default setupAdmin;
