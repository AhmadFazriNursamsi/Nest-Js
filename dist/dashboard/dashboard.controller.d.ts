import { DashboardService } from 'src/dashboard/dashboard.service';
import { OsStatsInterface } from 'src/dashboard/interface/os-stats.interface';
import { UsersStatsInterface } from 'src/dashboard/interface/user-stats.interface';
import { BrowserStatsInterface } from 'src/dashboard/interface/browser-stats.interface';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    userStat(): Promise<UsersStatsInterface>;
    osStat(): Promise<Array<OsStatsInterface>>;
    browserStat(): Promise<Array<BrowserStatsInterface>>;
}
