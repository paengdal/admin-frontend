import Button from '../atoms/Button';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  isValid: boolean;
  isPending: boolean;
  onSignup: () => void;
}

export default function LoginButtons({ isValid, isPending, onSignup }: Props) {
  return (
    <>
      <Button type="submit" disabled={!isValid}>
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            로그인 중...
          </div>
        ) : (
          '로그인'
        )}
      </Button>
      <OutlinedButton type="button" onClick={onSignup}>
        회원가입
      </OutlinedButton>
    </>
  );
}
