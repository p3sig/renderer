import * as iface from "./engine";

type Resource_Clazz<T> = { new(engine: iface.Engine, name: string): T };

export class Resource_Storage<T extends iface.Resource>
{
    private storage: Map<string, T> = new Map();
    private engine: iface.Engine;
    private clazz: Resource_Clazz<T>;

    constructor(engine: iface.Engine, clazz: Resource_Clazz<T>)
    {
        this.engine = engine;
        this.clazz = clazz;
    }

    get_or_new(name: string): T
    {
        let result = this.storage.get(name);
        if (result === undefined) {
            result = new this.clazz(this.engine, name);
            this.storage.set(name, result);
        }
        return result;
    }

    pass_or_get_or_new(name: string | T): T
    {
        if (typeof name === 'string')
            return this.get_or_new(name);
        return name;
    }
};
