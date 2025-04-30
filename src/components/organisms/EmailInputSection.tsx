// components/signup/EmailInputSection.tsx
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupForm } from '../../pages/SignupPage';
import Input from '../atoms/Input';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
  onCheckEmail: () => void;
}

export default function EmailInputSection({
  register,
  errors,
  onCheckEmail,
}: Props) {
  return (
    <div>
      <label htmlFor="email" className="block text-xl font-medium mb-2">
        Email
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />
        </div>
        <OutlinedButton
          type="button"
          onClick={onCheckEmail}
          className="!w-[150px] px-4 !text-base"
        >
          이메일 확인
        </OutlinedButton>
      </div>
    </div>
  );
}
