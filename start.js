module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": `open-webui serve --port 42004 --host 127.0.0.1`,
        //"on": [{ "event": "/http://[0-9.:]+/", "done": true }]
        "on": [{ "event": "/Started server process/i", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": `http://127.0.0.1:42004`
      }
    }]
  }
}
