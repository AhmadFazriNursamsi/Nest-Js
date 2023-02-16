"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionConfiguration = exports.MethodList = void 0;
var MethodList;
(function (MethodList) {
    MethodList["GET"] = "get";
    MethodList["POST"] = "post";
    MethodList["PUT"] = "put";
    MethodList["DELETE"] = "delete";
    MethodList["ANY"] = "any";
    MethodList["OPTIONS"] = "options";
})(MethodList = exports.MethodList || (exports.MethodList = {}));
exports.PermissionConfiguration = {
    roles: [
        {
            id: 1,
            name: 'superuser',
            description: 'superuser of the system'
        },
        {
            id: 2,
            name: 'normal',
            description: 'normal user of the system'
        }
    ],
    defaultRoutes: [
        {
            path: '/check',
            method: MethodList.GET
        },
        {
            path: '/auth/register',
            method: MethodList.POST
        },
        {
            path: '/auth/login',
            method: MethodList.POST
        },
        {
            path: '/auth/profile',
            method: MethodList.GET
        },
        {
            path: '/auth/activate-account',
            method: MethodList.GET
        },
        {
            path: '/auth/forgot-password',
            method: MethodList.PUT
        },
        {
            path: '/auth/reset-password',
            method: MethodList.PUT
        },
        {
            path: '/auth/change-password',
            method: MethodList.PUT
        },
        {
            path: '/auth/profile',
            method: MethodList.PUT
        },
        {
            path: '/revoke/:id',
            method: MethodList.PUT
        },
        {
            path: '/auth/token-info',
            method: MethodList.GET
        },
        {
            path: '/dashboard/users',
            method: MethodList.GET
        },
        {
            path: '/dashboard/os',
            method: MethodList.GET
        },
        {
            path: '/dashboard/browser',
            method: MethodList.GET
        },
        {
            path: '/logout',
            method: MethodList.POST
        }
    ],
    modules: [
        {
            name: 'User management',
            resource: 'user',
            hasSubmodules: false,
            permissions: [
                {
                    name: 'View all user',
                    route: [
                        {
                            path: '/users',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'Store new user',
                    route: [
                        {
                            path: '/users',
                            method: MethodList.POST
                        }
                    ]
                },
                {
                    name: 'Update user by id',
                    route: [
                        {
                            path: '/users/:id',
                            method: MethodList.PUT
                        }
                    ]
                },
                {
                    name: 'Get user by id',
                    route: [
                        {
                            path: '/users/:id',
                            method: MethodList.GET
                        }
                    ]
                }
            ]
        },
        {
            name: 'Role management',
            resource: 'role',
            hasSubmodules: false,
            permissions: [
                {
                    name: 'View all role',
                    route: [
                        {
                            path: '/roles',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'View role by id',
                    route: [
                        {
                            path: '/roles/:id',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'Store new role',
                    route: [
                        {
                            path: '/roles',
                            method: MethodList.POST
                        }
                    ]
                },
                {
                    name: 'Update role by id',
                    route: [
                        {
                            path: '/roles/:id',
                            method: MethodList.PUT
                        }
                    ]
                },
                {
                    name: 'Delete role by id',
                    route: [
                        {
                            path: '/roles/:id',
                            method: MethodList.DELETE
                        }
                    ]
                }
            ]
        },
        {
            name: 'Permission management',
            resource: 'permission',
            hasSubmodules: false,
            permissions: [
                {
                    name: 'View all permission',
                    route: [
                        {
                            path: '/permissions',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'Sync permission from config',
                    route: [
                        {
                            path: '/permissions/sync',
                            method: MethodList.POST
                        }
                    ]
                },
                {
                    name: 'View permission by id',
                    route: [
                        {
                            path: '/permissions/:id',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'Store new permission',
                    route: [
                        {
                            path: '/permissions',
                            method: MethodList.POST
                        }
                    ]
                },
                {
                    name: 'Update permission by id',
                    route: [
                        {
                            path: '/permissions/:id',
                            method: MethodList.PUT
                        }
                    ]
                },
                {
                    name: 'Delete permission by id',
                    route: [
                        {
                            path: '/permissions/:id',
                            method: MethodList.DELETE
                        }
                    ]
                }
            ]
        },
        {
            name: 'Email Templates',
            resource: 'emailTemplates',
            hasSubmodules: false,
            permissions: [
                {
                    name: 'View all email templates',
                    route: [
                        {
                            path: '/email-templates',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'View email templates by id',
                    route: [
                        {
                            path: '/email-templates/:id',
                            method: MethodList.GET
                        }
                    ]
                },
                {
                    name: 'Store new email templates',
                    route: [
                        {
                            path: '/email-templates',
                            method: MethodList.POST
                        }
                    ]
                },
                {
                    name: 'Update email templates by id',
                    route: [
                        {
                            path: '/email-templates/:id',
                            method: MethodList.PUT
                        }
                    ]
                },
                {
                    name: 'Delete email templates by id',
                    route: [
                        {
                            path: '/email-templates/:id',
                            method: MethodList.DELETE
                        }
                    ]
                }
            ]
        }
    ]
};
//# sourceMappingURL=permission-config.js.map