const AUTH_KEY = 'user-token';

export const setAuthToken = (token: string): void => {
    localStorage.setItem(AUTH_KEY, token);
}

export const getAuthToken = (): string | null => {
    return localStorage.getItem(AUTH_KEY);
}

export const delAuthToken = (): void => {
    localStorage.removeItem(AUTH_KEY);
}