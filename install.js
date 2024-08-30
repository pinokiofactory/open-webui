module.exports = {
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://github.com/open-webui/open-webui app"
    }
  }, {
    "method": "fs.copy",
    "params": {
      "src": "app/.env.example",
      "dest": "app/.env"
    }
  }, {
    "method": "shell.run",
    "params": {
      "conda": {
        "path": "conda_env",
        "python": "python=3.11"
      },
      "path": "app/backend",
      "message": [
        "conda install -y -c conda-forge nodejs=20.12.2",
      ]
    }
  }, {
    "method": "local.set",
    "params": {
      "python_path": "{{platform === 'win32' ? 'app/backend/conda_env/python' : 'app/backend/conda_env/bin/python'}}",
      "node_path": "{{platform === 'win32' ? 'app/backend/conda_env' : 'app/backend/conda_env/bin'}}",
    }
  }, {
    "method": "shell.run",
    "params": {
      "path": "app/backend",
      "message": [
        "{{path.resolve(cwd, local.python_path) + ' --version'}}",
        "{{path.resolve(cwd, local.python_path) + ' -m venv env'}}"
      ]
    }
  }, {
    "method": "shell.run",
    "params": {
      "conda": {
        "path": "backend/conda_env",
      },
      "message": [
        "{{path.resolve(cwd, local.node_path, 'node') + ' --version'}}",
        "{{path.resolve(cwd, local.node_path, 'npm') + ' i'}}",
        "{{path.resolve(cwd, local.node_path, 'npm') + ' run build'}}",
      ],
      "path": "app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "conda": {
        "path": "conda_env",
      },
      "message": [
        "pip install -r requirements.txt"
      ],
      "venv": "env",
      "path": "app/backend"
    }
//  }, {
//    "method": "fs.link",
//    "params": {
//      "venv": "app/backend/env"
//    }
  }]
}
