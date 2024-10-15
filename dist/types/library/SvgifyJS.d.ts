declare class Svgify {
    private path;
    private version;
    private currentVersion;
    private loadingMSG;
    private errorMSG;
    private FetchIcon;
    private requestIDX;
    private FetchingList;
    constructor(settings: {
        path?: string;
        version?: number;
        FetchIcon?: (Icon_Path: string) => Promise<Response>;
        loadingMSG?: string | Element;
        errorMSG?: string | Element;
    });
    private init;
    private InitSvgIcon;
    private modifyNewSvgProps;
    private calculateSizeRatios;
    private FetchIconData;
}
export default Svgify;
