// components/signup/SignupActionButtons.tsx
import Button from '../atoms/Button';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  isValid: boolean;
  isEmailChecked: boolean;
  isNicknameChecked: boolean;
  isPending: boolean;
  onCancel: () => void;
  onLogin: () => void;
}

export default function SignupActionButtons({
  isValid,
  isEmailChecked,
  isNicknameChecked,
  isPending,
  onCancel,
  onLogin,
}: Props) {
  return (
    <div className="space-y-2">
      <OutlinedButton type="button" onClick={onCancel}>
        가입 취소
      </OutlinedButton>
      <Button
        type="submit"
        disabled={!(isValid && isEmailChecked && isNicknameChecked)}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            회원가입 중...
          </div>
        ) : (
          '회원가입'
        )}
      </Button>
      <OutlinedButton type="button" onClick={onLogin}>
        로그인
      </OutlinedButton>
    </div>
  );
}
