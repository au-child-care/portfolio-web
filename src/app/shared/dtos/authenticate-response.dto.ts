import { AccountDetails } from './account-details.dto';
import { CentreDetails } from './centre-details.dto';

export class AuthenticateResponse {
    success: false;
    message: '';
    user_details: AccountDetails;
    centre_details: CentreDetails;
    role: '';
}
