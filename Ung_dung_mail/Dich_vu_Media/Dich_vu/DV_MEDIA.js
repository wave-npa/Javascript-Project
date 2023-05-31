var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU")
var Xu_ly_Tham_so = require('querystring')

//Change port a little to adapt to Heroku
var Port = normalizePort(process.env.PORT || 1001);
//End of port

var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        console.log(Yeu_cau)
        var Nhi_phan_Kq = ""
        var Ten = Yeu_cau
            .url
            .replace("/", "")

        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            //Add headers to adapt to Heroku
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
            //End of headers

            if (Yeu_cau.method == "GET" && Ten != "") {
                if (Ten.toLowerCase().endsWith("pdf")) {
                    Nhi_phan_Kq = Luu_tru.Doc_Tap_tin_PDF(Ten)
                    Dap_ung.writeHead(200, { 'Content-Type': 'application/pdf' });
                    Dap_ung.end(Nhi_phan_Kq, 'binary');
                } else {
                    Nhi_phan_Kq = Luu_tru.Doc_Nhi_phan_Media(Ten)
                    Dap_ung.writeHead(200, { 'Content-Type': 'image/png' });
                    Dap_ung.end(Nhi_phan_Kq, 'binary');
                }
            } else if (Yeu_cau.method == "POST" && Yeu_cau.url == "/Ghi_PDF") {
                var pdf = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Ghi_Tap_tin_PDF(pdf.Ten, pdf.Chuoi_nhi_phan)
                Dap_ung.end(Kq);
            } else {
                Chuoi_Kq = Luu_tru.Thong_tin_Dich_vu()
                Dap_ung.end(Chuoi_Kq);
            }

        })

    })

Dich_vu.listen(Port,
    console.log("Dịch vụ Media đang thực thi ...: " + Port)
)

//Error handling for Heroku
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string'
        ? 'Pipe ' + Port
        : 'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

