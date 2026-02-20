import type ServiceAccount from "../../models/service_account.js"

export default interface ITokenService {
    configure(serviceAccount: ServiceAccount): void
    validate(token: string): Promise<string>
}