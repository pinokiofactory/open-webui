module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": `open-webui serve --port ${PORT} --host ${HOST}`,
        "on": [{ "event": "/http://[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }]
  }
}
