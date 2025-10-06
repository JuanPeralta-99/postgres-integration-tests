import { pool } from "./db";

export async function createProduct(name: string, price: number) {
  const result = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  return result.rows[0];
}

export async function getProducts() {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
}
