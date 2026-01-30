const app = require("./app");
const { connectDatabase } = require("./config/database");
const dotenv = require("dotenv");
const { socketConnection } = require("./config/socket");
const Document = require("./models/documentModel");

//Config
dotenv.config({ path: "backend/config/config.env" });

//Mongoose Database
connectDatabase();

//Socket Connection
socketConnection();

//Spreadsheet
const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

const defaultValue = ""

io.on("connection", socket => {
    console.log(`Document server id is: ${socket.id}`);
    socket.on("get-document", async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document", document.data)

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
})

async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});