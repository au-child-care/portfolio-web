import { AccountDetails } from './account-details.dto';

export class AuthenticateResponse {
    success: false;
    message: '';
    user_details: AccountDetails;
    role: '';
}
