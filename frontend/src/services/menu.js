export const menuData = [
  {
    title: 'Dashboard',
    url: '/',
    key: 'dashboard',
  },
  {
    title: 'Users',
    url: '/users',
    key: 'users',
  },
  {
    title: 'Compute Engine',
    key: 'ce',
    children: [
      {
        title: 'Instances',
        url: '/ce/instances',
        key: 'ce-instances',
      },
      {
        title: 'Volumes',
        url: '/ce/volumes',
        key: 'ce-volumes',
      },
      {
        title: 'Security Groups',
        url: '/ce/security-groups',
        key: 'ce-security-groups',
      },
      {
        title: 'Key Pairs',
        url: '/ce/keypairs',
        key: 'ce-key-pairs',
      },
    ],
  },
  {
    title: 'Simple Storage Service',
    key: 's3',
    children: [
      {
        title: 'Bucket',
        url: '/s3/buckets',
        key: 's3-bucket',
      },
      {
        title: 'Service Account',
        url: '/s3/service-accounts',
        key: 's3-service-account',
      },
    ],
  },
  {
    title: 'Elastic File System',
    key: 'efs',
    children: [
      {
        title: 'File System',
        url: '/efs/filesystems',
        key: 'efs-filesystems',
      },
    ],
  },
  {
    title: 'Custom Domain',
    key: 'cd',
    children: [
      {
        title: 'Custom Domain',
        url: '/cd/custom-domains',
        key: 'cd-custom-domain',
      },
    ],
  },
  {
    title: 'Mobile Device Farm',
    key: 'df',
    children: [
      {
        title: 'APK Manager',
        url: '/apk-manager',
        key: 'apk-manager',
      },
      {
        title: 'Projects',
        url: '/df/projects',
        key: 'df-project',
      },
      {
        title: 'Device Session',
        url: '/df/device-sessions',
        key: 'df-device-session',
      },
    ],
  },
  {
    title: 'RDS',
    key: 'rds',
    children: [
      {
        title: 'Databases',
        url: '/rds/databases',
        key: 'rds-databases',
      },
    ],
  },
  {
    title: 'Non RDS',
    key: 'non-rds',
    children: [
      {
        title: 'MongoDB',
        url: '/non-rds/mongodb',
        key: 'non-rds-mongodb',
      },
    ],
  },
  {
    title: 'Redis',
    key: 'redis',
    children: [
      {
        title: 'Instance',
        url: '/redis/instance',
        key: 'redis-node',
      },
      {
        title: 'Version',
        url: '/redis/version',
        key: 'redis-version',
      },
    ],
  },
  {
    title: 'ECR',
    key: 'ecr',
    children: [
      {
        title: 'Projects',
        url: '/ecr/projects',
        key: 'ecr-projects',
      },
      {
        title: 'Repositories',
        url: '/ecr/repositories',
        key: 'ecr-repositories',
      },
      {
        title: 'Artifacts',
        url: '/ecr/artifacts',
        key: 'ecr-artifacts',
      },
    ],
  },
  {
    title: 'Notification',
    key: 'ns',
    children: [
      {
        title: 'Notification',
        url: '/ns/notifications',
        key: 'ns-notification',
      },
    ],
  },
]

export async function getLeftMenuData() {
  return menuData
}
