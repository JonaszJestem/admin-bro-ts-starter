import AdminBroOptions from 'admin-bro/types/src/admin-bro-options.interface';

export default (resources): AdminBroOptions => ({
  version: {
    admin: true,
  },
  branding: {
    companyName: 'Company name',
  },
  resources,
});
