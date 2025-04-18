function useProgram(glProg) {
    gl.useProgram(glProg.glRef)
    gl.curProg = glProg
}
