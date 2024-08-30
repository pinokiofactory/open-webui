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
        "path": "open-webui",
        "python": "python=3.11"
      },
      "path": "app/backend",
      "message": "conda install -y -c conda-forge nodejs=20.12.2"
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
        "path": "open-webui"
      },
      "message": [
        "pip install -r requirements.txt"
      ],
      "venv": "env",
      "path": "app/backend"
    }
  }, {
    "method": "fs.link",
    "params": {
      "venv": "app/backend/env"
    }
  }]
}
