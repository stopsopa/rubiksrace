const th = (module) => (msg) => new Error(`rubiks ${module} error: ${msg}`);

export default th;
