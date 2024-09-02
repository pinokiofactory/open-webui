module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      conda: {
        path: "backend/conda_env",
      },
      message: [
        "{{path.resolve(cwd, local.node_path, 'node') + ' --version'}}",
        "{{path.resolve(cwd, local.node_path, 'npm') + ' i'}}",
        "{{path.resolve(cwd, local.node_path, 'npm') + ' run build'}}",
      ],
      path: "app"
    }
  }, {
    method: "shell.run",
    params: {
      conda: {
        path: "conda_env",
      },
      message: [
        "pip install -r requirements.txt -U"
      ],
      venv: "env",
      path: "app/backend"
    }
  }]
}
