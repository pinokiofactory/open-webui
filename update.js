module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      venv_python: "3.11",
      path: "app",
      message: [
        "uv pip install open-webui -U"
      ]
    }
  }]
}
