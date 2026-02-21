import type ServiceAccount from "../../models/service_account.js"

export default interface ITokenService {
    validate(token: string): Promise<string>
}