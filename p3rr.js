'use strict';

(function () {
    const p3rr = {};
    this.p3rr = p3rr;

    class Clazz
    {
        static add_resource(namespace_clazz, constructor_name, resource_clazz)
        {
            const storage_name = `_resource_storage`;
            const storage = new Map();

            namespace_clazz[storage_name] ||= {};
            namespace_clazz[storage_name][constructor_name] = storage;

            namespace_clazz[constructor_name] = function new_resource(name, ...args) {
                if (typeof name === 'string' || name instanceof String) {
                    let obj = storage.get(name);
                    if (obj === undefined) {
                        obj = {};
                        obj.__proto__ = resource_clazz.prototype;
                        resource_clazz.constructor().apply(obj, args);
                        obj._name = name;
                        obj._from = namespace_clazz;
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
    };

    class Program
    {
    };

    class Texture
    {
    };

    class Pipeline
    {
    };

    class Engine
    {
        constructor()
        {
            Clazz.add_resource(this, 'program', Program);
            Clazz.add_resource(this, 'texture', Texture);
            Clazz.add_resource(this, 'pipeline', Pipeline);
        }
    };

    p3rr.Engine = Engine;
}).call(this);

