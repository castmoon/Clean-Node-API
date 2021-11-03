/* eslint-disable prettier/prettier */
import {
    IAuthentication,
    IAuthenticationModel,
    IHashComparer,
    ITokenGenerator,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository
} from './db-authentication-protocols';

export class DbAuthentication implements IAuthentication {
    constructor(
        private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
        private readonly hashComparer: IHashComparer,
        private readonly tokenGenerator: ITokenGenerator,
        private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
    ) { }

    async auth(authentication: IAuthenticationModel): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email);
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account?.password);
            if (isValid) {
                const accessToken = await this.tokenGenerator.generate(account?.id);
                await this.updateAccessTokenRepository.update(account.id, accessToken);
                return accessToken;
            }
        }
        return null;
    }
}
