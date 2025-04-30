import Button from '../atoms/Button';
import OutlinedButton from '../atoms/OutlinedButton';

interface Props {
  isFormReady: boolean;
  isPending: boolean;
  onCancel: () => void;
}

export default function ProfileEditButtons({
  isFormReady,
  isPending,
  onCancel,
}: Props) {
  return (
    <div className="space-y-2">
      <OutlinedButton type="button" onClick={onCancel}>
        변경 취소
      </OutlinedButton>
      <Button type="submit" disabled={!isFormReady}>
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            변경 중...
          </div>
        ) : (
          '변경'
        )}
      </Button>
    </div>
  );
}
