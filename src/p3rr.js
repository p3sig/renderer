// @ts-check

(function () {
    const p3rr = {};
    this.p3rr = p3rr;

    class Clazz
    {
        static create_resource(namespace_clazz, name, resource_clazz, ...args)
        {
            let obj = {};
            obj.__proto__ = resource_clazz.prototype;
            obj._name = name;
            obj._from = namespace_clazz;
            resource_clazz.constructor().apply(obj, args);
            return obj;
        }

        static add_resource(namespace_clazz, constructor_name, resource_clazz)
        {
            const storage_name = '_resource_storage';
            const storage = new Map();

            namespace_clazz[storage_name] ||= {};
            namespace_clazz[storage_name][constructor_name] = storage;

            namespace_clazz[constructor_name] = function new_resource(name, ...args) {
                if (typeof name === 'string' || name instanceof String) {
                    let obj = storage.get(name);
                    if (obj === undefined) {
                        obj = {};
                        obj.__proto__ = resource_clazz.prototype;
                        obj._name = name;
                        obj._from = namespace_clazz;
                        resource_clazz.constructor().apply(obj, args);
                        storage.set(name, obj);
                    }
                    return obj;
                }

                if (name instanceof resource_clazz) {
                    return name;
                }

                console.log(`Not a ${constructor_name} or a string name: `, name);
                throw `Bad coercion`;
            };
        };

        static as_read_only(obj)
        {
            // TODO
            return obj;
        };
    };

    class Resource_Descriptor
    {
        constructor()
        {
            this.reset();
        }

        reset()
        {
            this.force_dirty();
            this._native_resource = null;
            this._config = null;
        }

        force_dirty()
        {
            this._dirty = true;
        }

        native_resource()
        {
            if (this._dirty) {
                this._do_destroy_native_resource(this._native_resource);
                this._native_resource = this._do_create_native_resource();
            }
            return this._native_resource;
        }

        config()
        {
            if (this._config === null) {
                this._config = this._do_create_default_config();
                this.force_dirty();
            }
            return Clazz.as_read_only(this._config);
        }

        mutable_config()
        {
            if (this._config === null) {
                this._config = this._do_create_default_config();
            }
            this.force_dirty();
            return this._config;
        }

        _do_create_default_config() { throw "abstract"; }
        _do_create_native_resource() { throw "abstract"; }
        _do_destroy_native_resource(maybe_resource) { throw "abstract"; }
    };

    class Shader extends Resource_Descriptor
    {
        constructor()
        {
            super();
            this._ctx = this._from._ctx;

            this._kind_to_gl = new Map;
            this._kind_to_gl.set('vertex', this._ctx.VERTEX_SHADER);
            this._kind_to_gl.set('fragment', this._ctx.FRAGMENT_SHADER);
        }

        _do_create_default_config()
        {
            return {
                kind: 'vertex',
                source: '',
            };
        }

        _do_create_native_resource()
        {
            const ctx = this._ctx;
            const cfg = this.config();
            const shader = ctx.createShader(this._kind_to_gl.get(cfg.kind));
            ctx.shaderSource(shader, cfg.source);
            ctx.compileShader(shader);
            return shader;
        }

        _do_destroy_native_resource(maybe_resource)
        {
            // Nothing to do.
        }
    };
    window.Shader = Shader;

    class Program extends Resource_Descriptor
    {
        shader(kind, source)
        {
            const s = Clazz.create_resource(this, '', Shader);
            const cfg = s.mutable_config();
            cfg.kind = kind;
            cfg.source = source;
            s.native_resource(); // TODO
        }
    };

    class Texture
    {
    };

    class Pipeline
    {
    };

    class Engine
    {
        constructor(canvas)
        {
            Clazz.add_resource(this, 'program', Program);
            Clazz.add_resource(this, 'texture', Texture);
            Clazz.add_resource(this, 'pipeline', Pipeline);

            this._ctx = canvas.getContext('webgl2');
        }
    };

    p3rr.Engine = Engine;
}).call(this);

