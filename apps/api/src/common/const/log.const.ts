import { actionEnum } from 'src/admin/const/log.const';

export const ACTION_MAP: {
  action: actionEnum;
  method: string;
  urlIncludes: string;
}[] = [
  {
    action: actionEnum.CREATE_PRODUCT,
    method: 'POST',
    urlIncludes: '/product',
  },
  {
    action: actionEnum.UPDATE_PRODUCT,
    method: 'PATCH',
    urlIncludes: '/product',
  },
  {
    action: actionEnum.DELETE_PRODUCT,
    method: 'DELETE',
    urlIncludes: '/product',
  },
  {
    action: actionEnum.VIEW_CONTACT,
    method: 'PATCH',
    urlIncludes: '/contact',
  },
  {
    action: actionEnum.DELECT_CONTACT,
    method: 'DELETE',
    urlIncludes: '/contact',
  },
  {
    action: actionEnum.CREATE_ADMIN,
    method: 'POST',
    urlIncludes: '/admin/register',
  },
  {
    action: actionEnum.DELETE_ADMIN,
    method: 'DELETE',
    urlIncludes: '/admin',
  },
];
