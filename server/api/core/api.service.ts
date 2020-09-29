import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileSync';
import uid from 'uid';

const db = lowdb(new FileAsync(process.env.DB_BASE));

export interface ApiEntity {
  id: string;
}

export interface ApiConfig {
  name: string;
}

export class ApiService<T> {
  private type: string;

  constructor(public config: ApiConfig) {
    this.type = config.name;
    db.defaults({ [this.type]: [] }).write();
  }

  all(): Promise<T[]> {
    return Promise.resolve(db.get(this.type).value());
  }

  byId(id: string): Promise<T> {
    return Promise.resolve(db.get(this.type).find({ id }));
  }

  create(entity: T): Promise<T> {
    const id = uid();
    db.get(this.type)
      .push({ id, ...entity })
      .write();
    return Promise.resolve(db.get(this.type).find({ id }));
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(db.get(this.type).remove({ id }).write());
  }

  update(id: string, entity: T): Promise<T> {
    db.get(this.type).find({ id }).assign(entity).write();
    return Promise.resolve(db.get(this.type).find({ id }));
  }
}
