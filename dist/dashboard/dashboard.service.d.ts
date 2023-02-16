import { AuthService } from 'src/auth/auth.service';
import { UsersStatsInterface } from 'src/dashboard/interface/user-stats.interface';
import { BrowserStatsInterface } from 'src/dashboard/interface/browser-stats.interface';
import { OsStatsInterface } from 'src/dashboard/interface/os-stats.interface';
export declare class DashboardService {
    private readonly authService;
    constructor(authService: AuthService);
    getUserStat(): Promise<UsersStatsInterface>;
    getOsData(): Promise<Array<OsStatsInterface>>;
    getBrowserData(): Promise<Array<BrowserStatsInterface>>;
}
