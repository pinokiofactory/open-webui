module.exports = {
  "run": [{
    "method": "shell.run",
    "params": {
      "venv": "env",
      "venv_python": "3.11",
      "path": "app/backend",
      "message": [
        "uv pip install open-webui"
      ]
    }
//  }, {
//    "method": "fs.link",
//    "params": {
//      "venv": "app/backend/env"
//    }
  }]
}
