import {
  ExamplesService,
  ExamplesServiceFactory,
} from '../../services/examples.service';
import { ApiController } from '../../core/api.controller';

export class ExamplesController extends ApiController<ExamplesService> {}

export default new ExamplesController(ExamplesServiceFactory);
