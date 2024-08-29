module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "method": "shell.run",
      "params": {
        "conda": {
          "path": "open-webui",
        },
        "path": "app/backend",
        "env": {
          PORT,
          HOST: "127.0.0.1"
        },
        "venv": "env",
        "message": "{{platform === 'win32' ? 'start_windows.bat' : 'bash start.sh'}}",
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
