import { Request, Response } from 'express';
import { ApiEntity, ApiService } from './api.service';

export class ApiController<T extends ApiService<ApiEntity>> {
  constructor(private _service: T) {
    Object.getOwnPropertyNames(ApiController.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      .forEach((method) => (this[method] = this[method].bind(this)));
  }

  all(req: Request, res: Response): void {
    this._service.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id'];
    this._service
      .byId(id)
      .then((r) => (r ? res.json(r) : res.status(404).end()));
  }

  create(req: Request, res: Response): void {
    this._service
      .create(req.body)
      .then((r) =>
        res
          .status(201)
          .location(`/api/v1/${this._service.config.name}/${r.id}`)
          .json(r)
      );
  }

  delete(req: Request, res: Response): void {
    this._service.delete(req.params['id']).then(() => res.status(204).end());
  }

  update(req: Request, res: Response): void {
    this._service
      .update(req.params['id'], req.body)
      .then((r) =>
        r
          ? res
              .status(200)
              .location(`/api/v1/${this._service.config.name}/${r.id}`)
              .json(r)
          : res.status(404).end()
      );
  }
}
