import {
  BaseProperty, BaseRecord, BaseResource, Filter,
} from 'admin-bro';
import { AxiosInstance } from 'axios';
import { ParamsType } from 'admin-bro/types/src/backend/adapters/base-record';

export class JiraProjectResource extends BaseResource {
  private readonly DATABASE_NAME = 'Jira';

  private readonly RESOURCE_ID = 'jiraProject';

  private records: Record<string, unknown>[] = [];

  private jira: AxiosInstance;

  constructor(options = {}) {
    super(options);
  }

  id(): string {
    return this.RESOURCE_ID;
  }

  databaseName(): string {
    return this.DATABASE_NAME;
  }

  private props = [
    new BaseProperty({
      path: 'name', isId: false, isSortable: false, type: 'string',
    }),
    new BaseProperty({
      path: 'key', isId: true, isSortable: false, type: 'string',
    }),
    new BaseProperty({
      path: 'image', isId: false, isSortable: false, type: 'string',
    }),
  ];

  properties(): Array<BaseProperty> {
    return this.props;
  }

  property(path: string): BaseProperty | null {
    return this.props.find((p) => p.path() === path) ?? null;
  }

  count(filter: Filter): Promise<number> {
    return Promise.resolve(this.properties.length);
  }


  find(filter: Filter, options: { limit?: number; offset?: number; sort?: { sortBy?: string; direction?: 'asc' | 'desc' } }): Promise<Array<BaseRecord>> {
    return Promise.resolve(this.records.map((record) => this.toBaseRecord(record)));
  }

  create(params: Record<string, unknown>): Promise<ParamsType> {
    this.records = [...this.records, params];
    return Promise.resolve(params);
  }

  update(id: string, params: Record<string, unknown>): Promise<ParamsType> {
    this.records = [...this.records, params];
    return Promise.resolve(params);
  }

  private toBaseRecord(project: Record<string, unknown>): BaseRecord {
    return new BaseRecord({
      name: project.name,
      key: project.key,
    }, this);
  }
}
