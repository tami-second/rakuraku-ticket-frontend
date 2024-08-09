'use client';

import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  password: string;
};

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues,) => {
      try{
        const res = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const result = await res.json();
          console.log('送信データ:', result);
          if (result != null) {
            alert('ログイン成功!');
          } else {
            alert('ログイン失敗: ' + (result.message || '無効なメールアドレスまたはパスワードです'));
          }
        } else {
          alert('ログイン処理中にエラーが発生しました');
        }
      } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('サーバーに接続できませんでした。後でもう一度お試しください。');
      }
  }

  return (
    <>
    <div className="min-h-screen flex bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">ID</label>
            <input
              type="text"
              {...register('name', { required: 'name is required' })}
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">PASSWORD</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;