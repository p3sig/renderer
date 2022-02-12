'use strict';

(function (p3rr) {
    const canvas = document.querySelector('canvas');
    const engine = new p3rr.Engine(canvas);

    engine.texture("Just Rendered Image");

    const pipeline = engine.pipeline("Example");

    engine.program("Render 3D")
        .shader('vertex', `
        `)
        .shader('fragment', `
        `)
    ;

    pipeline.pass("Render 3D")
        .output("Just Rendered Image")
        .program("Render 3D")
    ;

    let frame = 0;
    let renderer = document.querySelector('#renderer');
    requestAnimationFrame(function render() {
        const time = frame / 60;
        renderer.render("Example", time);

        frame++;
        requestAnimationFrame(render);
    });
}).call(this, p3rr);

