/// Mathematical Stack

export class Head
{
    push(x: Node): Head
    {
        x.next = this.top;
        this.top = x;
        this.size++;
        return this;
    }

    pop(): Head
    {
        if (this.top !== null) {
            this.top = this.top.next;
            this.size--;
        }
        return this;
    }

    pop_for(): Node | null
    {
        if (this.top !== null) {
            const result = this.top;
            this.top = this.top.next;
            this.size--;
            return result;
        }
        return null;
    }

    push_vec4(x: number, y: number, z: number, w: number): Head
    {
        this.push(new Vector4(x, y, z, w));
        return this;
    }
    
    make_mat4(): Head
    {
        const w = this.pop_for() as Vector4;
        const z = this.pop_for() as Vector4;
        const y = this.pop_for() as Vector4;
        const x = this.pop_for() as Vector4;
        return this.push(new Matrix4(x, y, z, w));
    }

    private size: number = 0;
    private top: Node | null = null;
}

interface Node
{
    next: Node | null,
}

class Vector4 implements Node
{
    x: number;
    y: number;
    z: number;
    w: number;
    next = null;

    constructor(x: number, y: number, z: number, w: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

class Matrix4 implements Node
{
    x: Vector4;
    y: Vector4;
    z: Vector4;
    w: Vector4;
    next = null;

    constructor(x: Vector4, y: Vector4, z: Vector4, w: Vector4)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
