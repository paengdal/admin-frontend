// components/signup/NicknameInputSection.tsx
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupForm } from '../../pages/SignupPage';
import Input from '../atoms/Input';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
  onCheckNickname: () => void;
}

export default function NicknameInputSection({
  register,
  errors,
  onCheckNickname,
}: Props) {
  return (
    <div>
      <label htmlFor="nickname" className="block text-xl font-medium mb-2">
        Nickname
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="nickname"
            type="text"
            {...register('nickname')}
            error={errors.nickname?.message}
            required
          />
        </div>
        <OutlinedButton
          type="button"
          onClick={onCheckNickname}
          className="!w-[150px] px-4 !text-base"
        >
          닉네임 확인
        </OutlinedButton>
      </div>
    </div>
  );
}
