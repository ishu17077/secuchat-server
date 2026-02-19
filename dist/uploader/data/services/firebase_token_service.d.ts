import type ITokenService from "../../services/itoken_service.js";
import type ServiceAccount from "../models/service_account.js";
export default class FirebaseTokenService implements ITokenService {
    private firebaseApp;
    configure(serviceAccount: ServiceAccount): Promise<void>;
    validate(token: string): Promise<string>;
}
//# sourceMappingURL=firebase_token_service.d.ts.map