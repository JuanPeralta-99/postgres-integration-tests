import { describe, it, expect, beforeAll } from "vitest";
import { pool } from "../src/db";
import { createProduct, getProducts } from "../src/products";

interface Product {
  id: number;
  name: string;
  price: number;
}

beforeAll(async () => {
  // Crear tabla antes de ejecutar pruebas
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC NOT NULL
    );
  `);

  // Limpiar datos antes de cada corrida de test
  await pool.query("DELETE FROM products;");
});

describe("Products Integration Tests", () => {
  it("should create a product", async () => {
    const product = await createProduct("Laptop", 1200);
    expect(product.name).toBe("Laptop");
    expect(product.id).toBeDefined();
  });

  it("should return a list of products", async () => {
    await createProduct("Mouse", 25);
    const products: Product[] = await getProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it("should persist data correctly", async () => {
    const product = await createProduct("Keyboard", 100);
    const products: Product[] = await getProducts();
    const found = products.find(p => p.id === product.id);
    expect(found).toBeDefined();
    expect(found?.name).toBe("Keyboard");
  });
});
