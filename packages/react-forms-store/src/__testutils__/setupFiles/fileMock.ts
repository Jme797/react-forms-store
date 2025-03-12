// @ts-expect-error Jest Mock.
// eslint-disable-next-line no-undef
global.File = class MockFile {
    parts: BlobPart[];
    filename: string;
    properties: FilePropertyBag;

    constructor(
        parts: BlobPart[],
        filename: string,
        properties: FilePropertyBag
    ) {
        this.parts = parts;
        this.filename = filename;
        this.properties = properties;
    }

    get name() {
        return this.filename;
    }

    get type() {
        return this.properties.type;
    }
};
