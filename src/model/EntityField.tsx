import * as inflection from 'inflection';

export interface IEntityFieldConfig {
  name: string;
  title?: string;
  visibility?: {
    list?: boolean;
    detail?: boolean;
  };
}

export class EntityField {
  constructor(private readonly config: IEntityFieldConfig) {}

  public get title(): string {
    return inflection.transform(this.config.title || this.config.name, [
      'underscore',
      'titleize'
    ]);
  }

  public get name(): string {
    return this.config.name;
  }

  public visible(type: 'list' | 'detail'): boolean {
    return !this.config.visibility || !!this.config.visibility[type];
  }
}
