class Svgify {
    private path: string = "assets/icons";
    private version: number = 1;
    private currentVersion: number;
    private loadingMSG: string | Element = "";
    private errorMSG: string | Element = "";
    private FetchIcon: (Icon_Path: string) => Promise<Response> = (
        Icon_Path: string
    ) => {
        return fetch(Icon_Path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    private requestIDX: Record<string, number> = {};
    private FetchingList: Record<string, Promise<Response>> = {};

    constructor(settings: {
        path?: string;
        version?: number;
        FetchIcon?: (Icon_Path: string) => Promise<Response>;
        loadingMSG?: string | Element;
        errorMSG?: string | Element;
    }) {
        if (settings?.path) this.path = settings.path;
        if (settings?.version) this.version = settings.version;
        if (settings?.FetchIcon) this.FetchIcon = settings.FetchIcon;
        if (settings?.loadingMSG) this.loadingMSG = settings.loadingMSG;
        if (settings?.errorMSG) this.errorMSG = settings.errorMSG;

        this.currentVersion =
            Number(localStorage.getItem("svgify_cached_version")) || -1;

        if (this.currentVersion === -1) {
            localStorage.setItem(
                "svgify_cached_version",
                this.version.toString()
            );
            this.currentVersion = this.version;
        } else if (this.currentVersion !== this.version) {
            localStorage.clear();
            localStorage.setItem(
                "svgify_cached_version",
                this.version.toString()
            );
            this.currentVersion = this.version;
        }

        this.init();
    }

    private init() {
        const SVG_ELEMENTS = document.querySelectorAll("i.svgify");
        if (SVG_ELEMENTS?.length > 0) {
            SVG_ELEMENTS.forEach((element: Element) => {
                const fontWeight =
                    element.getAttribute("data-font-weight") || "fill";
                const fw =
                    fontWeight === "fill"
                        ? "svg_modifier_style_fill"
                        : fontWeight === "stroke"
                        ? "svg_modifier_style_stroke"
                        : "svg_modifier_style_both";

                element.classList.add("svg_modifier_style", fw);
                element.innerHTML = "" + this.loadingMSG;

                this.InitSvgIcon(element);
            });
        }
    }

    private async InitSvgIcon(element: Element) {
        let icon = element.getAttribute("data-icon");

        if (!icon) {
            console.error("Invalid Icon Name");
            element.innerHTML = "" + this.errorMSG;
            return;
        }

        icon = "" + icon;
        const scale = element.getAttribute("data-scale") || 1;

        let svg = localStorage.getItem(`svgify_${this.version}_${icon}`);

        if (!svg) {
            const response = await this.FetchIconData(icon);
            // Await the text content of the response
            const svgData = await response.text();

            if (svgData.match(/<html/g)) {
                element.innerHTML = "" + this.errorMSG;
                throw new Error("Invalid SVG format");
            }

            svg = this.modifyNewSvgProps("" + svgData, icon);

            // Optionally, store the SVG data in localStorage
            localStorage.setItem(`svgify_${this.version}_${icon}`, svg);
        }

        svg = this.calculateSizeRatios(svg, Number(scale));

        element.innerHTML = svg;
    }

    private modifyNewSvgProps(svg: string, IconName: string) {
        if (svg.match(/<html/g)) {
            throw new Error("Invalid SVG format");
        }

        svg = svg.replace(/fill="[^"]*"/g, "").replace(/stroke="[^"]*"/g, "");

        try {
            localStorage.setItem(
                `svgify_${this.version}_${IconName}`,
                JSON.stringify(svg)
            );
        } catch (e) {
            if (e instanceof DOMException && e.code === 22) {
                console.warn("Storage quota exceeded, clearing storage...");
                localStorage.clear();
            } else {
                throw e; // If it's not a quota error, rethrow it
            }
        }

        return svg;
    }

    private calculateSizeRatios(svg: string, Scale: number) {
        // Calculate aspect ratio
        const widthMatch = svg.match(/width="(\d+(\.\d+)?(px|em|rem|%)?)"/);
        const heightMatch = svg.match(/height="(\d+(\.\d+)?(px|em|rem|%)?)"/);
        let aspectRatio = 1;

        if (widthMatch && heightMatch) {
            const originalWidth = parseFloat(widthMatch[1]);
            const originalHeight = parseFloat(heightMatch[1]);
            aspectRatio = originalHeight / originalWidth;
        } else {
            // Add default width and height if missing
            if (!widthMatch) svg = svg.replace("<svg", `<svg width="1em"`);
            if (!heightMatch) svg = svg.replace("<svg", `<svg height="1em"`);
        }

        // Adjust dimensions based on Scale prop
        svg = svg.replace(
            /height="[^"]*"/,
            `height="${Scale * 1.5 * aspectRatio}em"`
        );

        return svg.replace(/width="[^"]*"/, `width="${Scale * 1.5}em"`);
    }

    private FetchIconData: (
        IconName: string,
        timed?: boolean
    ) => Promise<Response> = async (
        IconName: string,
        timed: boolean = false
    ) => {
        let returnValue: Promise<Response>;

        try {
            if (Object.keys(this.FetchingList).includes(IconName)) {
                returnValue = this.FetchingList[IconName];
            } else if (!timed) {
                const idx = this.requestIDX[IconName] + 1 || 0;
                if (idx === 0) {
                    this.requestIDX[IconName] = idx;
                }
                returnValue = new Promise((resolve) => {
                    setTimeout(
                        async () => {
                            const result = await this.FetchIconData(
                                IconName,
                                true
                            );
                            resolve(result);
                        },
                        idx === 0 ? 0 : 5
                    );
                });
            } else {
                const iconPath = `${this.path}/${IconName}.svg`;
                const request = this.FetchIcon(iconPath);
                this.FetchingList[IconName] = request;
                returnValue = request;
            }
        } catch (error) {
            console.error(`Error fetching icon ${IconName}`);
            throw error;
        }

        return returnValue;
    };
}

export default Svgify;
