import * as iface from "./engine";
import { Resource_Storage } from "./helper";

export default function make_p3rr_engine(canvas: HTMLCanvasElement): iface.Engine
{
    const context = new WebGL2_Context_From_Canvas(canvas);
    const engine = new Engine(context);
    return engine;
}

export class WebGL2_Context_From_Canvas implements iface.Context
{
    readonly device: WebGL2RenderingContext;
    size: { x: number, y: number };

    constructor(canvas: HTMLCanvasElement)
    {
        const device = canvas.getContext("webgl2");
        if (device === null)
            throw "no webgl2.";

        this.device = device;
        this.size = { x: canvas.width, y: canvas.height };
    }
}

export class Engine implements iface.Engine
{
    readonly context: iface.Context;

    private program_storage = new Resource_Storage(this, Program);
    private texture_storage = new Resource_Storage(this, Texture);
    private pipeline_storage = new Resource_Storage(this, Pipeline);

    constructor(context: iface.Context)
    {
        this.context = context;
    }

    program(name: string | iface.Program): iface.Program
    {
        return this.program_storage.pass_or_get_or_new(name);
    }

    texture(name: string | iface.Texture): iface.Texture
    {
        return this.texture_storage.pass_or_get_or_new(name);
    }

    pipeline(name: string | iface.Pipeline): iface.Pipeline
    {
        return this.pipeline_storage.pass_or_get_or_new(name);
    }

    render(pipeline: string | iface.Pipeline): void
    {
        const ppl = this.pipeline(pipeline);
        // TODO
    }
}

class Program implements iface.Program
{
    readonly engine: iface.Engine;
    readonly name: string;

    constructor(engine: iface.Engine, name: string)
    {
        this.engine = engine;
        this.name = name;
    }

    add_shader(
        vert: iface.Shader<iface.Shader_Kind.vertex>,
        frag: iface.Shader<iface.Shader_Kind.fragment>,
    ): Program
    {
        // TODO
        return this;
    }
}

class Texture implements iface.Texture
{
    readonly engine: iface.Engine;
    readonly name: string;

    constructor(engine: iface.Engine, name: string)
    {
        this.engine = engine;
        this.name = name;
    }
}

class Pipeline implements iface.Pipeline
{
    readonly engine: iface.Engine;
    readonly name: string;

    constructor(engine: iface.Engine, name: string)
    {
        this.engine = engine;
        this.name = name;
    }
}
