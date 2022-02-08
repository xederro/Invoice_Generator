import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["close", "full", "min", "addInvoice", "fetchAllInvoices", "fetchInvoice", "deleteInvoice", "editInvoice", "getCredentials", "setCredentials", "paginate", "pageCount", "toast", "printPDF"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["addInvoice", "fetchAllInvoices", "fetchInvoice", "deleteInvoice", "editInvoice", "getCredentials", "setCredentials", "full", "paginate", "pageCount", "toast", "printPDF", "progress"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
