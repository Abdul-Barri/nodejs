const http = require('http')
const os = require('os')
const fs = require('fs')

const host = '127.0.0.1'
const port = 5000

const server = http.createServer((req, res) =>{

    const urlPath = req.url

    if(urlPath === '/'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(__dirname + '/pages/index.html').pipe(res)
    }else if(urlPath === '/about'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(__dirname + '/pages/about.html').pipe(res)
    }else if(urlPath === '/sys'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('Your OS info has been saved successfully')

        // Obtaining System Info

        const data = JSON.stringify({
            hostname: os.hostname(),
            paltform: os.platform(),
            architecture: os.arch(),
            numberOfCpus: os.cpus().length,
            networkInterface: os.networkInterfaces(),
            upTime: os.uptime()
        })

        // Creating 'osinfo.json' file and passing in the system information

        const content = data

        fs.writeFile('./osinfo.json', content, err =>{
            if(err) {
                console.error(err)
                return
            }
        })
    
    }else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(__dirname + '/pages/404.html').pipe(res)
    }

        
})

server.listen(port, host, () =>{
    console.log(`Running at ${host}:${port}`)
    console.log(__dirname)
})