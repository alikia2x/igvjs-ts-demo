declare module 'igv' {
    interface GenomeFrag {
        genome: string;
        reference?: never;
    }
    interface ReferenceFrag {
        reference: ReferenceGenome;
        genome?: never;
    }
    type GenomeOpt = GenomeFrag | ReferenceFrag;
    export interface ReferenceGenome {
        id?: string;
        name?: string;
        fastaURL: string;
        indexURL?: string;
        cytobandURL?: string;
        headers?: Map<string, string>;
    }
    interface CreateOptExtras {
        locus?: string | string[];
    }

    export type CreateOpt = GenomeOpt & CreateOptExtras;

    class _Browser {
        toSVG(): string;
    }

    export type Browser = _Browser;

    type CreateBrowser = (div: HTMLElement, options: CreateOpt) => Promise<Browser>;

    export type IGV = {
        createBrowser: CreateBrowser;
    }

    const igv: IGV;
    export default igv;

}