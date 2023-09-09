import { Router } from "express";
import { productModel } from "../dao/models/products.models.js";
import { messageModel } from "../dao/models/messages.models.js";

const viewRouter = Router();

viewRouter.get("/", async (req, res) => {
  const listaproductos = await productModel.find().lean();
  res.render("home", { listaproductos });
});

viewRouter.get("/realtimeproducts", async (req, res) => {
  const listaproductos = await productModel.find().lean();

  res.render("realTimeProducts", {
    css: "style.css",
    js: "realTimeProducts.js",
    listaproductos,
  });
});

viewRouter.post("/chat", async (req, res) => {
  try {
    const newMessage = await messageModel.create(message);
  } catch (error) {
    res
      .status(400)
      .send({ response: "Error al enviar mensaje", mensaje: error });
  }
});

viewRouter.get("/chat", async (req, res) => {
  try {
    const listaMensajes = await messageModel.find().lean().exec();
    res.render("chat", {
      css: "style.css",
      js: "chat.js",
      listaMensajes,
    });
  } catch (error) {
    res
      .status(400)
      .send({ response: "Error al cargar los mensajes", mensaje: error });
  }
});

export default viewRouter;
