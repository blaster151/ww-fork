import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    private tokenKey = 'wonderWord';

    public store(key: string, content: Object) {
        localStorage.setItem(this.tokenKey + key, JSON.stringify(content));
    }

    public retrieve<T>(key: string) {
        const storedToken = <any>localStorage.getItem(this.tokenKey + key);
        if (!storedToken) {
            return null;
//            throw new Error('no token found');
        }

        return <T>JSON.parse(storedToken);
    }
}
