import * as sc from 'socket.io'
import * as client from 'socket.io-client'
import cp from 'child_process'

export function createServer() {
  let sv = new sc.Server()
  sv.listen(8080)
  sv.on("connection", (socket) => {
    console.log("连接上了")
  })
  sv.on("message", (data) => {
    console.log("收到消息:" + data)
  })
  //fork一个子进行，来运行数据数据采集
  cp.fork(__filename, ["-a"], { env: Object.assign({}, process.env, { "ELECTRON_RUN_AS_NODE": "1" }) })
}

//检查是否有数据服务器，没有就运行一个
export function ensureController() {
  //setTimeOut()
  setTimeout(() => {
    //没有连接上服务器，自己是控制端
    createServer()
  }, 1000)
}

export async function runSensor() {
  let exit = new Promise((ok, fail) => {
    let c = client.io("http://localhost:8080")
    c.on('connect', () => {
      console.log("客户端连接成功")
      c.send("hello", "where are you")
    })
    c.on('message', (data) => {
      if(data == "exit"){
        ok("d")
      }
    })
  })
  return exit;
}
