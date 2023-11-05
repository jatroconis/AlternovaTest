export interface CrudService<T> {
  save(objectDto: T): Promise<T>;
  update(objectDto: T): Promise<T>;
  findAll(): Promise<T[]>;
  findByName(name: string): Promise<T>;
  findById(objectId: number): Promise<T>;
  deleteById(objectId: number): Promise<string>;
}
