export interface Mapper<Domain, Dto> {
  toDomain(mapper: Dto): Domain;

  toDto(mapper: Domain): Dto;

  asyncToDomain(mapper: Dto): Promise<Domain>;

  asyncToDto(mapper: Domain): Promise<Dto>;

  asyncArrayDomain(mappers: Dto[]): Promise<Domain[]>;

  asyncArrayDto(mappers: Domain[]): Promise<Dto[]>;
}
