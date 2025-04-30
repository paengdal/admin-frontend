import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EditProfileForm } from '../../pages/ProfileEditPage';
import Input from '../atoms/Input';

interface Props {
  register: UseFormRegister<EditProfileForm>;
  errors: FieldErrors<EditProfileForm>;
}

export default function ProfilePasswordSection({ register, errors }: Props) {
  return (
    <>
      <div>
        <label htmlFor="password" className="block text-xl font-medium mb-2">
          New Password
        </label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      <div>
        <label
          htmlFor="checkPassword"
          className="block text-xl font-medium mb-2"
        >
          Check New Password
        </label>
        <Input
          id="checkPassword"
          type="password"
          {...register('checkPassword')}
          error={errors.checkPassword?.message}
        />
      </div>
    </>
  );
}
