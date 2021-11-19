const { DataTypes } = require('sequelize')

module.exports = (dbConnection) => dbConnection.define(
  'UserProfile',
  {
    avatar: { // save as <username>-<version_no>.png|jpeg|jpg....
      type: DataTypes.STRING,
      defaultValue: JSON.stringify({
        currentAvatar: 'default.png',
        uploaded: []
      }),
      get(){
        const rawValue = this.getDataValue('avatar');
        return rawValue ? JSON.parse(rawValue).currentAvatar : 'default.png';
      }
    },
    uploaded_avatars: {
      type: DataTypes.VIRTUAL,
      get(){
        const rawValue = this.getDataValue('avatar');
        const returnedData = ['default.png'];
        
        return rawValue ? returnedData.concat(JSON.parse(rawValue).uploaded) : returnedData;
      }
    }
    ,
    full_name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    province: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    district: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    ward: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },

    socials: { // save as JSON.stringify {facebook: url, linked: url}
      type: DataTypes.TEXT,
      defaultValue: JSON.stringify({
        'facebook': '-',
        'linked': '-'
      }),
      
      set(value){
        this.setDataValue('socials', JSON.stringify({
          'facebook': value.facebook || '-',
          'linked': value.linked || '-'
        }))
      },
      get(){
        const rawValue = this.getDataValue('socials');
        return rawValue ? JSON.parse(rawValue) : {};
      }
    },

    facebook: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('socials');
        const facebook = rawValue ? JSON.parse(rawValue).facebook : '';
        return facebook;
      },
    },
    linked_in: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('socials');
        const linked = rawValue ? JSON.parse(rawValue).linked : '';
        return linked;
      },
    }
  },
  {
    tableName: 'user_profile',
  },
)
