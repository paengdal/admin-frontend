import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Layout from '../components/atoms/Layout';
import ProfileEditButtons from '../components/organisms/ProfileEditButtons';
import ProfileNicknameSection from '../components/organisms/ProfileNicknameSection';
import ProfilePasswordSection from '../components/organisms/ProfilePasswordSection';
import { useCheckNicknameMutation } from '../hooks/useCheckNickname';
import { useUpdateProfileMutation } from '../hooks/useUpdateProfile';
import { editProfileSchema } from '../schemas/schemas';

export type EditProfileForm = z.infer<typeof editProfileSchema>;

function ProfileEditPage() {
  const navigate = useNavigate();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  });

  const nickname = watch('nickname');
  const password = watch('password');

  const hasNickname = !!nickname;
  const hasPassword = !!password;

  // nickname 입력됐으면 → 중복확인 성공했는지 체크
  const isNicknameValid = hasNickname ? isNicknameChecked : false;

  // 버튼 활성화 조건
  const isFormReady =
    ((hasNickname && isNicknameValid) || hasPassword) && isValid;

  // 프로필 수정
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const onSubmit = (data: EditProfileForm) => {
    const payload: Partial<{ nickname?: string; password?: string }> = {};

    if (data.nickname) payload.nickname = data.nickname;
    if (data.password) payload.password = data.password;

    if (Object.keys(payload).length === 0) {
      alert('변경할 내용을 입력하세요.');
      return;
    }

    updateProfile(payload);
  };

  // 닉네임 확인
  const { mutate: checkNickname } =
    useCheckNicknameMutation(setIsNicknameChecked);
  const handleCheckNickname = () => {
    const nickname = getValues('nickname');
    if (nickname) {
      checkNickname(nickname);
    } else {
      alert('닉네임을 입력하세요.');
    }
  };

  // 수정 취소
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">내 정보 수정</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ProfileNicknameSection
            register={register}
            error={errors.nickname?.message}
            onChange={() => setIsNicknameChecked(false)}
            onCheck={handleCheckNickname}
          />
          <ProfilePasswordSection register={register} errors={errors} />
          <ProfileEditButtons
            isFormReady={isFormReady}
            isPending={isPending}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </Layout>
  );
}

export default ProfileEditPage;
