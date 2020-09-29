import { ApiEntity, ApiService } from '../core/api.service';

interface Example extends ApiEntity {
  name: string;
}

export class ExamplesService extends ApiService<Example> {}

export const ExamplesServiceFactory = new ExamplesService({ name: 'examples' });
