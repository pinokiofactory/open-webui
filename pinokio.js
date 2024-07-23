const path = require('path')
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
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "backend", "env")
    let running = await kernel.running(__dirname, "start.js")
    let updating = await kernel.running(__dirname, "update.js")
    let resetting = await kernel.running(__dirname, "reset.js")
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
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
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
          icon: 'fa-solid fa-plug',
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
        if (kernel.jsdom) {
          let JSDOM = kernel.jsdom.JSDOM
          let names = []
          try {
            let dom = await JSDOM.fromURL("https://ollama.com/library")
            let els = dom.window.document.querySelectorAll("#repo li a")
            let urls = []
            for(let el of els) {
              urls.push(el.href)
              names.push(new URL(el.href).pathname.split("/").filter(x => x)[1])
            }
            console.log("names", names)
          } catch (e) {
          }
        }
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: names.map((name) => {
            return {
              icon: "fa-solid fa-circle-down",
              text: name,
              href: "down.json",
              params: {
                name
              }
            }
          })
        }, {
          icon: "fa-solid fa-arrows-update",
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
        }])
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
