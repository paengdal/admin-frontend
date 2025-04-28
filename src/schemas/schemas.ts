import { z } from 'zod';

const requiredStr: string = '필수 입력 항목입니다';
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: requiredStr })
      .email('올바른 이메일 형식이 아닙니다.'),
    nickname: z
      .string()
      .min(1, { message: requiredStr })
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
    checkPassword: z.string(),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['checkPassword'],
  });
