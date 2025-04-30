// components/signup/PasswordInputSection.tsx
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupForm } from '../../pages/SignupPage';
import Input from '../atoms/Input';

interface Props {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
}

export default function PasswordInputSection({ register, errors }: Props) {
  return (
    <>
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

      <div>
        <label
          htmlFor="checkPassword"
          className="block text-xl font-medium mb-2"
        >
          Check Password
        </label>
        <Input
          id="checkPassword"
          type="password"
          {...register('checkPassword')}
          error={errors.checkPassword?.message}
          required
        />
      </div>
    </>
  );
}
