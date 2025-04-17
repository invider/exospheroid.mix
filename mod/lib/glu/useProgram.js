function useProgram(glProg) {
    gl.useProgram(glProg.glRef)
    gl.curProgram = glProg
}
