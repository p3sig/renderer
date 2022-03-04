export interface Context
{
    readonly device: any;
    size: { x: number, y: number };
}

export interface Engine
{
    readonly context: Context;

    program(name: string | Program): Program;
    texture(name: string | Texture): Texture;
    pipeline(name: string | Pipeline): Pipeline;

    render(pipeline: string | Pipeline): void;
}

export interface Resource
{
    readonly engine: Engine;
    readonly name: string;
}

export interface Program extends Resource
{
    add_shader(
        vert: Shader<Shader_Kind.vertex>,
        frag: Shader<Shader_Kind.fragment>,
    ): Program;
}

export enum Shader_Kind
{
    vertex,
    fragment,
}

export interface Shader<Shader_Kind> extends Resource
{
}

export interface Texture extends Resource
{
}

export interface Pipeline extends Resource
{

}
