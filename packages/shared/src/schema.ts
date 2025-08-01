/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/product/{category}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductsController_paginateProducts"];
        put?: never;
        post: operations["ProductsController_createProduct"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/product/{category}/{productId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ProductsController_getProduct"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["ProductsController_updateProduct"];
        trace?: never;
    };
    "/product/{productId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["ProductsController_deleteProduct"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/token/access": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AdminController_tokenAccess"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/token/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AdminController_tokenRefresh"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AdminController_registerAdmin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AdminController_postLoginEmail"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminController_postLogout"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminController_deleteAdmin"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/common/asset/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["CommonController_upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/common/asset/upload-multiple": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["CommonController_uploadMultiple"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/common/asset/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["CommonController_deleteFileByUrl"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ContactController_getContacts"];
        put?: never;
        post: operations["ContactController_createContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["ContactController_deleteContact"];
        options?: never;
        head?: never;
        patch: operations["ContactController_readContact"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BaseCameraDto: {
            /** @enum {string} */
            interface: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            /** @enum {string} */
            type: "AREA" | "LINE";
            /** @enum {string} */
            color: "MONO" | "COLOR";
            /** @enum {string} */
            maker: "CREVIS" | "VIEWORKS" | "BASLER" | "HIK" | "HUARAY" | "JAI";
            resolutionX: number;
            resolutionY: number;
            speed: number;
            pixelSize?: number;
            formatSize: string;
            mountType: string;
            sensor: string;
        };
        CreateImageDto: {
            order: number;
            /** @enum {string} */
            type: "SPEC" | "PRODUCT";
            /** Format: uri */
            path: string;
        };
        CreateCameraProductDto: {
            camera: components["schemas"]["BaseCameraDto"];
            name: string;
            mainFeature: string;
            /** Format: uri */
            datasheetUrl?: string;
            /** Format: uri */
            drawingUrl?: string;
            /** Format: uri */
            manualUrl?: string;
            images: components["schemas"]["CreateImageDto"][];
        };
        BaseFrameGrabberDto: {
            /** @enum {string} */
            interface: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            /** @enum {string} */
            maker: "MATROX" | "EURESYS" | "ADLINK" | "BASLER";
            memory: number;
            pcSlot: string;
            connector: string;
        };
        CreateFrameGrabberProductDto: {
            frameGrabber: components["schemas"]["BaseFrameGrabberDto"];
            name: string;
            mainFeature: string;
            /** Format: uri */
            datasheetUrl?: string;
            /** Format: uri */
            drawingUrl?: string;
            /** Format: uri */
            manualUrl?: string;
            images: components["schemas"]["CreateImageDto"][];
        };
        BaseLensDto: {
            /** @enum {string} */
            type: "CCTV" | "TCL";
            /** @enum {string} */
            mount: "C" | "CS" | "F" | "M";
            maker: string;
            resolution: number;
            numericAperture: string;
            fNumnber: string;
            focalLength: number;
            formatSize: number;
        };
        CreateLensProductDto: {
            lens: components["schemas"]["BaseLensDto"];
            name: string;
            mainFeature: string;
            /** Format: uri */
            datasheetUrl?: string;
            /** Format: uri */
            drawingUrl?: string;
            /** Format: uri */
            manualUrl?: string;
            images: components["schemas"]["CreateImageDto"][];
        };
        BaseSoftwareDto: {
            /** @enum {string} */
            maker: "MATROX" | "EURESYS";
        };
        CreateSoftwareProductDto: {
            software: components["schemas"]["BaseSoftwareDto"];
            name: string;
            mainFeature: string;
            /** Format: uri */
            datasheetUrl?: string;
            /** Format: uri */
            drawingUrl?: string;
            /** Format: uri */
            manualUrl?: string;
            images: components["schemas"]["CreateImageDto"][];
        };
        BaseLightDto: {
            /** Format: uri */
            catalogUrl: string;
        };
        CreateLightProductDto: {
            light: components["schemas"]["BaseLightDto"];
        };
        CameraModel: {
            id: number;
            product: components["schemas"]["ProductModel"];
            /** @enum {string} */
            interface: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            /** @enum {string} */
            type: "AREA" | "LINE";
            /** @enum {string} */
            color: "MONO" | "COLOR";
            /** @enum {string} */
            maker: "CREVIS" | "VIEWORKS" | "BASLER" | "HIK" | "HUARAY" | "JAI";
            resolutionX: number;
            resolutionY: number;
            speed: number;
            pixelSize?: number;
            formatSize: string;
            mountType: string;
            sensor: string;
        };
        LensModel: {
            id: number;
            product: components["schemas"]["ProductModel"];
            /** @enum {string} */
            type: "CCTV" | "TCL";
            /** @enum {string} */
            mount: "C" | "CS" | "F" | "M";
            maker: string;
            resolution: number;
            numericAperture: string;
            fNumnber: string;
            focalLength: number;
            formatSize: number;
        };
        FrameGrabberModel: {
            id: number;
            product: components["schemas"]["ProductModel"];
            /** @enum {string} */
            maker: "MATROX" | "EURESYS" | "ADLINK" | "BASLER";
            /** @enum {string} */
            interface: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            pcSlot: string;
            connector: string;
            memory: number;
        };
        SoftwareModel: {
            id: number;
            product: components["schemas"]["ProductModel"];
            /** @enum {string} */
            maker: "MATROX" | "EURESYS";
        };
        LightModel: {
            id: number;
            catalogUrl: string;
            product: components["schemas"]["ProductModel"];
        };
        ProductModel: {
            /** @enum {string} */
            categories: "SOFTWARE" | "FRAMEGRABBER" | "CAMERA" | "LENS" | "LIGHT";
            name: string;
            mainFeature: string;
            datasheetUrl: string;
            drawingUrl: string;
            manualUrl: string;
            images: components["schemas"]["ImageModel"][];
            camera?: components["schemas"]["CameraModel"];
            lens?: components["schemas"]["LensModel"];
            frameGrabber?: components["schemas"]["FrameGrabberModel"];
            software?: components["schemas"]["SoftwareModel"];
            light?: components["schemas"]["LightModel"];
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        ImageModel: {
            order: number;
            /** @enum {string} */
            type: "SPEC" | "PRODUCT";
            path: string;
            product?: components["schemas"]["ProductModel"];
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        UpdateCameraDto: {
            id: number;
        };
        UpdateImageDto: Record<string, never>;
        UpdateCameraProductDto: {
            camera?: components["schemas"]["UpdateCameraDto"];
            id: number;
            images?: components["schemas"]["UpdateImageDto"][];
        };
        UpdateFrameGrabberDto: {
            id: number;
        };
        UpdateFrameGrabberProductDto: {
            frameGrabber?: components["schemas"]["UpdateFrameGrabberDto"];
            id: number;
            images?: components["schemas"]["UpdateImageDto"][];
        };
        UpdateLensDto: {
            id: number;
        };
        UpdateLensProductDto: {
            lens?: components["schemas"]["UpdateLensDto"];
            id: number;
            images?: components["schemas"]["UpdateImageDto"][];
        };
        UpdateSoftwareDto: Record<string, never>;
        UpdateSoftwareProductDto: {
            software?: components["schemas"]["UpdateSoftwareDto"];
            id: number;
            images?: components["schemas"]["UpdateImageDto"][];
        };
        UpdateLightDto: {
            id: number;
        };
        UpdateLightProductDto: {
            light?: components["schemas"]["UpdateLightDto"];
        };
        PaginateCameraDto: {
            /** @enum {string} */
            camera__maker__equal?: "CREVIS" | "VIEWORKS" | "BASLER" | "HIK" | "HUARAY" | "JAI";
            _camera__resolution__between?: string[];
            camera__speed__between?: string[];
            /** @enum {string} */
            camera__interface__equal?: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            /** @enum {string} */
            camera__type__equal?: "AREA" | "LINE";
            where__name__i_like?: string;
            /** @enum {string} */
            order__name?: "ASC" | "DESC";
            /** @enum {string} */
            order__createdAt?: "ASC" | "DESC";
            /** @enum {string} */
            order__id?: "ASC" | "DESC";
            /** @default 1 */
            page: number;
            /** @default 10 */
            take: number;
        };
        PaginateLensDto: {
            /**
             * @default CCTV
             * @enum {string}
             */
            lens__type__equal: "CCTV" | "TCL";
            /** @enum {string} */
            lens__mount__equal?: "C" | "CS" | "F" | "M";
            lens__focalLength__between?: string[];
            lens__formatSize__between?: string[];
            where__name__i_like?: string;
            /** @enum {string} */
            order__name?: "ASC" | "DESC";
            /** @enum {string} */
            order__createdAt?: "ASC" | "DESC";
            /** @enum {string} */
            order__id?: "ASC" | "DESC";
            /** @default 1 */
            page: number;
            /** @default 10 */
            take: number;
        };
        PaginateFrameGrabberDto: {
            /** @enum {string} */
            frameGrabber__maker__equal: "MATROX" | "EURESYS" | "ADLINK" | "BASLER";
            /** @enum {string} */
            frameGrabber__interface__equal: "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";
            where__name__i_like?: string;
            /** @enum {string} */
            order__name?: "ASC" | "DESC";
            /** @enum {string} */
            order__createdAt?: "ASC" | "DESC";
            /** @enum {string} */
            order__id?: "ASC" | "DESC";
            /** @default 1 */
            page: number;
            /** @default 10 */
            take: number;
        };
        PaginateSoftwareDto: {
            /** @enum {string} */
            software__maker__equal?: "MATROX" | "EURESYS";
            where__name__i_like?: string;
            /** @enum {string} */
            order__name?: "ASC" | "DESC";
            /** @enum {string} */
            order__createdAt?: "ASC" | "DESC";
            /** @enum {string} */
            order__id?: "ASC" | "DESC";
            /** @default 1 */
            page: number;
            /** @default 10 */
            take: number;
        };
        PaginateLightDto: {
            where__name__i_like?: string;
            /** @enum {string} */
            order__name?: "ASC" | "DESC";
            /** @enum {string} */
            order__createdAt?: "ASC" | "DESC";
            /** @enum {string} */
            order__id?: "ASC" | "DESC";
            /** @default 1 */
            page: number;
            /** @default 10 */
            take: number;
        };
        RegisterAdminDto: {
            /** Format: email */
            email: string;
            password: string;
            name: string;
            /**
             * @default ADMIN
             * @enum {string}
             */
            role: "SUPER" | "ADMIN" | "EDITOR";
        };
        LogModel: {
            /** @enum {string} */
            action: "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "VIEW_CONTACT" | "DELECT_CONTACT" | "CREATE_ADMIN" | "UPDATE_ADMIN" | "DELETE_ADMIN";
            path: string;
            admin: components["schemas"]["AdminModel"];
            target: string | null;
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        AdminModel: {
            session?: components["schemas"]["SessionModel"];
            /** @enum {string} */
            role: "SUPER" | "ADMIN" | "EDITOR";
            email: string;
            password: string;
            name: string;
            log?: components["schemas"]["LogModel"];
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        SessionModel: {
            admin: components["schemas"]["AdminModel"];
            token: string;
            /** Format: date-time */
            expiresAt: string;
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
        CreateContactDto: {
            name: string;
            company?: string;
            /** Format: email */
            email: string;
            subject?: string;
            message: string;
            /** @default false */
            isRead: boolean;
        };
        ContactModel: {
            name: string;
            company: string;
            email: string;
            subject: string;
            message: string;
            isRead: boolean;
            id: number;
            /** Format: date-time */
            updatedAt: string;
            /** Format: date-time */
            createdAt: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    ProductsController_paginateProducts: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                category: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ProductsController_createProduct: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductModel"];
                };
            };
        };
    };
    ProductsController_getProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: number;
                category: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductModel"];
                };
            };
        };
    };
    ProductsController_updateProduct: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductModel"];
                };
            };
        };
    };
    ProductsController_deleteProduct: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                productId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AdminController_tokenAccess: {
        parameters: {
            query?: never;
            header: {
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    AdminController_tokenRefresh: {
        parameters: {
            query?: never;
            header: {
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    AdminController_registerAdmin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterAdminDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminModel"];
                };
            };
        };
    };
    AdminController_postLoginEmail: {
        parameters: {
            query?: never;
            header: {
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    AdminController_postLogout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AdminController_deleteAdmin: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CommonController_upload: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CommonController_uploadMultiple: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CommonController_deleteFileByUrl: {
        parameters: {
            query: {
                url: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ContactController_getContacts: {
        parameters: {
            query: {
                where__name__i_like?: string;
                where__email__i_like?: string;
                where__subject__i_like?: string;
                where__company__i_like?: string;
                order__createdAt: "ASC" | "DESC";
                page: number;
                take: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ContactController_createContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateContactDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ContactController_deleteContact: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ContactController_readContact: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContactModel"];
                };
            };
        };
    };
}
