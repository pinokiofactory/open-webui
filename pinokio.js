const path = require('path')
const models = require("./models")
module.exports = {
  version: "2.0",
  title: "Open WebUI",
  description: "User-friendly WebUI for LLMs, supported LLM runners include Ollama and OpenAI-compatible APIs https://github.com/open-webui/open-webui",
  icon: "icon.png",
  pre: [{
    icon: "ollama.png",
    title: "Ollama",
    description: "Get up and running with large language models.",
    href: "https://ollama.com/"
  }],
  menu: async (kernel, info) => {
    let installing = info.running("install.js")
    let installed = info.exists("app/env")
    let running = info.running("start.js")
    let updating = info.running("update.js")
    let resetting = info.running("reset.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          let o = [{
//            default: true,
            popout: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }, {
            icon: "fa-solid fa-download",
            text: "Download Models",
            menu: models.map((model) => {
              return {
                icon: "fa-solid fa-circle-down",
                text: model.name,
                menu: model.models.map((m) => {
                  return {
                    icon: "fa-solid fa-circle-down",
                    text: `${m.id} (${m.size})`,
                    href: "down.js",
                    params: {
                      id: m.id
                    }
                  }
                })
              }
            })
          }]
          return o
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (updating) {
        return [{
          default: true,
          icon: 'fa-solid fa-arrows-rotate',
          text: "Updating...",
          href: "update.js",
        }]
      } else if (resetting) {
        return [{
          default: true,
          icon: 'fa-solid fa-broom',
          text: "Resetting...",
          href: "reset.js",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: models.map((model) => {
            return {
              icon: "fa-solid fa-circle-down",
              text: model.name,
              menu: model.models.map((m) => {
                return {
                  icon: "fa-solid fa-circle-down",
                  text: `${m.id} (${m.size})`,
                  href: "down.js",
                  params: {
                    id: m.id
                  }
                }
              })
            }
          })
        }, {
          icon: "fa-solid fa-arrows-rotate",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
