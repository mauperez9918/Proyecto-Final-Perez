import e from "express";
import CartsService from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartsService.getCarts();

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const newCart = async (req, res) => {
  try {
    const cart = await CartsService.newCart();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProductsInCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartsService.getProductsInCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    await CartsService.addProductToCart(req.params, req.user);
    res.status(201).json({
      message: "Su producto ha sido agregado al carrito correctamente",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteToCart = async (req, res) => {
  try {
    await CartsService.deleteToCart(req.params);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await CartsService.deleteAllProducts(req.params);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateInCartProduct = async (req, res) => {
  try {
    await CartsService.updateInCartProduct(req.params, req.body);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const purchase = async (req, res) => {
  const { cart, email } = req.user;
  try {
    const products = await CartsService.purchase(cart, email);
    if (products) {
      return res
        .status(200)
        .json(
          `Muchas gracias por su compra algunos productos no han podido incluirse en la compra por disponibilidad de stock: ${products.map(
            (product) => product.title
          )}`
        );
    }
    res.status(200).json("Muchas gracias por su compra");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
