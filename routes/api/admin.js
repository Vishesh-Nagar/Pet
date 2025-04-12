const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const ngo = require("../../models/Ngo");
const config = require("config");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    resources: [
        {
            resource: ngo,
            options: {
                listProperties: [
                    "name",
                    "email",
                    "register_date",
                    "contact",
                    "license",
                    "isVerified",
                ],
                showProperties: [
                    "name",
                    "email",
                    "contact",
                    "register_date",
                    "hno",
                    "street",
                    "city",
                    "pincode",
                    "state",
                    "license",
                    "isVerified",
                ],
                editProperties: ["isVerified"],
                properties: {
                    password: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    hno: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    street: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    city: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    pincode: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    state: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    license: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        },
                    },
                    profile_pic: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    liked_posts: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    notifs: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    messages: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    unread_messages: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    num_unread_messages: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                    applied_posts: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        },
                    },
                },
            },
        },
    ],
    rootPath: "/admin",
});

const ADMIN = {
    email: config.get("admin-email"),
    password: config.get("admin-password"),
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
    cookiePassword:
        process.env.ADMIN_COOKIE_PASS ||
        "super-long-admin-cookie-password-for-fetch",
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    },
});

module.exports = router;
