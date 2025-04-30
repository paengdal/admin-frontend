import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginForm } from '../../pages/LoginPage';
import Input from '../atoms/Input';

interface Props {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

export default function LoginInputSection({ register, errors }: Props) {
  return (
    <>
      <div>
        <label htmlFor="nickname" className="block text-xl font-medium mb-2">
          Nickname
        </label>
        <Input
          id="nickname"
          type="text"
          {...register('nickname')}
          error={errors.nickname?.message}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xl font-medium mb-2">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          required
        />
      </div>
    </>
  );
}
