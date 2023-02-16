/// <reference types="multer" />
import { Request, Response } from 'express';
import { Pagination } from 'src/paginate';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { AuthService } from 'src/auth/auth.service';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ForgetPasswordDto } from 'src/auth/dto/forget-password.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { UpdateUserProfileDto } from 'src/auth/dto/update-user-profile.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { UserSearchFilterDto } from 'src/auth/dto/user-search-filter.dto';
import { UserEntity } from 'src/auth/entity/user.entity';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { RefreshPaginateFilterDto } from 'src/refresh-token/dto/refresh-paginate-filter.dto';
import { RefreshTokenSerializer } from 'src/refresh-token/serializer/refresh-token.serializer';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<UserSerializer>;
    login(req: Request, response: Response, userLoginDto: UserLoginDto): Promise<Response<any, Record<string, any>>>;
    refresh(req: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    activateAccount(token: string): Promise<void>;
    forgotPassword(forgetPasswordDto: ForgetPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    profile(user: UserEntity): Promise<UserSerializer>;
    updateProfile(user: UserEntity, file: Express.Multer.File, updateUserDto: UpdateUserProfileDto): Promise<UserSerializer>;
    changePassword(user: UserEntity, changePasswordDto: ChangePasswordDto): Promise<void>;
    findAll(userSearchFilterDto: UserSearchFilterDto): Promise<Pagination<UserSerializer>>;
    create(createUserDto: CreateUserDto): Promise<UserSerializer>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserSerializer>;
    findOne(id: string): Promise<UserSerializer>;
    logOut(req: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getRefreshToken(filter: RefreshPaginateFilterDto, user: UserEntity): Promise<Pagination<RefreshTokenSerializer>>;
    revokeToken(id: string, user: UserEntity): Promise<RefreshToken>;
}
