import { UseFormRegister } from 'react-hook-form';
import { EditProfileForm } from '../../pages/ProfileEditPage';
import Input from '../atoms/Input';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  register: UseFormRegister<EditProfileForm>;
  error?: string;
  onChange: () => void;
  onCheck: () => void;
}

export default function ProfileNicknameSection({
  register,
  error,
  onChange,
  onCheck,
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
            {...register('nickname', { onChange })}
            error={error}
          />
        </div>
        <OutlinedButton
          type="button"
          className="!w-[150px] px-4 !text-base"
          onClick={onCheck}
        >
          닉네임 확인
        </OutlinedButton>
      </div>
    </div>
  );
}
