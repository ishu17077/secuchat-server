import type ServiceAccount from "../data/models/service_account.js";
export default interface ITokenService {
    configure(serviceAccount: ServiceAccount): Promise<void>;
    validate(token: string): Promise<string>;
}
//# sourceMappingURL=itoken_service.d.ts.map