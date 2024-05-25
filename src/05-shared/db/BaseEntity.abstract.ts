export abstract class BaseEntity<E extends object> {
  constructor(entity: Partial<E> = {}) {
    Object.assign(this, entity);
  }
}
