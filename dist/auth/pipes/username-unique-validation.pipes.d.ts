import { ValidatorConstraintInterface } from 'class-validator';
import { AuthService } from 'src/auth/auth.service';
export declare class IsUsernameAlreadyExist implements ValidatorConstraintInterface {
    protected readonly authService: AuthService;
    constructor(authService: AuthService);
    validate(text: string): Promise<boolean>;
}
