import { getModelForClass } from '@typegoose/typegoose';
import { Connection } from 'mongoose';
import { User } from '../modules/User.entity';

type AdminAuthConfig = { authenticate: Function; cookiePassword: string };

const getAdminAuthenticationConfig = async (
  connection: Connection,
): Promise<AdminAuthConfig> => {
  const UserModel = getModelForClass(User, {
    existingConnection: connection,
  });

  if ((await UserModel.countDocuments()) === 0) {
    await UserModel.create({
      email: 'email',
      password: 'password',
    });
  }

  return {
    authenticate: async (
      email: string,
      password: string,
    ): Promise<User | null> => {
      const admin = await UserModel.findOne({ email });
      const passwordMatch = admin && (password === admin.password);
      return passwordMatch ? admin : null;
    },
    cookiePassword: 'pass',
  };
};

export default getAdminAuthenticationConfig;
