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

export const loginSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: requiredStr })
    .min(2, '닉네임을 최소 2자 이상 입력하세요.'),
  password: z
    .string()
    .min(1, { message: requiredStr })
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export const editProfileSchema = z
  .object({
    nickname: z.string().optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: '비밀번호는 6자 이상이어야 합니다.',
      }),
    checkPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password) {
        // password가 있으면 checkPassword도 있어야 하고 일치해야 함
        return data.checkPassword && data.password === data.checkPassword;
      }
      // password가 없으면 일치 여부 검사 자체를 하지 않음
      return true;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['checkPassword'],
    }
  );

export const postSchema = z.object({
  title: z
    .string()
    .min(5, '제목은 5자 이상이어야 합니다.')
    .max(30, '제목은 30자 이내여야 합니다.'),
  post: z
    .string()
    .min(10, '내용은 10자 이상이어야 합니다.')
    .max(300, '내용은 300자 이내여야 합니다.'),
});
