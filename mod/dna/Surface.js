// Surface combines the geometry mesh data and materials to create
// a renderable surface

let id = 0

class Surface {

    constructor(st) {
        extend(this, {
            name: 'surface' + (++id),
            rO: vec4(1, 0, 0, 0), // render options
            buf: {},
        }, st)

        if (!st.m && st.geo.m) {
            this.m = st.geo.m
        }

        // create buffers
        let cb = (d) => {
            if (d) {
                const b = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, b)
                gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW)
                return b
            }
        }
        for (let bname of this.geo.BUFFERS) {
            this.buf[bname] = cb(this.geo[bname])
        }
        //this.buf.v = this.createBuffer(this.geo.v)
        //this.buf.n = this.createBuffer(this.geo.n)
        //this.buf.w = this.createBuffer(this.geo.w)
        //this.buf.c = this.createBuffer(this.geo.c)
        //this.buf.u = this.createBuffer(this.geo.u)
        //this.buf.f = this.createBuffer(this.geo.f, gl.ELEMENT_ARRAY_BUFFER)
    }

    bindAttribute(buf, name, n) {
        if (!buf) return
        const _attr = gl.getAttribLocation(gl.curProg.glRef, name)
        gl.enableVertexAttribArray(_attr)
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.vertexAttribPointer(_attr, n || 3, gl.FLOAT, false, 0, 0)
    }

    draw() {
        const uloc = gl.curProg.uloc,
              aloc = gl.curProg.aloc
        // adjust to the world coordinates

        // set current model matrix
        gl.uniformMatrix4fv(uloc.uModelMatrix, false, glu.modelMatrix)

        // calculate the normal matrix out of the model one (=> invert => transpose)
        mat4.copy(glu.invMatrix, glu.modelMatrix)
        mat4.invert(glu.invMatrix)
        mat4.transpose(glu.normalMatrix, glu.invMatrix)
        gl.uniformMatrix4fv(uloc.uNormalMatrix, false, glu.normalMatrix)

        // rendering options
        if (this.tex) this.rO[2] = 1
        gl.uniform4fv(uloc.uOpt, this.rO)

        // -------------------------------------
        // bind our geometry and materials

// uDirLightColor
// uFogColor
// uPointLightColors
// uMatAmbient
// uMatDiffuse
// uMatSpecular
// uCamPos
// uDirLightVec
// uPointLights
//
// uSpecularExponent
//
// uTexture
//
        // set the material
        gl.uniform4fv( uloc.uMatAmbient,       this.m.a )
        gl.uniform4fv( uloc.uMatDiffuse,       this.m.d )
        gl.uniform4fv( uloc.uMatSpecular,      this.m.s )
        gl.uniform1f ( uloc.uSpecularExponent, this.m.n )

        if (this.tex) {
            // bind texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.tex);
            gl.uniform1i(uloc.uTexture, 0);
        }

        // aVertPos
        // aVertNorm
        // aVertColor
        // aVertUV

        // set the shader attributes 
        this.bindAttribute(this.buf.vertices, 'aVertPos'  )
        this.bindAttribute(this.buf.normals,  'aVertNorm' )
        this.bindAttribute(this.buf.colors,   'aVertColor')
        this.bindAttribute(this.buf.uvs,      'aVertUV',    2)

        //if (this.rO[1]) {
            // render wireframes
            //gl.lineWidth(2)
            //this.bindAttribute(this.buf.w, 'vp')
            //gl.drawArrays(gl.LINES, 0, this.geo.w.length / 3) 
        //} else if (this.buf.faces) {
            // TODO can't support multiple indexes at once,
            //      so obj models MUST be repacked to be index by a sinlge index array
            //      and multiple data buffers
        //    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buf.faces)
        //    gl.drawElements(gl.TRIANGLES, this.geo.fc, gl.UNSIGNED_SHORT, 0)

            //if (debug) env.stat.polygons += this.geo.fc / 3
        //} else {
            gl.drawArrays(gl.TRIANGLES, 0, this.geo.vertices)
            //if (debug) env.stat.polygons += this.geo.vc / 3
        //}
    }
}
