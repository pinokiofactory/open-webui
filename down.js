module.exports = {
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "ollama pull {{args.id}}"
    }
  }, {
    "method": "input",
    "params": { "title": "Download Finished", "description": "Go back to the dashboard and launch the app!" }
  }]
}
