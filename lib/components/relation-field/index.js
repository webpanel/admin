// import * as React from 'react';
// import { ResourceCollectionLayer, ResourceCollection } from 'webpanel-data';
// import { ResourceSelect, FormField } from 'webpanel-antd';
// import { EntityField } from '../../model/EntityField';
// import { Entity } from '../../model/Entity';
// import { FormContext } from 'webpanel-antd/lib/form/form/Form';
// export interface IRelationFieldProps {
//   field: EntityField<any, any>;
//   formContext: FormContext;
//   targetEntity: Entity<any>;
//   mode?: 'default' | 'multiple' | 'tags';
// }
// export class RelationField extends React.Component<IRelationFieldProps> {
//   render() {
//     const { formContext, field, mode, targetEntity } = this.props;
//     return (
//       <ResourceCollectionLayer
//         name={targetEntity.name}
//         fields={['id', ...targetEntity.searchableFields.map(x => x.name)]}
//         dataSource={targetEntity.dataSource}
//         render={(collection: ResourceCollection) => {
//           return (
//             <FormField
//               label={field.title}
//               name={field.name}
//               formContext={formContext}
//             >
//               <ResourceSelect
//                 valueKey="id"
//                 labelKey={(value: any): string => {
//                   return targetEntity.render(value);
//                 }}
//                 mode={mode}
//                 resourceCollection={collection}
//               />
//             </FormField>
//           );
//         }}
//       />
//     );
//   }
// }
//# sourceMappingURL=index.js.map