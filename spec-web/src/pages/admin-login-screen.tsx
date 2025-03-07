import { Input } from '../shared/ui/input/input'
import { Button } from '../shared/ui/button/button'
import { SyntheticEvent } from 'react';

import { useAdminLoginStore } from '../entities/admin-login/model/admin-login-store';
import { useAdminLogin } from '../entities/admin-login/api/use-admin-login';
import { useNavigate } from 'react-router';
import { useAuthData } from '../entities/auth-user/api/use-auth-data';

export const AdminLogin = () => {
    const { mutate, isPending } = useAdminLogin()
    const { login, password, setLogin, setPassword } = useAdminLoginStore()
    const { saveToken } = useAuthData();
    const navigate = useNavigate();

    const isDisabled = !login.trim() || !password.trim();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();


        mutate({ login, password },
            {
                onSuccess: () => {
                    console.log('Admin login successfully')
                    const tempToken = 'admin-token';
                    saveToken(tempToken);
                    navigate('/admin/application')
                },
                onError: (error: any) => {
                    console.log(error.message)
                    throw new error
                }
            }
        )
        setLogin('');
        setPassword('');
    }

    return (
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
                <span className='text-dark font-[600] text-[24px]'>Вход</span>
                <Input
                    type="text"
                    className="w-full mt-8"
                    placeholder='Логин'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Input
                    type="password"
                    className="w-full mt-2"
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
                variant={isDisabled ? 'disabled' : 'default'}
                label={isPending ? "Загрузка..." : "Войти"}
                className="mt-auto"
                type="submit"
                disabled={isDisabled}
            />
        </form>
    )
}
