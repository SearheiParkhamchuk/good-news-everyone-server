import { ColumnOptions, TableColumnOptions } from 'typeorm';

export type ColumnDecoratorOptions = Pick<
  ColumnOptions & Required<Pick<ColumnOptions, 'name'>>,
  | 'name'
  | 'type'
  | 'unique'
  | 'length'
  | 'enum'
  | 'default'
  | 'nullable'
  | 'primary'
  | 'generated'
  | 'foreignKeyConstraintName'
>;

export type ColumnTableOptions = Pick<
  TableColumnOptions,
  | 'name'
  | 'type'
  | 'isUnique'
  | 'length'
  | 'enum'
  | 'default'
  | 'isNullable'
  | 'isPrimary'
  | 'generationStrategy'
  | 'isGenerated'
  | 'foreignKeyConstraintName'
>;

export function mapColumnDecoratorToTableColumn(
  decorator_options: ColumnDecoratorOptions,
): TableColumnOptions {
  return {
    name: decorator_options.name,
    type: decorator_options.type as string,
    isUnique: decorator_options.unique,
    length: decorator_options.length ? String(decorator_options.length) : undefined,
    enum: decorator_options.enum
      ? Array.isArray(decorator_options.enum)
        ? decorator_options.enum.map((o) => o.toString())
        : Object.values(decorator_options.enum)
      : undefined,
    default:
      decorator_options.type === 'enum' && decorator_options.default
        ? `'${decorator_options.default}'`
        : decorator_options.default,
    isNullable: decorator_options.nullable,
    isPrimary: decorator_options.primary,
    generationStrategy:
      typeof decorator_options.generated === 'boolean' ? 'increment' : decorator_options.generated,
    isGenerated: !!decorator_options.generated,
    foreignKeyConstraintName: decorator_options.foreignKeyConstraintName,
  };
}
