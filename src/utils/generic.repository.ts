export interface GenericRepository<T> {
    findById(id: string): Promise<T | null>;
    create(item: T): Promise<void>;
    update(id: string, updates: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
  }
