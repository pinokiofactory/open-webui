module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "when": "{{!exists('app/data') && platform === 'win32'}}",
      "method": "fs.copy",
      "params": {
        "src": "app/env/Lib/site-packages/open_webui/data",
        "dest": "app/data",
        "options": { "recursive": true }
      }
    }, {
      "when": "{{!exists('app/data') && platform !== 'win32'}}",
      "method": "fs.copy",
      "params": {
        "src": "app/env/lib/python3.11/site-packages/open_webui/data",
        "dest": "app/data",
        "options": { "recursive": true }
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "env": { "DATA_DIR": "{{path.resolve(cwd, 'app/data')}}" },
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
