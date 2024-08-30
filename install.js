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
    "method": "shell.run",
    "params": {
      "path": "app/backend",
      "message": [
        "{{path.resolve(cwd, 'app/backend/conda_env/python')}} --version",
        "{{path.resolve(cwd, 'app/backend/conda_env/python')}} -m venv env"
      ]
    }
  }, {
    "method": "shell.run",
    "params": {
      "message": [
        "npm i",
        "npm run build"
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
